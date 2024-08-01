import { DataFrame, FieldType, SelectableValue } from '@grafana/data';
import { findField } from '@volkovlabs/grafana-utils';
import { v4 as uuidv4 } from 'uuid';

import { DatasetItem, RadarChartOptions, SeriesByType, SeriesItem, SeriesType, VisualEditorOptions } from '../types';
import { getFieldValues } from './data-frame';

/**
 * Get field based on option value
 * @param fieldName
 * @param series
 */
export const getFieldBasedOptionValue = <TValue>(fieldName: string, series: DataFrame[]) => {
  const valueFields = fieldName.split(':');

  return findField<TValue>(series, (field, frame) => {
    if (frame?.refId === valueFields[0]) {
      return field.name === valueFields[1];
    }
    return false;
  });
};

/**
 * Reorder
 * @param list
 * @param startIndex
 * @param endIndex
 */
export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Get Dataset Item Unique Name
 * @param item
 */
export const getDatasetItemUniqueName = (item: DatasetItem) => {
  return item.source ? `${item.source}:${item.name}` : item.name;
};

/**
 * Get Dataset Source
 * @param frames
 * @param items
 */
export const getDatasetSource = (frames: DataFrame[], items: DatasetItem[]): [string[], ...unknown[]] => {
  const itemValuesMap = items.reduce((acc: Map<string, unknown[]>, item) => {
    const frame = frames.find((frame) =>
      item.source ? frame.refId === item.source : frame.fields.some((field) => field.name === item.name)
    );

    acc.set(getDatasetItemUniqueName(item), getFieldValues(frame?.fields.find((field) => field.name === item.name)));

    return acc;
  }, new Map());

  const maxDataLength = Array.from(itemValuesMap.values()).reduce((acc, values) => Math.max(acc, values.length), 0);

  const rows = [];

  for (let rowIndex = 0; rowIndex < maxDataLength; rowIndex += 1) {
    const row = items.map((item) => {
      const value = itemValuesMap.get(getDatasetItemUniqueName(item))?.[rowIndex];
      return value === undefined ? null : value;
    });
    rows.push(row);
  }

  return [items.map((item) => getDatasetItemUniqueName(item)), ...rows];
};

/**
 * Get Series With New Type
 * @param item
 * @param newType
 */
export const getSeriesWithNewType = <TItem extends Pick<SeriesItem, 'id' | 'name' | 'uid'>>(
  item: TItem,
  newType: SeriesType
): SeriesByType<SeriesItem, typeof newType> => {
  const commonValues = {
    uid: item.uid,
    id: item.id,
    name: item.name,
  };

  switch (newType) {
    case SeriesType.LINE: {
      return {
        ...commonValues,
        encode: {
          x: [],
          y: [],
        },
        type: newType,
      };
    }
    case SeriesType.RADAR: {
      return {
        ...commonValues,
        data: [],
        radarDimensions: [],
        type: newType,
      };
    }
    default: {
      return {
        ...commonValues,
        type: newType,
      };
    }
  }
};

/**
 * Convert Series to chart option
 * @param item
 * @param series
 */
export const convertSeriesToChartOption = (item: SeriesItem, series: DataFrame[]) => {
  switch (item.type) {
    case SeriesType.RADAR: {
      const currentData = item.radarDimensions.map((dimension) => {
        let currentValue: number[] = [];
        if (dimension.value) {
          const valueFields = dimension.value.split(':');
          const field = findField<number>(series, (field, frame) => {
            if (frame?.refId === valueFields[0]) {
              return field.name === valueFields[1] && field.type === FieldType.number;
            }
            return false;
          });
          currentValue = field ? field.values : [];
        }

        return {
          name: dimension.name,
          value: currentValue,
        };
      });

      return {
        ...item,
        data: currentData,
      };
    }
    default: {
      return item;
    }
  }
};

/**
 * Get Series Unique Id
 */
export const getSeriesUniqueId = () => uuidv4();

/**
 * Data Series
 * @param visualEditorSeries
 * @param series
 */
export const getDataSeries = (visualEditorSeries: SeriesItem[], series: DataFrame[]) => {
  return visualEditorSeries.map((item) => {
    return convertSeriesToChartOption(item, series);
  });
};

/**
 * Check type in Series
 * @param series
 * @param type
 */
export const isTypeExistInSeries = (series: SeriesItem[], type: SeriesType) => {
  return series.some((value) => value.type === type);
};

/**
 * Get Radar Chart Options
 * @param visualEditor
 * @param series
 */
export const getRadarOptions = (visualEditor: VisualEditorOptions, series: DataFrame[]): RadarChartOptions => {
  /**
   * Default radar options
   */
  const radarOptions: RadarChartOptions = {
    shape: visualEditor.radar?.shape,
    indicator: [],
  };

  /**
   * Get All dimensions for Radar from series
   */
  const dimensions = visualEditor.series.flatMap((item) => {
    if (item.type === SeriesType.RADAR) {
      return item.radarDimensions;
    }
    return [];
  });

  if (visualEditor.radar?.indicator && dimensions.length) {
    /**
     * Get Names for indicator lines
     */
    const indicatorValues = getFieldBasedOptionValue<string>(visualEditor.radar?.indicator, series)?.values || [];

    /**
     * Get max values from fields
     */
    const dimensionsMaxValues = dimensions.flatMap((item) => {
      const field = getFieldBasedOptionValue<number>(item.value, series);
      return field?.state?.range?.max || 0;
    });

    /**
     * Get min values from fields
     */
    const dimensionsMinValues = dimensions.flatMap((item) => {
      const field = getFieldBasedOptionValue<number>(item.value, series);
      return field?.state?.range?.min || 0;
    });

    /**
     * Define radar indicator option
     */
    radarOptions.indicator = indicatorValues.map((item) => ({
      name: item,
      max: Math.max(...dimensionsMaxValues),
      min: Math.min(...dimensionsMinValues),
    }));
  }

  /**
   * Set radar option in percentage
   */
  if (visualEditor.radar?.radius) {
    radarOptions.radius = visualEditor.radar?.radius;
  }

  return radarOptions;
};

/**
 * Get Fields for multiple Queries
 * @param data
 * @param filterTypes
 */
export const multipleQueriesFields = (data: DataFrame[], filterTypes?: FieldType[]) => {
  return data.reduce((acc: SelectableValue[], dataFrame) => {
    return acc.concat(
      dataFrame.fields
        .filter((field) => (filterTypes ? filterTypes.includes(field.type) : true))
        .map((field) => ({
          value: `${dataFrame.refId ? `${dataFrame.refId}:` : ''}${field.name}`,
          label: `${dataFrame.refId ? `${dataFrame.refId}:` : ''}${field.name}`,
          refId: dataFrame.refId || '',
          field: field.name,
        }))
    );
  }, []);
};

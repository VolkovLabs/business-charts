import { DataFrame } from '@grafana/data';
import { v4 as uuidv4 } from 'uuid';

import { DatasetItem, SeriesByType, SeriesItem, SeriesType } from '../types';
import { getFieldValues } from './data-frame';

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
    default: {
      return {
        ...commonValues,
        type: newType,
      };
    }
  }
};

/**
 * Get Series Unique Id
 */
export const getSeriesUniqueId = () => uuidv4();

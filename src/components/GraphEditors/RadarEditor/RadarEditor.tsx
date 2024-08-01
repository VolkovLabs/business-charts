import { Button, IconButton, InlineField, InlineFieldRow, Input, Label, Select, useStyles2 } from '@grafana/ui';
import React, { useCallback, useState } from 'react';

import { TEST_IDS } from '../../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../../types';
import { getDatasetItemUniqueName, getSeriesUniqueId } from '../../../utils';
import { getStyles } from './RadarEditor.styles';

/**
 * Radar Series Item
 */
type RadarSeriesItem = Extract<SeriesItem, { type: SeriesType.RADAR }>;

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {RadarSeriesItem}
   */
  value: RadarSeriesItem;

  /**
   * On Change
   */
  onChange: (value: SeriesItem) => void;

  /**
   * Dataset
   */
  dataset: DatasetItem[];
}

export const RadarEditor: React.FC<Props> = ({ value, onChange, dataset }) => {
  /**
   * Styles and Theme
   */
  const styles = useStyles2(getStyles);

  /**
   * States
   */
  const [newRadarItemName, setNewRadarItemName] = useState('');

  /**
   * Add new dimension
   */
  const addNewDimension = useCallback(() => {
    setNewRadarItemName('');
    const dataItem = {
      name: newRadarItemName,
      value: '',
      uid: getSeriesUniqueId(),
    };
    const currentRadarValue = value.radarDimensions || [];
    currentRadarValue.push(dataItem);

    onChange({
      ...value,
      radarDimensions: currentRadarValue,
    });
  }, [newRadarItemName, onChange, value]);

  return (
    <>
      <Label className={styles.label} description="Set Radar data">
        Data fields
      </Label>
      {value.radarDimensions?.map((dimension) => {
        return (
          <InlineFieldRow key={dimension.uid}>
            <InlineField label="Dimension Name" labelWidth={25}>
              <Input
                placeholder="Name"
                value={dimension.name}
                onChange={(event) => {
                  const newDimensions = value.radarDimensions.map((dimensionItem) => {
                    return {
                      ...dimensionItem,
                      name: dimensionItem.uid === dimension.uid ? event.currentTarget.value : dimensionItem.name,
                    };
                  });

                  onChange({
                    ...value,
                    radarDimensions: newDimensions,
                  });
                }}
                data-testid={TEST_IDS.seriesEditor.radarDimensionName(dimension.name)}
              />
            </InlineField>
            <InlineField label="Dimension Value" labelWidth={25} grow>
              <Select
                value={dimension.value}
                options={dataset.map((item) => ({
                  value: getDatasetItemUniqueName(item),
                  label: getDatasetItemUniqueName(item),
                }))}
                onChange={(event) => {
                  const newDimensions = value.radarDimensions.map((dimensionItem) => {
                    return {
                      ...dimensionItem,
                      value: dimensionItem.uid === dimension.uid ? event.value! : dimensionItem.value,
                    };
                  });
                  onChange({
                    ...value,
                    radarDimensions: newDimensions,
                  });
                }}
                data-testid={TEST_IDS.seriesEditor.radarDimensionValue(dimension.value)}
              />
            </InlineField>
            <IconButton
              name="trash-alt"
              tooltip="Remove Radar Dimension"
              className={styles.removeButton}
              data-testid={TEST_IDS.seriesEditor.radarDimensionButtonRemove(dimension.uid)}
              onClick={() => {
                const dimensions = value.radarDimensions.filter(
                  (dimensionValue) => dimensionValue.uid !== dimension.uid
                );

                onChange({
                  ...value,
                  radarDimensions: dimensions,
                });
              }}
            />
          </InlineFieldRow>
        );
      })}
      <InlineFieldRow className={styles.new}>
        <InlineField label="New Dimension" grow={true}>
          <Input
            placeholder="Dimension Name"
            value={newRadarItemName}
            onChange={(event) => setNewRadarItemName(event.currentTarget.value)}
            data-testid={TEST_IDS.seriesEditor.radarDimensionNewItemId}
          />
        </InlineField>
        <Button
          icon="plus"
          title="Add new Radar item"
          onClick={addNewDimension}
          disabled={!newRadarItemName}
          data-testid={TEST_IDS.seriesEditor.radarDimensionButtonAddNew}
        >
          Add
        </Button>
      </InlineFieldRow>
    </>
  );
};

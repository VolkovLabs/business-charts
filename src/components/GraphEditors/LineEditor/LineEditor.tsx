import { SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Select } from '@grafana/ui';
import React from 'react';

import { TEST_IDS } from '../../../constants';
import { DatasetItem, SeriesByType, SeriesItem, SeriesType } from '../../../types';
import { getDatasetItemUniqueName } from '../../../utils';

/**
 * Label Width
 */
const labelWidth = 10;

/**
 * Line Item
 */
type LineSeriesItem = SeriesByType<SeriesItem, SeriesType.LINE>;

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {LineSeriesItem}
   */
  value: LineSeriesItem;

  /**
   * On Change
   */
  onChange: (value: SeriesItem) => void;

  /**
   * Dataset
   */
  dataset: DatasetItem[];
}

/**
 * Line editor
 */
export const LineEditor: React.FC<Props> = ({ value, onChange, dataset }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Encode Y" labelWidth={labelWidth} grow={true}>
          <Select
            value={value.encode?.y}
            options={dataset.map((item) => ({
              value: getDatasetItemUniqueName(item),
              label: getDatasetItemUniqueName(item),
            }))}
            isMulti={true}
            isClearable={true}
            onChange={(event) => {
              const values = event as SelectableValue[];
              onChange({
                ...value,
                encode: {
                  ...value.encode,
                  y: values.map((item) => item.value),
                },
              });
            }}
            aria-label={TEST_IDS.seriesEditor.fieldEncodeY}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Encode X" labelWidth={labelWidth} grow={true}>
          <Select
            value={value.encode?.x}
            options={dataset.map((item) => ({
              value: getDatasetItemUniqueName(item),
              label: getDatasetItemUniqueName(item),
            }))}
            isMulti={true}
            isClearable={true}
            onChange={(event) => {
              const values = event as SelectableValue[];
              onChange({
                ...value,
                encode: {
                  ...value.encode,
                  x: values.map((item) => item.value),
                },
              });
            }}
            aria-label={TEST_IDS.seriesEditor.fieldEncodeX}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

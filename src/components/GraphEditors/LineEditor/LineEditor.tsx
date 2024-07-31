import { SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Select } from '@grafana/ui';
import React from 'react';

import { TEST_IDS } from '../../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../../types';
import { getDatasetItemUniqueName } from '../../../utils';

/**
 * Label Width
 */
const LabelWidth = 10;

/**
 * Line Item
 */
type LineSeriesItem = Extract<SeriesItem, { type: SeriesType.LINE }>;

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

export const LineEditor: React.FC<Props> = ({ value, onChange, dataset }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Encode Y" labelWidth={LabelWidth} grow={true}>
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
        <InlineField label="Encode X" labelWidth={LabelWidth} grow={true}>
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

import { SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Select } from '@grafana/ui';
import React from 'react';

import { SCATTER_SYMBOL_OPTIONS, TEST_IDS } from '../../../constants';
import { DatasetItem, SeriesByType, SeriesItem, SeriesType } from '../../../types';
import { getDatasetItemUniqueName } from '../../../utils';

/**
 * Label Width
 */
const labelWidth = 10;

/**
 * Scatter Item
 */
type ScatterSeriesItem = SeriesByType<SeriesItem, SeriesType.SCATTER>;

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {ScatterSeriesItem}
   */
  value: ScatterSeriesItem;

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
 * Scatter editor
 */
export const ScatterEditor: React.FC<Props> = ({ value, onChange, dataset }) => {
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
            aria-label={TEST_IDS.seriesEditor.scatterFieldEncodeY}
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
            aria-label={TEST_IDS.seriesEditor.scatterFieldEncodeX}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Size" labelWidth={labelWidth} grow={true}>
          <Select
            value={value.sizeField}
            options={dataset.map((item) => ({
              value: getDatasetItemUniqueName(item),
              label: getDatasetItemUniqueName(item),
            }))}
            isClearable={true}
            onChange={(event) => {
              const values = event as SelectableValue;
              onChange({
                ...value,
                sizeField: values?.value,
              });
            }}
            aria-label={TEST_IDS.seriesEditor.scatterFieldSize}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Symbol Type" labelWidth={25} grow={true}>
          <Select
            value={value.symbol}
            options={SCATTER_SYMBOL_OPTIONS}
            onChange={(event) => {
              const values = event as SelectableValue;
              onChange({
                ...value,
                symbol: values.value,
              });
            }}
            aria-label={TEST_IDS.seriesEditor.scatterFieldSymbolType}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Tooltip" labelWidth={labelWidth} grow={true}>
          <Select
            value={value.encode?.tooltip}
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
                  tooltip: values.map((item) => item.value),
                },
              });
            }}
            aria-label={TEST_IDS.seriesEditor.scatterFieldTooltip}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

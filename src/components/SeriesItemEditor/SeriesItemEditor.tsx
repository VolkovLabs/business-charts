import React from 'react';
import { InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { SeriesTypeOptions, TestIds } from '../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../types';
import { getDatasetItemUniqueName, getSeriesWithNewType } from '../../utils';

/**
 * Label Width
 */
const LabelWidth = 10;

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {SeriesItem}
   */
  value: SeriesItem;

  /**
   * On Change
   */
  onChange: (value: SeriesItem) => void;

  /**
   * Dataset
   */
  dataset: DatasetItem[];
}

export const SeriesItemEditor: React.FC<Props> = ({ value, onChange, dataset }) => (
  <>
    <InlineFieldRow>
      <InlineField label="ID" labelWidth={LabelWidth} grow={true}>
        <Input
          value={value.id}
          onChange={(event) => {
            onChange({
              ...value,
              id: event.currentTarget.value,
            });
          }}
          data-testid={TestIds.seriesEditor.fieldId}
        />
      </InlineField>
      <InlineField label="Type" labelWidth={LabelWidth} grow={true}>
        <Select
          value={value.type}
          options={SeriesTypeOptions}
          onChange={(event) => {
            if (event.value) {
              onChange(getSeriesWithNewType(value, event.value));
            }
          }}
          aria-label={TestIds.seriesEditor.fieldType}
        />
      </InlineField>
    </InlineFieldRow>
    <InlineFieldRow>
      <InlineField label="Name" labelWidth={LabelWidth} grow={true}>
        <Input
          value={value.name}
          onChange={(event) => {
            onChange({
              ...value,
              name: event.currentTarget.value,
            });
          }}
          data-testid={TestIds.seriesEditor.fieldName}
        />
      </InlineField>
    </InlineFieldRow>
    {value.type === SeriesType.LINE && (
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
              aria-label={TestIds.seriesEditor.fieldEncodeY}
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
              aria-label={TestIds.seriesEditor.fieldEncodeX}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    )}
  </>
);

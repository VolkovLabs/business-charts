import React from 'react';
import { InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import { SeriesTypeOptions } from '../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../types';
import { getDatasetItemUniqueName, getSeriesWithNewType } from '../../utils';

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
      <InlineField label="Id">
        <Input
          value={value.id}
          onChange={(event) => {
            onChange({
              ...value,
              id: event.currentTarget.value,
            });
          }}
        />
      </InlineField>
    </InlineFieldRow>
    <InlineFieldRow>
      <InlineField label="Name">
        <Input
          value={value.name}
          onChange={(event) => {
            onChange({
              ...value,
              name: event.currentTarget.value,
            });
          }}
        />
      </InlineField>
    </InlineFieldRow>
    <InlineFieldRow>
      <InlineField label="Type">
        <Select
          value={value.type}
          options={SeriesTypeOptions}
          onChange={(event) => {
            if (event.value) {
              onChange(getSeriesWithNewType(value, event.value));
            }
          }}
        />
      </InlineField>
    </InlineFieldRow>
    {value.type === SeriesType.LINE && (
      <>
        <InlineFieldRow>
          <InlineField label="Encode Y">
            <Select
              value={value.encode?.y}
              options={dataset.map((item) => ({
                value: getDatasetItemUniqueName(item),
                label: getDatasetItemUniqueName(item),
              }))}
              isMulti={true}
              isClearable={true}
              onChange={(event) => {
                const values = Array.isArray(event) ? event : [event];
                onChange({
                  ...value,
                  encode: {
                    ...(value.encode || {}),
                    y: values.map((item) => item.value),
                  },
                });
              }}
            />
          </InlineField>
        </InlineFieldRow>
        <InlineFieldRow>
          <InlineField label="Encode X">
            <Select
              value={value.encode?.x}
              options={dataset.map((item) => ({
                value: getDatasetItemUniqueName(item),
                label: getDatasetItemUniqueName(item),
              }))}
              isMulti={true}
              isClearable={true}
              onChange={(event) => {
                const values = Array.isArray(event) ? event : [event];
                onChange({
                  ...value,
                  encode: {
                    ...(value.encode || {}),
                    x: values.map((item) => item.value),
                  },
                });
              }}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    )}
  </>
);

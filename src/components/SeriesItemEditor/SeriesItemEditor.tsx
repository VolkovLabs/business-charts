import React from 'react';
import { InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import { SeriesTypeOptions } from '../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../types';
import { isSeriesType } from '../../utils';

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

export const SeriesItemEditor: React.FC<Props> = ({ value, onChange }) => (
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
            onChange({
              ...value,
              type: event.value,
            });
          }}
        />
      </InlineField>
    </InlineFieldRow>
    {value.type === SeriesType.LINE && (
      <InlineFieldRow>
        <InlineField label="Encode Y">
          <Select
            value={value.type}
            options={SeriesTypeOptions}
            isMulti={true}
            isClearable={true}
            onChange={(event) => {
              onChange({
                ...value,
              });
            }}
          />
        </InlineField>
      </InlineFieldRow>
    )}
  </>
);

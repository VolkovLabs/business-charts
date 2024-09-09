import { InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import React from 'react';

import { SERIES_TYPE_OPTIONS, TEST_IDS } from '../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../types';
import { getSeriesWithNewType } from '../../utils';
import { BarEditor, BoxplotEditor, LineEditor, RadarEditor, ScatterEditor, SunburstEditor } from '../GraphEditors';
/**
 * Label Width
 */
const labelWidth = 10;

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

export const SeriesItemEditor: React.FC<Props> = ({ value, onChange, dataset }) => {
  /**
   * Render Series Editor
   */
  const renderElement = (value: SeriesItem) => {
    switch (value.type) {
      case SeriesType.BAR: {
        return <BarEditor value={value} onChange={onChange} dataset={dataset} />;
      }
      case SeriesType.BOXPLOT: {
        return <BoxplotEditor value={value} onChange={onChange} dataset={dataset} />;
      }
      case SeriesType.LINE: {
        return <LineEditor value={value} onChange={onChange} dataset={dataset} />;
      }
      case SeriesType.RADAR: {
        return <RadarEditor value={value} onChange={onChange} dataset={dataset} />;
      }
      case SeriesType.SCATTER: {
        return <ScatterEditor value={value} onChange={onChange} dataset={dataset} />;
      }
      case SeriesType.SUNBURST: {
        return <SunburstEditor value={value} onChange={onChange} dataset={dataset} />;
      }

      default: {
        return <></>;
      }
    }
  };

  return (
    <>
      <InlineFieldRow>
        <InlineField label="ID" labelWidth={labelWidth} grow={true}>
          <Input
            value={value.id}
            onChange={(event) => {
              onChange({
                ...value,
                id: event.currentTarget.value,
              });
            }}
            data-testid={TEST_IDS.seriesEditor.fieldId}
          />
        </InlineField>
        <InlineField label="Type" labelWidth={labelWidth} grow={true}>
          <Select
            value={value.type}
            options={SERIES_TYPE_OPTIONS}
            onChange={(event) => {
              if (event.value) {
                onChange(getSeriesWithNewType(value, event.value));
              }
            }}
            aria-label={TEST_IDS.seriesEditor.fieldType}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Name" labelWidth={labelWidth} grow={true}>
          <Input
            value={value.name}
            onChange={(event) => {
              onChange({
                ...value,
                name: event.currentTarget.value,
              });
            }}
            data-testid={TEST_IDS.seriesEditor.fieldName}
          />
        </InlineField>
      </InlineFieldRow>
      {renderElement(value)}
    </>
  );
};

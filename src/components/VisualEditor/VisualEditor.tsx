import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { Field } from '@grafana/ui';
import { VisualEditorOptions } from '../../types';
import { DatasetEditor } from '../DatasetEditor';
import { SeriesEditor } from '../SeriesEditor';

/**
 * Properties
 */
interface Props extends StandardEditorProps<VisualEditorOptions> {}

/**
 * Visual Editor
 */
export const VisualEditor: React.FC<Props> = ({ value, onChange, context }) => {
  return (
    <>
      <Field label="Dataset Items" description="Fields which values will be used for the dataset.">
        <DatasetEditor
          value={value.dataset}
          onChange={(items) => {
            onChange({
              ...value,
              dataset: items,
            });
          }}
          data={context.data}
        />
      </Field>
      <Field label="Series">
        <SeriesEditor
          value={value.series}
          onChange={(items) => {
            onChange({
              ...value,
              series: items,
            });
          }}
          dataset={value.dataset}
        />
      </Field>
    </>
  );
};

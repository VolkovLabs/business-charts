import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { Field } from '@grafana/ui';
import { VisualEditorOptions } from '../../types';
import { DatasetEditor } from '../DatasetEditor';

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
      <Field label="Dataset Items">
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
    </>
  );
};

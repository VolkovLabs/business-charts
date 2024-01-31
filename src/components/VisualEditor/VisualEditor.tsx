import { StandardEditorProps } from '@grafana/data';
import { Label } from '@grafana/ui';
import React from 'react';

import { VisualEditorOptions } from '../../types';
import { DatasetEditor } from '../DatasetEditor';
import { SeriesEditor } from '../SeriesEditor';

/**
 * Properties
 */
type Props = StandardEditorProps<VisualEditorOptions>

/**
 * Visual Editor
 */
export const VisualEditor: React.FC<Props> = ({ value, onChange, context }) => {
  return (
    <>
      <Label description="Fields which values will be used for the dataset.">Dataset Items</Label>
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
      <Label>Series</Label>
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
    </>
  );
};

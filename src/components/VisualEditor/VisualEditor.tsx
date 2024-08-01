import { StandardEditorProps } from '@grafana/data';
import { Label } from '@grafana/ui';
import { RadarOptionsEditor } from 'components/GraphEditors/RadarOptionsEditor';
import React from 'react';

import { SeriesType, VisualEditorOptions } from '../../types';
import { isTypeExistInSeries } from '../../utils';
import { DatasetEditor } from '../DatasetEditor';
import { SeriesEditor } from '../SeriesEditor';

/**
 * Properties
 */
type Props = StandardEditorProps<VisualEditorOptions>;

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
      {isTypeExistInSeries(value.series, SeriesType.RADAR) && (
        <RadarOptionsEditor value={value} onChange={onChange} data={context.data} />
      )}
    </>
  );
};

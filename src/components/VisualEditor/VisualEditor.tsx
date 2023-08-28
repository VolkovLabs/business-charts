import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { VisualEditorOptions } from '../../types';

/**
 * Properties
 */
interface Props extends StandardEditorProps<VisualEditorOptions> {}

/**
 * Visual Editor
 */
export const VisualEditor: React.FC<Props> = () => {
  return <div>visual editor</div>;
};

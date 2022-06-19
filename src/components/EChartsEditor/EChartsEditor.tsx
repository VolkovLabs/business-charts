import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor } from '@grafana/ui';
import { CodeLanguage } from '../../constants';

/**
 * Properties
 */
interface Props extends StandardEditorProps {}

/**
 * ECharts Editor
 */
export const EChartsEditor: React.FC<Props> = ({ value, onChange, context }) => {
  return (
    <div>
      <CodeEditor
        language={CodeLanguage.JAVASCRIPT}
        showLineNumbers={true}
        showMiniMap={true}
        value={value}
        height={`${context.options.editor.height}px`}
        onBlur={(code) => {
          onChange(code);
        }}
      />
    </div>
  );
};

import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { CodeEditor, Monaco } from '@grafana/ui';
import { CodeLanguage, Format } from '../../constants';

/**
 * Monaco
 */
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

/**
 * Properties
 */
interface Props extends StandardEditorProps {}

/**
 * ECharts Editor
 */
export const EChartsEditor: React.FC<Props> = ({ value, onChange, context }) => {
  /**
   * Format On Mount
   */
  const onEditorMount = (editor: monacoType.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    if (context.options.editor.format !== Format.AUTO) {
      return;
    }

    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 100);
  };

  /**
   * Format Options
   */
  let monacoOptions = {};
  if (context.options.editor.format === Format.AUTO) {
    monacoOptions = { formatOnPaste: true, formatOnType: true };
  }

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
        monacoOptions={monacoOptions}
        onEditorDidMount={onEditorMount}
      />
    </div>
  );
};

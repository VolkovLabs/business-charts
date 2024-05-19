import { StandardEditorProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { CodeEditor, CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';
import { AutosizeCodeEditor } from '@volkovlabs/components';
import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';

import {
  CODE_EDITOR_SUGGESTIONS,
  CodeLanguage,
  Editor,
  Format,
  TEST_IDS,
  VISUAL_CODE_EDITOR_SUGGESTIONS,
} from '../../constants';
import { PanelOptions } from '../../types';

/**
 * Properties
 */
type Props = StandardEditorProps<string, unknown, PanelOptions>;

/**
 * ECharts Editor
 */
export const EchartsEditor: React.FC<Props> = ({ value, onChange, context, item }) => {
  /**
   * Template Service to get Variables
   */
  const templateSrv = getTemplateSrv();

  /**
   * Format On Mount
   */
  const onEditorMount = (editor: monacoType.editor.IStandaloneCodeEditor) => {
    if (context.options?.editor.format !== Format.AUTO) {
      return;
    }

    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 100);
  };

  /**
   * Suggestions
   */
  const getSuggestions = (): CodeEditorSuggestionItem[] => {
    /**
     * Add Variables
     */
    const suggestions = templateSrv.getVariables().map((variable) => {
      return {
        label: `\$\{${variable.name}\}`,
        kind: CodeEditorSuggestionItemKind.Property,
        detail: variable.description ? variable.description : variable.label,
      };
    });

    if (item.id === Editor.VISUALCODE) {
      return [...VISUAL_CODE_EDITOR_SUGGESTIONS, ...suggestions];
    }

    return [...CODE_EDITOR_SUGGESTIONS, ...suggestions];
  };

  /**
   * Format Options
   */
  const monacoOptions =
    context.options?.editor.format === Format.AUTO
      ? { formatOnPaste: true, formatOnType: true }
      : { formatOnPaste: false, formatOnType: false };

  /**
   * Get Item Specific Editor props
   */
  const getItemSpecificEditorProps = (): Partial<React.ComponentProps<typeof CodeEditor>> => {
    /**
     * Theme Config
     */
    if (item.id === Editor.THEME) {
      return {
        language: CodeLanguage.JSON,
      };
    }

    /**
     * Visual Editor Config
     */
    if (item.id === Editor.VISUALCODE) {
      return {
        language: CodeLanguage.JAVASCRIPT,
        getSuggestions,
      };
    }

    /**
     * Get Option
     */
    return {
      language: CodeLanguage.JAVASCRIPT,
      getSuggestions,
    };
  };

  return (
    <div data-testid={TEST_IDS.editor.root}>
      <AutosizeCodeEditor
        language={CodeLanguage.JAVASCRIPT}
        showLineNumbers={true}
        showMiniMap={value.length > 100}
        value={value}
        onBlur={onChange}
        onSave={onChange}
        monacoOptions={{ ...monacoOptions, scrollBeyondLastLine: false }}
        onEditorDidMount={onEditorMount}
        {...getItemSpecificEditorProps()}
      />
    </div>
  );
};

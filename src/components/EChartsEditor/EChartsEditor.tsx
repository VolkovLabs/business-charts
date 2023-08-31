import React from 'react';
import { StandardEditorProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { CodeEditor, CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';
import {
  CodeEditorSuggestions,
  CodeLanguage,
  Editor,
  Format,
  TestIds,
  VisualCodeEditorSuggestions,
} from '../../constants';

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
export const EChartsEditor: React.FC<Props> = ({ value, onChange, context, item }) => {
  /**
   * Template Service to get Variables
   */
  const templateSrv = getTemplateSrv();

  /**
   * Format On Mount
   */
  const onEditorMount = (editor: monacoType.editor.IStandaloneCodeEditor) => {
    if (context.options.editor.format !== Format.AUTO) {
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
      return [...VisualCodeEditorSuggestions, ...suggestions];
    }

    return [...CodeEditorSuggestions, ...suggestions];
  };

  /**
   * Format Options
   */
  const monacoOptions =
    context.options.editor.format === Format.AUTO
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
        height: context.options.themeEditor.height,
      };
    }

    /**
     * Visual Editor Config
     */
    if (item.id === Editor.VISUALCODE) {
      return {
        language: CodeLanguage.JAVASCRIPT,
        height: 300,
        getSuggestions,
      };
    }

    /**
     * Get Option
     */
    return {
      language: CodeLanguage.JAVASCRIPT,
      height: context.options.editor.height,
      getSuggestions,
    };
  };

  return (
    <div data-testid={TestIds.editor.root}>
      <CodeEditor
        language={CodeLanguage.JAVASCRIPT}
        showLineNumbers={true}
        showMiniMap={(value && value.length) > 100}
        value={value}
        height={context.options.editor.height}
        onBlur={onChange}
        onSave={onChange}
        monacoOptions={monacoOptions}
        onEditorDidMount={onEditorMount}
        {...getItemSpecificEditorProps()}
      />
    </div>
  );
};

import { CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';

import { codeParameters, visualCodeParameters } from '../utils';

/**
 * Editors
 */
export const enum Editor {
  CODE = 'getOption',
  THEME = 'themeEditor',
  VISUALCODE = 'visualCode',
}

/**
 * Supported Languages
 */
export const enum CodeLanguage {
  JAVASCRIPT = 'javascript',
  JSON = 'json',
}

/**
 * Format
 */
export enum Format {
  NONE = 'none',
  AUTO = 'auto',
}

/**
 * Editor Mode
 */
export enum EditorMode {
  CODE = 'code',
  VISUAL = 'visual',
}

/**
 * Editor Mode Options
 */
export const EDITOR_MODE_OPTIONS = [
  { value: EditorMode.CODE, label: 'Code', icon: 'keyboard' },
  { value: EditorMode.VISUAL, label: 'Visual', icon: 'chart-line' },
];

/**
 * Format Options
 */
export const FORMAT_OPTIONS = [
  { value: Format.AUTO, label: 'Auto', icon: 'thumbs-up' },
  { value: Format.NONE, label: 'Disabled', icon: 'toggle-off' },
];

/**
 * Suggestions
 */
export const CODE_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = [
  {
    label: 'data',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Result set of panel queries.',
  },
  {
    label: 'theme',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Theme object.',
  },
  {
    label: 'echartsInstance',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Instance of the ECharts.',
  },
  {
    label: 'echarts',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'ECharts library.',
  },
  {
    label: 'ecStat',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'A statistical and data mining tool.',
  },
  {
    label: 'locationService',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Browser location and history.',
  },
  {
    label: 'eventBus',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Event bus for application events.',
  },
  {
    label: 'replaceVariables',
    kind: CodeEditorSuggestionItemKind.Method,
    detail: 'Interpolate variables.',
  },
  {
    label: 'notifySuccess',
    kind: CodeEditorSuggestionItemKind.Method,
    detail: 'Display successful notification.',
  },
  {
    label: 'notifyError',
    kind: CodeEditorSuggestionItemKind.Method,
    detail: 'Display error notification.',
  },

  /**
   * Context
   */
  ...codeParameters.suggestions,
];

/**
 * Visual Code Editor Suggestions
 */
export const VISUAL_CODE_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = visualCodeParameters.suggestions;

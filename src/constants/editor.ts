import { CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';

/**
 * Editors
 */
export const enum Editor {
  CODE = 'getOption',
  THEME = 'themeEditor',
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
export const EditorModeOptions = [
  { value: EditorMode.CODE, label: 'Code' },
  { value: EditorMode.VISUAL, label: 'Visual' },
];

/**
 * Format Options
 */
export const FormatOptions = [
  { value: Format.AUTO, label: 'Auto' },
  { value: Format.NONE, label: 'Disabled' },
];

/**
 * Suggestions
 */
export const CodeEditorSuggestions: CodeEditorSuggestionItem[] = [
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
];

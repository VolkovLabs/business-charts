import { CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';

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
  { value: EditorMode.CODE, label: 'Code' },
  { value: EditorMode.VISUAL, label: 'Visual' },
];

/**
 * Format Options
 */
export const FORMAT_OPTIONS = [
  { value: Format.AUTO, label: 'Auto' },
  { value: Format.NONE, label: 'Disabled' },
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
  {
    label: 'context',
    kind: CodeEditorSuggestionItemKind.Constant,
    detail: 'All passed possible properties and methods.',
  },
  {
    label: 'context.panel',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Panel instance properties.',
  },
  {
    label: 'context.panel.data',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Panel data.',
  },
  {
    label: 'context.panel.chart',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'ECharts instance.',
  },
  {
    label: 'context.grafana',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Grafana properties and methods.',
  },
  {
    label: 'context.echarts',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'ECharts library.',
  },
  {
    label: 'context.ecStat',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'A statistical and data mining tool.',
  },
];

/**
 * Visual Code Editor Suggestions
 */
export const VISUAL_CODE_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = [
  {
    label: 'context.editor',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Editor properties.',
  },
  {
    label: 'context.editor.dataset',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Echarts dataset.',
  },
  {
    label: 'context.editor.series',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Echarts series.',
  },
];

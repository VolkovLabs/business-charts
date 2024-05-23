import { CodeEditorSuggestionItem } from '@grafana/ui';

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
 * Code Suggestions
 */
export const CODE_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = codeParameters.suggestions;

/**
 * Visual Code Editor Suggestions
 */
export const VISUAL_CODE_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = visualCodeParameters.suggestions;

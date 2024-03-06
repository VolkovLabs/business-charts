import { Theme } from '../constants';

/**
 * Theme Editor Options
 */
export interface ThemeEditorOptions {
  /**
   * Name
   *
   * @type {Theme}
   */
  name: Theme;

  /**
   * Config
   *
   * @type {string}
   */
  config: string;
}

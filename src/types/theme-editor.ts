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
   * Height
   *
   * @type {number}
   */
  height: number;

  /**
   * Config
   *
   * @type {string}
   */
  config: string;
}

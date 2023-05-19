import { Theme } from '../constants';

/**
 * Theme Editor Options
 */
export interface ThemeEditorOptions {
  /**
   * Height
   *
   * @type {number}
   */
  height: number;

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

import { Format, Map, Renderer } from './constants';

/**
 * Options
 */
export interface PanelOptions {
  /**
   * Renderer
   *
   * @type {Renderer}
   */
  renderer: Renderer;

  /**
   * Option
   *
   * @type {string}
   */
  getOption: string;

  /**
   * Editor
   */
  editor: EditorOptions;

  /**
   * Type
   */
  map: Map;

  /**
   * Bmap ak
   * @type {string}
   */
  ak: string;
}

/**
 * Editor Options
 */
export interface EditorOptions {
  /**
   * Height
   *
   * @type {number}
   */
  height: number;

  /**
   * Format
   *
   * @type {Format}
   */
  format: Format;
}

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
   *
   * @type {EditorOptions}
   */
  editor: EditorOptions;

  /**
   * Type
   *
   * @type {Map}
   */
  map: Map;

  /**
   * Access Key for Baidu Maps
   *
   * @type {string}
   */
  accessKey: string;
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

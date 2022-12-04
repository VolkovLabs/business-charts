import { Map, Renderer } from '../constants';
import { BaiduOptions } from './baidu';
import { EditorOptions } from './editor';
import { GaodeOptions } from './gaode';

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
   * Baidu
   *
   * @type {BaiduOptions}
   */
  baidu: BaiduOptions;

  /**
   * Gaode
   *
   * @type {GaodeOptions}
   */
  gaode: GaodeOptions;
}

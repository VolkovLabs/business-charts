import { EditorMode, Map, Renderer } from '../constants';
import { BaiduOptions } from './baidu';
import { EditorOptions } from './editor';
import { GaodeOptions } from './gaode';
import { GoogleOptions } from './google';
import { ThemeEditorOptions } from './theme-editor';
import { VisualEditorOptions } from './visual-editor';

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
   * Theme Editor
   *
   * @type {ThemeEditorOptions}
   */
  themeEditor: ThemeEditorOptions;

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

  /**
   * Google
   *
   * @type {GoogleOptions}
   */
  google: GoogleOptions;

  /**
   * Editor Mode
   */
  editorMode?: EditorMode;

  /**
   * Visual Editor
   *
   * @type {VisualEditorOptions}
   */
  visualEditor: VisualEditorOptions;
}

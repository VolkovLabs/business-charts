/**
 * Options
 */
export interface PanelOptions {
  /**
   * Follow Theme
   *
   * @type {boolean}
   */
  followTheme: boolean;

  /**
   * Options
   *
   * @type {string}
   */
  getOption: string;

  /**
   * Editor
   */
  editor: EditorOptions;
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
}

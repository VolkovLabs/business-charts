/**
 * Options
 */
export interface PanelOptions {
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

/**
 * Dataset Item
 */
export interface DatasetItem {
  /**
   * Name
   *
   * @type {string}
   */
  name: string;

  /**
   * Source
   *
   * @type {string}
   */
  source: string;
}

/**
 * Visual Editor Options
 */
export interface VisualEditorOptions {
  dataset: DatasetItem[];
}

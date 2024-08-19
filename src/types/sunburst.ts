/**
 * Level
 */
export interface Level {
  /**
   * Name
   *
   * @type {string}
   */
  name: string;

  /**
   * Data Frame ID or Frame Index if no specified
   *
   *  @type {string}
   */
  source: string;

  /**
   * Value
   *
   *  @type {string}
   */
  value: string;
}

/**
 * Emphasis
 */
export interface SunburstEmphasis {
  /**
   * Focus
   *
   * @type {string}
   */
  focus: string;
}

/**
 * Label
 */
export interface SunburstLabel {
  /**
   * Show
   *
   * @type {boolean}
   */
  show: boolean;

  /**
   * Rotate
   *
   * @type {boolean}
   */
  rotate: string;
}

/**
 * Sunburst Tree Item
 */
export interface SunburstTreeItem {
  /**
   * Name
   *
   * @type {string}
   */
  name: string;

  /**
   * Children
   *
   *  @type {SunburstTreeItem[]}
   */
  children?: SunburstTreeItem[];

  /**
   * Value
   *
   *  @type {number}
   */
  value?: number;
}

/**
 * Sunburst Series Options
 */
export interface SunburstSeriesOptions {
  /**
   * Tree View Level Groups
   *
   * @type {Level[]}
   */
  groups: Level[];

  /**
   * Sort
   *
   *  @type {string}
   */
  sort?: string;

  /**
   * Radius
   *
   *  @type {Array<number | string>}
   */
  radius?: Array<number | string>;

  /**
   * Inner Radius
   *
   *  @type { string}
   */
  innerRadius: string;

  /**
   * Outer Radius
   *
   *  @type { string}
   */
  outerRadius: string;

  /**
   * Emphasis
   *
   *  @type { SunburstEmphasis}
   */
  emphasis: SunburstEmphasis;

  /**
   * Label
   *
   *  @type { SunburstLabel}
   */
  label: SunburstLabel;

  /**
   * Level value
   *
   *  @type {string}
   */
  levelValue: string;
}

import { EChartOption } from 'echarts';

/**
 * Scatter Series Options
 */
export interface ScatterSeriesOptions extends EChartOption.SeriesScatter {
  /**
   * Encode
   */
  encode: {
    /**
     * Y
     *
     * @type {string[]}
     */
    y: string[];

    /**
     * X
     *
     * @type {string[]}
     */
    x: string[];

    /**
     * X
     *
     * @type {string[]}
     */
    tooltip: string[];
  };

  /**
   * Size field
   *
   * @type {string}
   */
  sizeField?: string;

  /**
   * Symbol
   *
   * @type {string}
   */
  symbol: string;
}

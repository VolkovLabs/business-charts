import { EChartOption } from 'echarts';

/**
 * Bar Series Options
 */
export interface BarSeriesOptions extends EChartOption.SeriesLine {
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
  };
}

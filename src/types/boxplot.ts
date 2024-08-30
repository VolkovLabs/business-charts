import { EChartOption } from 'echarts';

/**
 * Boxplot Series Options
 */
export interface BoxplotSeriesOptions extends EChartOption.SeriesLine {
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

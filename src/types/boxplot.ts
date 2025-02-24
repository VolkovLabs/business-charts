import { BoxplotSeriesOption } from 'echarts';

import { SeriesType } from './visual-editor';

/**
 * Boxplot Series Options
 */
export interface BoxplotSeriesOptions extends BoxplotSeriesOption {
  /**
   * Type
   * type?: string in BoxplotSeriesOption not working as expected with SeriesByType
   */
  type: SeriesType.BOXPLOT;

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

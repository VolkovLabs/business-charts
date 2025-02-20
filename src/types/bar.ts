import { BarSeriesOption } from 'echarts';

import { SeriesType } from './visual-editor';

/**
 * Bar Series Options
 */
export interface BarSeriesOptions extends BarSeriesOption {
  /**
   * Type
   * type?: string in BarSeriesOption not working as expected with SeriesByType
   */
  type: SeriesType.BAR;

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

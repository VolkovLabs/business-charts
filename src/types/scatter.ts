import { ScatterSeriesOption } from 'echarts';

import { SeriesType } from './visual-editor';

/**
 * Scatter Series Options
 */
export interface ScatterSeriesOptions extends ScatterSeriesOption {
  /**
   * Type
   * type?: string in ScatterSeriesOption not working as expected with SeriesByType
   */
  type: SeriesType.SCATTER;

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

  /**
   * Symbol size
   *
   */
  symbolSize?: (value: number[]) => number;
}

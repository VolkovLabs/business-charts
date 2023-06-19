import { EChartOption, EChartsOptionConfig } from 'echarts';
import { Format } from '../constants';

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

  /**
   * Format
   *
   * @type {Format}
   */
  format: Format;
}

/**
 * Code Result V2
 */
export type CodeResultV2 = {
  /**
   * Version
   */
  version: 2;

  /**
   * Option
   *
   * @type {EChartOption}
   */
  option?: EChartOption;

  /**
   * Option Config
   *
   * @type {EChartsOptionConfig}
   */
  config?: EChartsOptionConfig;

  /**
   * Unsubscribe Function
   */
  unsubscribe?: unknown;
};

/**
 * Code Execution Result
 */
export type CodeResult = undefined | EChartOption | CodeResultV2;

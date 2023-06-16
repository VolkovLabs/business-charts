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
 * Code Execution Result
 */
export type CodeResult =
  | undefined
  | EChartOption
  | {
      resultVersion: 2;
      option?: EChartOption;
      optionConfig?: EChartsOptionConfig;
      unsubscribeFunction?: unknown;
    };

import { EChartsOption, SetOptionOpts } from 'echarts';

import { Format } from '../constants';

/**
 * Editor Options
 */
export interface EditorOptions {
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
   * @type {EChartsOption}
   */
  option?: EChartsOption;

  /**
   * Option Config
   *
   * @type {SetOptionOpts}
   */
  config?: SetOptionOpts;

  /**
   * Unsubscribe Function
   */
  unsubscribe?: unknown;
};

/**
 * Code Execution Result
 */
export type CodeResult = undefined | EChartsOption | CodeResultV2;

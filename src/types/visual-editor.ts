import { LineSeriesOption } from 'echarts';

import { BarSeriesOptions } from './bar';
import { BoxplotSeriesOptions } from './boxplot';
import { RadarConfigOptions, RadarSeriesOptions } from './radar';
import { ScatterSeriesOptions } from './scatter';
import { SunburstSeriesOptions } from './sunburst';

/**
 * Dataset Item
 */
export interface DatasetItem {
  /**
   * Name
   *
   * @type {string}
   */
  name: string;

  /**
   * Source
   *
   * @type {string}
   */
  source: string;
}

/**
 * Series Type
 */
export enum SeriesType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  SCATTER = 'scatter',
  EFFECTSCATTER = 'effectScatter',
  RADAR = 'radar',
  TREE = 'tree',
  TREEMAP = 'treemap',
  SUNBURST = 'sunburst',
  BOXPLOT = 'boxplot',
  CANDLESTICK = 'candlestick',
  HEATMAP = 'heatmap',
  MAP = 'map',
  PARALLEL = 'parallel',
  LINES = 'lines',
  GRAPH = 'graph',
  SANKEY = 'sankey',
  FUNNEL = 'funnel',
  GAUGE = 'gauge',
  PICTORIALBAR = 'pictorialBar',
  THEMERIVER = 'themeRiver',
  CUSTOM = 'custom',
}

/**
 * Base Series Options
 */
export interface BaseSeriesOptions {
  /**
   * ID
   *
   * @type {string}
   */
  id: string;

  /**
   * UID
   *
   * @type {string}
   */
  uid: string;

  /**
   * Name
   *
   * @type {name}
   */
  name: string;
}

/**
 * Line Series Options
 */
export interface LineSeriesOptions extends LineSeriesOption {
  /**
   * Type
   * type?: string in LineSeriousOption not working as expected with SeriesByType
   */
  type: SeriesType.LINE;

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

/**
 * Series Item
 */
export type SeriesItem = BaseSeriesOptions &
  (
    | ({ type: SeriesType.LINE } & LineSeriesOptions)
    | ({ type: SeriesType.BAR } & BarSeriesOptions)
    | { type: SeriesType.LINES }
    | ({ type: SeriesType.BOXPLOT } & BoxplotSeriesOptions)
    | { type: SeriesType.MAP }
    | { type: SeriesType.CUSTOM }
    | { type: SeriesType.HEATMAP }
    | { type: SeriesType.GRAPH }
    | { type: SeriesType.GAUGE }
    | { type: SeriesType.PIE }
    | ({ type: SeriesType.SCATTER } & ScatterSeriesOptions)
    | { type: SeriesType.EFFECTSCATTER }
    | ({ type: SeriesType.RADAR } & RadarSeriesOptions)
    | { type: SeriesType.TREE }
    | { type: SeriesType.TREEMAP }
    | ({ type: SeriesType.SUNBURST } & SunburstSeriesOptions)
    | { type: SeriesType.CANDLESTICK }
    | { type: SeriesType.PARALLEL }
    | { type: SeriesType.SANKEY }
    | { type: SeriesType.FUNNEL }
    | { type: SeriesType.PICTORIALBAR }
    | { type: SeriesType.THEMERIVER }
  );

/**
 * Visual Editor Options
 */
export interface VisualEditorOptions {
  /**
   * Dataset
   *
   * @type {DatasetItem[]}
   */
  dataset: DatasetItem[];

  /**
   * Series
   *
   * @type {SeriesItem[]}
   */
  series: SeriesItem[];

  /**
   * Code
   *
   * @type {string}
   */
  code: string;

  /**
   * Radar options
   *
   * @type {RadarConfigOptions}
   */
  radar?: RadarConfigOptions;
}

/**
 * Series By Type
 */
export type SeriesByType<TSeries, TType> = Extract<TSeries, { type: TType }>;

import { EChartOption } from 'echarts';

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
 * Series Item
 */
export type SeriesItem = { id: string } & EChartOption.Series;

/**
 * Visual Editor Options
 */
export interface VisualEditorOptions {
  dataset: DatasetItem[];
  series: SeriesItem[];
}

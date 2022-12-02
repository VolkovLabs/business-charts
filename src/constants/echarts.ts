/**
 * Renderer
 */
export enum Renderer {
  CANVAS = 'canvas',
  SVG = 'svg',
}

/**
 * Renderer Options
 */
export const RendererOptions = [
  { value: Renderer.CANVAS, label: 'Canvas' },
  { value: Renderer.SVG, label: 'SVG' },
];

/**
 * ECharts Map
 */
export enum Map {
  DEFAULT = 'json',
  BMAP = 'bmap',
  AMAP = 'amap',
}

/**
 * Echarts Map Options
 */
export const MapOptions = [
  { value: Map.DEFAULT, label: 'JSON' },
  { value: Map.BMAP, label: 'Baidu' },
  { value: Map.AMAP, label: 'Gaode' },
];

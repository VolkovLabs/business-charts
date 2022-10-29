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
 * Echarts Map
 */
 export enum Map {
  DEFAULT = 'none',
  BMAP = 'bmap',
}

/**
 * Echarts Map Options
 */
 export const MapOptions = [
  { value: Map.DEFAULT, label: 'None' },
  { value: Map.BMAP, label: 'Bmap' },
];

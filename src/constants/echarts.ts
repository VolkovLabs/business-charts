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

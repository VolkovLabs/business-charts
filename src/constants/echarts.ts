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
  { value: Renderer.CANVAS, label: 'Canvas', description: 'More suitable for charts with a large number of elements.' },
  { value: Renderer.SVG, label: 'SVG', description: 'Has less memory usage, no blur when using the browser zoom.' },
];

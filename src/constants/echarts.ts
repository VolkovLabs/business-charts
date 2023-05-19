/**
 * Renderer
 */
export enum Renderer {
  CANVAS = 'canvas',
  SVG = 'svg',
}

/**
 * Theme
 */
export enum Theme {
  DEFAULT = 'default',
  CUSTOM = 'custom',
}

/**
 * Theme options
 */
export const ThemeOptions = [
  { value: Theme.DEFAULT, label: 'Default', description: 'Default ECharts theme' },
  { value: Theme.CUSTOM, label: 'Custom', description: 'Ability to use custom ECharts theme' },
];

/**
 * Renderer Options
 */
export const RendererOptions = [
  { value: Renderer.CANVAS, label: 'Canvas', description: 'More suitable for charts with a large number of elements.' },
  { value: Renderer.SVG, label: 'SVG', description: 'Has less memory usage, no blur when using the browser zoom.' },
];

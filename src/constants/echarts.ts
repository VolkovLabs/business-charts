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
  CUSTOM = 'custom',
  DEFAULT = 'default',
}

/**
 * Theme options
 */
export const THEME_OPTIONS = [
  { value: Theme.DEFAULT, label: 'Default', description: 'Default ECharts theme', icon: 'star' },
  {
    value: Theme.CUSTOM,
    label: 'Custom',
    description: 'Ability to use custom ECharts theme',
    icon: 'presentation-play',
  },
];

/**
 * Renderer Options
 */
export const RENDERER_OPTIONS = [
  {
    value: Renderer.CANVAS,
    label: 'Canvas',
    description: 'More suitable for charts with a large number of elements.',
    icon: 'gf-landscape',
  },
  {
    value: Renderer.SVG,
    label: 'SVG',
    description: 'Has less memory usage, no blur when using the browser zoom.',
    icon: 'gf-grid',
  },
];

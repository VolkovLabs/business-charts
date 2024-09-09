/**
 * Symbol Options
 */
export enum SymbolOptions {
  CIRCLE = 'circle',
  RECT = 'rect',
  ROUNDRECT = 'roundRect',
  TRIANGLE = 'triangle',
  DIAMOND = 'diamond',
  PIN = 'pin',
  NONE = 'none',
}

/**
 * Scatter symbol options Options
 */
export const SCATTER_SYMBOL_OPTIONS = [
  {
    value: SymbolOptions.CIRCLE,
    label: 'Circle',
  },
  {
    value: SymbolOptions.RECT,
    label: 'Rectangle',
  },
  {
    value: SymbolOptions.ROUNDRECT,
    label: 'Round Rectangle',
  },
  {
    value: SymbolOptions.TRIANGLE,
    label: 'Triangle',
  },
  {
    value: SymbolOptions.DIAMOND,
    label: 'Diamond',
  },
  {
    value: SymbolOptions.PIN,
    label: 'Pin',
  },
  {
    value: SymbolOptions.NONE,
    label: 'None',
  },
];

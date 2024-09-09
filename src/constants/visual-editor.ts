import { SeriesType } from '../types';

const UNSUPPORTED_TYPES = [
  'pie',
  'effectScatter',
  'tree',
  'treemap',
  'candlestick',
  'heatmap',
  'map',
  'parallel',
  'lines',
  'graph',
  'sankey',
  'funnel',
  'gauge',
  'pictorialBar',
  'themeRiver',
  'custom',
];

export const SERIES_TYPE_OPTIONS = Object.values(SeriesType)
  .sort()
  .map((type) => {
    if (UNSUPPORTED_TYPES.includes(type)) {
      return {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        value: type,
        isDisabled: true,
        description: 'In development',
      };
    }
    return {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
    };
  });

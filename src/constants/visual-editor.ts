import { SeriesType } from '../types';

export const SERIES_TYPE_OPTIONS = Object.values(SeriesType).map((type) => ({
  label: type.charAt(0).toUpperCase() + type.slice(1),
  value: type,
}));

import { SeriesType } from '../types';

export const SeriesTypeOptions = Object.values(SeriesType).map((type) => ({
  label: type.charAt(0).toUpperCase() + type.slice(1),
  value: type,
}));

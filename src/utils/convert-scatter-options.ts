import { DatasetItem, SeriesByType, SeriesItem, SeriesType } from '../types';

/**
 * Convert Scatter Options
 * @param item
 * @param dataset
 */
export const convertScatterOptions = (item: SeriesByType<SeriesItem, SeriesType.SCATTER>, dataset: DatasetItem[]) => {
  if (item.sizeField) {
    /**
     * Split field string
     */
    const currentField = item.sizeField.split(':');

    /**
     * Get position for size field in data set array
     */
    const sizeIndex = Object.values(dataset).findIndex(
      (item) => item.name === currentField[1] && item.source === currentField[0]
    );

    if (sizeIndex !== -1) {
      return {
        ...item,
        /**
         * Return for symbolSize value from field by position
         */
        symbolSize: (value: number[]) => {
          return value[sizeIndex];
        },
      };
    }
  }
  return item;
};

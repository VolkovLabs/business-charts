import { DataFrame } from '@grafana/data';

import { Level, SeriesByType, SeriesItem, SeriesType, SunburstTreeItem } from '../types';

/**
 * Group Items by Field
 * @param items
 * @param fieldKey
 */
export const groupBy = (items: object[] | undefined, fieldKey: string): Map<string, object[]> => {
  return (
    items?.reduce((acc: Map<string, object[]>, item) => {
      const key = item[fieldKey as keyof typeof item];
      const existItems = acc.get(key);
      acc.set(key, existItems ? existItems.concat(item) : [item]);
      return acc;
    }, new Map()) || new Map()
  );
};

/**
 * Recursively Group items
 * @param items
 * @param fieldKeys
 */
export const getGroupArray = (items: object[], fieldKeys: string[], level: number): SunburstTreeItem[] => {
  const currentKey = fieldKeys[0];

  if (fieldKeys.length === 1) {
    return Array.from(groupBy(items, currentKey), ([key]) => {
      return {
        name: key,
        value: level,
      };
    }).filter((element) => !!element.name);
  }

  return Array.from(groupBy(items, currentKey), ([key, groupItems]) => {
    const children = getGroupArray(groupItems, fieldKeys.slice(1), level);

    const item: SunburstTreeItem = {
      name: key,
    };
    if (children.length) {
      item.children = children;
    }

    if (!children.length) {
      item.value = level;
    }
    return item;
  }).filter((element) => !!element.name);
};

/**
 * Convert Data Frame to objects array
 * @param dataFrame
 */
export const convertToObjects = (dataFrame: DataFrame) => {
  const result = [];
  for (let index = 0; index < dataFrame.length; index += 1) {
    const object = dataFrame.fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.name]: field.values[index],
      };
    }, {});

    result.push(object);
  }

  return result;
};

/**
 * Build tree
 * @param series
 * @param groups
 * @param levelValue
 */
export const buildTree = (series: DataFrame[], groups: Level[], levelValue: string) => {
  /**
   * Data frame as array of objects
   */
  const objects = convertToObjects(series[0]);
  const level = levelValue ? (isNaN(Number(levelValue)) ? 1 : Number(levelValue)) : 1;
  const treeView = getGroupArray(
    objects,
    groups.map(({ name }: { name: string }) => name),
    level
  );

  return treeView;
};

/**
 * Sunburst Radius
 * @param innerRadius
 * @param outerRadius
 */
export const sunburstRadius = (innerRadius: string, outerRadius: string) => {
  const innerCurrentRadius = innerRadius ? (!/^\d*%?$/g.test(innerRadius) ? 0 : innerRadius) : 0;
  const outerCurrentRadius = outerRadius ? (!/^\d*%?$/g.test(outerRadius) ? '100%' : outerRadius) : '100%';

  return [innerCurrentRadius, outerCurrentRadius];
};

/**
 * Convert Sunburst Options
 * @param item
 * @param series
 */
export const convertSunburstOptions = (item: SeriesByType<SeriesItem, SeriesType.SUNBURST>, series: DataFrame[]) => {
  const tree = buildTree(series, item.groups, item.levelValue);
  return {
    ...item,
    radius: sunburstRadius(item.innerRadius, item.outerRadius),
    data: tree,
  };
};

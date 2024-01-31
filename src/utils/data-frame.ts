import { Field } from '@grafana/data';

/**
 * Get Field Values
 * @param field
 */
export const getFieldValues = (field?: Field): unknown[] => {
  // eslint-disable-next-line deprecation/deprecation
  return field?.values.toArray() || [];
};

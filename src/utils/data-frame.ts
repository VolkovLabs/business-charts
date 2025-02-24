import { Field } from '@grafana/data';

/**
 * Get Field Values
 * @param field
 */
export const getFieldValues = (field?: Field): unknown[] => {
  return field?.values || [];
};

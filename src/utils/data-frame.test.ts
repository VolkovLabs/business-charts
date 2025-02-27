import { Field } from '@grafana/data';

import { getFieldValues } from './data-frame';

describe('Frame utils', () => {
  describe('getFieldValues', () => {
    it('Should return field values when field is defined', () => {
      const mockField = { values: [1, 2, 3] } as Field;
      expect(getFieldValues(mockField)).toEqual([1, 2, 3]);
    });

    it('Should return an empty array when field is undefined', () => {
      expect(getFieldValues(undefined)).toEqual([]);
    });
  });
});

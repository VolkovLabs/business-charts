import { toDataFrame } from '@grafana/data';

import { getDatasetSource } from './visual-editor';

describe('Visual Editor Utils', () => {
  describe('getDatasetSource', () => {
    it('Should convert to dataset', () => {
      expect(
        getDatasetSource(
          [
            toDataFrame({
              fields: [
                {
                  name: 'Time',
                  values: [1, 2, 3],
                },
                {
                  name: 'Value',
                  values: [10, 20, 30],
                },
              ],
            }),
          ],
          [
            { name: 'Time', source: '' },
            { name: 'Value', source: '' },
          ]
        )
      ).toEqual([
        ['Time', 'Value'],
        [1, 10],
        [2, 20],
        [3, 30],
      ]);
    });

    it('Should set null values in row if no field value', () => {
      expect(
        getDatasetSource(
          [
            toDataFrame({
              fields: [
                {
                  name: 'Time',
                  values: [1, 2, 3],
                },
                {
                  name: 'Value',
                  values: [10, 20, 30],
                },
                {
                  name: 'Signal',
                  values: ['signal1'],
                },
              ],
            }),
          ],
          [
            { name: 'Time', source: '' },
            { name: 'Signal', source: '' },
            { name: 'Value', source: '' },
          ]
        )
      ).toEqual([
        ['Time', 'Signal', 'Value'],
        [1, 'signal1', 10],
        [2, null, 20],
        [3, null, 30],
      ]);
    });

    it('Should work for different frames with the same field names', () => {
      expect(
        getDatasetSource(
          [
            toDataFrame({
              refId: 'A',
              fields: [
                {
                  name: 'Value',
                  values: [10, 20, 30],
                },
              ],
            }),
            toDataFrame({
              refId: 'B',
              fields: [
                {
                  name: 'Value',
                  values: [-10, -20, -30],
                },
              ],
            }),
          ],
          [
            { name: 'Value', source: 'A' },
            { name: 'Value', source: 'B' },
          ]
        )
      ).toEqual([
        ['A:Value', 'B:Value'],
        [10, -10],
        [20, -20],
        [30, -30],
      ]);
    });
  });
});

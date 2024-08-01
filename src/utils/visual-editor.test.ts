import { FieldType, toDataFrame } from '@grafana/data';

import { SeriesType } from '../types';
import {
  convertSeriesToChartOption,
  getDatasetSource,
  getFieldBasedOptionValue,
  getRadarOptions,
  getSeriesWithNewType,
  multipleQueriesFields,
} from './visual-editor';

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

  /**
   * Get Series With a new type
   */
  describe('getSeriesWithNewType', () => {
    it('Should return a line series', () => {
      const item = { id: 1, name: 'Line Series', uid: 'line-1' } as any;
      const newType = SeriesType.LINE;
      const result = getSeriesWithNewType(item, newType);

      expect(result).toEqual({
        id: 1,
        name: 'Line Series',
        uid: 'line-1',
        type: SeriesType.LINE,
        encode: {
          x: [],
          y: [],
        },
      });
    });

    it('Should return a radar series', () => {
      const item = { id: 2, name: 'Radar Series', uid: 'radar-2' } as any;
      const newType = SeriesType.RADAR;
      const result = getSeriesWithNewType(item, newType);

      expect(result).toEqual({
        id: 2,
        name: 'Radar Series',
        uid: 'radar-2',
        type: SeriesType.RADAR,
        data: [],
        radarDimensions: [],
      });
    });

    it('Should return a series with a custom type (default)', () => {
      const item = { id: 3, name: 'Custom Series', uid: 'custom-3' } as any;
      const newType = 'custom' as SeriesType;
      const result = getSeriesWithNewType(item, newType);

      expect(result).toEqual({
        id: 3,
        name: 'Custom Series',
        uid: 'custom-3',
        type: 'custom',
      });
    });
  });

  /**
   * Convert Series to chart Options
   */
  describe('convertSeriesToChartOption', () => {
    it('Should convert a radar series to chart option', () => {
      const item = {
        data: [],
        id: 'RadarSeries',
        uid: 'radar-set',
        name: 'Radar Series',
        type: SeriesType.RADAR,
        radarDimensions: [
          { name: 'Dimension 1', value: 'A:Value', uid: 'value-1' },
          { name: 'Dimension 2', value: 'A:Value2', uid: 'value-2' },
        ],
      } as any;

      const series = [
        {
          refId: 'A',
          fields: [
            { name: 'Value', type: FieldType.number, values: [10, 20, 30] },
            { name: 'Value', type: FieldType.string, values: ['10x', '20x', '30x'] },
            { name: 'Value2', type: FieldType.number, values: [40, 50, 60] },
          ],
        },
        {
          refId: 'B',
          fields: [
            { name: 'Value', type: FieldType.number, values: [70, 80, 90] },
            { name: 'Value2', type: FieldType.number, values: [100, 110, 120] },
          ],
        },
      ] as any;

      const result = convertSeriesToChartOption(item, series);

      expect(result).toEqual({
        id: 'RadarSeries',
        name: 'Radar Series',
        type: SeriesType.RADAR,
        uid: 'radar-set',
        radarDimensions: [
          { name: 'Dimension 1', value: 'A:Value', uid: 'value-1' },
          { name: 'Dimension 2', value: 'A:Value2', uid: 'value-2' },
        ],
        data: [
          { name: 'Dimension 1', value: [10, 20, 30] },
          { name: 'Dimension 2', value: [40, 50, 60] },
        ],
      });
    });

    it('Should convert a radar series to chart option with empty values if no appropriate fields ', () => {
      const item = {
        data: [],
        id: 'RadarSeries',
        uid: 'radar-set',
        name: 'Radar Series',
        type: SeriesType.RADAR,
        radarDimensions: [
          { name: 'Dimension 1', value: 'A:Value', uid: 'value-1' },
          { name: 'Dimension 2', value: 'A:Value2', uid: 'value-2' },
        ],
      } as any;

      const series = [
        {
          refId: 'A',
          fields: [
            { name: 'Value-1', type: FieldType.number, values: [10, 20, 30] },
            { name: 'Value-2', type: FieldType.string, values: ['10x', '20x', '30x'] },
            { name: 'Value-3', type: FieldType.number, values: [40, 50, 60] },
          ],
        },
        {
          refId: 'B',
          fields: [
            { name: 'Value-1', type: FieldType.number, values: [70, 80, 90] },
            { name: 'Value-2', type: FieldType.number, values: [100, 110, 120] },
          ],
        },
      ] as any;

      const result = convertSeriesToChartOption(item, series);

      expect(result).toEqual({
        id: 'RadarSeries',
        name: 'Radar Series',
        type: SeriesType.RADAR,
        uid: 'radar-set',
        radarDimensions: [
          { name: 'Dimension 1', value: 'A:Value', uid: 'value-1' },
          { name: 'Dimension 2', value: 'A:Value2', uid: 'value-2' },
        ],
        data: [
          { name: 'Dimension 1', value: [] },
          { name: 'Dimension 2', value: [] },
        ],
      });
    });
  });

  /**
   * Get Field
   */
  describe('getFieldBasedOptionValue', () => {
    it('Should return the field value when field is found', () => {
      const series = [
        { refId: 'A', fields: [{ name: 'field1', type: 'number', values: [1, 2, 3] }] },
        { refId: 'B', fields: [{ name: 'field2', type: 'string', values: ['a', 'b', 'c'] }] },
      ] as any;

      const fieldValue = getFieldBasedOptionValue<number>('A:field1', series);
      expect(fieldValue).toEqual({ name: 'field1', type: 'number', values: [1, 2, 3] });
    });

    it('Should return undefined when field is not found', () => {
      const series = [
        { refId: 'A', fields: [{ name: 'field1', type: 'number', values: [1, 2, 3] }] },
        { refId: 'B', fields: [{ name: 'field2', type: 'string', values: ['a', 'b', 'c'] }] },
      ] as any;

      const fieldValue = getFieldBasedOptionValue<string>('A:field3', series);
      expect(fieldValue).toBeUndefined();
    });

    it('Should return undefined when frame is not found', () => {
      const series = [
        { refId: 'A', fields: [{ name: 'field1', type: 'number', values: [1, 2, 3] }] },
        { refId: 'B', fields: [{ name: 'field2', type: 'string', values: ['a', 'b', 'c'] }] },
      ] as any;

      const fieldValue = getFieldBasedOptionValue<number>('C:field1', series);
      expect(fieldValue).toBeUndefined();
    });
  });

  /**
   * Radar options
   */
  describe('getRadarOptions', () => {
    const editor = {
      code: 'console.log()',
      radar: {
        indicator: 'A:Category',
        radius: 0,
        shape: 'circle',
      },
      series: [
        {
          type: SeriesType.RADAR,
          radarDimensions: [
            {
              name: 'dimension 1',
              value: 'A:Value',
            },
            {
              name: 'dimension 2',
              value: 'A:Value2',
            },
          ],
        },
      ],
    } as any;

    const series = [
      {
        fields: [
          {
            name: 'Category',
            type: FieldType.string,
            values: ['Test', 'Test 1', 'Test 2'],
          },
          {
            name: 'Value',
            type: FieldType.number,
            state: {
              range: {
                min: 10,
                max: 250,
              },
            },
            values: [10, 50, 250],
          },
          {
            state: {
              range: {
                min: 15,
                max: 350,
              },
            },
            name: 'Value2',
            type: FieldType.number,
            values: [15, 75, 350],
          },
        ],
        name: 'Test',
        refId: 'A',
      },
    ] as any;

    it('Should get radar options', () => {
      const result = getRadarOptions(editor, series);

      expect(result).toEqual({
        indicator: [
          { max: 350, min: 10, name: 'Test' },
          { max: 350, min: 10, name: 'Test 1' },
          { max: 350, min: 10, name: 'Test 2' },
        ],
        shape: 'circle',
      });
    });

    it('Should return radius', () => {
      const editor = {
        code: 'console.log()',
        radar: {
          indicator: 'A:Category',
          radius: 50,
          shape: 'circle',
        },
        series: [
          {
            type: SeriesType.RADAR,
            radarDimensions: [
              {
                name: 'dimension 1',
                value: 'A:Value',
              },
              {
                name: 'dimension 2',
                value: 'A:Value2',
              },
            ],
          },
        ],
      } as any;

      const result = getRadarOptions(editor, series);

      expect(result).toEqual({
        indicator: [
          { max: 350, min: 10, name: 'Test' },
          { max: 350, min: 10, name: 'Test 1' },
          { max: 350, min: 10, name: 'Test 2' },
        ],
        shape: 'circle',
        radius: 50,
      });
    });

    it('Should return empty indicator if field not found', () => {
      const editor = {
        code: 'console.log()',
        radar: {
          indicator: 'A:Category2',
          radius: '50%',
          shape: 'circle',
        },
        series: [
          {
            type: SeriesType.RADAR,
            radarDimensions: [
              {
                name: 'dimension 1',
                value: 'A:Value',
              },
              {
                name: 'dimension 2',
                value: 'A:Value2',
              },
            ],
          },
        ],
      } as any;

      const result = getRadarOptions(editor, series);

      expect(result).toEqual({
        indicator: [],
        shape: 'circle',
        radius: '50%',
      });
    });

    it('Should return 0 value for min max if value doesn`t have min or max', () => {
      const series = [
        {
          fields: [
            {
              name: 'Category',
              type: FieldType.string,
              values: ['Test', 'Test 1', 'Test 2'],
            },
            {
              name: 'Value',
              type: FieldType.number,
              state: {
                range: {
                  min: 0,
                  max: 0,
                },
              },
              values: [10, 50, 250],
            },
            {
              state: {
                range: {
                  min: 0,
                  max: 0,
                },
              },
              name: 'Value2',
              type: FieldType.number,
              values: [15, 75, 350],
            },
          ],
          name: 'Test',
          refId: 'A',
        },
      ] as any;

      const result = getRadarOptions(editor, series);

      expect(result).toEqual({
        indicator: [
          { max: 0, min: 0, name: 'Test' },
          { max: 0, min: 0, name: 'Test 1' },
          { max: 0, min: 0, name: 'Test 2' },
        ],
        shape: 'circle',
      });
    });
  });

  /**
   * multipleQueriesFields
   */
  describe('multipleQueriesFields', () => {
    it('Should return correct values and labels for fields with refId', () => {
      const data = [
        {
          refId: 'A',
          fields: [
            { name: 'field1', type: 'string' },
            { name: 'field2', type: 'number' },
          ],
        },
        {
          refId: 'B',
          fields: [{ name: 'field3', type: 'boolean' }],
        },
      ] as any;

      const result = multipleQueriesFields(data);

      expect(result).toEqual([
        {
          value: 'A:field1',
          label: 'A:field1',
          refId: 'A',
          field: 'field1',
        },
        {
          value: 'A:field2',
          label: 'A:field2',
          refId: 'A',
          field: 'field2',
        },
        {
          value: 'B:field3',
          label: 'B:field3',
          refId: 'B',
          field: 'field3',
        },
      ]);
    });

    it('Should return correct values and labels for fields without refId', () => {
      const data = [
        {
          fields: [
            { name: 'field1', type: 'string' },
            { name: 'field2', type: 'number' },
          ],
        },
      ] as any;

      const result = multipleQueriesFields(data);

      expect(result).toEqual([
        {
          value: 'field1',
          label: 'field1',
          refId: '',
          field: 'field1',
        },
        {
          value: 'field2',
          label: 'field2',
          refId: '',
          field: 'field2',
        },
      ]);
    });

    it('Should filter fields based on provided types', () => {
      const data = [
        {
          refId: 'A',
          fields: [
            { name: 'field1', type: FieldType.string },
            { name: 'field2', type: FieldType.number },
            { name: 'field3', type: FieldType.boolean },
          ],
        },
      ] as any;

      const result = multipleQueriesFields(data, [FieldType.string, FieldType.boolean]);

      expect(result).toEqual([
        {
          value: 'A:field1',
          label: 'A:field1',
          refId: 'A',
          field: 'field1',
        },
        {
          value: 'A:field3',
          label: 'A:field3',
          refId: 'A',
          field: 'field3',
        },
      ]);
    });
  });
});

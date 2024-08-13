import {
  buildTree,
  convertSunburstOptions,
  convertToObjects,
  getGroupArray,
  groupBy,
  sunburstRadius,
} from './convert-sunburst-options';

/**
 * Group By
 */
describe('groupBy', () => {
  it('Should group items by a given field', () => {
    const items = [
      { id: 1, type: 'a' },
      { id: 2, type: 'a' },
      { id: 3, type: 'b' },
    ];
    const result = groupBy(items, 'type');
    expect(result.size).toBe(2);
    expect(result.get('a')).toEqual([items[0], items[1]]);
    expect(result.get('b')).toEqual([items[2]]);
  });

  it('Should group items', () => {
    const items = undefined as any;
    const result = groupBy(items, 'type');
    expect(result.size).toBe(0);
  });
});

/**
 * convertToObjects
 */
describe('convertToObjects', () => {
  it('should convert a DataFrame to an array of objects', () => {
    const dataFrame = {
      fields: [
        { name: 'id', values: [1, 2, 3] },
        { name: 'type', values: ['a', 'b', 'a'] },
      ],
      length: 3,
    } as any;
    const result = convertToObjects(dataFrame);
    expect(result).toEqual([
      { id: 1, type: 'a' },
      { id: 2, type: 'b' },
      { id: 3, type: 'a' },
    ]);
  });
});

/**
 * Sunburst Radius
 */
describe('sunburstRadius', () => {
  it('Should handle various radius formats', () => {
    expect(sunburstRadius('50%', '90%')).toEqual(['50%', '90%']);
    expect(sunburstRadius('50', '90')).toEqual(['50', '90']);
    expect(sunburstRadius('', '')).toEqual([0, '100%']);
    expect(sunburstRadius('0', '')).toEqual(['0', '100%']);
    expect(sunburstRadius('asc', '')).toEqual([0, '100%']);
    expect(sunburstRadius('50', 'asc')).toEqual(['50', '100%']);
  });
});

/**
 * Convert Sunburst
 */
describe('convertSunburstOptions', () => {
  it('Should convert series options to sunburst options', () => {
    const series = [
      {
        fields: [
          { name: 'Level 0', values: ['l0-a', 'l0-a', 'l0-b'] },
          { name: 'Level 1', values: ['l1-x', 'l1-y', 'l2-x'] },
        ],
        length: 3,
      },
    ] as any;

    const item = {
      groups: [{ name: 'Level 0' }, { name: 'Level 1' }],
      levelValue: '1',
      innerRadius: '50%',
      outerRadius: '90%',
    } as any;

    const result = convertSunburstOptions(item, series);
    expect(result.radius).toEqual(['50%', '90%']);
    expect(result.data).toEqual([
      {
        name: 'l0-a',
        children: [
          { name: 'l1-x', value: 1 },
          { name: 'l1-y', value: 1 },
        ],
      },
      { name: 'l0-b', children: [{ name: 'l2-x', value: 1 }] },
    ]);
  });
});

/**
 * Get Group Array
 */
describe('getGroupArray', () => {
  it('Should recursively group items', () => {
    const items = [
      {
        'Level 0': 'Grandpa',
        'Level 1': 'Father',
        'Level 2': 'Brother',
        'Level 3': '',
        'Level 4': '',
      },
      {
        'Level 0': 'Grandpa',
        'Level 1': 'Father',
        'Level 2': 'Me',
        'Level 3': '',
        'Level 4': '',
      },
      {
        'Level 0': 'Grandpa',
        'Level 1': 'Uncle Leo',
        'Level 2': 'Cousin Mary',
        'Level 3': 'Jackson',
        'Level 4': 'Jackson son',
      },
      {
        'Level 0': 'Grandpa',
        'Level 1': 'Uncle Leo',
        'Level 2': 'Cousin Ben',
        'Level 3': '',
        'Level 4': '',
      },
      {
        'Level 0': 'Grandpa',
        'Level 1': 'Uncle Leo',
        'Level 2': 'Cousin Jack',
        'Level 3': '',
        'Level 4': '',
      },
      {
        'Level 0': 'Nancy',
        'Level 1': 'Uncle MIke',
        'Level 2': 'Cousin Jenny',
        'Level 3': '',
        'Level 4': '',
      },
      {
        'Level 0': 'Nancy',
        'Level 1': 'Uncle MIke',
        'Level 2': 'Cousin Betty',
        'Level 3': '',
        'Level 4': '',
      },
      {
        'Level 0': 'aTest',
        'Level 1': '',
        'Level 2': '',
        'Level 3': '',
        'Level 4': '',
      },
      {
        'Level 0': 'bTest',
        'Level 1': '',
        'Level 2': '',
        'Level 3': '',
        'Level 4': '',
      },
    ];

    const keys = ['Level 0', 'Level 1', 'Level 2'];
    const result = getGroupArray(items, keys, 1);
    expect(result).toEqual([
      {
        name: 'Grandpa',
        children: [
          {
            name: 'Father',
            children: [
              {
                name: 'Brother',
                value: 1,
              },
              {
                name: 'Me',
                value: 1,
              },
            ],
          },
          {
            name: 'Uncle Leo',
            children: [
              {
                name: 'Cousin Mary',
                value: 1,
              },
              {
                name: 'Cousin Ben',
                value: 1,
              },
              {
                name: 'Cousin Jack',
                value: 1,
              },
            ],
          },
        ],
      },
      {
        name: 'Nancy',
        children: [
          {
            name: 'Uncle MIke',
            children: [
              {
                name: 'Cousin Jenny',
                value: 1,
              },
              {
                name: 'Cousin Betty',
                value: 1,
              },
            ],
          },
        ],
      },
      {
        name: 'aTest',
        value: 1,
      },
      {
        name: 'bTest',
        value: 1,
      },
    ]);
  });
});

/**
 * Build tree
 */
describe('buildTree', () => {
  it('Should build a sunburst tree', () => {
    const level = undefined as any;
    const series = [
      {
        fields: [
          { name: 'type', values: ['a', 'a', 'b'] },
          { name: 'category', values: ['x', 'y', 'x'] },
        ],
        length: 3,
      },
    ] as any;
    const groups = [{ name: 'type' }, { name: 'category' }] as any;
    const result = buildTree(series, groups, level);
    expect(result).toEqual([
      {
        name: 'a',
        children: [
          { name: 'x', value: 1 },
          { name: 'y', value: 1 },
        ],
      },
      { name: 'b', children: [{ name: 'x', value: 1 }] },
    ]);
  });

  it('Should build a sunburst tree if level Nan', () => {
    const level = 'asc';
    const series = [
      {
        fields: [
          { name: 'type', values: ['a', 'a', 'b'] },
          { name: 'category', values: ['x', 'y', 'x'] },
        ],
        length: 3,
      },
    ] as any;
    const groups = [{ name: 'type' }, { name: 'category' }] as any;
    const result = buildTree(series, groups, level);
    expect(result).toEqual([
      {
        name: 'a',
        children: [
          { name: 'x', value: 1 },
          { name: 'y', value: 1 },
        ],
      },
      { name: 'b', children: [{ name: 'x', value: 1 }] },
    ]);
  });
});

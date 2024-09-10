import { convertScatterOptions } from './convert-scatter-options';

/**
 * Convert Scatter Options
 */
describe('Convert Scatter options', () => {
  const dataset = [
    { name: 'size1', source: 'source1' },
    { name: 'size2', source: 'source2' },
    { name: 'size3', source: 'source1' },
  ] as any;

  it('Should return the original item when sizeField is not defined', () => {
    const item = { type: 'scatter' } as any;
    const result = convertScatterOptions(item, dataset);
    expect(result).toEqual(item);
  });

  it('Should return the item with symbolSize function when sizeField is defined', () => {
    const item = {
      type: 'scatter',
      sizeField: 'source1:size1',
    } as any;

    const result = convertScatterOptions(item, dataset);

    expect(result).toHaveProperty('symbolSize');
    expect(typeof result.symbolSize).toBe('function');
  });

  it('should return the correct size for symbolSize function', () => {
    const item = {
      type: 'scatter',
      sizeField: 'source1:size1',
    } as any;

    const result = convertScatterOptions(item, dataset);

    const { symbolSize } = result;
    if (symbolSize && typeof result.symbolSize === 'function') {
      const datasetValues = [10, 20, 30] as any;
      const sizeValue = result.symbolSize(datasetValues);
      expect(sizeValue).toBe(10);
    }
  });
});

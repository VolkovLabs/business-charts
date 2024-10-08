import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import {
  SUNBURST_DEFAULT,
  SunburstEmphasisFocusOption,
  SunburstLabelRotate,
  SunburstSortOption,
  TEST_IDS,
} from '../../constants';
import { SeriesType } from '../../types';
import { SeriesEditor } from './SeriesEditor';

/**
 * Properties
 */
type Props = React.ComponentProps<typeof SeriesEditor>;

/**
 * Series Editor
 */
describe('Series Editor', () => {
  /**
   * Create On Change Handler
   */
  const createOnChangeHandler = (initialValue: any) => {
    let value = initialValue;
    return {
      value,
      onChange: jest.fn((newValue) => {
        value = newValue;
      }),
    };
  };

  /**
   * Dataset
   */
  const dataset = [
    {
      name: 'Value',
      source: 'A',
    },
    {
      name: 'Time',
      source: 'A',
    },
  ];

  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(TEST_IDS.seriesEditor);
  const selectors = getSelectors(screen);

  /**
   * Get Tested Component
   */
  const getComponent = (props: Partial<Props>) => {
    return <SeriesEditor dataset={dataset} value={[]} {...(props as any)} />;
  };

  /**
   * Open Item
   * @param id
   */
  const openItem = (id: string): ReturnType<typeof getSelectors> => {
    /**
     * Check item presence
     */
    expect(selectors.itemHeader(false, id)).toBeInTheDocument();

    /**
     * Make Item is opened
     */
    fireEvent.click(selectors.itemHeader(false, id));

    /**
     * Check if item content exists
     */
    const elementContent = selectors.itemContent(false, id);
    expect(elementContent).toBeInTheDocument();

    /**
     * Return selectors for opened item
     */
    return getSelectors(within(elementContent));
  };

  it('Should render component', () => {
    render(getComponent({}));

    expect(selectors.root()).toBeInTheDocument();
  });

  it('Should render items', () => {
    render(
      getComponent({
        value: [
          {
            uid: 'line',
            id: 'line',
            name: 'Line',
            type: SeriesType.LINE,
            encode: {
              x: ['A:Time'],
              y: ['A:Value'],
            },
          },
          {
            uid: 'line2',
            id: 'line2',
            name: 'Line 2',
            type: SeriesType.LINE,
            encode: {
              x: ['A:Time'],
              y: ['A:Value'],
            },
          },
        ],
      })
    );

    expect(selectors.root()).toBeInTheDocument();
    expect(selectors.itemHeader(false, 'line')).toBeInTheDocument();
    expect(selectors.itemHeader(false, 'line2')).toBeInTheDocument();
  });

  it('Should remove item', () => {
    const { value, onChange } = createOnChangeHandler([
      {
        uid: 'line',
        id: 'line',
        name: 'Line',
        type: SeriesType.LINE,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      },
    ]);

    const { rerender } = render(
      getComponent({
        value,
        onChange,
      })
    );

    expect(selectors.root()).toBeInTheDocument();
    const item = selectors.itemHeader(false, 'line');

    fireEvent.click(getSelectors(within(item)).buttonRemove());

    rerender(
      getComponent({
        value,
        onChange,
      })
    );

    expect(selectors.itemHeader(true, 'line')).not.toBeInTheDocument();
  });

  describe('Add new item', () => {
    it('Should add new item', async () => {
      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      await act(async () => fireEvent.change(selectors.newItemId(), { target: { value: 'line2' } }));

      expect(selectors.buttonAddNew()).not.toBeDisabled();

      await act(async () => {
        fireEvent.click(selectors.buttonAddNew());
      });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(selectors.itemHeader(false, 'line2')).toBeInTheDocument();

      /**
       * Should clean new item id field
       */
      expect(selectors.newItemId()).toHaveValue('');
    });

    it('Should not allow add item with the same id', async () => {
      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      render(
        getComponent({
          value,
          onChange,
        })
      );

      await act(async () => fireEvent.change(selectors.newItemId(), { target: { value: 'line' } }));

      expect(selectors.buttonAddNew()).toBeDisabled();
    });
  });

  /**
   * Items order
   */
  describe('Items order', () => {
    it('Should reorder items', async () => {
      let onDragEndHandler: (result: DropResult) => void = () => null;
      jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
        onDragEndHandler = onDragEnd;
        return children;
      });

      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
        {
          uid: 'line2',
          id: 'line2',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      const { rerender } = render(getComponent({ value, onChange }));

      /**
       * Simulate drop element 1 to index 0
       */
      await act(async () =>
        onDragEndHandler({
          destination: {
            index: 0,
          },
          source: {
            index: 1,
          },
        } as any)
      );

      rerender(getComponent({ value, onChange }));

      /**
       * Check if items order is changed
       */
      const items = screen.getAllByTestId('draggable');
      expect(getSelectors(within(items[0])).itemHeader(false, 'line2')).toBeInTheDocument();
      expect(getSelectors(within(items[1])).itemHeader(false, 'line')).toBeInTheDocument();
    });

    it('Should not reorder items if drop outside the list', async () => {
      let onDragEndHandler: (result: DropResult) => void = () => null;
      jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
        onDragEndHandler = onDragEnd;
        return children;
      });

      const { value, onChange } = createOnChangeHandler([
        {
          uid: 'line',
          id: 'line',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
        {
          uid: 'line2',
          id: 'line2',
          name: 'Line',
          type: SeriesType.LINE,
          encode: {
            x: ['A:Time'],
            y: ['A:Value'],
          },
        },
      ]);

      render(getComponent({ value, onChange }));

      /**
       * Simulate drop element 1 to index 0
       */
      await act(async () =>
        onDragEndHandler({
          destination: null,
          source: {
            index: 1,
          },
        } as any)
      );

      /**
       * Check if items order is not changed
       */
      const items = screen.getAllByTestId('draggable');
      expect(getSelectors(within(items[0])).itemHeader(false, 'line')).toBeInTheDocument();
      expect(getSelectors(within(items[1])).itemHeader(false, 'line2')).toBeInTheDocument();
    });
  });

  describe('Item updates', () => {
    const lineItem = {
      uid: 'line',
      id: 'line',
      name: 'Line',
      type: SeriesType.LINE,
      encode: {
        x: ['A:Time'],
        y: ['A:Value'],
      },
    };
    const items = [
      lineItem,
      {
        uid: 'other',
        id: 'other',
        name: 'Other',
      },
    ];

    it('Should update id', () => {
      const { value, onChange } = createOnChangeHandler(items);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      const item = openItem(lineItem.id);

      fireEvent.change(item.fieldId(), { target: { value: 'line123' } });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(selectors.itemHeader(false, 'line123')).toBeInTheDocument();
    });

    it('Should update type', () => {
      const { value, onChange } = createOnChangeHandler(items);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      const item = openItem(lineItem.id);

      fireEvent.change(item.fieldType(), { target: { value: SeriesType.PIE } });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(item.fieldType()).toHaveValue(SeriesType.PIE);
    });

    it('Should update name', () => {
      const { value, onChange } = createOnChangeHandler(items);

      const { rerender } = render(
        getComponent({
          value,
          onChange,
        })
      );

      const item = openItem(lineItem.id);

      fireEvent.change(item.fieldName(), { target: { value: '123' } });

      rerender(
        getComponent({
          value,
          onChange,
        })
      );

      expect(item.fieldName()).toHaveValue('123');
    });

    describe('Line', () => {
      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(lineItem.id);

        fireEvent.change(item.fieldEncodeY(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.fieldEncodeY()).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(lineItem.id);

        fireEvent.change(item.fieldEncodeX(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.fieldEncodeX()).toHaveValue(['A:Value']);
      });
    });

    describe('Bar', () => {
      const barItem = {
        uid: 'bar',
        id: 'bar',
        name: 'BAR',
        type: SeriesType.BAR,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      };
      const items = [
        barItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(barItem.id);

        fireEvent.change(item.fieldEncodeY(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.fieldEncodeY()).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(barItem.id);

        fireEvent.change(item.fieldEncodeX(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.fieldEncodeX()).toHaveValue(['A:Value']);
      });
    });

    describe('Boxplot', () => {
      const boxplot = {
        uid: 'box-1',
        id: 'box-1',
        name: 'box-1-1',
        type: SeriesType.BOXPLOT,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      };
      const items = [
        boxplot,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(boxplot.id);

        fireEvent.change(item.boxplotFieldEncodeY(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.boxplotFieldEncodeY()).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(boxplot.id);

        fireEvent.change(item.boxplotFieldEncodeX(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.boxplotFieldEncodeX()).toHaveValue(['A:Value']);
      });
    });

    describe('Scatter', () => {
      const scatter = {
        uid: 'scatter-1',
        id: 'scatter-1',
        name: 'scatter-1-1',
        type: SeriesType.SCATTER,
        encode: {
          x: ['A:Time'],
          y: ['A:Value'],
        },
      };
      const items = [
        scatter,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should update encode Y', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(scatter.id);

        fireEvent.change(item.scatterFieldEncodeY(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.scatterFieldEncodeY()).toHaveValue(['A:Value']);
      });

      it('Should update encode X', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(scatter.id);

        fireEvent.change(item.scatterFieldEncodeX(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.scatterFieldEncodeX()).toHaveValue(['A:Value']);
      });

      it('Should update field size', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(scatter.id);

        fireEvent.change(item.scatterFieldSize(), { target: { value: 'A:Value' } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.scatterFieldSize()).toHaveValue('A:Value');
      });

      it('Should update symbol type', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(scatter.id);

        expect(item.scatterFieldSymbolType()).toHaveValue('circle');

        fireEvent.change(item.scatterFieldSymbolType(), { target: { value: 'triangle' } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.scatterFieldSymbolType()).toHaveValue('triangle');
      });

      it('Should update encode tooltip', () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(scatter.id);

        expect(item.scatterFieldTooltip()).toHaveValue(['']);

        fireEvent.change(item.scatterFieldTooltip(), { target: { values: ['A:Value'] } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.scatterFieldTooltip()).toHaveValue(['A:Value']);
      });
    });

    describe('Sunburst', () => {
      const sunburstItem = {
        ...SUNBURST_DEFAULT,
        uid: 'sunburst',
        id: 'sunburst',
        name: 'Sunburst',
        type: SeriesType.SUNBURST,
        groups: [
          {
            name: 'Level 0',
            source: 'A',
            value: 'A:Level 0',
          },
          {
            name: 'Level 1',
            source: 'A',
            value: 'A:Level 1',
          },
          {
            name: 'Level 2',
            source: 'A',
            value: 'A:Level 2',
          },
        ],
      };
      const items = [
        sunburstItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];
      const dataSetSunburst = [
        {
          name: 'Level 0',
          source: 'A',
        },
        {
          name: 'Level 1',
          source: 'A',
        },
        {
          name: 'Level 2',
          source: 'A',
        },
        {
          name: 'Level 3',
          source: 'A',
        },
        {
          name: 'Level 4',
          source: 'A',
        },
      ] as any;

      it('Should render sunburst editor', () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        expect(item.sunburstLevelField()).toBeInTheDocument();
      });

      it('Should change value level', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        expect(item.sunburstLevelField()).toBeInTheDocument();
        expect(item.sunburstLevelField()).toHaveValue('1');

        fireEvent.change(item.sunburstLevelField(), { target: { value: 10 } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.sunburstLevelField()).toHaveValue('10');
      });

      it('Should change inner radius', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        expect(item.sunburstInnerRadius()).toBeInTheDocument();
        expect(item.sunburstInnerRadius()).toHaveValue('0');

        fireEvent.change(item.sunburstInnerRadius(), { target: { value: 10 } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.sunburstInnerRadius()).toHaveValue('10');
      });

      it('Should change outer radius', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        expect(item.sunburstOuterRadius()).toBeInTheDocument();
        expect(item.sunburstOuterRadius()).toHaveValue('100%');

        fireEvent.change(item.sunburstOuterRadius(), { target: { value: 10 } });

        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        expect(item.sunburstOuterRadius()).toHaveValue('10');
      });

      it('Should add New Level', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        expect(item.sunburstNewLevelButtonAddNew()).toBeInTheDocument();
        expect(item.sunburstNewLevelName()).toBeInTheDocument();
        expect(item.sunburstNewLevelButtonAddNew()).toBeDisabled();

        fireEvent.change(item.sunburstNewLevelName(), { target: { value: 'A:Level 3' } });

        expect(item.sunburstNewLevelButtonAddNew()).not.toBeDisabled();

        await act(async () => {
          fireEvent.click(item.sunburstNewLevelButtonAddNew());
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        expect(item.sunburstNewLevelButtonAddNew()).toBeDisabled();

        expect(item.sunburstLevelItem(false, 'Level 3')).toBeInTheDocument();
      });

      it('Should remove Level', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);
        const field2 = item.sunburstLevelItem(false, 'Level 2');

        expect(field2).toBeInTheDocument();

        /**
         * Remove
         */
        await act(() =>
          fireEvent.click(within(field2).getByTestId(TEST_IDS.seriesEditor.sunburstLevelItemRemoveButton))
        );

        expect(onChange).toHaveBeenCalledWith([
          {
            emphasis: { focus: 'none' },
            groups: [
              { name: 'Level 0', source: 'A', value: 'A:Level 0' },
              { name: 'Level 1', source: 'A', value: 'A:Level 1' },
              { name: 'Level 3', source: 'A', value: 'A:Level 3' },
            ],
            id: 'sunburst',
            innerRadius: '0',
            label: { rotate: 'radial', show: true },
            levelValue: '1',
            name: 'Sunburst',
            outerRadius: '100%',
            sort: 'desc',
            type: 'sunburst',
            uid: 'sunburst',
          },
          { id: 'other', name: 'Other', uid: 'other' },
        ]);
      });

      it('Should not reorder items if drop outside the list', async () => {
        let onDragEndHandler: (result: DropResult) => void = () => {};
        jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
          onDragEndHandler = onDragEnd;
          return children;
        });

        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);
        const field2 = item.sunburstLevelItem(false, 'Level 2');

        expect(field2).toBeInTheDocument();

        /**
         * Simulate drop element 1 to index 0
         */
        await act(async () =>
          onDragEndHandler({
            destination: null,
            source: {
              index: 1,
            },
          } as any)
        );

        expect(onChange).not.toHaveBeenCalledWith([]);
      });

      it('Should reorder items', async () => {
        let onDragEndHandler: (result: DropResult) => void = () => {};
        jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
          onDragEndHandler = onDragEnd;
          return children;
        });

        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);
        const field2 = item.sunburstLevelItem(false, 'Level 2');

        expect(field2).toBeInTheDocument();

        /**
         * Simulate drop element 1 to outside
         */
        await act(async () =>
          onDragEndHandler({
            destination: {
              index: 0,
            },
            source: {
              index: 1,
            },
          } as any)
        );

        expect(onChange).toHaveBeenCalledWith([
          {
            emphasis: {
              focus: 'none',
            },
            groups: [
              { name: 'Level 1', source: 'A', value: 'A:Level 1' },
              {
                name: 'Level 0',
                source: 'A',
                value: 'A:Level 0',
              },
              {
                name: 'Level 2',
                source: 'A',
                value: 'A:Level 2',
              },
              {
                name: 'Level 3',
                source: 'A',
                value: 'A:Level 3',
              },
            ],
            id: 'sunburst',
            innerRadius: '0',
            label: {
              rotate: 'radial',
              show: true,
            },
            levelValue: '1',
            name: 'Sunburst',
            outerRadius: '100%',
            sort: 'desc',
            type: 'sunburst',
            uid: 'sunburst',
          },
          {
            id: 'other',
            name: 'Other',
            uid: 'other',
          },
        ]);
      });

      it('Should change sort', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        const radiusField = item.sunburstSort();

        expect(radiusField).toBeInTheDocument();
        expect(item.sortOption(false, SunburstSortOption.DESC)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(item.sortOption(false, SunburstSortOption.ASC)));

        expect(item.sortOption(false, SunburstSortOption.ASC)).toBeChecked();
      });

      it('Should Emphasis Focus', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        const focusField = item.sunburstEmphasisFocus();

        expect(focusField).toBeInTheDocument();
        expect(item.emphasisFocusOption(false, SunburstEmphasisFocusOption.NONE)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(item.emphasisFocusOption(false, SunburstEmphasisFocusOption.ANCESTOR)));

        expect(item.emphasisFocusOption(false, SunburstEmphasisFocusOption.ANCESTOR)).toBeChecked();
      });

      it('Should change Show Label', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        const showLabelField = item.sunburstShowLabel();

        expect(showLabelField).toBeInTheDocument();
        expect(item.showLabelOption(false, true)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(item.showLabelOption(false, false)));

        expect(item.showLabelOption(false, false)).toBeChecked();
      });

      it('Should change rotate option Label', async () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset: dataSetSunburst,
          })
        );

        const item = openItem(sunburstItem.id);

        const rotateField = item.sunburstLabelRotate();

        expect(rotateField).toBeInTheDocument();
        expect(item.labelRotateOption(false, SunburstLabelRotate.RADIAL)).toBeChecked();

        /**
         * Change target
         */
        await act(() => fireEvent.click(item.labelRotateOption(false, SunburstLabelRotate.TANGENTIAL)));

        expect(item.labelRotateOption(false, SunburstLabelRotate.TANGENTIAL)).toBeChecked();
      });
    });

    /**
     * Cover 100% test for series item editor
     */
    describe('Default', () => {
      const defaultItem = {
        uid: 'default',
        id: 'default',
        name: 'Default',
        type: 'Other',
      };
      const items = [
        defaultItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should render editor', () => {
        const { value, onChange } = createOnChangeHandler(items);

        render(
          getComponent({
            value,
            onChange,
            dataset,
          })
        );

        const item = openItem(defaultItem.id);

        expect(item.fieldId()).toBeInTheDocument();
        expect(item.fieldId()).toHaveValue('default');
      });
    });

    describe('Radar', () => {
      const radarItem = {
        uid: 'radar',
        id: 'radar',
        name: 'Radar',
        type: SeriesType.RADAR,
        radarDimensions: [
          {
            name: 'Test',
            uid: 'Dimension-Test',
            value: 'A:Value',
          },
        ],
      };
      const radarItems = [
        radarItem,
        {
          uid: 'other',
          id: 'other',
          name: 'Other',
        },
      ];

      it('Should add new dimension', async () => {
        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        const item = openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();

        fireEvent.change(item.radarDimensionNewItemId(), { target: { value: 'Test-2' } });

        expect(item.radarDimensionButtonAddNew()).not.toBeDisabled();

        await act(async () => {
          fireEvent.click(item.radarDimensionButtonAddNew());
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Should add new dimensioon for radar
         */
        expect(item.radarDimensionName(false, 'Test-2')).toBeInTheDocument();

        /**
         * Should clean new item id field
         */
        expect(item.radarDimensionNewItemId()).toHaveValue('');
      });

      it('Should add new dimension if initial dimensions is empty', async () => {
        const radarItem = {
          uid: 'radar',
          id: 'radar',
          name: 'Radar',
          type: SeriesType.RADAR,
        };
        const radarItems = [
          radarItem,
          {
            uid: 'other',
            id: 'other',
            name: 'Other',
          },
        ];

        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        const item = openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();

        fireEvent.change(item.radarDimensionNewItemId(), { target: { value: 'Test-2' } });

        expect(item.radarDimensionButtonAddNew()).not.toBeDisabled();

        await act(async () => {
          fireEvent.click(item.radarDimensionButtonAddNew());
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Should add new dimensioon for radar
         */
        expect(item.radarDimensionName(false, 'Test-2')).toBeInTheDocument();

        /**
         * Should clean new item id field
         */
        expect(item.radarDimensionNewItemId()).toHaveValue('');
      });

      it('Should update dimension name', async () => {
        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        const item = openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();
        expect(item.radarDimensionName(false, 'Test')).toBeInTheDocument();

        fireEvent.change(item.radarDimensionName(false, 'Test'), { target: { value: 'Test-New' } });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Changes
         */
        expect(item.radarDimensionName(true, 'Test')).not.toBeInTheDocument();
        expect(item.radarDimensionName(false, 'Test-New')).toBeInTheDocument();
        expect(item.radarDimensionName(false, 'Test-New')).toHaveValue('Test-New');
      });

      it('Should update dimension value', async () => {
        const { value, onChange } = createOnChangeHandler(radarItems);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        const item = openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();
        expect(item.radarDimensionValue(false, 'A:Value')).toBeInTheDocument();

        fireEvent.change(item.radarDimensionValue(false, 'A:Value'), { target: { value: 'A:Time' } });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Changes
         */
        expect(item.radarDimensionName(true, 'A:Value')).not.toBeInTheDocument();
        expect(item.radarDimensionValue(false, 'A:Time')).toBeInTheDocument();
      });

      it('Should remove dimension', async () => {
        const radarItem = {
          uid: 'radar-2',
          id: 'radar-2',
          name: 'Radar-2',
          type: SeriesType.RADAR,
          radarDimensions: [
            {
              name: 'Test',
              uid: 'Dimension-Test',
              value: 'A:Value',
            },
            {
              name: 'Test-2',
              uid: 'Dimension-Test-2',
              value: 'A:Value',
            },
          ],
        };

        const radarItemsTest = [
          radarItem,
          {
            uid: 'other',
            id: 'other',
            name: 'Other',
          },
        ];

        const { value, onChange } = createOnChangeHandler(radarItemsTest);

        const { rerender } = render(
          getComponent({
            value,
            onChange,
          })
        );

        const item = openItem(radarItem.id);

        /**
         * Initial state
         */
        expect(item.radarDimensionButtonAddNew()).toBeInTheDocument();
        expect(item.radarDimensionNewItemId()).toBeInTheDocument();
        expect(item.radarDimensionButtonAddNew()).toBeDisabled();
        expect(item.radarDimensionButtonRemove(false, 'Dimension-Test-2')).toBeInTheDocument();
        expect(item.radarDimensionButtonRemove(false, 'Dimension-Test')).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(item.radarDimensionButtonRemove(false, 'Dimension-Test-2'));
        });

        /**
         * Rerender
         */
        rerender(
          getComponent({
            value,
            onChange,
          })
        );

        /**
         * Changes
         */
        expect(item.radarDimensionButtonRemove(true, 'Dimension-Test-2')).not.toBeInTheDocument();
        expect(item.radarDimensionButtonRemove(false, 'Dimension-Test')).toBeInTheDocument();
      });
    });
  });
});

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import { TEST_IDS } from '../../constants';
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
  });
});

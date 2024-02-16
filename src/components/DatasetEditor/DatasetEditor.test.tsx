import { toDataFrame } from '@grafana/data';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import { TEST_IDS } from '../../constants';
import { DatasetEditor } from './DatasetEditor';

/**
 * Properties
 */
type Props = React.ComponentProps<typeof DatasetEditor>;

/**
 * Dataset Editor
 */
describe('Dataset Editor', () => {
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
   * Data
   */
  const data = [
    toDataFrame({
      refId: 'A',
      fields: [
        {
          name: 'Time',
          values: [],
        },
        {
          name: 'Value',
          values: [],
        },
      ],
    }),
    toDataFrame({
      fields: [
        {
          name: 'Value',
          values: [],
        },
      ],
    }),
  ];

  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(TEST_IDS.datasetEditor);
  const selectors = getSelectors(screen);

  /**
   * Get Tested Component
   */
  const getComponent = (props: Partial<Props>) => {
    return <DatasetEditor data={data} value={[]} {...(props as any)} />;
  };

  it('Should render component', () => {
    render(getComponent({}));

    expect(selectors.root()).toBeInTheDocument();
  });

  it('Should render items', () => {
    render(
      getComponent({
        value: [
          { name: 'Time', source: 'A' },
          { name: 'Value', source: '' },
        ],
      })
    );

    expect(selectors.root()).toBeInTheDocument();
    expect(selectors.item(false, 'A:Time')).toBeInTheDocument();
    expect(selectors.item(false, 'Value')).toBeInTheDocument();
  });

  it('Should add new item', async () => {
    const { value, onChange } = createOnChangeHandler([{ name: 'Time', source: 'A' }]);

    /**
     * Render
     */
    const { rerender } = render(
      getComponent({
        value,
        onChange,
      })
    );

    expect(selectors.root()).toBeInTheDocument();
    expect(selectors.newItemName()).toBeInTheDocument();

    await act(async () => fireEvent.change(selectors.newItemName(), { target: { value: 'A:Value' } }));

    /**
     * Add New Item
     */
    expect(selectors.buttonAddNew()).toBeInTheDocument();
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

    expect(selectors.item(false, 'A:Value')).toBeInTheDocument();
  });

  it('Should remove item', async () => {
    const { value, onChange } = createOnChangeHandler([{ name: 'Time', source: 'A' }]);

    /**
     * Render
     */
    const { rerender } = render(
      getComponent({
        value,
        onChange,
      })
    );

    expect(selectors.root()).toBeInTheDocument();
    expect(selectors.item(false, 'A:Time')).toBeInTheDocument();

    /**
     * Remove Item
     */
    const itemSelectors = getSelectors(within(selectors.item(false, 'A:Time')));
    await act(async () => fireEvent.click(itemSelectors.buttonRemove()));

    rerender(
      getComponent({
        value,
        onChange,
      })
    );

    expect(selectors.item(true, 'A:Value')).not.toBeInTheDocument();
  });

  it('Should not allow selecting already selected fields', () => {
    const { value, onChange } = createOnChangeHandler([{ name: 'Time', source: 'A' }]);

    /**
     * Render
     */
    render(
      getComponent({
        value,
        onChange,
      })
    );

    /**
     * Simulate select option doesn't exist
     */
    fireEvent.change(selectors.newItemName(), { target: { value: 'A:Time' } });
    expect(selectors.buttonAddNew()).toBeDisabled();
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

      const timeItem = { name: 'Time', source: 'A' };
      const valueItem = { name: 'Value', source: 'B' };
      const { value, onChange } = createOnChangeHandler([timeItem, valueItem]);

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
      expect(getSelectors(within(items[0])).item(false, 'B:Value')).toBeInTheDocument();
      expect(getSelectors(within(items[1])).item(false, 'A:Time')).toBeInTheDocument();
    });

    it('Should not reorder items if drop outside the list', async () => {
      let onDragEndHandler: (result: DropResult) => void = () => null;
      jest.mocked(DragDropContext).mockImplementation(({ children, onDragEnd }: any) => {
        onDragEndHandler = onDragEnd;
        return children;
      });

      const timeItem = { name: 'Time', source: 'A' };
      const valueItem = { name: 'Value', source: 'B' };
      const { value, onChange } = createOnChangeHandler([timeItem, valueItem]);

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
      expect(getSelectors(within(items[0])).item(false, 'A:Time')).toBeInTheDocument();
      expect(getSelectors(within(items[1])).item(false, 'B:Value')).toBeInTheDocument();
    });
  });
});

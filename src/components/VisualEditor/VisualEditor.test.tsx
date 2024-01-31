import { toDataFrame } from '@grafana/data';
import { fireEvent, render, screen } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import { TEST_IDS } from '../../constants';
import { VisualEditor } from './VisualEditor';

/**
 * Properties
 */
type Props = React.ComponentProps<typeof VisualEditor>;

/**
 * Visual Editor
 */
describe('Visual Editor', () => {
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
   * Selectors
   */
  const seriesEditorSelectors = getJestSelectors(TEST_IDS.seriesEditor)(screen);
  const datasetEditorSelectors = getJestSelectors(TEST_IDS.datasetEditor)(screen);

  /**
   * Data
   */
  const data = [
    toDataFrame({
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
  ];

  /**
   * Get Tested Component
   */
  const getComponent = (props: Partial<Props>) => {
    return (
      <VisualEditor
        value={{
          dataset: [],
          series: [],
        }}
        item={{}}
        context={{ data }}
        {...(props as any)}
      />
    );
  };

  it('Should render all editors', () => {
    render(getComponent({}));

    expect(seriesEditorSelectors.root()).toBeInTheDocument();
    expect(datasetEditorSelectors.root()).toBeInTheDocument();
  });

  it('Should update dataset', () => {
    const { value, onChange } = createOnChangeHandler({
      dataset: [{ name: 'Value', source: '' }],
      series: [],
    });

    const { rerender } = render(getComponent({ value, onChange }));

    expect(datasetEditorSelectors.item(false, 'Value')).toBeInTheDocument();

    /**
     * Remove dataset
     */
    fireEvent.click(datasetEditorSelectors.buttonRemove());

    rerender(getComponent({ value, onChange }));

    expect(datasetEditorSelectors.item(true, 'Value')).not.toBeInTheDocument();
  });

  it('Should update series', () => {
    const { value, onChange } = createOnChangeHandler({
      dataset: [],
      series: [
        {
          uid: '123',
          id: 'line',
          name: 'Line',
        },
      ],
    });

    const { rerender } = render(getComponent({ value, onChange }));

    expect(seriesEditorSelectors.itemHeader(false, 'line')).toBeInTheDocument();

    /**
     * Remove series
     */
    fireEvent.click(seriesEditorSelectors.buttonRemove());

    rerender(getComponent({ value, onChange }));

    expect(seriesEditorSelectors.itemHeader(true, 'line')).not.toBeInTheDocument();
  });
});

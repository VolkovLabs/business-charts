import { FieldType } from '@grafana/data';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import { TEST_IDS } from '../../../constants';
import { RadarShapeType } from '../../../types';
import { RadarOptionsEditor } from './RadarOptionsEditor';

/**
 * Properties
 */
type Props = React.ComponentProps<typeof RadarOptionsEditor>;

/**
 * Radar Options Editor
 */
describe('Radar options', () => {
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
  const getSelectors = getJestSelectors(TEST_IDS.seriesEditor);
  const selectors = getSelectors(screen);

  /**
   * Open Item
   */
  const openItem = (): ReturnType<typeof getSelectors> => {
    /**
     * Check item presence
     */
    expect(selectors.radarOptionsHeader(false)).toBeInTheDocument();

    /**
     * Make Item is opened
     */
    fireEvent.click(selectors.radarOptionsHeader(false));

    /**
     * Check if item content exists
     */
    const elementContent = selectors.radarOptionsContent(false);
    expect(elementContent).toBeInTheDocument();

    /**
     * Return selectors for opened item
     */
    return getSelectors(within(elementContent));
  };

  /**
   * Dataset
   */
  const dataset = [
    {
      fields: [
        {
          name: 'Value',
          source: 'A',
          type: FieldType.string,
        },
        {
          name: 'Value 2',
          source: 'A',
          type: FieldType.string,
        },
      ],
      name: ' Test',
      refId: 'A',
    },
  ];

  /**
   * Get Tested Component
   */
  const getComponent = (props: Partial<Props>) => {
    return <RadarOptionsEditor value={[]} data={dataset} {...(props as any)} />;
  };

  it('Should render component', () => {
    render(getComponent({}));

    expect(selectors.radarOptionsRoot()).toBeInTheDocument();
  });

  it('Should change shape option', async () => {
    const values = {
      dataset: [],
      radar: {
        indicator: 'A:Value',
        radius: 0,
        shape: RadarShapeType.CIRCLE,
      },
    } as any;

    const { value, onChange } = createOnChangeHandler(values);

    render(
      getComponent({
        value,
        onChange,
      })
    );

    /**
     * Initial
     */
    expect(selectors.radarOptionsRoot()).toBeInTheDocument();

    const item = openItem();
    expect(item.radarOptionsShape()).toHaveValue(RadarShapeType.CIRCLE);
    fireEvent.change(item.radarOptionsShape(), { target: { value: RadarShapeType.POLYGON } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        radar: expect.objectContaining({
          shape: 'polygon',
        }),
      })
    );
  });

  it('Should clear shape option', async () => {
    const values = {
      dataset: [],
      radar: {
        indicator: 'A:Value',
        radius: 0,
        shape: RadarShapeType.CIRCLE,
      },
    } as any;

    const { value, onChange } = createOnChangeHandler(values);

    render(
      getComponent({
        value,
        onChange,
      })
    );

    /**
     * Initial
     */
    expect(selectors.radarOptionsRoot()).toBeInTheDocument();

    const item = openItem();
    expect(item.radarOptionsShape()).toBeInTheDocument();
    expect(item.radarOptionsShape()).toHaveValue('circle');

    /**
     * Simulate a click on the X button
     */
    fireEvent.change(item.radarOptionsShape(), { target: { value: 'clear' } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        radar: expect.objectContaining({
          shape: undefined,
        }),
      })
    );
  });

  it('Should change indicator option', async () => {
    const values = {
      dataset: [],
      radar: {
        indicator: 'A:Value',
        radius: 0,
        shape: RadarShapeType.CIRCLE,
      },
    } as any;

    const { value, onChange } = createOnChangeHandler(values);

    render(
      getComponent({
        value,
        onChange,
      })
    );

    /**
     * Initial
     */
    expect(selectors.radarOptionsRoot()).toBeInTheDocument();

    const item = openItem();
    expect(item.radarOptionsIndicator()).toHaveValue('A:Value');
    fireEvent.change(item.radarOptionsIndicator(), { target: { value: 'A:Value 2' } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        radar: expect.objectContaining({
          indicator: 'A:Value 2',
        }),
      })
    );
  });

  it('Should clear indicator option', async () => {
    const values = {
      dataset: [],
      radar: {
        indicator: 'A:Value',
        radius: 0,
        shape: RadarShapeType.CIRCLE,
      },
    } as any;

    const { value, onChange } = createOnChangeHandler(values);

    render(
      getComponent({
        value,
        onChange,
      })
    );

    /**
     * Initial
     */
    expect(selectors.radarOptionsRoot()).toBeInTheDocument();

    const item = openItem();
    expect(item.radarOptionsIndicator()).toHaveValue('A:Value');

    /**
     * Simulate a click on the X button
     */
    fireEvent.change(item.radarOptionsIndicator(), { target: { value: 'clear' } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        radar: expect.objectContaining({
          indicator: '',
        }),
      })
    );
  });

  it('Should change radius option', async () => {
    const values = {
      dataset: [],
      radar: {
        indicator: 'A:Value',
        radius: 0,
        shape: RadarShapeType.CIRCLE,
      },
    } as any;

    const { value, onChange } = createOnChangeHandler(values);

    render(
      getComponent({
        value,
        onChange,
      })
    );

    /**
     * Initial
     */
    expect(selectors.radarOptionsRoot()).toBeInTheDocument();

    const item = openItem();
    expect(item.radarOptionsRadius()).toHaveValue('0');

    fireEvent.change(item.radarOptionsRadius(), { target: { value: 50 } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        radar: expect.objectContaining({
          radius: '50',
        }),
      })
    );
  });

  it('Should change radius option correctly if type wrong format', async () => {
    const values = {
      dataset: [],
      radar: {
        indicator: 'A:Value',
        radius: 0,
        shape: RadarShapeType.CIRCLE,
      },
    } as any;

    const { value, onChange } = createOnChangeHandler(values);

    render(
      getComponent({
        value,
        onChange,
      })
    );

    /**
     * Initial
     */
    expect(selectors.radarOptionsRoot()).toBeInTheDocument();

    const item = openItem();
    expect(item.radarOptionsRadius()).toHaveValue('0');

    fireEvent.change(item.radarOptionsRadius(), { target: { value: 'abc' } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        radar: expect.objectContaining({
          radius: '0',
        }),
      })
    );
  });
});

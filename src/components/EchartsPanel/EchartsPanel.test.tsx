import { AlertErrorPayload, AlertPayload, AppEvents, LoadingState, toDataFrame } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { render, screen } from '@testing-library/react';
import * as echarts from 'echarts';
import React from 'react';

import { EditorMode, Map, TEST_IDS, Theme } from '../../constants';
import { loadBaidu, loadGaode, loadGoogle, registerMaps } from '../../maps';
import { SeriesType } from '../../types';
import { EchartsPanel } from './EchartsPanel';

/**
 * Mock Register Maps
 */
jest.mock('../../maps', () => ({
  registerMaps: jest.fn(),
  loadBaidu: jest.fn(),
  loadGaode: jest.fn(),
  loadGoogle: jest.fn(),
}));

/**
 * Mock ECharts
 */
jest.mock('echarts', () => ({
  init: jest.fn(),
  registerTheme: jest.fn(),
}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getAppEvents: jest.fn(),
}));

/**
 * Mock echarts-liquidfill
 */
jest.mock('echarts-liquidfill', () => ({
  extendSeriesModel: jest.fn(),
}));

/**
 * Mock echarts-wordcloud
 */
jest.mock('echarts-wordcloud', () => ({
  extendSeriesModel: jest.fn(),
}));

/**
 * Mock echarts-gl
 */
jest.mock('echarts-gl', () => ({
  registerPostInit: jest.fn(),
}));

/**
 * Mock echarts/extension/bmap/bmap
 */
jest.mock('echarts/extension/bmap/bmap', () => ({
  extendComponentModel: jest.fn(),
}));

/**
 * Mock echarts-extension-amap
 */
jest.mock('echarts-extension-amap');

/**
 * Mock echarts-extension-gmap
 */
jest.mock('echarts-extension-gmap');

/**
 * Panel
 */
describe('Panel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Get Test Data
   */
  const getTestData = (state?: LoadingState) => {
    return {
      state,
      series: [
        toDataFrame({
          name: 'data',
          fields: [],
        }),
      ],
    };
  };

  /**
   * Get Tested Component
   */
  const getComponent = ({ options = { name: 'data' }, ...restProps }: any, state?: LoadingState) => {
    return (
      <EchartsPanel
        data={getTestData(state)}
        {...restProps}
        options={{
          themeEditor: {},
          ...options,
        }}
      />
    );
  };

  it('Should find component', async () => {
    render(getComponent({}));
    expect(screen.getByTestId(TEST_IDS.panel.chart)).toBeInTheDocument();
  });

  it('Should find component with Done state', async () => {
    render(getComponent({}, LoadingState.Done));
    expect(screen.getByTestId(TEST_IDS.panel.chart)).toBeInTheDocument();
  });

  it('Should find component for Streaming', async () => {
    render(getComponent({}, LoadingState.Streaming));
    expect(screen.getByTestId(TEST_IDS.panel.chart)).toBeInTheDocument();
  });

  it('Should call echart.init with appropriated parameters', () => {
    const renderer = jest.fn();
    render(getComponent({ options: { renderer } }));
    expect(echarts.init).toHaveBeenCalledWith(screen.getByTestId(TEST_IDS.panel.chart), 'dark', { renderer });
  });

  it('Should apply right theme', () => {
    const renderer = jest.fn();
    render(getComponent({ options: { renderer } }));
    expect(echarts.init).toHaveBeenCalledWith(screen.getByTestId(TEST_IDS.panel.chart), 'dark', { renderer });
  });

  it('Should publish success and errors events with passed payload', () => {
    const publish = jest.fn();
    jest.mocked(getAppEvents).mockImplementation(
      () =>
        ({
          publish,
        }) as any
    ); // we need only these options
    const successPayload: AlertPayload = ['everything is fine'];
    const errorPayload: AlertErrorPayload = ['something is wrong'];
    jest.mocked(echarts.init).mockImplementationOnce(
      () =>
        ({
          setOption: ({
            notifySuccess,
            notifyError,
          }: {
            notifySuccess: (payload: AlertPayload) => void;
            notifyError: (payload: AlertErrorPayload) => void;
          }) => {
            notifySuccess(successPayload);
            notifyError(errorPayload);
          },
          on: jest.fn(),
          off: jest.fn(),
          clear: jest.fn(),
        }) as any
    ); // we need only these options
    render(
      getComponent({
        options: {
          getOption:
            'return { notifySuccess: context.grafana.notifySuccess, notifyError: context.grafana.notifyError }',
        },
      })
    );
    expect(publish).toHaveBeenCalledWith({
      type: AppEvents.alertSuccess.name,
      payload: successPayload,
    });
    expect(publish).toHaveBeenCalledWith({
      type: AppEvents.alertError.name,
      payload: errorPayload,
    });
  });

  /**
   * Theme
   */
  describe('Theme', () => {
    it('Should apply custom theme', () => {
      const themeConfigJson = '123';

      render(getComponent({ options: { themeEditor: { name: Theme.CUSTOM, config: themeConfigJson } } }));

      expect(echarts.registerTheme).toHaveBeenCalledWith(Theme.CUSTOM, JSON.parse(themeConfigJson));
      expect(echarts.init).toHaveBeenCalledWith(
        screen.getByTestId(TEST_IDS.panel.chart),
        Theme.CUSTOM,
        expect.anything()
      );
    });

    it('Should apply default theme if custom theme config has invalid JSON', () => {
      const invalidThemeConfigJson = '{';

      render(getComponent({ options: { themeEditor: { name: Theme.CUSTOM, config: invalidThemeConfigJson } } }));

      expect(echarts.registerTheme).not.toHaveBeenCalled();
      expect(echarts.init).toHaveBeenCalledWith(screen.getByTestId(TEST_IDS.panel.chart), 'dark', expect.anything());
      expect(screen.getByTestId(TEST_IDS.panel.themeError)).toBeInTheDocument();
    });

    it('Should show invalid theme error until it is fixed', () => {
      const invalidThemeConfigJson = '{';

      /**
       * First render
       */
      const { rerender } = render(
        getComponent({ options: { themeEditor: { name: Theme.CUSTOM, config: invalidThemeConfigJson } } })
      );

      expect(screen.getByTestId(TEST_IDS.panel.themeError)).toBeInTheDocument();

      /**
       * Rerender with chart updates
       */
      rerender(
        getComponent({
          options: { themeEditor: { name: Theme.CUSTOM, config: invalidThemeConfigJson } },
          getOption: '',
        })
      );

      expect(screen.getByTestId(TEST_IDS.panel.themeError)).toBeInTheDocument();

      /**
       * Rerender with correct theme config
       */
      rerender(getComponent({ options: { themeEditor: { name: Theme.CUSTOM, config: '{}' } } }));

      expect(screen.queryByTestId(TEST_IDS.panel.themeError)).not.toBeInTheDocument();
    });
  });

  /**
   * Chart updates section
   */
  describe('Chart updates', () => {
    const clearChart = jest.fn();
    const disposeChart = jest.fn();
    const resizeChart = jest.fn();

    beforeEach(() => {
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            on: jest.fn(),
            off: jest.fn(),
            clear: clearChart,
            dispose: disposeChart,
            resize: resizeChart,
          }) as any
      ); // we need only these options
    });

    it('Should clear and update if options.renderer is changed', () => {
      const { rerender } = render(getComponent({ options: { renderer: jest.fn() } }));
      jest.mocked(echarts.init).mockClear();
      // check if calls were cleared
      expect(echarts.init).not.toHaveBeenCalled();
      // re-render component
      rerender(getComponent({ options: { renderer: jest.fn() } }));
      expect(clearChart).toHaveBeenCalled();
      expect(disposeChart).toHaveBeenCalled();
      expect(echarts.init).toHaveBeenCalledTimes(1);
    });

    it('Should clear and update if options.map is changed', () => {
      const { rerender } = render(getComponent({}));
      jest.mocked(echarts.init).mockClear();
      // check if calls were cleared
      expect(echarts.init).not.toHaveBeenCalled();
      // re-render component
      rerender(getComponent({ options: { map: Map.GMAP } }));
      expect(clearChart).toHaveBeenCalled();
      expect(disposeChart).toHaveBeenCalled();
      expect(echarts.init).toHaveBeenCalledTimes(1);
    });

    it('Should resize chart if width is changed', () => {
      const { rerender } = render(getComponent({ width: 100 }));
      resizeChart.mockClear();
      expect(resizeChart).not.toHaveBeenCalled();
      rerender(getComponent({ width: 120 }));
      expect(resizeChart).toHaveBeenCalled();
    });

    it('Should resize chart if height is changed', () => {
      const { rerender } = render(getComponent({ height: 100 }));
      resizeChart.mockClear();
      expect(resizeChart).not.toHaveBeenCalled();
      rerender(getComponent({ height: 120 }));
      expect(resizeChart).toHaveBeenCalled();
    });
  });

  /**
   * Register maps section
   */
  describe('Register maps', () => {
    it('Should not load any map if options.map=NONE', () => {
      render(getComponent({ options: { map: Map.NONE } }));
      expect(registerMaps).not.toHaveBeenCalled();
      expect(loadGaode).not.toHaveBeenCalled();
      expect(loadGoogle).not.toHaveBeenCalled();
      expect(loadBaidu).not.toHaveBeenCalled();
    });

    it('Should load json maps if options.map=JSON', () => {
      render(getComponent({ options: { map: Map.JSON } }));
      expect(registerMaps).toHaveBeenCalled();
      expect(loadGaode).not.toHaveBeenCalled();
      expect(loadGoogle).not.toHaveBeenCalled();
      expect(loadBaidu).not.toHaveBeenCalled();
    });

    it('Should load google maps if options.map=GMAP', () => {
      render(getComponent({ options: { map: Map.GMAP } }));
      expect(loadGoogle).toHaveBeenCalled();
      expect(registerMaps).not.toHaveBeenCalled();
      expect(loadGaode).not.toHaveBeenCalled();
      expect(loadBaidu).not.toHaveBeenCalled();
    });

    it('Should load baidu maps if options.map=BMAP', () => {
      render(getComponent({ options: { map: Map.BMAP } }));
      expect(loadBaidu).toHaveBeenCalled();
      expect(registerMaps).not.toHaveBeenCalled();
      expect(loadGaode).not.toHaveBeenCalled();
      expect(loadGoogle).not.toHaveBeenCalled();
    });

    it('Should load gaode maps if options.map=AMAP', () => {
      render(getComponent({ options: { map: Map.AMAP } }));
      expect(loadGaode).toHaveBeenCalled();
      expect(registerMaps).not.toHaveBeenCalled();
      expect(loadGoogle).not.toHaveBeenCalled();
      expect(loadBaidu).not.toHaveBeenCalled();
    });
  });

  /**
   * Error handling section
   */
  describe('Error handling', () => {
    class CustomError extends Error {
      constructor(
        public name: string,
        public stack: string
      ) {
        super(name);
      }
    }
    const error = new CustomError('some error', 'stack');

    beforeEach(() => {
      jest.mocked(registerMaps).mockImplementationOnce(() => {
        throw error;
      });
    });

    it('Should show errors if unable to register maps', () => {
      render(
        getComponent({
          options: { map: Map.JSON },
        })
      );
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    it('Should show stack if unable to register maps', () => {
      render(getComponent({ options: { map: Map.JSON } }));
      expect(screen.getByText(error.stack)).toBeInTheDocument();
    });
  });

  describe('Code Execution', () => {
    it('Should apply result for v1 result', () => {
      const getOption = `
        return {
          series: []
        }
      `;
      const setOptionMock = jest.fn();
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            setOption: setOptionMock,
            on: jest.fn(),
            off: jest.fn(),
          }) as any
      );
      render(getComponent({ options: { getOption } }));

      expect(setOptionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          series: [],
        }),
        { notMerge: true }
      );
    });

    it('Should apply result for v2 result', () => {
      const getOption = `
        return {
          version: 2,
          option: {
            series: []
          }
        }
      `;
      const setOptionMock = jest.fn();
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            setOption: setOptionMock,
            on: jest.fn(),
            off: jest.fn(),
          }) as any
      );
      render(getComponent({ options: { getOption } }));

      expect(setOptionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          series: [],
        }),
        { notMerge: true }
      );
    });

    it('Should apply empty result for v2 result', () => {
      const getOption = `
        return {
          version: 2,
          option: null,
        }
      `;
      const setOptionMock = jest.fn();
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            setOption: setOptionMock,
            on: jest.fn(),
            off: jest.fn(),
          }) as any
      );
      render(getComponent({ options: { getOption } }));

      expect(setOptionMock).toHaveBeenCalledWith(expect.objectContaining({}), { notMerge: true });
    });

    it('Should call unsubscribeFunction for v2 result', () => {
      const unsubscribe = jest.fn();
      const eventBus = {
        subscribe: jest.fn(() => ({
          unsubscribe,
        })),
      };
      const getOption = `
        const subscription = context.grafana.eventBus.subscribe();
        return {
          version: 2,
          option: {
            series: []
          },
          unsubscribe: () => {
            subscription.unsubscribe();
          }
        }
      `;
      const { rerender } = render(getComponent({ options: { getOption }, eventBus }));

      rerender(getComponent({ options: { getOption }, eventBus }));

      expect(unsubscribe).toHaveBeenCalled();
    });

    it('Should apply result from visual editor code', () => {
      const getOption = `
        return {
          dataset: context.editor.dataset,
          series: context.editor.series,
        }
      `;
      const setOptionMock = jest.fn();
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            setOption: setOptionMock,
            on: jest.fn(),
            off: jest.fn(),
          }) as any
      );
      const series = [{ id: 'line', name: 'Line', type: SeriesType.LINE, encode: { x: ['Time'], y: ['Value'] } }];

      const data = {
        series: [
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
      };

      /**
       * Render
       */
      render(
        getComponent({
          data,
          options: {
            editorMode: EditorMode.VISUAL,
            visualEditor: {
              code: getOption,
              dataset: [{ name: 'Time' }, { name: 'Value' }],
              series,
            },
          },
        })
      );

      expect(setOptionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          series,
          dataset: {
            source: [
              ['Time', 'Value'],
              [1, 10],
              [2, 20],
              [3, 30],
            ],
          },
        }),
        { notMerge: true }
      );
    });
  });
});

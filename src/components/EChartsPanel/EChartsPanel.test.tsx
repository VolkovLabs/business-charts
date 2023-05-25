import * as echarts from 'echarts';
import React from 'react';
import { AlertErrorPayload, AlertPayload, AppEvents, LoadingState, toDataFrame } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { render, screen } from '@testing-library/react';
import { Map, Theme, TestIds } from '../../constants';
import { loadBaidu, loadGaode, loadGoogle, registerMaps } from '../../maps';
import { EChartsPanel } from './EChartsPanel';

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
      <EChartsPanel
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
    expect(screen.getByTestId(TestIds.panel.chart)).toBeInTheDocument();
  });

  it('Should find component with Done state', async () => {
    render(getComponent({}, LoadingState.Done));
    expect(screen.getByTestId(TestIds.panel.chart)).toBeInTheDocument();
  });

  it('Should find component for Streaming', async () => {
    render(getComponent({}, LoadingState.Streaming));
    expect(screen.getByTestId(TestIds.panel.chart)).toBeInTheDocument();
  });

  it('Should call echart.init with appropriated parameters', () => {
    const renderer = jest.fn();
    render(getComponent({ options: { renderer } }));
    expect(echarts.init).toHaveBeenCalledWith(screen.getByTestId(TestIds.panel.chart), 'dark', { renderer });
  });

  it('Should apply right theme', () => {
    const renderer = jest.fn();
    render(getComponent({ options: { renderer } }));
    expect(echarts.init).toHaveBeenCalledWith(screen.getByTestId(TestIds.panel.chart), 'dark', { renderer });
  });

  it('Should publish success and errors events with passed payload', () => {
    const publish = jest.fn();
    jest.mocked(getAppEvents).mockImplementation(
      () =>
        ({
          publish,
        } as any)
    ); // we need only these options
    const successPayload: AlertPayload = ['everything is fine'];
    const errorPayload: AlertErrorPayload = ['something is wrong'];
    jest.mocked(echarts.init).mockImplementation(
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
          clear: jest.fn(),
        } as any)
    ); // we need only these options
    render(getComponent({ options: { getOption: 'return { notifySuccess, notifyError }' } }));
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
      const themeConfigJSON = '123';

      render(getComponent({ options: { themeEditor: { name: Theme.CUSTOM, config: themeConfigJSON } } }));

      expect(echarts.registerTheme).toHaveBeenCalledWith(Theme.CUSTOM, JSON.parse(themeConfigJSON));
      expect(echarts.init).toHaveBeenCalledWith(
        screen.getByTestId(TestIds.panel.chart),
        Theme.CUSTOM,
        expect.anything()
      );
    });

    it('Should apply default theme if custom theme config has invalid JSON', () => {
      const invalidThemeConfigJSON = '{';

      render(getComponent({ options: { themeEditor: { name: Theme.CUSTOM, config: invalidThemeConfigJSON } } }));

      expect(echarts.registerTheme).not.toHaveBeenCalled();
      expect(echarts.init).toHaveBeenCalledWith(screen.getByTestId(TestIds.panel.chart), 'dark', expect.anything());
      expect(screen.getByTestId(TestIds.panel.error)).toBeInTheDocument();
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
            clear: clearChart,
            dispose: disposeChart,
            resize: resizeChart,
          } as any)
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
    const error = {
      message: 'some error',
      stack: 'some stack',
    };

    beforeEach(() => {
      jest.mocked(registerMaps).mockImplementationOnce(() => {
        throw error;
      });
    });

    it('Should show errors if unable to register maps', () => {
      render(getComponent({ options: { map: Map.JSON } }));
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });

    it('Should show stack if unable to register maps', () => {
      render(getComponent({ options: { map: Map.JSON } }));
      expect(screen.getByText(error.stack)).toBeInTheDocument();
    });
  });
});

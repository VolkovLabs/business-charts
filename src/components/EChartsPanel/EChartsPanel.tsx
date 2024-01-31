import 'echarts-liquidfill';
import 'echarts-wordcloud';
import 'echarts-gl';
import 'echarts/extension/bmap/bmap';
import 'echarts-extension-amap';
import 'echarts-extension-gmap';

import { css, cx } from '@emotion/css';
import { AlertErrorPayload, AlertPayload, AppEvents, LoadingState, PanelProps } from '@grafana/data';
import { getAppEvents, locationService } from '@grafana/runtime';
import { Alert, useStyles2, useTheme2 } from '@grafana/ui';
import * as echarts from 'echarts';
import echartsStat from 'echarts-stat';
import React, { useEffect, useRef, useState } from 'react';

import { EditorMode, Map, TEST_IDS, Theme } from '../../constants';
import { loadBaidu, loadGaode, loadGoogle, registerMaps } from '../../maps';
import { CodeResult, PanelOptions } from '../../types';
import { getDatasetSource } from '../../utils';
import { getStyles } from './EChartsPanel.styles';

/**
 * Properties
 */
type Props = PanelProps<PanelOptions>;

/**
 * Panel
 */
export const EChartsPanel: React.FC<Props> = ({ options, data, width, height, replaceVariables, eventBus }) => {
  /**
   * Reference
   */
  const echartRef = useRef<HTMLDivElement>(null);

  /**
   * States
   */
  const [chart, setChart] = useState<echarts.ECharts>();
  const [error, setError] = useState<Error | undefined>();
  const [themeError, setThemeError] = useState<Error | undefined>();

  /**
   * Styles and Theme
   */
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  /**
   * Events
   */
  const appEvents = getAppEvents();
  const notifySuccess = (payload: AlertPayload) => appEvents.publish({ type: AppEvents.alertSuccess.name, payload });
  const notifyError = (payload: AlertErrorPayload) => appEvents.publish({ type: AppEvents.alertError.name, payload });

  /**
   * Transformations
   */
  const ecStat: any = echartsStat;

  /**
   * Initialize Chart
   */
  const initChart = () => {
    if (!echartRef.current) {
      return;
    }

    /**
     * Clear and dispose old chart
     */
    if (chart) {
      chart.clear();
      chart.dispose();
    }

    /**
     * Clear theme error
     */
    setThemeError(undefined);

    /**
     * Theme
     */
    let echartsTheme = theme.isDark ? 'dark' : undefined;

    /**
     * Register Custom ECharts Theme
     */
    if (options.themeEditor.name === Theme.CUSTOM) {
      try {
        const themeConfig = JSON.parse(options.themeEditor.config);
        echartsTheme = Theme.CUSTOM;
        echarts.registerTheme(echartsTheme, themeConfig);
      } catch (e: any) {
        setThemeError(e);
      }
    }

    setChart(echarts.init(echartRef.current, echartsTheme, { renderer: options.renderer }));
  };

  /**
   * Initialize chart if Render updated
   */
  useEffect(() => {
    initChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.renderer, options.map, options.themeEditor.name, options.themeEditor.config]);

  /**
   * Resize
   */
  useEffect(() => {
    chart?.resize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  /**
   * Execute EChart Function
   */
  useEffect(() => {
    /**
     * Unsubscribe Function
     */
    let unsubscribeFn = () => {};

    /**
     * Skip if chart is not defined
     */
    if (!chart) {
      return unsubscribeFn;
    }

    /**
     * Re-initialize on Restore
     * We have to unsubscribe first to prevent memory leaks
     */
    chart.off('restore');
    chart.on('restore', () => {
      initChart();
    });

    /**
     * Wait until Data Source return results
     */
    if (data.state && ![LoadingState.Done, LoadingState.Streaming].includes(data.state)) {
      return unsubscribeFn;
    }

    /**
     * Remove error
     */
    setError(undefined);

    /**
     * Execution Function
     */
    try {
      const func =
        options.editorMode === EditorMode.VISUAL
          ? new Function('context', options.visualEditor.code)
          : new Function(
              'data',
              'theme',
              'echartsInstance',
              'echarts',
              'ecStat',
              'replaceVariables',
              'eventBus',
              'locationService',
              'notifySuccess',
              'notifyError',
              options.getOption
            );

      /**
       * Load Maps
       */
      switch (options.map) {
        case Map.NONE:
          break;
        case Map.JSON:
          registerMaps();
          break;
        case Map.GMAP:
          loadGoogle(options.google);
          break;
        case Map.BMAP:
          loadBaidu(options.baidu);
          break;
        case Map.AMAP:
          loadGaode(options.gaode);
          break;
      }

      /**
       * Code Result
       */
      const contextPayload = {
        grafana: {
          theme,
          replaceVariables,
          eventBus,
          locationService,
          notifySuccess,
          notifyError,
        },
        panel: {
          data,
          chart,
        },
        echarts,
        ecStat,
      };
      const codeResult: CodeResult =
        options.editorMode === EditorMode.VISUAL
          ? func({
              ...contextPayload,
              editor: {
                dataset: {
                  source: getDatasetSource(data.series, options.visualEditor.dataset),
                },
                series: options.visualEditor.series,
              },
            })
          : func(
              data,
              theme,
              chart,
              echarts,
              ecStat,
              replaceVariables,
              eventBus,
              locationService,
              notifySuccess,
              notifyError,
              contextPayload
            );

      /**
       * Chart option
       */
      let chartOption = {};

      /**
       * Default Option Config with merge disabled
       */
      let chartOptionConfig: echarts.EChartsOptionConfig = {
        notMerge: true,
      };

      /**
       * Check version
       */
      if (codeResult && 'version' in codeResult && codeResult.version === 2) {
        /**
         * Handle result v2
         */
        chartOption = codeResult.option || {};
        chartOptionConfig = codeResult.config || chartOptionConfig;

        /**
         * Set Unsubscribe Function
         */
        const unsubscribeFunction = codeResult.unsubscribe;
        if (typeof unsubscribeFunction === 'function') {
          unsubscribeFn = () => {
            unsubscribeFunction();
          };
        }
      } else {
        /**
         * Handle result v1
         */
        chartOption = codeResult || {};
      }

      /**
       * Set Options
       */
      chart.setOption(
        {
          backgroundColor: 'transparent',
          ...chartOption,
        },
        chartOptionConfig
      );
    } catch (err) {
      setError(err as any);
    }

    return unsubscribeFn;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, options.getOption, data, options.visualEditor, options.editorMode]);

  /**
   * EChart
   */
  return (
    <>
      {error?.message && (
        <Alert data-testid={TEST_IDS.panel.error} severity="warning" title="ECharts Execution Error">
          {error.message}
        </Alert>
      )}

      {error?.stack && <pre>{error.stack}</pre>}

      {themeError?.message && (
        <Alert data-testid={TEST_IDS.panel.themeError} severity="warning" title="ECharts Custom Theme Error">
          {themeError.message}
        </Alert>
      )}

      <div
        ref={echartRef}
        data-testid={TEST_IDS.panel.chart}
        className={cx(
          styles.wrapper,
          css`
            width: ${width}px;
            height: ${height}px;
          `
        )}
      />
    </>
  );
};

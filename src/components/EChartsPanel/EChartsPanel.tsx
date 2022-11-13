import 'echarts-liquidfill';
import 'echarts-gl';
import 'echarts/extension/bmap/bmap';
import * as echarts from 'echarts';
import echartsStat from 'echarts-stat';
import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { AlertErrorPayload, AlertPayload, AppEvents, PanelProps } from '@grafana/data';
import { getAppEvents, locationService } from '@grafana/runtime';
import { Alert, useTheme2 } from '@grafana/ui';
import { Map } from '../../constants';
import { loadBaidu, registerMaps } from '../../maps';
import { getStyles } from '../../styles';
import { PanelOptions } from '../../types';

/**
 * Properties
 */
interface Props extends PanelProps<PanelOptions> {}

/**
 * Register maps
 */
registerMaps();

/**
 * Panel
 */
export const EChartsPanel: React.FC<Props> = ({ options, data, width, height, replaceVariables }) => {
  /**
   * Reference
   */
  const echartRef = useRef<HTMLDivElement>(null);

  /**
   * States
   */
  const [chart, setChart] = useState<echarts.ECharts>();
  const [error, setError] = useState<Error | undefined>();

  /**
   * Styles and Theme
   */
  const theme = useTheme2();
  const styles = getStyles();

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

    setChart(echarts.init(echartRef.current, theme.isDark ? 'dark' : undefined, { renderer: options.renderer }));
  };

  /**
   * Initialize chart if Render updated
   */
  useEffect(() => {
    initChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.renderer, options.map]);

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
     * Skip if chart is not defined
     */
    if (!chart) {
      return;
    }

    /**
     * Re-initialize on Restore
     */
    chart.on('restore', () => {
      initChart();
    });

    /**
     * Wait until Data Source return results
     */
    if (data.state && data.state !== 'Done') {
      return;
    }

    /**
     * Clear out chart and remove error
     */
    setError(undefined);
    chart.clear();

    /**
     * Execution Function
     */
    try {
      const func = new Function(
        'data',
        'theme',
        'echartsInstance',
        'echarts',
        'ecStat',
        'replaceVariables',
        'locationService',
        'notifySuccess',
        'notifyError',
        options.getOption
      );

      /**
       * Load Baidu Maps
       */
      if (options.map === Map.BMAP && !(window as any).BMap) {
        loadBaidu(options.baidu);
      }

      chart.setOption(
        func(data, theme, chart, echarts, ecStat, replaceVariables, locationService, notifySuccess, notifyError)
      );
    } catch (err) {
      setError(err as any);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, options.getOption, data]);

  /**
   * EChart
   */
  return (
    <>
      {error?.message && (
        <Alert severity="warning" title="ECharts Execution Error">
          {error.message}
        </Alert>
      )}

      {error?.stack && <pre>{error.stack}</pre>}

      <div
        ref={echartRef}
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

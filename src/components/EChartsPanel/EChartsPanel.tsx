import 'echarts-liquidfill';
import 'echarts-gl';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { PanelProps } from '@grafana/data';
import { locationService } from '@grafana/runtime';
import { Alert, useTheme2 } from '@grafana/ui';
import { getStyles } from '../../styles';
import { PanelOptions } from '../../types';
import { registerMaps } from '../../utils';
import 'echarts/extension/bmap/bmap';

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

  if (options.map === 'bmap') {
    console.log('get bmap js');
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = 'http://api.map.baidu.com/api?v=3.0&ak=' + options.ak + '&callback=initialize';
    document.body.appendChild(script);
    console.log(document);
  }

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
   * Initialize Chart
   */
  const initChart = () => {
    console.log('initChart');
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
    console.log('useEffect, Render updated');
    initChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.renderer]);

  /**
   * Initialize chart if Map updated
   */
   useEffect(() => {
    console.log('useEffect, map updated');
    initChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.map]);

  /**
   * Resize
   */
  useEffect(() => {
    console.log('useEffect, Resize');
    chart?.resize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  /**
   * Execute EChart Function
   */
  useEffect(() => {
    console.log('useEffect, Execute EChart Function');
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
        'replaceVariables',
        'locationService',
        options.getOption
      );
      chart.setOption(func(data, theme, chart, echarts, replaceVariables, locationService));
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

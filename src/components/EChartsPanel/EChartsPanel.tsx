import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { PanelProps } from '@grafana/data';
import { Alert, useTheme2 } from '@grafana/ui';
import { getStyles } from '../../styles';
import { PanelOptions } from '../../types';

/**
 * Properties
 */
interface Props extends PanelProps<PanelOptions> {}

/**
 * Panel
 */
export const EChartsPanel: React.FC<Props> = ({ options, data, width, height }) => {
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
   * Initialize
   */
  useEffect(() => {
    if (!echartRef.current) {
      return;
    }

    chart?.clear();
    chart?.dispose();
    setChart(echarts.init(echartRef.current, options.followTheme && theme.isDark ? 'dark' : undefined));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.followTheme]);

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
      const func = new Function('data', 'theme', 'echartsInstance', 'echarts', options.getOption);
      chart.setOption(func(data, theme.v1, chart, echarts));
    } catch (err) {
      setError(err as any);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, options.getOption, data]);

  /**
   * Error
   */
  if (error) {
    return (
      <>
        <Alert severity="warning" title="ECharts Execution Error">
          {error.message}
        </Alert>

        <pre>{error.stack}</pre>
      </>
    );
  }

  /**
   * EChart
   */
  return (
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
  );
};

import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { PanelProps } from '@grafana/data';
import { Alert, useTheme2 } from '@grafana/ui';
import { getStyles } from '../../styles';
import { PanelOptions } from '../../types';
import { registerMaps } from '../../utils';

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
   * Initialize
   */
  useEffect(() => {
    if (!echartRef.current) {
      return;
    }

    chart?.clear();
    chart?.dispose();
    setChart(echarts.init(echartRef.current, theme.isDark ? 'dark' : undefined, { renderer: options.renderer }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.renderer]);

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
      const func = new Function('data', 'theme', 'echartsInstance', 'echarts', 'replaceVariables', options.getOption);
      chart.setOption(func(data, theme, chart, echarts, replaceVariables));
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

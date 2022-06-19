//import 'echarts-wordcloud';
//import 'echarts-liquidfill';
//import 'echarts-gl';
import * as echarts from 'echarts';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { PanelProps } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';
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
  const echartRef = useRef<HTMLDivElement>(null);

  /** */
  const [chart, setChart] = useState<echarts.ECharts>();
  const [tips, setTips] = useState<Error | undefined>();

  /**
   * Styles and Theme
   */
  const theme = useTheme2();
  const styles = getStyles();

  const resetOption = debounce(
    () => {
      if (!chart) {
        return;
      }
      if (data.state && data.state !== 'Done') {
        return;
      }
      try {
        setTips(undefined);
        chart.clear();

        const func = new Function('data', 'theme', 'echartsInstance', 'echarts', options.getOption);
        const getOptions = func(data, theme.v1, chart, echarts);
        getOptions && chart.setOption(getOptions);
      } catch (err) {
        console.error('Editor content error!', err);
        setTips(err as any);
      }
    },
    150,
    { leading: true }
  );

  useEffect(() => {
    if (echartRef.current) {
      chart?.clear();
      chart?.dispose();
      setChart(echarts.init(echartRef.current, options.followTheme ? theme.v1.type : undefined));
    }

    return () => {
      chart?.clear();
      chart?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echartRef.current, options.followTheme]);

  /**
   * Resize
   */
  useEffect(() => {
    chart?.resize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  /**
   * Reset Options
   */
  useEffect(() => {
    chart && resetOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, options.getOption, data]);

  /**
   * Return
   */
  return (
    <>
      {tips && (
        <div className={styles.tips}>
          <h5 className={styles.tipsTitle}>Editor content error!</h5>
          {(tips.stack || tips.message).split('\n').map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
      )}

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

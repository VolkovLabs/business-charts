import { PanelOptions } from '../types';
import { Renderer } from './echarts';
import { Format } from './editor';
import { Map } from './maps';

/**
 * ECharts Example
 */
const getOption = `const series = data.series.map((s) => {
  const sData = s.fields.find((f) => f.type === 'number').values.buffer;
  const sTime = s.fields.find((f) => f.type === 'time').values.buffer;

  return {
    name: s.refId,
    type: 'line',
    showSymbol: false,
    areaStyle: {
      opacity: 0.1,
    },
    lineStyle: {
      width: 1,
    },
    data: sData.map((d, i) => [sTime[i], d.toFixed(2)]),
  };
});

return {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    left: '0',
    bottom: '0',
    data: data.series.map((s) => s.refId),
    textStyle: {
      color: 'rgba(128, 128, 128, .9)',
    },
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
    min: 'dataMin',
  },
  grid: {
    left: '2%',
    right: '2%',
    top: '2%',
    bottom: 24,
    containLabel: true,
  },
  series,
};`;

/**
 * Default Options
 */
export const DefaultOptions: PanelOptions = {
  getOption,
  renderer: Renderer.CANVAS,
  editor: { height: 600, format: Format.AUTO },
  map: Map.NONE,
  baidu: {
    key: '',
    callback: 'bmapReady',
  },
  gaode: {
    key: '',
    plugin: 'AMap.Scale,AMap.ToolBar',
  },
  google: {
    key: '',
    callback: 'gmapReady',
  },
};

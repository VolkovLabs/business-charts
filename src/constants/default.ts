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
    name: s.name,
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

const axisOption = {
  axisTick: {
    show: false,
  },
  axisLine: {
    show: false,
  },
  axisLabel: {
    color: 'rgba(128, 128, 128, .9)',
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(128, 128, 128, .2)',
    },
  },
};

return {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    left: '0',
    bottom: '0',
    data: data.series.map((s) => s.name),
    textStyle: {
      color: 'rgba(128, 128, 128, .9)',
    },
  },
  xAxis: Object.assign(
    {
      type: 'time',
    },
    axisOption
  ),
  yAxis: Object.assign(
    {
      type: 'value',
      min: 'dataMin',
    },
    axisOption
  ),
  grid: {
    left: 0,
    right: 16,
    top: 6,
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
  map: Map.DEFAULT,
  baidu: {
    key: '',
    callback: 'bmapReady',
  },
  gaode: {
    key: '',
    plugin: 'AMap.Scale,AMap.ToolBar',
  },
};

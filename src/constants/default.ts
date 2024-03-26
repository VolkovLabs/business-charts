import { PanelOptions } from '../types';
import { Renderer, Theme } from './echarts';
import { Format } from './editor';
import { Map } from './maps';

/**
 * ECharts Initial Code Function
 */
const GET_OPTION = `const series = context.panel.data.series.map((s) => {
  const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
  const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
  
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

/**
 * Enable Data Zoom by default
 */
setTimeout(() => context.panel.chart.dispatchAction({
  type: 'takeGlobalCursor',
  key: 'dataZoomSelect',
  dataZoomSelectActive: true,
}), 500);

/**
 * Update Time Range on Zoom
 */
context.panel.chart.on('datazoom', function (params) {
  const startValue = params.batch[0]?.startValue;
  const endValue = params.batch[0]?.endValue;
  locationService.partial({ from: startValue, to: endValue });
});

return {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    left: '0',
    bottom: '0',
    data: context.panel.data.series.map((s) => s.refId),
    textStyle: {
      color: 'rgba(128, 128, 128, .9)',
    },
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
        icon: {
          zoom: 'path://',
          back: 'path://',
        },
      },
      saveAsImage: {},
    }
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
 * ECharts Initial Visual Function
 */
const VISUAL_EDITOR_CODE = `return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
    min: 'dataMin',
  },
}
`;

/**
 * Default Options
 */
export const DEFAULT_OPTIONS: PanelOptions = {
  getOption: GET_OPTION,
  renderer: Renderer.CANVAS,
  themeEditor: { name: Theme.DEFAULT, config: '{}' },
  editor: { format: Format.AUTO },
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
  visualEditor: {
    dataset: [],
    series: [],
    code: VISUAL_EDITOR_CODE,
  },
};

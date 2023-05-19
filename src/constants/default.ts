import { PanelOptions } from '../types';
import { Renderer, Theme } from './echarts';
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

/**
 * Enable Data Zoom by default
 */
setTimeout(() => echartsInstance.dispatchAction({
  type: 'takeGlobalCursor',
  key: 'dataZoomSelect',
  dataZoomSelectActive: true,
}), 500);

/**
 * Update Time Range on Zoom
 */
echartsInstance.on('datazoom', function (params) {
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
    data: data.series.map((s) => s.refId),
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
 * Default EChart Theme Config
 */
const themeConfig = `{
  "color": [
    "#4ea397",
    "#22c3aa",
    "#7bd9a5",
    "#d0648a",
    "#f58db2",
    "#f2b3c9"
  ],
  "backgroundColor": "rgba(255,255,255,0)",
  "textStyle": {},
  "title": {
    "textStyle": {
      "color": "#666666"
    },
    "subtextStyle": {
      "color": "#999999"
    }
  },
  "line": {
    "itemStyle": {
      "borderWidth": "2"
    },
    "lineStyle": {
      "width": "3"
    },
    "symbolSize": "8",
    "symbol": "emptyCircle",
    "smooth": false
  },
  "radar": {
    "itemStyle": {
      "borderWidth": "2"
    },
    "lineStyle": {
      "width": "3"
    },
    "symbolSize": "8",
    "symbol": "emptyCircle",
    "smooth": false
  },
  "bar": {
    "itemStyle": {
      "barBorderWidth": 0,
      "barBorderColor": "#ccc"
    }
  },
  "pie": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    }
  },
  "scatter": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    }
  },
  "boxplot": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    }
  },
  "parallel": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    }
  },
  "sankey": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    }
  },
  "funnel": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    }
  },
  "gauge": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    }
  },
  "candlestick": {
    "itemStyle": {
      "color": "#d0648a",
      "color0": "transparent",
      "borderColor": "#d0648a",
      "borderColor0": "#22c3aa",
      "borderWidth": "1"
    }
  },
  "graph": {
    "itemStyle": {
      "borderWidth": 0,
      "borderColor": "#ccc"
    },
    "lineStyle": {
      "width": "1",
      "color": "#cccccc"
    },
    "symbolSize": "8",
    "symbol": "emptyCircle",
    "smooth": false,
    "color": [
      "#4ea397",
      "#22c3aa",
      "#7bd9a5",
      "#d0648a",
      "#f58db2",
      "#f2b3c9"
    ],
    "label": {
      "color": "#ffffff"
    }
  },
  "map": {
    "itemStyle": {
      "areaColor": "#eeeeee",
      "borderColor": "#999999",
      "borderWidth": 0.5
    },
    "label": {
      "color": "#28544e"
    },
    "emphasis": {
      "itemStyle": {
        "areaColor": "rgba(34,195,170,0.25)",
        "borderColor": "#22c3aa",
        "borderWidth": 1
      },
      "label": {
        "color": "#349e8e"
      }
    }
  },
  "geo": {
    "itemStyle": {
      "areaColor": "#eeeeee",
      "borderColor": "#999999",
      "borderWidth": 0.5
    },
    "label": {
      "color": "#28544e"
    },
    "emphasis": {
      "itemStyle": {
        "areaColor": "rgba(34,195,170,0.25)",
        "borderColor": "#22c3aa",
        "borderWidth": 1
      },
      "label": {
        "color": "#349e8e"
      }
    }
  },
  "categoryAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#cccccc"
      }
    },
    "axisTick": {
      "show": false,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "color": "#999999"
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": [
          "#eeeeee"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.05)",
          "rgba(200,200,200,0.02)"
        ]
      }
    }
  },
  "valueAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#cccccc"
      }
    },
    "axisTick": {
      "show": false,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "color": "#999999"
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": [
          "#eeeeee"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.05)",
          "rgba(200,200,200,0.02)"
        ]
      }
    }
  },
  "logAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#cccccc"
      }
    },
    "axisTick": {
      "show": false,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "color": "#999999"
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": [
          "#eeeeee"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.05)",
          "rgba(200,200,200,0.02)"
        ]
      }
    }
  },
  "timeAxis": {
    "axisLine": {
      "show": true,
      "lineStyle": {
        "color": "#cccccc"
      }
    },
    "axisTick": {
      "show": false,
      "lineStyle": {
        "color": "#333"
      }
    },
    "axisLabel": {
      "show": true,
      "color": "#999999"
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "color": [
          "#eeeeee"
        ]
      }
    },
    "splitArea": {
      "show": false,
      "areaStyle": {
        "color": [
          "rgba(250,250,250,0.05)",
          "rgba(200,200,200,0.02)"
        ]
      }
    }
  },
  "toolbox": {
    "iconStyle": {
      "borderColor": "#999999"
    },
    "emphasis": {
      "iconStyle": {
        "borderColor": "#666666"
      }
    }
  },
  "legend": {
    "textStyle": {
      "color": "#999999"
    }
  },
  "tooltip": {
    "axisPointer": {
      "lineStyle": {
        "color": "#cccccc",
        "width": 1
      },
      "crossStyle": {
        "color": "#cccccc",
        "width": 1
      }
    }
  },
  "timeline": {
    "lineStyle": {
      "color": "#4ea397",
      "width": 1
    },
    "itemStyle": {
      "color": "#4ea397",
      "borderWidth": 1
    },
    "controlStyle": {
      "color": "#4ea397",
      "borderColor": "#4ea397",
      "borderWidth": 0.5
    },
    "checkpointStyle": {
      "color": "#4ea397",
      "borderColor": "#3cebd2"
    },
    "label": {
      "color": "#4ea397"
    },
    "emphasis": {
      "itemStyle": {
        "color": "#4ea397"
      },
      "controlStyle": {
        "color": "#4ea397",
        "borderColor": "#4ea397",
        "borderWidth": 0.5
      },
      "label": {
        "color": "#4ea397"
      }
    }
  },
  "visualMap": {
    "color": [
      "#d0648a",
      "#22c3aa",
      "#adfff1"
    ]
  },
  "dataZoom": {
    "backgroundColor": "rgba(255,255,255,0)",
    "dataBackgroundColor": "rgba(222,222,222,1)",
    "fillerColor": "rgba(114,230,212,0.25)",
    "handleColor": "#cccccc",
    "handleSize": "100%",
    "textStyle": {
      "color": "#999999"
    }
  },
  "markPoint": {
    "label": {
      "color": "#ffffff"
    },
    "emphasis": {
      "label": {
        "color": "#ffffff"
      }
    }
  }
}`;

/**
 * Default Options
 */
export const DefaultOptions: PanelOptions = {
  getOption,
  renderer: Renderer.CANVAS,
  themeEditor: { name: Theme.DEFAULT, config: themeConfig, height: 600 },
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

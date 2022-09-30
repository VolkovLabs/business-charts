
# Stacked Bar Graph

Example for a stacked bar graph with an InfluxDB flux-query as data source

![Panel](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/examples/img/stacked_bar_graph_influxdb.png)


## Data Source

### Queries

<details>
  <summary>Series A</summary>

```
from(bucket: "home")
  |>  range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |>  filter(fn: (r)  => r["_measurement"] == "vzlogger")
  |>  filter(fn: (r)  => r["Source"] == "SML_Energy_Out")
  |>  filter(fn: (r)  => r["_field"] == "Energy")
  |>  aggregateWindow(every: 1d, fn: sum, createEmpty: true)
  |>  set(key: "Source",  value: "Grid Feed")
```

</details>

<details>
  <summary>Series B</summary>

```
from(bucket: "home")
  |>  range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |>  filter(fn: (r)  => r["_measurement"] == "vzlogger")
  |>  filter(fn: (r)  => r["Source"] == "SML_Energy_In")
  |>  filter(fn: (r)  => r["_field"] == "Energy")
  |>  aggregateWindow(every: 1d, fn: sum, createEmpty: true)
  |>  set(key: "Source",  value: "Grid Consumption")
```

</details>

<details>
  <summary>Series C</summary>

```
from(bucket: "home")
  |>  range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |>  filter(fn: (r)  => r["_measurement"] == "vzlogger")
  |>  filter(fn: (r)  => r["Source"] == "SelfConsumption")
  |>  filter(fn: (r)  => r["_field"] == "Energy")
  |>  aggregateWindow(every: 1d, fn: sum, createEmpty: true)
  |>  set(key: "Source",  value: "Self Consumption")
```

</details>

### Notes

 - `createEmpty: true` makes sure that the data of the individual bar segments stays aligned when data is missing in the series
 -  `set(key: "Source",  value: "Self Consumption")` manipulates the field used for naming the series


## Graph Definition

```js
console.log(data.series)
const series = data.series.map((s) => {
  let sData = s.fields.find((f) => f.type === 'number').values.buffer;
  // Move 'Grid Feed' to the negative quadrant
  if (s.refId === 'A') {
    sData = sData.map(function (x) { return x * -1.0; })
  }
  const sTime = s.fields.find((f) => f.type === 'time').values.buffer;
  return {
    name: s.fields[1].labels.Source,
    type: 'bar',
    stack: 'total',
    // 'createEmpty: true' is needed to align the bars in case of missing values
    // but creates 'null' values in the data and eCharts fails
    // Make sure to catch the null values via 'd ? d.toFixed(2) : 0'
    data: sData.map((d, i) => [sTime[i], d ? d.toFixed(2) : 0]),
  };
});

// Debug
console.log('series')
console.log(series)

const axisOptionX = {
  axisLabel: {
    // Should show all category values on the x-Axis but
    // does not work
    interval: 0,
    color: 'rgba(128, 128, 128, .9)',
  },
  axisTick: {
    show: false,
  },
  axisLine: {
    show: false,
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(128, 128, 128, .2)',
    },
  },
  // Work around the 'interval: 0' issue
  // Potentially causes issues for low data count
  splitNumber: 30,
  boundaryGap: true,
  axisTick: {
    interval: 0,
    alignWithLabel: true
  },
  axisLine: {
    onZero: false
  },
};

const axisOptionY = {
  axisLabel: {
    formatter: function (value) {
      // 'toLocaleString' applies internationalization to the
      // number format, e.g. thousands separator
      return value.toLocaleString() + ' Wh'
    },
    color: 'rgba(128, 128, 128, .9)',
  },
  axisTick: {
    show: false,
  },
  axisLine: {
    show: false,
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(128, 128, 128, .2)',
    },
  },
};

return {
  color: [
    '#27727b', // Series A
    '#c23531', // Series B
    '#9bca63'  // Series C
  ],
  backgroundColor: 'transparent',
  tooltip: {
    valueFormatter: (value) => {
      return ((value / 1000.0).toFixed(2)).toLocaleString() + ' kWh'
    },
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    left: '0',
    bottom: '0',
    textStyle: {
      color: 'rgba(128, 128, 128, .9)',
    },
  },
  xAxis: Object.assign(
    {
      type: 'time',
    },
    axisOptionX
  ),
  yAxis: Object.assign(
    {
      type: 'value',
    },
    axisOptionY
  ),
  grid: {
    left: 0,
    right: 16,
    top: 6,
    bottom: 24,
    containLabel: true,
  },
  series,
};
```

## Static Panel

### Description
The Static Panel is a ready made example that can be imported into a Grafana Panel as JSON. It requires the [Static data source for Grafana](https://grafana.com/grafana/plugins/marcusolsson-static-datasource/) plugin.

## Panel JSON

<details>
  <summary>JSON</summary>

```JSON
{
  "id": 91,
  "gridPos": {
    "h": 8,
    "w": 12,
    "x": 12,
    "y": 61
  },
  "type": "volkovlabs-echarts-panel",
  "title": "Energy blance",
  "datasource": {
    "type": "marcusolsson-static-datasource",
    "uid": "ZlevIv4Vk"
  },
  "pluginVersion": "9.1.2",
  "interval": "1h",
  "links": [],
  "options": {
    "renderer": "canvas",
    "editor": {
      "height": 600,
      "format": "auto"
    },
    "getOption": "const series = data.series.map((s) => {\n  let sData = s.fields.find((f) => f.type === 'number').values.buffer;\n  // Move 'Grid Feed' to the negative quadrant\n  if (s.refId === 'A') {\n    sData = sData.map(function (x) { return x * -1.0; })\n  }\n  const sTime = s.fields.find((f) => f.type === 'time').values.buffer;\n  return {\n    name: s.name,\n    type: 'bar',\n    stack: 'total',\n    // 'createEmpty: true' is needed to align the bars in case of missing values\n    // but creates 'null' values in the data and eCharts fails\n    // Make sure to catch the null values via 'd ? d.toFixed(2) : 0'\n    data: sData.map((d, i) => [sTime[i], d ? d.toFixed(2) : 0]),\n  };\n});\n\n// Debug\nconsole.log('series')\nconsole.log(series)\n\nconst axisOptionX = {\n  axisLabel: {\n    // Should show all category values on the x-Axis but\n    // does not work\n    interval: 0,\n    color: 'rgba(128, 128, 128, .9)',\n  },\n  axisTick: {\n    show: false,\n  },\n  axisLine: {\n    show: false,\n  },\n  splitLine: {\n    lineStyle: {\n      color: 'rgba(128, 128, 128, .2)',\n    },\n  },\n  // Work around the 'interval: 0' issue\n  // Potentially causes issues for low data count\n  splitNumber: 30,\n  boundaryGap: true,\n  axisTick: {\n    interval: 0,\n    alignWithLabel: true\n  },\n  axisLine: {\n    onZero: false\n  },\n};\n\nconst axisOptionY = {\n  axisLabel: {\n    formatter: function (value) {\n      // 'toLocaleString' applies internationalization to the\n      // number format, e.g. thousands separator\n      return value.toLocaleString() + ' Wh'\n    },\n    color: 'rgba(128, 128, 128, .9)',\n  },\n  axisTick: {\n    show: false,\n  },\n  axisLine: {\n    show: false,\n  },\n  splitLine: {\n    lineStyle: {\n      color: 'rgba(128, 128, 128, .2)',\n    },\n  },\n};\n\nreturn {\n  color: [\n    '#27727b', // Series A\n    '#c23531', // Series B\n    '#9bca63'  // Series C\n  ],\n  backgroundColor: 'transparent',\n  tooltip: {\n    valueFormatter: (value) => {\n      return ((value / 1000.0).toFixed(2)).toLocaleString() + ' kWh'\n    },\n    trigger: 'axis',\n    axisPointer: {\n      type: 'shadow'\n    }\n  },\n  legend: {\n    left: '0',\n    bottom: '0',\n    textStyle: {\n      color: 'rgba(128, 128, 128, .9)',\n    },\n  },\n  xAxis: Object.assign(\n    {\n      type: 'time',\n    },\n    axisOptionX\n  ),\n  yAxis: Object.assign(\n    {\n      type: 'value',\n    },\n    axisOptionY\n  ),\n  grid: {\n    left: 0,\n    right: 16,\n    top: 6,\n    bottom: 24,\n    containLabel: true,\n  },\n  series,\n};"
  },
  "targets": [
    {
      "datasource": {
        "type": "marcusolsson-static-datasource",
        "uid": "ZlevIv4Vk"
      },
      "frame": {
        "fields": [
          {
            "config": {},
            "name": "Time",
            "type": "time",
            "values": [
              1661990400000,
              1662076800000,
              1662163200000,
              1662249600000,
              1662336000000,
              1662422400000,
              1662508800000,
              1662595200000,
              1662681600000,
              1662768000000,
              1662854400000,
              1662940800000,
              1663027200000,
              1663113600000,
              1663200000000,
              1663286400000,
              1663372800000,
              1663459200000,
              1663545600000,
              1663632000000,
              1663718400000,
              1663804800000,
              1663891200000,
              1663977600000,
              1664064000000,
              1664150400000,
              1664236800000,
              1664323200000,
              1664409600000,
              1664496000000,
              1664575199999
            ]
          },
          {
            "config": {},
            "name": "Energy",
            "type": "number",
            "values": [
              0,
              19753.79999999702,
              32957,
              22119.30000000447,
              22960,
              25633.5,
              11050.79999999702,
              21804,
              18772,
              16723.20000000298,
              15237.39999999851,
              14715.70000000298,
              32009.89999999851,
              16286.60000000149,
              9106.69999999553,
              3201.60000000149,
              1505.5,
              12370,
              3128.2000000029802,
              19515.79999999702,
              19742.5,
              22695.89999999851,
              25052.20000000298,
              24672.20000000298,
              424.79999999701977,
              5252.89999999851,
              9866.89999999851,
              6571.9000000059605,
              93.09999999403954,
              2389.4000000059605,
              0
            ]
          }
        ],
        "meta": {},
        "name": "1st bar"
      },
      "hide": false,
      "refId": "A"
    },
    {
      "datasource": {
        "type": "marcusolsson-static-datasource",
        "uid": "ZlevIv4Vk"
      },
      "frame": {
        "fields": [
          {
            "config": {},
            "name": "Time",
            "type": "time",
            "values": [
              1661990400000,
              1662076800000,
              1662163200000,
              1662249600000,
              1662336000000,
              1662422400000,
              1662508800000,
              1662595200000,
              1662681600000,
              1662768000000,
              1662854400000,
              1662940800000,
              1663027200000,
              1663113600000,
              1663200000000,
              1663286400000,
              1663372800000,
              1663459200000,
              1663545600000,
              1663632000000,
              1663718400000,
              1663804800000,
              1663891200000,
              1663977600000,
              1664064000000,
              1664150400000,
              1664236800000,
              1664323200000,
              1664409600000,
              1664496000000,
              1664575199999
            ]
          },
          {
            "config": {},
            "name": "Energy",
            "type": "number",
            "values": [
              1492.2999999970198,
              14262,
              13104.10000000149,
              12588.39999999851,
              13359.70000000298,
              14840.69999999553,
              13712.5,
              14773.30000000447,
              13383.10000000149,
              14831.80000000447,
              17832.09999999404,
              14284.20000000298,
              10979.10000000149,
              12534.69999999553,
              17521.10000000149,
              17545.70000000298,
              18443.79999999702,
              15298.70000000298,
              16523.79999999702,
              12827.60000000149,
              14739.20000000298,
              13430.89999999851,
              12888.29999999702,
              13037.5,
              21231.5,
              14808.89999999851,
              16063.40000000596,
              22240.79999999702,
              20840.79999999702,
              18149.20000000298,
              5577.60000000149
            ]
          }
        ],
        "meta": {},
        "name": "2nd bar"
      },
      "hide": false,
      "refId": "B"
    },
    {
      "datasource": {
        "type": "marcusolsson-static-datasource",
        "uid": "ZlevIv4Vk"
      },
      "frame": {
        "fields": [
          {
            "config": {},
            "name": "Time",
            "type": "time",
            "values": [
              1661990400000,
              1662076800000,
              1662163200000,
              1662249600000,
              1662336000000,
              1662422400000,
              1662508800000,
              1662595200000,
              1662681600000,
              1662768000000,
              1662854400000,
              1662940800000,
              1663027200000,
              1663113600000,
              1663200000000,
              1663286400000,
              1663372800000,
              1663459200000,
              1663545600000,
              1663632000000,
              1663718400000,
              1663804800000,
              1663891200000,
              1663977600000,
              1664064000000,
              1664150400000,
              1664236800000,
              1664323200000,
              1664409600000,
              1664496000000,
              1664575199999
            ]
          },
          {
            "config": {},
            "name": "Energy",
            "type": "number",
            "values": [
              null,
              null,
              null,
              null,
              10866,
              12626,
              14618,
              16210,
              16573,
              16310,
              13369,
              12607,
              14353,
              13236,
              12482,
              13399,
              8394,
              11679,
              11626,
              14140,
              12683,
              12524,
              18538,
              12263,
              6997,
              10605,
              12742,
              11412,
              5856,
              12390,
              189
            ]
          }
        ],
        "meta": {},
        "name": "3rd bar"
      },
      "hide": false,
      "refId": "C"
    }
  ],
  "description": "",
  "hideTimeOverride": false
}
```

</details>

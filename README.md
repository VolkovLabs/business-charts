# Apache ECharts Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/dashboard.png)

[![Grafana](https://img.shields.io/badge/Grafana-9.3.1-orange)](https://www.grafana.com)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
[![Examples](https://img.shields.io/badge/ECharts-Examples-blue)](https://echarts.volkovlabs.io)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml)

## Introduction

The ECharts Panel is a plugin for Grafana that allows to visualize Apache ECharts on your Grafana dashboard.

[Apache ECharts](https://echarts.apache.org/en/index.html) is a free, powerful charting and visualization library offering an easy way of adding intuitive, interactive, and highly customizable charts. It is written in pure JavaScript and based on zrender, which is a whole new lightweight canvas library.

[![Apache ECharts panel for Grafana | How to create modern dashboards in Grafana | ECharts Tutorial](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/video.png)](https://youtu.be/DxqCrBEmrQw)

### Requirements

- **Grafana 8.5+, Grafana 9.0+** is required.

## Getting Started

Apache ECharts panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or use the `grafana-cli` tool to install from the command line:

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

## Features

- Allows to visualize Apache ECharts using Monaco Code Editor with Auto formatting.
- Use setOption() function to set configuration and data.
- Based on the ECharts 5.4.0.
- Supports Light and Dark mode synchronized with Grafana Theme.
- Supports SVG and Canvas renderer.
- Includes USA and World GeoJSON maps. Allows to add custom Map files in the `maps` folder.
- Supports variables and location service to make Charts interactive.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill), which is usually used to represent data in percentage.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl), which providing 3D plots, globe visualization and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Supports Code Editor suggestions for Available Parameters.
- Allows to display Success and Error notifications.
- Supports Baidu, Gaode, Google maps using API. Requires to provide access key.
- 100+ examples are available at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

![Examples](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/examples.png)

## setOption() Function

Configuration item, data, universal interface, all parameters and data can be modified through `setOption()` function in the plugin's options.

### Available parameters

- `data` - Grafana's `data` object with time range, series and request information.
- `theme` - Grafana's `theme` object.
- `echartsInstance` - Instance of the ECharts.
- `echarts` - ECharts library.
- `ecStat` - A statistical and data mining tool for Apache ECharts.
- `replaceVariables` - the `replaceVariables()` function to interpolate variables.
- `locationService` - Grafana's `locationService` to work with browser location and history.
- `notifySuccess(['Header', 'Message'])` - Display successful notification.
- `notifyError(['Header', 'Error Message'])` - Display error notification.

![Panel](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/panel.png)

To learn more about parameters you can log them in the Browser Console:

```javascript
console.log(data, theme, echartsInstance, echarts, replaceVariables, locationService);
```

## Dashboard and Global Variables

Use `replaceVariables()` function to replace Dashboard and Global variables.

```javascript
const email = replaceVariables('${__user.email}');
```

[![Grafana variables | Dashboard, Global and Environment variables | Environment Data Source](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/variables.png)](https://youtu.be/sczRq2lI3e4)

You can find [global built-in variables](https://grafana.com/docs/grafana/latest/variables/variable-types/global-variables/) in the Grafana documentation.

## Data Sources

To use Apache ECharts with data from data sources get each field in a array:

```javascript
data.series.map((s) => {
  if (s.refId === 'logo') {
    images = s.fields.find((f) => f.name === 'body').values.buffer;
  } else if (s.refId === 'connections') {
    sources = s.fields.find((f) => f.name === 'source').values.buffer;
    targets = s.fields.find((f) => f.name === 'target').values.buffer;
  } else if (s.refId === 'nodes') {
    titles = s.fields.find((f) => f.name === 'title').values.buffer;
    descriptions = s.fields.find((f) => f.name === 'description').values.buffer;
  }
});
```

[![How to use Data Source in Apache ECharts in 90 seconds | Grafana Data attribute](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/datasource.png)](https://youtu.be/K5YNMSIm9AM)

Merge elements into array:

- get values for each field
- combine in an array of arrays
- use as `series[0]` to access first query

```javascript
const series = data.series.map((s) => {
  const rates = s.fields.find((f) => f.name === 'Rate').values.buffer;
  const calls = s.fields.find((f) => f.name === 'Calls').values.buffer;
  const names = s.fields.find((f) => f.name === 'Name').values.buffer;

  return rates.map((d, i) => [d, calls[i], names[i]]);
});
```

## Event Handling

Users can trigger corresponding events by their operation. To react on Mouse and other events use `echartsInstance`:

```javascript
/**
 * On Mouse Click
 */
echartsInstance.on('click', (params) => {
  notifySuccess(['Event', 'On Click']);
  ...
  echartsInstance.resize(); // to redraw visualization
});

/**
 * On Double Click
 */
echartsInstance.on('dblclick', (params) => {
  ...
  echartsInstance.resize();
});
```

Take a look at the official documentation [Event and Action](https://apache.github.io/echarts-handbook/en/concepts/event/) to learn more.

## Notifications

Success and Error notifications can be triggered on events handling:

```javascript
notifySuccess(['Update', 'Values updated successfully.']);
notifyError(['Update', `An error occured updating values.`]);
```

## Scale when resize

To scale the content when panel resized use `echartsInstance` methods to retrieve width and height of the panel.

```javascript
  graphic: {
    type: "image",
    style: {
      image: `data:image/svg+xml;utf8,${SVG}`,
      width: echartsInstance.getWidth(),
      height: echartsInstance.getHeight(),
    },
  },
```

Take a look at the official documentation [echartsInstance](https://echarts.apache.org/en/api.html#echartsInstance) to see all available methods.

## Tutorial

### Directed Graph

Data visualizations can and should be done in style. In two parts video tutorial Daria explained how we built and visualized directed graph in Grafana using Apache ECharts panel.

[![Build directional graph in Grafana using Apache ECharts | Tutorial part 1](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/tutorial1.png)](https://youtu.be/e3VHgpuzEF0)

[![Build directional graph in Grafana using Apache ECharts | Tutorial part 2](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/tutorial2.png)](https://youtu.be/oM7XAVlsOio)

### PNG and SVG images

A quick guide for using images in Apache ECharts shows each type's prefixes.

[![Apache ECharts supports base64 PNG and SVG (vector) images | Prefixes for various types of pictures](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/images.png)](https://youtu.be/ygFDhmbPU-Y)

### Histograms, Clustering, Regression

Mathematical and statistical functions to your extended visualization arsenal. 

[![Histograms, Clustering. Regression in Apache ECharts panel for Grafana | ecStat math, stat library](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/ecstat.png)](https://youtu.be/qfDrAW8-Mh8)

### Maps

The Apache ECharts panel includes extensions to support Baidu, Gaode and Google Maps. You can find details how to use them in the [documentation](https://docs.volkovlabs.io/volkovlabs-echarts-panel).

## Examples

Collection of [Examples](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/examples) shows off the possibilities and provides a starting point for further exploration.

If you have setup a cool looking graph, please share your example. Take a look at the existing examples and send a pull-request with yours.

## Feedback

We love to hear from users, developers, and the whole community interested in this plugin. These are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).

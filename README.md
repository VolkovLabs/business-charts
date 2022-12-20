# Apache ECharts Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/dashboard.png)

[![Grafana](https://img.shields.io/badge/Grafana-9.3.1-orange)](https://www.grafana.com)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
[![Documentation](https://img.shields.io/badge/Documentation-blue)](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/)
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
- Based on the ECharts 5.4.1.
- Supports Light and Dark mode synchronized with Grafana Theme.
- Supports SVG and Canvas renderer.
- Includes USA and World GeoJSON maps. Allows to add custom Map files in the `maps` folder.
- Supports variables and location service to make Charts interactive.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill), which is usually used to represent data in percentage.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl), which providing 3D plots, globe visualization and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Supports Code Editor suggestions for Parameters and variables.
- Allows to display Success and Error notifications.
- Supports Baidu, Gaode, Google maps using API. Requires to provide access key.
- 100+ examples are available at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

![Examples](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/examples.png)

## Documentation

- [setOption() Function](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/options)
- [Data Sources](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/datasource)
- Maps
  - [Baidu](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/baidu)
  - [Gaode](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/gaode)
  - [Google](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/google)
- [Variables](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/variables)

## Tutorials

### Dashboard and Global variables

[![Grafana variables | Dashboard, Global and Environment variables | Environment Data Source](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/variables.png)](https://youtu.be/sczRq2lI3e4)

### Data Source

[![How to use Data Source in Apache ECharts in 90 seconds | Grafana Data attribute](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/datasource.png)](https://youtu.be/K5YNMSIm9AM)

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

## Feedback

We love to hear from users, developers, and the whole community interested in this plugin. These are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).

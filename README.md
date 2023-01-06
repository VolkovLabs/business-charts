# Apache ECharts Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/dashboard.png)

[![Grafana](https://img.shields.io/badge/Grafana-9.3.1-orange)](https://www.grafana.com)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml)

## Introduction

The Apache ECharts plugin is a visualization panel for Grafana that allows you to incorporate popular Apache ECharts libraries into your Grafana dashboard.

[Apache ECharts libraries](https://echarts.apache.org/en/index.html) is a free, powerful charting and visualization library with statistical capabilities. It is written in pure JavaScript and based on zrender, which is a whole new lightweight canvas library.

[![Apache ECharts panel for Grafana | How to create modern dashboards in Grafana | ECharts Tutorial](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/video.png)](https://youtu.be/DxqCrBEmrQw)

Apache ECharts panel offers an easy way of adding intuitive, interactive, and highly customizable charts into your Grafana dashboard. 

### Requirements

- **Grafana 8.5+, Grafana 9.0+** is required.

## Getting Started

Apache ECharts visualization panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or utilizing the Grafana command line tool. For the latter, use the following command:

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

## Features

- Provides Monaco Code Editor for:
   - Working with Grafana data frames (JavaScript),
   - Updating chart configurations in JSON format.
- Supports Code Auto formatting.
- Executes the `setOption()` function using Monaco Code Editor content.
- Supports variables and location service to make Charts interactive.
- Based on the ECharts 5.4.1.
- Supports Light and Dark modes synchronized with Grafana Theme.
- Supports SVG and Canvas renderers.
- Includes USA and World GeoJSON maps. Allows adding custom Map files in the `maps` folder.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill), which is usually used to represent data in percentage.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl), which providing 3D plots, globe visualization, and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Supports Code Editor suggestions for Parameters and variables.
- Allows displaying Success and Error notifications.
- Supports Baidu, Gaode, Google maps using API. Requires to provide access key.
- Supports real-time data updates using streaming Data Sources and Grafana Live.
- Has 100+ ready-as-is examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

[![Examples](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/examples.png)](https://echarts.volkovlabs.io)

## Documentation

| Section | Description |
| -- | -- |
| [setOption() Function](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/options) | Explains how to configure the main Apache ECharts library function. |
| [Data Sources](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/datasources) | Demonstrates how to retrieve data from data sources. |
| [Examples](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/examples) | Explains how to get started with ECharts Examples. |
| [Streaming](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/streaming) | Explains how to configure Apache ECharts for real-time data updates using streaming Data Sources and Grafana Live. |
| [Variables](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/variables) | Demonstrated how to replace Dashboard and Global variables. |
| Tutorials |
| [Directed Graph](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials/graph) | Explains how to build and visualize directed graphs. |
| [PNG and SVG images](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials/images) | Explains how to use images in various formats. |
| [Statistical and Data Mining](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials/ecstat) | Explains how to use statistical and data mining library. |
| Maps |
| [Baidu](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/baidu) | Demonstrates how to work with Baidu Maps. |
| [Gaode](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/gaode) | Demonstrates how to work with Gaode Maps.|
| [Google](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/google)| Demonstrates how to work with Google Maps. |

## Tutorials

### Data Sources

[![How to use Data Source in Apache ECharts in 90 seconds | Grafana Data attribute](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/datasource.png)](https://youtu.be/K5YNMSIm9AM)

### PNG and SVG images

A quick guide for using images in Apache ECharts shows each type's prefixes.

[![Apache ECharts supports base64 PNG and SVG (vector) images | Prefixes for various types of pictures](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/images.png)](https://youtu.be/ygFDhmbPU-Y)

### Directed Graph

Data visualizations can and should be done in style. In two parts video tutorial Daria explained how we built and visualized directed graph in Grafana using Apache ECharts panel.

[![Build directional graph in Grafana using Apache ECharts | Tutorial part 1](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/tutorial1.png)](https://youtu.be/e3VHgpuzEF0)

[![Build directional graph in Grafana using Apache ECharts | Tutorial part 2](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/tutorial2.png)](https://youtu.be/oM7XAVlsOio)

### Dashboard and Global variables

[![Grafana variables | Dashboard, Global and Environment variables | Environment Data Source](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/variables.png)](https://youtu.be/sczRq2lI3e4)

### Histograms, Clustering, Regression

Mathematical and statistical functions to your extended visualization arsenal. 

[![Histograms, Clustering. Regression in Apache ECharts panel for Grafana | ecStat math, stat library](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/ecstat.png)](https://youtu.be/qfDrAW8-Mh8)

## Feedback

We love to hear from you. There are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).

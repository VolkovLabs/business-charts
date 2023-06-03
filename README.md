# Apache ECharts Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/dashboard.png)

![Grafana](https://img.shields.io/badge/Grafana-9.5.2-orange)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml)

## Introduction

The Apache ECharts plugin is a visualization panel for Grafana that allows you to incorporate the popular Apache ECharts library into your Grafana dashboard.

[Apache ECharts](https://echarts.apache.org/en/index.html) is a free, powerful charting and visualization library with statistical capabilities. It is written in pure JavaScript and based on zrender.

[![Apache ECharts panel for Grafana | How to create modern dashboards in Grafana | ECharts Tutorial](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/video.png)](https://youtu.be/DxqCrBEmrQw)

Apache ECharts visualization panel offers an easy way of adding intuitive, interactive, and highly customizable charts into your Grafana dashboard.

### Requirements

- **Grafana 8.5+, Grafana 9.0+** is required.

## Getting Started

Apache ECharts visualization panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or utilizing the Grafana command line tool.

For the latter, use the following command.

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

## Highlights

- Provides Monaco Code Editor for:
  - Working with Grafana data frames (JavaScript).
  - Updating chart configurations in JSON format.
  - Custom theme configuration.
- Supports variables and location service to make Charts interactive.
- Based on the ECharts 5.4.2.
- Supports Light and Dark themes synchronized with Grafana Theme.
- Supports SVG and Canvas renderers.
- Includes USA and World GeoJSON maps. Additional maps can be loaded dynamically.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill), which is usually used to represent data in percentage.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl), which provides 3D plots, globe visualization, and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Supports Code Editor suggestions for Parameters and variables.
- Supports Baidu, Gaode, and Google Maps using API. Requires to provide access key.
- Supports real-time data updates using streaming Data Sources and Grafana Live.
- Has 100+ ready-as-is examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

[![Examples](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/examples.png)](https://echarts.volkovlabs.io)

## Documentation

| Section                     | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| [ECharts Function](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/options/) | Explains how to configure the main Apache ECharts library function. |
| [Examples](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/examples/)        | Explains how to get started with ECharts Examples.                  |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/release/)    | Stay up to date with the latest features and updates.               |

### Features

| Section                      | Description                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Annotations](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/annotations/)         | Demonstrates how to use annotations.                                                                              |
| [Data Sources](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/datasources/)  | Demonstrates how to retrieve data from data sources.                                                               |
| [Event Handling](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/events/)     | Demonstrates how to react to the triggered events.                                                                 |
| [ECharts Instance](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/instance/) | Demonstrates how to interact with ECharts container.                                                               |
| [Streaming](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/streaming/)       | Explains how to configure Apache ECharts for real-time data updates using streaming Data Sources and Grafana Live. |
| [Theme Editor](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/theme/)              | Demonstrates how to use the theme editor.                                                                          |
| [Transformations](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/transformations/) | Demonstrates how to work with transformations.                                                                     |
| [Variables](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/variables/)       | Demonstrated how to replace Dashboard and Global variables.                                                        |

### Tutorials

| Section                                         | Description                                              |
| ----------------------------------------------- | -------------------------------------------------------- |
| [Directed Graph](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials/graph/)               | Explains how to build and visualize directed graphs.     |
| [PNG and SVG images](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials/images/)          | Explains how to use images in various formats.           |
| [Statistical and Data Mining](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials/ecstat/) | Explains how to use statistical and data mining library. |

### Maps

| Section                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| [GeoJSON](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/geojson/) | Demonstrates how to work with GeoJSON Maps.    |
| [Baidu](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/baidu/)     | Demonstrates how to work with Baidu Maps API.  |
| [Gaode](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/gaode/)     | Demonstrates how to work with Gaode Maps API.  |
| [Google](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/google/)   | Demonstrates how to work with Google Maps API. |

## Tutorials

How to use Data Source in Apache ECharts in 90 seconds. Data parameter explained.

[![How to use Data Source in Apache ECharts in 90 seconds | Grafana Data attribute](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/datasource.png)](https://youtu.be/K5YNMSIm9AM)

Three plugins that make Grafana complete. Dynamic Text, Data Manipulation, and Apache ECharts are all you need to create functional real-world web applications.

[![Magic JavaScript trio for Grafana | Dynamic Text, Data Manipulation and Apache ECharts plugins](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/magic-trio.png)](https://youtu.be/wPr4gZYzUVA)

## Feedback

We love to hear from you. There are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues/new/choose).
- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and add a comment.
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).

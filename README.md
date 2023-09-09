# Apache ECharts Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/dashboard.png)

![Grafana](https://img.shields.io/badge/Grafana-10.0-orange)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml)

## Introduction

The Apache ECharts Panel plugin is a data visualization extension for Grafana that allows you to integrate charts and graphs from the popular Apache ECharts library into your Grafana dashboard.

[Apache ECharts](https://echarts.apache.org/en/index.html) is a powerful and versatile data visualization library providing a wide range of chart types including statistical capabilities. It is written in pure JavaScript and based on [zrender](http://ecomfe.github.io/zrender/), a lightweight graphic library for chart rendering.

[![Apache ECharts panel for Grafana | Explore possibilities](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/overview.png)](https://youtu.be/S3PiL1p1v5U)

The Apache ECharts plugin offers an easy way of adding intuitive, interactive, and highly customizable charts into your Grafana dashboard.

## Requirements

- Apache ECharts Panel 5.X requires **Grafana 9** or **Grafana 10**.
- Apache ECharts Panel 3.X and 4.X require **Grafana 8.5** or **Grafana 9**.

## Getting Started

You can install Apache ECharts Panel from the [Grafana Plugins catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or using the Grafana command line tool.

For the latter, please use the following command.

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

## Highlights

- Provides [Monaco Code Editor](https://microsoft.github.io/monaco-editor/) for:
  - Working with Grafana data frames (JavaScript).
  - Updating chart configurations in the JSON format.
  - Customizing theme configurations.
- Supports variables and [locationService](https://grafana.com/docs/grafana/latest/developers/plugins/create-a-grafana-plugin/extend-a-plugin/add-support-for-variables/#set-a-variable-from-your-plugin) to make charts interactive.
- Based on [Apache ECharts 5.4.3](https://github.com/apache/echarts/releases/tag/5.4.3).
- Supports light and dark themes adjusted to the Grafana theme.
- Supports SVG and Canvas renderers.
- Includes USA and World GeoJSON maps. Additional maps can be loaded dynamically.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill) to represent data in percentage.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl) proving 3D plots, globe visualization, and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Supports Code Editor suggestions for parameters and variables.
- Supports Baidu, Gaode, and Google Maps using API. Requires the provision of the access key.
- Supports real-time data updates using streaming data sources and Grafana Live.
- Provides 100+ ready-to-use examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

[![Examples](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/examples.png)](https://echarts.volkovlabs.io)

## Documentation

| Section                     | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| [ECharts Function](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/options/) | Explains how to configure the main Apache ECharts library function. |
| [Examples](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/examples/)        | Explains how to get started with ECharts Examples.                  |
| [Features](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/features/)        | Demonstrates panel features.                                        |
| [Maps](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps/)                | Demonstrates how to work with different maps.                       |
| [Tutorials](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials/)      | Tutorials for Apache ECharts Panel.                                 |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/release/)    | Stay up to date with the latest features and updates.               |

## Feedback

We're looking forward to hearing from you. You can use different ways to get in touch with us.

- Ask a question, request a new feature, or report an issue at [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues/new/choose).
- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and leave your comments.
- Sponsor our open-source plugins for Grafana at [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Support our project by starring the repository.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).

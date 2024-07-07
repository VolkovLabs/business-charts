# Business Charts Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/dashboard.png)

![Grafana](https://img.shields.io/badge/Grafana-11.1-orange)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/E2E/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-echarts-panel/actions/workflows/codeql-analysis.yml)

## Introduction

The Business Charts Panel plugin is a visualization extension for Grafana powered by the Apache ECharts library.

The Business Charts Panel allows you to integrate charts and graphs created by the [Apache ECharts library](https://echarts.apache.org/en/index.html) into your Grafana dashboard.

Apache ECharts is a powerful and versatile data visualization library providing a wide range of chart types including statistical capabilities. It is written in pure JavaScript and based on [zrender](http://ecomfe.github.io/zrender/), a lightweight graphic library for chart rendering.

[![Business Charts panel for Grafana 6.0.0 powered by Apache ECharts library | Visual Editor tutorial](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/business-charts.png)](https://youtu.be/adOjUxrfysc)

The Business Charts plugin offers an easy way of adding intuitive, interactive, and highly customizable charts to your Grafana dashboard.

## Requirements

- Business Charts Panel 6.X requires **Grafana 10** or **Grafana 11**.
- Apache ECharts Panel 5.X requires **Grafana 9** or **Grafana 10**.
- Apache ECharts Panel 3.X and 4.X require **Grafana 8.5** or **Grafana 9**.

## Getting Started

You can install the Business Charts Panel from the [Grafana Plugins catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or using the Grafana command line tool.

For the latter, please use the following command.

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

## Highlights

- Provides [Monaco Code Editor](https://microsoft.github.io/monaco-editor/) for:
  - Working with Grafana data frames (JavaScript).
  - Updating chart configurations in the JSON format.
  - Customizing theme configurations.
- Supports Code Editor suggestions for parameters and variables.
- Supports SVG and Canvas renderers.
- Supports variables and [locationService](https://grafana.com/docs/grafana/latest/developers/plugins/create-a-grafana-plugin/extend-a-plugin/add-support-for-variables/#set-a-variable-from-your-plugin) to make charts interactive.
- Includes USA and World GeoJSON maps. Additional maps can be loaded dynamically.
- Supports Baidu, Gaode, and Google Maps using API with required provision of the access key.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl) proving 3D plots, globe visualization, and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill) to represent data in percentage.
- Supports real-time data updates using streaming data sources and Grafana Live.
- Supports light and dark themes adjusted to the Grafana theme.
- Based on [Apache ECharts 5.5.0](https://github.com/apache/echarts/releases/tag/5.5.0).
- Provides 100+ ready-to-use examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

[![Examples](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/examples.png)](https://echarts.volkovlabs.io)

## Documentation

| Section                                                                           | Description                                                              |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Charts Function](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/options) | Explains how to configure the main Apache ECharts library function.      |
| [Examples](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/examples)       | Explains how to get started with the Apache ECharts Examples in Grafana. |
| [Features](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/features)       | Demonstrates the Business Charts panel features.                         |
| [Maps](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/maps)               | Demonstrates how to work with different maps.                            |
| [Tutorials](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/tutorials)     | Tutorials for the Business Charts Panel.                                 |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/release)   | Stay up to date with the latest features and updates.                    |

## Feedback

We're looking forward to hearing from you. You can use different ways to get in touch with us.

- Ask a question, request a new feature, or report an issue at [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues).
- Subscribe to our [YouTube Channel](https://www.youtube.com/@volkovlabs) and leave your comments.
- Sponsor our open-source plugins for Grafana at [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Support our project by starring the repository.

## Acknowledgment

The Apache Software Foundation Apache ECharts, ECharts, Apache, the Apache feather, and the Apache ECharts project logo are either registered trademarks or trademarks of the Apache Software Foundation.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).

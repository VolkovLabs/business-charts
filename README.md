# Business Charts for Grafana

![Business Charts Dashboard](https://github.com/VolkovLabs/business-charts/raw/main/src/img/dashboard.png)

![Grafana](https://img.shields.io/badge/Grafana-12.0-orange)
[![YouTube Playlist](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
![CI](https://github.com/volkovlabs/business-charts/workflows/CI/badge.svg)
![E2E](https://github.com/volkovlabs/business-charts/workflows/E2E/badge.svg)
[![Codecov](https://codecov.io/gh/VolkovLabs/business-charts/branch/main/graph/badge.svg)](https://codecov.io/gh/VolkovLabs/business-charts)
[![CodeQL](https://github.com/VolkovLabs/business-charts/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/business-charts/actions/workflows/codeql-analysis.yml)

## Introduction

The **Business Charts** plugin integrates the powerful [Apache ECharts library](https://echarts.apache.org/en/index.html) into Grafana, enabling you to create rich, interactive charts and graphs within your dashboards. Built on pure JavaScript and leveraging [zrender](http://ecomfe.github.io/zrender/) for lightweight rendering, Apache ECharts offers a wide range of chart types and statistical tools.

Watch our tutorial video:

[![Business Charts 6.0.0 | Visual Editor Tutorial](https://raw.githubusercontent.com/volkovlabs/business-charts/main/img/business-charts.png)](https://youtu.be/adOjUxrfysc)

This plugin simplifies adding customizable, data-driven visualizations to Grafana, enhancing your ability to analyze and present business data effectively.

## Requirements

- **Business Charts 7.x**: Requires Grafana 11 or Grafana 12.
- **Business Charts 6.x**: Requires Grafana 10 or Grafana 11.
- **Apache ECharts 5.x**: Compatible with Grafana 9 or Grafana 10.
- **Apache ECharts 3.x and 4.x**: Works with Grafana 8.5 or Grafana 9.

## Getting Started

Install the Business Charts plugin from the [Grafana Plugins Catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or via the Grafana CLI:

```bash
grafana cli plugins install volkovlabs-echarts-panel
```

After installation, restart Grafana and add the Business Charts panel to your dashboard.

## Features

- **Monaco Code Editor**: Customize charts with:
  - JavaScript for Grafana data frames.
  - JSON for chart configurations.
  - Theme adjustments.
- **Code Assistance**: Autocomplete for parameters and variables.
- **Rendering Options**: Supports SVG and Canvas renderers.
- **Interactivity**: Uses variables and [locationService](https://grafana.com/docs/grafana/latest/developers/plugins/create-a-grafana-plugin/extend-a-plugin/add-support-for-variables/#set-a-variable-from-your-plugin) for dynamic charts.
- **Maps**: Includes USA and World GeoJSON maps; supports dynamic loading of additional maps.
- **External Map APIs**: Integrates Baidu, Gaode, and Google Maps (API key required).
- **Extensions**:
  - [ECharts-GL](https://github.com/ecomfe/echarts-gl): 3D plots, globe visualization, and WebGL acceleration.
  - [ecStat](https://github.com/ecomfe/echarts-stat): Statistical and data mining tools.
  - [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill): Percentage-based visualizations.
  - [Wordcloud](https://github.com/ecomfe/echarts-wordcloud): Word cloud charts.
- **Real-Time Updates**: Supports streaming data sources and Grafana Live.
- **Theming**: Adapts to Grafana’s light and dark themes.
- **ECharts Version**: Based on [Apache ECharts 5.5.1](https://github.com/apache/echarts/releases/tag/5.5.1).

### Examples

Over 100 ready-to-use examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

[![Example Charts](https://github.com/VolkovLabs/business-charts/raw/main/src/img/examples.png)](https://echarts.volkovlabs.io)

## Documentation

Explore detailed guides:

| Section                                                                      | Description                                          |
| ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Charts Function](https://volkovlabs.io/plugins/business-charts/options/)    | Configure the core Apache ECharts function.          |
| [Visual Editor](https://volkovlabs.io/plugins/business-charts/visualeditor/) | Use the Visual Editor for chart creation.            |
| [Examples](https://volkovlabs.io/plugins/business-charts/examples/)          | Get started with Apache ECharts examples in Grafana. |
| [Features](https://volkovlabs.io/plugins/business-charts/features/)          | Discover all plugin capabilities.                    |
| [Maps](https://volkovlabs.io/plugins/business-charts/maps/)                  | Work with various map types.                         |
| [Tutorials](https://volkovlabs.io/plugins/business-charts/tutorials/)        | Follow step-by-step tutorials.                       |
| [Release Notes](https://volkovlabs.io/plugins/business-charts/release/)      | Track the latest updates and features.               |

## Business Suite for Grafana

Business Charts is part of the **Business Suite**, a collection of open-source Grafana plugins by [Volkov Labs](https://volkovlabs.io/). These plugins address common business needs with intuitive interfaces, comprehensive documentation, and video tutorials.

[![Business Suite for Grafana](https://raw.githubusercontent.com/VolkovLabs/.github/main/business.png)](https://volkovlabs.io/plugins/)

### Enterprise Support

Upgrade to [Business Suite Enterprise](https://volkovlabs.io/pricing/) for premium support:

- Dedicated Zendesk support team.
- Priority feature requests and bug fixes.
- In-person consultations.
- Access to Business Intelligence tools.

## Feedback & Contributions

We value your input! Get involved:

- **Issues**: Report bugs or suggest features at [GitHub Issues](https://github.com/volkovlabs/business-charts/issues).
- **YouTube**: Subscribe to [Volkov Labs](https://youtube.com/@volkovlabs) and comment on videos.

## Acknowledgments

Apache ECharts, ECharts, Apache, the Apache feather logo, and the Apache ECharts project logo are registered trademarks or trademarks of The Apache Software Foundation.

## License

Licensed under the [Apache License 2.0](https://github.com/volkovlabs/business-charts/blob/main/LICENSE).

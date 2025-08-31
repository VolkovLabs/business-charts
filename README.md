# Business Charts for Grafana

![Business Charts Dashboard](https://github.com/VolkovLabs/business-charts/raw/main/src/img/dashboard.png)

[![Grafana](https://img.shields.io/badge/Grafana-12.1-orange)](https://grafana.com/)
[![YouTube Playlist](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
[![CI](https://github.com/volkovlabs/business-charts/workflows/CI/badge.svg)](https://github.com/volkovlabs/business-charts/actions/workflows/ci.yml)
[![E2E](https://github.com/volkovlabs/business-charts/workflows/E2E/badge.svg)](https://github.com/volkovlabs/business-charts/actions/workflows/e2e.yml)
[![Codecov](https://codecov.io/gh/VolkovLabs/business-charts/branch/main/graph/badge.svg)](https://codecov.io/gh/VolkovLabs/business-charts)
[![CodeQL](https://github.com/VolkovLabs/business-charts/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/business-charts/actions/workflows/codeql-analysis.yml)

**Business Charts** is a powerful Grafana plugin that integrates the [Apache ECharts library](https://echarts.apache.org/en/index.html) to create dynamic, interactive visualizations for your dashboards. Built with pure JavaScript and lightweight rendering via [zrender](http://ecomfe.github.io/zrender/), this plugin offers a wide variety of chart types and advanced statistical tools to enhance business data analysis.

## 📺 **Watch the Tutorial**

[![Business Charts 6.0.0 | Visual Editor Tutorial](https://raw.githubusercontent.com/volkovlabs/business-charts/main/img/business-charts.png)](https://youtu.be/adOjUxrfysc)

## 🚀 Key Features

- **Monaco Code Editor**: Customize charts using JavaScript for Grafana data frames, JSON for configurations, and theme adjustments.
- **Code Assistance**: Enjoy autocomplete for parameters and variables.
- **Rendering Options**: Choose between SVG and Canvas renderers for optimal performance.
- **Interactivity**: Leverage variables and [locationService](https://grafana.com/docs/grafana/latest/developers/plugins/create-a-grafana-plugin/extend-a-plugin/add-support-for-variables/#set-a-variable-from-your-plugin) for dynamic visualizations.
- **Maps**: Includes USA and World GeoJSON maps, with support for dynamically loading additional maps.
- **External Map APIs**: Integrate with Baidu, Gaode, and Google Maps (API key required).
- **Extensions**:
  - [ECharts-GL](https://github.com/ecomfe/echarts-gl): 3D plots, globe visualizations, and WebGL acceleration.
  - [ecStat](https://github.com/ecomfe/echarts-stat): Advanced statistical and data mining tools.
  - [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill): Visualize percentages with fluid animations.
  - [Wordcloud](https://github.com/ecomfe/echarts-wordcloud): Create engaging word cloud charts.
- **Real-Time Updates**: Support for streaming data sources and Grafana Live.
- **Theming**: Seamlessly adapts to Grafana’s light and dark themes.
- **ECharts Version**: Powered by [Apache ECharts 5.5.1](https://github.com/apache/echarts/releases/tag/5.5.1).

### Explore Examples

Discover over 100 ready-to-use chart examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

[![Example Charts](https://github.com/VolkovLabs/business-charts/raw/main/src/img/examples.png)](https://echarts.volkovlabs.io)

## 📋 Requirements

| Plugin Version             | Compatible Grafana Versions |
| -------------------------- | --------------------------- |
| **Business Charts 7.x**    | Grafana 11 or 12            |
| **Business Charts 6.x**    | Grafana 10 or 11            |
| **Apache ECharts 5.x**     | Grafana 9 or 10             |
| **Apache ECharts 3.x/4.x** | Grafana 8.5 or 9            |

## 🛠️ Installation

Install the Business Charts plugin via the [Grafana Plugins Catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or using the Grafana CLI:

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

After installation, restart Grafana and add the **Business Charts** panel to your dashboard.

### 📺 **Need help with installation?**

[![Install Business Suite Plugins in Cloud, OSS, Enterprise](https://raw.githubusercontent.com/volkovlabs/.github/main/started.png)](https://youtu.be/1qYzHfPXJF8)

## 📚 Documentation

Dive into detailed guides to make the most of Business Charts:

| Section                                                                      | Description                                        |
| ---------------------------------------------------------------------------- | -------------------------------------------------- |
| [Charts Function](https://volkovlabs.io/plugins/business-charts/options/)    | Configure core Apache ECharts functions.           |
| [Visual Editor](https://volkovlabs.io/plugins/business-charts/visualeditor/) | Create charts effortlessly with the Visual Editor. |
| [Examples](https://volkovlabs.io/plugins/business-charts/examples/)          | Start with ready-made Apache ECharts examples.     |
| [Features](https://volkovlabs.io/plugins/business-charts/features/)          | Explore all plugin capabilities.                   |
| [Maps](https://volkovlabs.io/plugins/business-charts/maps/)                  | Learn to work with various map types.              |
| [Tutorials](https://volkovlabs.io/plugins/business-charts/tutorials/)        | Follow step-by-step guides.                        |
| [Release Notes](https://volkovlabs.io/plugins/business-charts/release/)      | Stay updated with the latest features and fixes.   |

## 🌟 Business Suite for Grafana

Business Charts is part of the **Business Suite**, a collection of open-source Grafana plugins by [Volkov Labs](https://volkovlabs.io/). Designed for common business needs, these plugins feature intuitive interfaces, detailed documentation, and supporting video tutorials.

[![Business Suite for Grafana](https://raw.githubusercontent.com/VolkovLabs/.github/main/business.png)](https://volkovlabs.io/plugins/)

## 🙏 Acknowledgments

Apache ECharts, ECharts, Apache, the Apache feather logo, and the Apache ECharts project logo are registered trademarks or trademarks of The Apache Software Foundation.

## 📜 License

This project is licensed under the [Apache License 2.0](https://github.com/volkovlabs/business-charts/blob/main/LICENSE).

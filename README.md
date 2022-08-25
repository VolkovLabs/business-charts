# Apache ECharts Panel plugin for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/dashboard.png)

[![Grafana 9](https://img.shields.io/badge/Grafana-9.1.0-orange)](https://www.grafana.com)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-panel)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/VolkovLabs/volkovlabs-echarts-panel.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/VolkovLabs/volkovlabs-echarts-panel/context:javascript)

## Introduction

The ECharts Panel is a plugin for Grafana that allows to visualize Apache ECharts on your Grafana dashboard.

Apache ECharts is a free, powerful charting and visualization library offering an easy way of adding intuitive, interactive, and highly customizable charts to your commercial products. It is written in pure JavaScript and based on zrender, which is a whole new lightweight canvas library.

[![Apache ECharts panel for Grafana | How to create modern dashboards in Grafana | ECharts Tutorial](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/video.png)](https://youtu.be/DxqCrBEmrQw)

### Requirements

- Grafana 8.5+, Grafana 9.0+ is required.

## Getting Started

Apache ECharts panel can be installed from the Grafana Marketplace or use the `grafana-cli` tool to install from the command line:

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

## Features

- Allows to visualize Apache ECharts using Monaco Code Editor with Auto formatting.
- Use setOption() function to set configuration and data.
- Based on the ECharts 5.3.3.
- Supports Light and Dark mode synchronized with Grafana Theme.
- Supports SVG and Canvas renderer.
- Includes USA and World maps. Allows to add custom Map files in the `maps` folder.
- Supports variables and location service to make Charts interactive.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill).

## setOption() Function

Configuration item, data, universal interface, all parameters and data can all be modified through setOption() function in the plugin's options.
Available Parameters:

- `data` - Grafana's `data` object.
- `theme` - Grafana's `theme` object.
- `echartsInstance` - Instance of the ECharts.
- `echarts` - ECharts library.
- `replaceVariables` - the `replaceVariables()` function to interpolate variables.
- `locationService` - Grafana's `locationService` to work with browser location and history.

![Panel](https://github.com/VolkovLabs/volkovlabs-echarts-panel/raw/main/src/img/panel.png)

To learn more about parameters you can log them in the Browser Console:

```javascript
console.log(data, theme, echartsInstance, echarts, replaceVariables, locationService);
```

## Dashboard Variables

Use `replaceVariables()` function to replace Dashboard and Global variables.

```javascript
const email = replaceVariables('${__user.email}');
```

You can find [global built-in variables](https://grafana.com/docs/grafana/latest/variables/variable-types/global-variables/) in the Grafana documentation.

## Tutorial

### Directed Graph

Data visualizations can and should be done in style. In two parts video tutorial Daria explained how we built and visualized directed graph in Grafana using Apache ECharts panel.

[![Build directional graph in Grafana using Apache ECharts | Tutorial part 1](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/tutorial1.png)](https://youtu.be/e3VHgpuzEF0)

[![Build directional graph in Grafana using Apache ECharts | Tutorial part 2](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/tutorial2.png)](https://youtu.be/oM7XAVlsOio)

### PNG and SVG images

[![Apache ECharts supports base64 PNG and SVG (vector) images | Prefixes for various types of pictures](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/images.png)](https://youtu.be/ygFDhmbPU-Y)

## Feedback

We love to hear from users, developers, and the whole community interested in this plugin. These are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-panel/issues/new/choose).
- Star the repository to show your support.

## Contributing

- Fork the repository.
- Find an issue to work on and submit a pull request.
- Could not find an issue? Look for documentation, bugs, typos, and missing features.

## License

- Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-panel/blob/main/LICENSE).

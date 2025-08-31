# Changelog

All notable changes to **Business Charts** will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [7.1.0] - 2025-08-31

### Enhancements

- Updated ESLint configuration ([#374](https://github.com/volkovlabs/business-charts/issues/374)).
- Upgraded to **Grafana 12.1** and updated dependencies ([#378](https://github.com/volkovlabs/business-charts/issues/378)).

## [7.0.0] - 2025-07-21

### Breaking Changes

- Now requires **Grafana 11** or **Grafana 12**.

### Enhancements

- Removed `@volkovlabs/grafana-utils` dependency ([#362](https://github.com/volkovlabs/business-charts/issues/362)).
- Upgraded to **Grafana 12.0** and updated dependencies ([#371](https://github.com/volkovlabs/business-charts/issues/371)).

## [6.6.0] - 2025-02-20

### Enhancements

- Added end-to-end (E2E) tests ([#349](https://github.com/volkovlabs/business-charts/issues/349)).
- Updated packages for Code Editor ([#352](https://github.com/volkovlabs/business-charts/issues/352)).
- Upgraded to **Apache ECharts 5.6.0** and updated dependencies ([#355](https://github.com/volkovlabs/business-charts/issues/355)).
- Upgraded to **Grafana 11.5** and updated dependencies ([#361](https://github.com/volkovlabs/business-charts/issues/361)).
- Enhanced release workflow to include attestation ([#361](https://github.com/volkovlabs/business-charts/issues/361)).

## [6.5.0] - 2024-10-25

### Enhancements

- Improved autosize functionality in Code Editor toolbar ([#341](https://github.com/volkovlabs/business-charts/issues/341)).
- Updated refresh handling for dashboard scenes ([#346](https://github.com/volkovlabs/business-charts/issues/346)).
- Upgraded to **Grafana 11.3.0** and updated dependencies ([#346](https://github.com/volkovlabs/business-charts/issues/346)).

## [6.4.1] - 2024-09-16

### Enhancements

- Updated Gauge dashboard example ([#337](https://github.com/volkovlabs/business-charts/issues/337)).
- Enhanced Code Editor toolbar ([#338](https://github.com/volkovlabs/business-charts/issues/338)).

## [6.4.0] - 2024-09-11

### Enhancements

- Added Boxplot chart to Visual Editor ([#327](https://github.com/volkovlabs/business-charts/issues/327)).
- Upgraded to **Grafana 11.2** and updated dependencies ([#330](https://github.com/volkovlabs/business-charts/issues/330)).
- Added Scatter chart to Visual Editor and restricted selection to supported chart types ([#332](https://github.com/volkovlabs/business-charts/issues/332)).
- Enabled importing of promise-based libraries ([#333](https://github.com/volkovlabs/business-charts/issues/333)).
- Improved Code Editor toolbar ([#334](https://github.com/volkovlabs/business-charts/issues/334)).

## [6.3.0] - 2024-08-26

### Enhancements

- Introduced Visual Editor for Bar and Sunburst charts ([#322](https://github.com/volkovlabs/business-charts/issues/322)).
- Added expandable editors ([#324](https://github.com/volkovlabs/business-charts/issues/324)).
- Updated example dashboards ([#325](https://github.com/volkovlabs/business-charts/issues/325)).

## [6.2.0] - 2024-08-01

### Enhancements

- Upgraded to **Apache ECharts 5.5.1** ([#309](https://github.com/volkovlabs/business-charts/issues/309)).
- Improved E2E workflow using Docker ([#310](https://github.com/volkovlabs/business-charts/issues/310)).
- Updated migration for context parameters ([#317](https://github.com/volkovlabs/business-charts/issues/317)).
- Added Radar chart to Visual Editor ([#316](https://github.com/volkovlabs/business-charts/issues/316)).

## [6.1.0] - 2024-05-26

### Enhancements

- Added plugin E2E tests and removed Cypress ([#281](https://github.com/volkovlabs/business-charts/issues/281), [#283](https://github.com/volkovlabs/business-charts/issues/283)).
- Updated context parameters in example dashboards ([#282](https://github.com/volkovlabs/business-charts/issues/282)).
- Added Business Charts video tutorial ([#291](https://github.com/volkovlabs/business-charts/issues/291)).
- Enhanced provisioning for events ([#289](https://github.com/volkovlabs/business-charts/issues/289)).
- Improved panel options ([#289](https://github.com/volkovlabs/business-charts/issues/289)).
- Enhanced code suggestions in editor ([#293](https://github.com/volkovlabs/business-charts/issues/293)).
- Upgraded to **Grafana 11.0** and updated dependencies ([#294](https://github.com/volkovlabs/business-charts/issues/294)).

## [6.0.0] - 2024-03-24

### Breaking Changes

- Now requires **Grafana 10** or **Grafana 11**.
- Removed non-context code parameters; update scripts to use `context` (see migration guide below).

### Migration Guide

Update your code parameters as follows:

- `data` → `context.panel.data`
- `theme` → `context.grafana.theme`
- `echartsInstance` → `context.panel.chart`
- `echarts` → `context.echarts`
- `ecStat` → `context.ecStat`
- `replaceVariables` → `context.grafana.replaceVariables`
- `eventBus` → `context.grafana.eventBus`
- `locationService` → `context.grafana.locationService`
- `notifySuccess` → `context.grafana.notifySuccess`
- `notifyError` → `context.grafana.notifyError`

### Enhancements

- Renamed plugin to "Business Charts" ([#268](https://github.com/volkovlabs/business-charts/issues/268)).
- Added Apache acknowledgment and updated description ([#268](https://github.com/volkovlabs/business-charts/issues/268)).
- Upgraded to **Grafana 10.4.1** ([#270](https://github.com/volkovlabs/business-charts/issues/270)).
- Removed deprecated `ArrayVector` for Grafana 11 compatibility ([#272](https://github.com/volkovlabs/business-charts/issues/272)).
- Addressed Apache ECharts deprecation warnings ([#272](https://github.com/volkovlabs/business-charts/issues/272)).

## [5.3.0] - 2024-03-06

### Enhancements

- Upgraded to **Apache ECharts 5.5.0** ([#257](https://github.com/volkovlabs/business-charts/issues/257)).
- Enhanced code parameters with Code Parameters Builder ([#261](https://github.com/volkovlabs/business-charts/issues/261)).
- Improved autosize functionality in Code Editor ([#263](https://github.com/volkovlabs/business-charts/issues/263)).

## [5.2.0] - 2024-02-15

### Breaking Changes

- Now requires **Grafana 9.2** or **Grafana 10**.

### Enhancements

- Updated README and documentation ([#214](https://github.com/volkovlabs/business-charts/issues/214)).
- Added Visual Editor for data source integration ([#211](https://github.com/volkovlabs/business-charts/issues/211)).
- Updated ESLint configuration and refactored code ([#237](https://github.com/volkovlabs/business-charts/issues/237)).
- Updated dependencies and GitHub Actions ([#238](https://github.com/volkovlabs/business-charts/issues/238)).
- Added `context` parameter in non-visual mode ([#245](https://github.com/volkovlabs/business-charts/issues/245)).
- Implemented refresh function via Application Event Bus ([#247](https://github.com/volkovlabs/business-charts/issues/247)).
- Prevented selection of already chosen fields ([#251](https://github.com/volkovlabs/business-charts/issues/251)).
- Updated `echarts.volkovlabs.io` to leverage Visual Editor and data sources ([#248](https://github.com/volkovlabs/business-charts/issues/248)).
- Improved draggable handler in Visual Editor ([#256](https://github.com/volkovlabs/business-charts/issues/256)).

## [5.1.0] - 2023-08-11

### Enhancements

- Upgraded to **Grafana 10.0.3** ([#206](https://github.com/volkovlabs/business-charts/issues/206)).

### Bug Fixes

- Fixed memory leak caused by resubscribing to restore events ([#208](https://github.com/volkovlabs/business-charts/issues/208)).

## [5.0.0] - 2023-07-19

### Breaking Changes

- Now requires **Grafana 9** or **Grafana 10**.

### Enhancements

- Updated documentation ([#182](https://github.com/volkovlabs/business-charts/issues/182)).
- Updated examples for Grafana 10 ([#190](https://github.com/volkovlabs/business-charts/issues/190)).
- Added `Result v2` with unsubscribe function ([#188](https://github.com/volkovlabs/business-charts/issues/188)).
- Enhanced streaming to redraw charts ([#188](https://github.com/volkovlabs/business-charts/issues/188)).
- Upgraded to **Grafana 10.0.0** ([#191](https://github.com/volkovlabs/business-charts/issues/191)).
- Improved README and panel options ([#192](https://github.com/volkovlabs/business-charts/issues/192)).
- Removed Grafana 8.5 support ([#193](https://github.com/volkovlabs/business-charts/issues/193)).
- Upgraded to Grafana 10.0.2 dependencies ([#195](https://github.com/volkovlabs/business-charts/issues/195)).
- Updated ESLint configuration ([#196](https://github.com/volkovlabs/business-charts/issues/196)).
- Added Wordcloud extension ([#198](https://github.com/volkovlabs/business-charts/issues/198)).
- Upgraded to **Apache ECharts 5.4.3** ([#199](https://github.com/volkovlabs/business-charts/issues/199)).

## [4.5.0] - 2023-06-03

### Enhancements

- Migrated to Plugin Tools 1.5.2 ([#171](https://github.com/volkovlabs/business-charts/issues/171), [#176](https://github.com/volkovlabs/business-charts/issues/176)).
- Upgraded to Node 18 and npm ([#172](https://github.com/volkovlabs/business-charts/issues/172), [#173](https://github.com/volkovlabs/business-charts/issues/173)).
- Added alert for theme parsing errors ([#175](https://github.com/volkovlabs/business-charts/issues/175)).
- Updated default function to support Grafana 10 ([#178](https://github.com/volkovlabs/business-charts/issues/178)).
- Tested compatibility with Grafana 10 Preview ([#179](https://github.com/volkovlabs/business-charts/issues/179)).

## [4.4.0] - 2023-05-25

### Enhancements

- Increased test coverage and updated testing library ([#163](https://github.com/volkovlabs/business-charts/issues/163)).
- Upgraded to **Grafana 9.5.2** ([#164](https://github.com/volkovlabs/business-charts/issues/164)).
- Updated Google Maps extension to 1.6.0 ([#164](https://github.com/volkovlabs/business-charts/issues/164)).
- Added E2E Cypress testing ([#165](https://github.com/volkovlabs/business-charts/issues/165)).
- Introduced Theme Editor for custom themes ([#167](https://github.com/volkovlabs/business-charts/issues/167)).
- Updated documentation ([#166](https://github.com/volkovlabs/business-charts/issues/166), [#168](https://github.com/volkovlabs/business-charts/issues/168)).

## [4.3.1] - 2023-04-21

### Breaking Changes

- Removed `getDataSourceSrv` parameter for security reasons ([#156](https://github.com/volkovlabs/business-charts/issues/156)).

## [4.3.0] - 2023-04-16

### Enhancements

- Upgraded to **Grafana 9.4.7** ([#146](https://github.com/volkovlabs/business-charts/issues/146)).
- Added `getDataSourceSrv` parameter for data source access ([#146](https://github.com/volkovlabs/business-charts/issues/146)).
- Upgraded to **Apache ECharts 5.4.2** ([#147](https://github.com/volkovlabs/business-charts/issues/147)).
- Updated USA and World GeoJSON for GeoMap ([#154](https://github.com/volkovlabs/business-charts/issues/154)).
- Added support for Alert State and Annotations ([#155](https://github.com/volkovlabs/business-charts/issues/155)).

## [4.2.0] - 2023-03-04

### Enhancements

- Added `EventBus` parameter for event publishing ([#122](https://github.com/volkovlabs/business-charts/issues/122)).
- Upgraded to **Grafana 9.3.6** ([#132](https://github.com/volkovlabs/business-charts/issues/132)).
- Updated CI and release workflows ([#134](https://github.com/volkovlabs/business-charts/issues/134)).
- Removed extra padding with `NoPadding` ([#138](https://github.com/volkovlabs/business-charts/issues/138)).
- Set default background color to transparent ([#139](https://github.com/volkovlabs/business-charts/issues/139)).
- Added "Magic (JavaScript) Trio" tutorial ([#141](https://github.com/volkovlabs/business-charts/issues/141)).
- Upgraded to **Grafana 9.4.3** ([#142](https://github.com/volkovlabs/business-charts/issues/142)).

## [4.1.0] - 2023-01-12

### Enhancements

- Synchronized README with documentation ([#111](https://github.com/volkovlabs/business-charts/issues/111)).
- Added streaming support for WebSockets and Grafana Live ([#113](https://github.com/volkovlabs/business-charts/issues/113)).
- Moved InfluxDB example to a guest blog post ([#115](https://github.com/volkovlabs/business-charts/issues/115)).
- Updated documentation and tutorials in README ([#116](https://github.com/volkovlabs/business-charts/issues/116)).
- Added Data Zoom to default Line example ([#117](https://github.com/volkovlabs/business-charts/issues/117)).

## [4.0.0] - 2022-12-20

### Breaking Changes

- World and USA GeoJSON maps are no longer loaded by default; select `JSON` in the Maps option.

### Enhancements

- Updated ECharts examples on `https://echarts.volkovlabs.io` ([#103](https://github.com/volkovlabs/business-charts/issues/103)).
- Added Calendar examples on `https://echarts.volkovlabs.io` ([#105](https://github.com/volkovlabs/business-charts/issues/105)).
- Updated README and moved documentation to `docs.volkovlabs.io` ([#107](https://github.com/volkovlabs/business-charts/issues/107)).

### Bug Fixes

- Fixed JavaScript code in documentation ([#102](https://github.com/volkovlabs/business-charts/issues/102)).

## [3.8.0] - 2022-12-10

### Enhancements

- Updated documentation for event handling ([#80](https://github.com/volkovlabs/business-charts/issues/80)).
- Added Histograms, Clustering, and Regression tutorial ([#83](https://github.com/volkovlabs/business-charts/issues/83)).
- Added provisioning dashboards for ECharts examples on `https://echarts.volkovlabs.io` ([#91](https://github.com/volkovlabs/business-charts/issues/91)).
- Added Gaode map support ([#95](https://github.com/volkovlabs/business-charts/issues/95)).
- Upgraded to **Grafana 9.3.1** ([#97](https://github.com/volkovlabs/business-charts/issues/97)).
- Added Google Maps support ([#98](https://github.com/volkovlabs/business-charts/issues/98)).
- Refactored map support ([#99](https://github.com/volkovlabs/business-charts/issues/99)).
- Upgraded to **Apache ECharts 5.4.1** ([#101](https://github.com/volkovlabs/business-charts/issues/101)).

### Bug Fixes

- Fixed disabled format options ([#88](https://github.com/volkovlabs/business-charts/issues/88)).

## [3.7.0] - 2022-11-16

### Enhancements

- Restricted URL loading for Baidu maps ([#76](https://github.com/volkovlabs/business-charts/issues/76)).

## [3.6.0] - 2022-11-13

### Enhancements

- Updated CI to Node 16 and synced with release workflow ([#65](https://github.com/volkovlabs/business-charts/issues/65)).
- Upgraded to **Grafana 9.2.2** ([#66](https://github.com/volkovlabs/business-charts/issues/66)).
- Updated YouTube thumbnails ([#66](https://github.com/volkovlabs/business-charts/issues/66)).
- Updated CI to upload signed artifacts ([#68](https://github.com/volkovlabs/business-charts/issues/68)).
- Added Statistics tools (Regression, Clustering, etc.) ([#69](https://github.com/volkovlabs/business-charts/issues/69)).
- Added tutorial for reacting to mouse events ([#71](https://github.com/volkovlabs/business-charts/issues/71)).
- Added Monaco Code Editor suggestions for available parameters ([#32](https://github.com/volkovlabs/business-charts/issues/32)).
- Improved test coverage ([#8](https://github.com/volkovlabs/business-charts/issues/8)).
- Added status notifications for event handling ([#74](https://github.com/volkovlabs/business-charts/issues/74)).
- Added Baidu map support ([#64](https://github.com/volkovlabs/business-charts/issues/64)).
- Added tutorial on loading and using Baidu maps ([#75](https://github.com/volkovlabs/business-charts/issues/75)).

## [3.5.0] - 2022-10-04

### Enhancements

- Upgraded to **Apache ECharts 5.4.0** ([#52](https://github.com/volkovlabs/business-charts/issues/52)).
- Added Stacked Bar Graph (InfluxDB) example ([#55](https://github.com/volkovlabs/business-charts/issues/55)).
- Added examples to README and updated links in `plugin.json` ([#56](https://github.com/volkovlabs/business-charts/issues/56)).

## [3.4.0] - 2022-09-21

### Enhancements

- Upgraded to **Grafana 9.1.0** ([#37](https://github.com/volkovlabs/business-charts/issues/37)).
- Added YouTube tutorial for PNG/SVG images ([#38](https://github.com/volkovlabs/business-charts/issues/38)).
- Explained dashboard variable access in README ([#39](https://github.com/volkovlabs/business-charts/issues/39)).
- Upgraded to **Grafana 9.1.4** ([#44](https://github.com/volkovlabs/business-charts/issues/44)).
- Added Grafana Variables video ([#45](https://github.com/volkovlabs/business-charts/issues/45)).
- Added data source instructions to README ([#46](https://github.com/volkovlabs/business-charts/issues/46)).
- Added Compatibility Check workflow ([#49](https://github.com/volkovlabs/business-charts/issues/49)).
- Upgraded to **Grafana 9.1.6** ([#50](https://github.com/volkovlabs/business-charts/issues/50)).
- Added ECharts-GL extension for 3D plots, globe visualization, and WebGL acceleration ([#51](https://github.com/volkovlabs/business-charts/issues/51)).

## [3.3.0] - 2022-08-12

### Breaking Changes

- Signed as a Community Plugin.

### Enhancements

- Updated for inclusion in the Grafana Marketplace ([#35](https://github.com/volkovlabs/business-charts/issues/35)).

## [3.2.0] - 2022-08-09

### Enhancements

- Added YouTube video to README ([#29](https://github.com/volkovlabs/business-charts/issues/29)).
- Added YouTube tutorial ([#31](https://github.com/volkovlabs/business-charts/issues/31)).
- Upgraded to **Grafana 9.0.6** ([#34](https://github.com/volkovlabs/business-charts/issues/34)).

## [3.1.0] - 2022-07-11

### Enhancements

- Added `setOption()` description in README and options ([#12](https://github.com/volkovlabs/business-charts/issues/12)).
- Fixed missing Maps JSON files ([#14](https://github.com/volkovlabs/business-charts/issues/14)).
- Registered USA and World maps ([#20](https://github.com/volkovlabs/business-charts/issues/20)).
- Added auto-formatting ([#21](https://github.com/volkovlabs/business-charts/issues/21)).
- Rebuilt using **Grafana 9.0.2** ([#22](https://github.com/volkovlabs/business-charts/issues/22)).
- Added variables support (`replaceVariables`) in Code Editor ([#9](https://github.com/volkovlabs/business-charts/issues/9)).
- Added `locationService` parameter ([#24](https://github.com/volkovlabs/business-charts/issues/24)).
- Added Liquid Fill plugin ([#25](https://github.com/volkovlabs/business-charts/issues/25)).

### Bug Fixes

- Fixed chart destruction on reset zoom ([#13](https://github.com/volkovlabs/business-charts/issues/13)).

## [3.0.0] - 2022-06-19

### Breaking Changes

- Now requires **Grafana 8.5+** or **9.0+**.
- Switched to Monaco Code Editor from CodeMirror.
- Upgraded to **Apache ECharts 5.3.3**.
- Removed outdated ECharts extensions (`echarts-wordcloud`, `echarts-liquidfill`, `echarts-gl`).

### Enhancements

- Initial release based on `bilibala-echarts-panel` 2.2.4.
- Updated using Volkov Labs Panel Template 2.0.0.
- Refactored plugin ([#2](https://github.com/volkovlabs/business-charts/issues/2)).
- Replaced CodeMirror with Monaco Code Editor ([#3](https://github.com/volkovlabs/business-charts/issues/3)).
- Refactored panel and updated plugin files ([#4](https://github.com/volkovlabs/business-charts/issues/4)).
- Updated provisioning, screenshot, and removed Follow Theme ([#5](https://github.com/volkovlabs/business-charts/issues/5)).
- Added SVG and Canvas renderers ([#6](https://github.com/volkovlabs/business-charts/issues/6)).

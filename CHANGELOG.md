# Change Log

## 6.5.0 (2024-10-25)

### Features / Enhancements

- Updated Autosize Code Editor toolbar (#341)
- Updated refresh for dashboard scene (#346)
- Updated Grafana 11.3.0 and dependencies (#346)

## 6.4.1 (2024-09-16)

### Features / Enhancements

- Updated Gauge dashboard (#337)
- Updated Code Editor toolbar (#338)

## 6.4.0 (2024-09-11)

### Features / Enhancements

- Added Boxplot in Visual Editor (#327)
- Updated Grafana 11.2 dependencies (#330)
- Added Scatter to Visual editor and limit selection to supported charts (#332)
- Added promise libraries import (#333)
- Updated Code editor toolbar (#334)

## 6.3.0 (2024-08-26)

### Features / Enhancements

- Added visual editor for bar and sunburst (#322)
- Added Expandable Editors (#324)
- Updated Examples dashboards (#325)

## 6.2.0 (2024-08-01)

### Features / Enhancements

- Updated to Apache ECharts 5.5.1 (#309)
- Updated E2E workflow using Docker (#310)
- Updated migration for context parameters (#317)
- Added Radar to visual editor (#316)

## 6.1.0 (2024-05-26)

### Features / Enhancements

- Added plugin e2e tests and remove cypress (#281, #283)
- Updated context parameters in Examples (#282)
- Added Business Charts video tutorial (#291)
- Updated provisioning for events (#289)
- Updated panel options (#289)
- Updated Code suggestions (#293)
- Updated to Grafana 11.0 and dependencies (#294)

## 6.0.0 (2024-03-24)

### Breaking changes

- Requires Grafana 10 and Grafana 11.
- Removed non-context code parameters. Please update parameters to use `context`.

### Code parameters migration guide

- data -> context.panel.data
- theme -> context.grafana.theme
- echartsInstance -> context.panel.chart
- echarts -> context.echarts
- ecStat -> context.ecStat
- replaceVariables -> context.grafana.replaceVariables
- eventBus -> context.grafana.eventBus
- locationService -> context.grafana.locationService
- notifySuccess -> context.grafana.notifySuccess
- notifyError -> context.grafana.notifyError

### Features / Enhancements

- Updated name to Business Charts panel (#268)
- Added Apache Acknowledgment and update description (#268)
- Updated to Grafana 10.4.1 (#270)
- Removed ArrayVector deprecated in Grafana 11 (#272)
- Updated Apache ECharts deprecation warnings (#272)

## 5.3.0 (2024-03-06)

### Features / Enhancements

- Updated to Apache ECharts 5.5.0 (#257)
- Updated code parameters with Code Parameters Builder (#261)
- Updated auto size code editor (#263)

## 5.2.0 (2024-02-15)

### Breaking changes

- Requires Grafana 9.2 and Grafana 10

### Features / Enhancements

- Updated README and documentation (#214)
- Added visual editor for working with data sources (#211)
- Updated ESLint configuration and refactoring (#237)
- Updated dependencies and Actions (#238)
- Added context parameter to non-visual mode (#245)
- Added refresh function using Application Event Bus (#247)
- Updated to disallow to choose already selected fields (#251)
- Updated echarts.volkovlabs.io to use visual editor and data sources (#248)
- Updated draggable handler in Visual editor (#256)

## 5.1.0 (2023-08-11)

### Features / Enhancements

- Updated to Grafana 10.0.3 (#206)

### Bugfixes

- Fixed Memory Leak on resubscribing to restore event (#208)

## 5.0.0 (2023-07-19)

### Breaking changes

- Requires Grafana 9 and Grafana 10

### Features / Enhancements

- Updated Documentation (#182)
- Updated Examples to Grafana 10 (#190)
- Added Result v2 with unsubscribe function (#188)
- Updated Streaming to redraw charts (#188)
- Updated to Grafana 10.0.0 (#191)
- Updated README and panel options (#192)
- Removed Grafana 8.5 support (#193)
- Updated to Grafana 10.0.2 dependencies (#195)
- Updated ESLint configuration (#196)
- Added Wordcloud Extension (#198)
- Updated to Apache ECharts 5.4.3 (#199)

## 4.5.0 (2023-06-03)

### Features / Enhancements

- Migrate to Plugin Tools 1.5.2 (#171, #176)
- Update to Node 18 and npm (#172, #173)
- Add an alert for theme parsing error (#175)
- Update Default Function to support Grafana 10 (#178)
- Tested with Grafana 10 Preview (#179)

## 4.4.0 (2023-05-25)

### Features / Enhancements

- Increase Test Coverage and update test library (#163)
- Update to Grafana 9.5.2 (#164)
- Update Google Maps Extension to 1.6.0 (#164)
- Add E2E Cypress testing (#165)
- Add Theme Editor to allow custom themes (#167)
- Update documentation (#166, #168)

## 4.3.1 (2023-04-21)

### Breaking changes

- Due to security reasons, getDataSourceSrv parameter was removed (#156)

## 4.3.0 (2023-04-16)

### Features / Enhancements

- Update to Grafana 9.4.7 (#146)
- Add getDataSourceSrv parameter to retrieve the entry point to data sources (#146)
- Update to Apache ECharts 5.4.2 (#147)
- Update USA and World GeoJSON used in GeoMap (#154)
- Add Alert State and Annotations (#155)

## 4.2.0 (2023-03-04)

### Features / Enhancements

- Add `EventBus` to the available parameters to publish events (#122)
- Update to Grafana 9.3.6 (#132)
- Update CI and Release workflows (#134)
- Add NoPadding to remove extra padding around (#138)
- Set Background color to Transparent by default (#139)
- Add Magic (JavaScript) Trio tutorial (#141)
- Update to Grafana 9.4.3 (#142)

## 4.1.0 (2023-01-12)

### Features / Enhancements

- Synchronize the README file with Documentation (#111)
- Add Streaming Support for WebSockets and Grafana Live (#113)
- Move InfluxDB Example to the Guest Blog post (#115)
- Update Documentation and Tutorials in README (#116)
- Add Data Zoom to default Line Example (#117)

## 4.0.0 (2022-12-20)

### Breaking changes

- World and USA GeoJSON maps are not loaded by default. Please select `JSON` in the Maps option.

### Features / Enhancements

- Update ECharts Examples on https://echarts.volkovlabs.io (#103)
- Add Calendar Examples on https://echarts.volkovlabs.io (#105)
- Update README and move Documentation to docs.volkovlabs.io (#107)

### Bug fixes

- Fix javascript code in documentation (#102)

## 3.8.0 (2022-12-10)

### Features / Enhancements

- Update documentation for Event Handling (#80)
- Add Histograms, Clustering, Regression tutorial (#83)
- Add Provisioning dashboards for ECharts Examples on https://echarts.volkovlabs.io (#91)
- Add Gaode map support (#95)
- Update to Grafana 9.3.1 (#97)
- Add Google map support (#98)
- Refactor Maps support (#99)
- Update to Apache ECharts 5.4.1 (#101)

### Bug fixes

- Fix Disabled Format options (#88)

## 3.7.0 (2022-11-16)

### Features / Enhancements

- Limit the URL for loading the Baidu map (#76)

## 3.6.0 (2022-11-13)

### Features / Enhancements

- Update CI to Node 16 and Synchronize with Release workflow (#65)
- Update to Grafana 9.2.2 (#66)
- Update YouTube Thumbnails (#66)
- Update CI to upload signed artifacts (#68)
- Add Statistics tool (Regression, Clustering, etc.) (#69)
- Add how to react on mouse events (#71)
- Add Monaco Code Editor suggestions for available parameters (#32)
- Improve Tests Coverage (#8)
- Add Status notification on event handling (#74)
- Add Baidu map support (#64)
- Add Tutorial on how to load and use Baidu maps (#75)

## 3.5.0 (2022-10-04)

### Features / Enhancements

- Update to Apache ECharts 5.4.0 (#52)
- Add Stacked Bar Graph (InfluxDB) Example (#55)
- Add Examples to README and update links in Plugin.json (#56)

## 3.4.0 (2022-09-21)

### Features / Enhancements

- Update to Grafana 9.1.0 (#37)
- Add Youtube tutorial for PNG/SVG images (#38)
- Access to dashboard variables - explain in README (#39)
- Update to Grafana 9.1.4 (#44)
- Add Grafana Variables video (#45)
- Add Data Source instructions to README (#46)
- Add Compatibility Check Workflow (#49)
- Update to Grafana 9.1.6 (#50)
- Add ECharts-GL extension, which provides 3D plots, globe visualization and WebGL acceleration (#51)

## 3.3.0 (2022-08-12)

### Breaking changes

- Signed as Community Plugin.

### Features / Enhancements

- Update to be included in the Grafana Marketplace (#35)

## 3.2.0 (2022-08-09)

### Features / Enhancements

- Add YouTube video to README (#29)
- Add YouTube Tutorial (#31)
- Update to Grafana 9.0.6 (#34)

## 3.1.0 (2022-07-11)

### Features / Enhancements

- Add setOption() description in README And Options (#12)
- Maps json files are missing (#14)
- Registering USA and World maps (#20)
- Add Auto Formatting (#21)
- Rebuild using Grafana 9.0.2 (#22)
- Add Variables support (`replaceVariables`) in the Code Editor (#9)
- Add `locationService` parameter (#24)
- Add Liquid fill plugin (#25)

### Bug fixes

- Reset zoom will destroy the chart (#13)

## 3.0.0 (2022-06-19)

### Breaking changes

- Requires Grafana 8.5+ and 9.0+
- Uses Monaco Code Editor instead of Code Mirror
- Based on the ECharts 5.3.3
- Removes outdated ECharts Extensions (echarts-wordcloud, echarts-liquidfill, echarts-gl)

### Features / Enhancements

- Initial Release based on the bilibala-echarts-panel 2.2.4
- Updated based on Volkov Labs Panel Template 2.0.0
- Refactoring plugin (#2)
- Replace Code Mirror with Monaco Code Editor (#3)
- Refactor Panel and update plugin files (#4)
- Update Provisioning, Screenshot and remove Follow Theme (#5)
- Add SVG and Canvas Renderer (#6)

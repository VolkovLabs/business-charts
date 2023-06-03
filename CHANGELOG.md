# Change Log

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

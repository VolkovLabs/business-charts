# Change Log

## 3.6.0 (2022-11-13)

### Features / Enhancements

- Update CI to Node 16 and Synchronize with Release workflow (#65)
- Update to Grafana 9.2.2 (#66)
- Update YouTube Thumbnails (#66)
- Update CI to upload signed artifacts (#68)
- Add Statistics tool (Regression, Clustering, etc.) (#69)
- Add how to react on mouse events (#71)
- Added Monaco Code Editor suggestions for available parameters (#32)
- Improve Tests Coverage (#8)

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

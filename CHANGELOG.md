# Change Log

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

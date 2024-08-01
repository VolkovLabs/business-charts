import { AlertPayload, EventBus, GrafanaTheme2, InterpolateFunction, PanelData } from '@grafana/data';
import { LocationService } from '@grafana/runtime';
import { CodeEditorSuggestionItemKind } from '@grafana/ui';
import { CodeParameterItem, CodeParametersBuilder } from '@volkovlabs/components';
import { ECharts } from 'echarts';
import echartsStat from 'echarts-stat';

import { RadarChartOptions, SeriesItem } from '../types';

/**
 * Base Code Parameters Config
 */
const baseParametersConfig = {
  detail: 'All passed possible properties and methods.',
  items: {
    panel: {
      detail: 'Panel instance properties.',
      items: {
        data: new CodeParameterItem<PanelData>('Panel data.'),
        chart: new CodeParameterItem<ECharts>('ECharts instance.'),
      },
    },
    grafana: {
      detail: 'Grafana properties and methods.',
      items: {
        eventBus: new CodeParameterItem<EventBus>('Panels events.'),
        locationService: new CodeParameterItem<LocationService>('Location service.'),
        replaceVariables: new CodeParameterItem<InterpolateFunction>(
          'Interpolate variables.',
          CodeEditorSuggestionItemKind.Method
        ),
        theme: new CodeParameterItem<GrafanaTheme2>('Theme object.'),
        notifySuccess: new CodeParameterItem<(payload: AlertPayload) => void>(
          'Display successful notification.',
          CodeEditorSuggestionItemKind.Method
        ),
        notifyError: new CodeParameterItem<(payload: AlertPayload) => void>(
          'Display error notification.',
          CodeEditorSuggestionItemKind.Method
        ),
        refresh: new CodeParameterItem<() => void>(
          'Refresh dashboard panels using application events.',
          CodeEditorSuggestionItemKind.Method
        ),
      },
    },
    echarts: new CodeParameterItem<typeof echarts>('Apache ECharts library.'),
    ecStat: new CodeParameterItem<typeof echartsStat>('A statistical and data mining tool for Apache ECharts.'),
  },
};

/**
 * Code Parameters
 */
export const codeParameters = new CodeParametersBuilder(baseParametersConfig);

/**
 * Visual Code Parameters
 */
export const visualCodeParameters = new CodeParametersBuilder({
  ...baseParametersConfig,
  items: {
    ...baseParametersConfig.items,
    editor: {
      detail: 'Editor properties.',
      items: {
        dataset: new CodeParameterItem<{ source: [string[], ...unknown[]] }>('ECharts dataset.'),
        series: new CodeParameterItem<SeriesItem[]>('ECharts series.'),
        radar: new CodeParameterItem<RadarChartOptions>('ECharts radar.'),
      },
    },
  },
});

import { AlertPayload, EventBus, InterpolateFunction, PanelData } from '@grafana/data';
import { LocationService } from '@grafana/runtime';
import { CodeEditorSuggestionItemKind, getTheme } from '@grafana/ui';
import { CodeParameterItem, CodeParametersBuilder } from '@volkovlabs/components';
import { ECharts } from 'echarts';

import { SeriesItem } from '../types';

/**
 * Get theme params
 * @param theme
 * @param detail
 */
const getThemeParams = <TObject extends object>(theme: TObject, detail: string): any => ({
  detail,
  items: {
    ...Object.entries(theme).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return {
          ...acc,
          [key]: getThemeParams(value, key),
        };
      }

      return {
        ...acc,
        [key]: new CodeParameterItem<typeof value>(key),
      };
    }, {}),
  },
});

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
        theme: getThemeParams(getTheme(), 'Theme object'),
        notifySuccess: new CodeParameterItem<(payload: AlertPayload) => void>(
          'Display successful notification.',
          CodeEditorSuggestionItemKind.Method
        ),
        notifyError: new CodeParameterItem<(payload: AlertPayload) => void>(
          'Display error notification.',
          CodeEditorSuggestionItemKind.Method
        ),
        refresh: new CodeParameterItem<() => void>('Refresh dashboard.', CodeEditorSuggestionItemKind.Method),
      },
    },
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
        dataset: new CodeParameterItem<{ source: [string[], ...unknown[]] }>('Echarts dataset.'),
        series: new CodeParameterItem<SeriesItem[]>('Echarts series.'),
      },
    },
  },
});

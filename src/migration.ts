import { PanelModel } from '@grafana/data';
import semver from 'semver';

import { EditorMode } from './constants';
import { PanelOptions } from './types';

/**
 * Outdated Panel Options
 */
interface OutdatedPanelOptions extends Omit<PanelOptions, 'editorMode'> {
  /**
   * Editor Mode introduced in 5.2.0
   */
  editorMode?: EditorMode;
}

/**
 * Normalize Get Option
 */
const normalizeGetOption = (code: string): string => {
  const search =
    /(data.series|replaceVariables\(|theme\.|echartsInstance\.|echarts\.|ecStat\.|eventBus|locationService|notifySuccess\(|notifyError\()/gm;

  return code.replace(search, (value) => {
    switch (value) {
      case 'data.series': {
        return 'context.panel.data.series';
      }
      case 'replaceVariables(': {
        return 'context.grafana.replaceVariables(';
      }
      case 'theme.': {
        return 'context.grafana.theme.';
      }
      case 'echartsInstance.': {
        return 'context.panel.chart.';
      }
      case 'echarts.': {
        return 'context.echarts.';
      }
      case 'ecStat.': {
        return 'context.ecStat.';
      }
      case 'eventBus': {
        return 'context.grafana.eventBus';
      }
      case 'locationService': {
        return 'context.grafana.locationService';
      }
      case 'notifySuccess(': {
        return 'context.grafana.notifySuccess(';
      }
      case 'notifyError(': {
        return 'context.grafana.notifyError(';
      }
      default: {
        return value;
      }
    }
  });
};

/**
 * Get Migrated Options
 *
 * @param panel
 */
export const getMigratedOptions = (panel: PanelModel<OutdatedPanelOptions>): PanelOptions => {
  const { ...options } = panel.options;

  /**
   * Set code editor mode if not defined
   */
  if (!options.editorMode) {
    options.editorMode = EditorMode.CODE;
  }

  /**
   * Normalize non context code parameters before 6.0.0
   */
  if (panel.pluginVersion && semver.lt(panel.pluginVersion, '6.0.0')) {
    options.getOption = normalizeGetOption(options.getOption);
  }

  return options;
};

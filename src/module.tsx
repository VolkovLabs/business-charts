import { PanelPlugin } from '@grafana/data';
import { EChartsEditor, EChartsPanel } from './components';
import { DefaultOptions } from './constants';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EChartsPanel).setPanelOptions((builder) => {
  builder
    .addBooleanSwitch({
      path: 'followTheme',
      name: 'Follow Grafana Theme',
      description: 'Use default theme or follow theme of grafana (light or dark).',
      defaultValue: DefaultOptions.followTheme,
    })
    .addSliderInput({
      path: 'editor.height',
      name: 'Height, px',
      defaultValue: DefaultOptions.editor.height,
      settings: {
        min: 100,
        max: 2000,
      },
      category: ['ECharts Editor'],
    })
    .addCustomEditor({
      id: 'getOption',
      path: 'getOption',
      name: 'Function',
      description: 'Return options called by ECharts. Parameters: data, theme, echartsInstance, echarts',
      defaultValue: DefaultOptions.getOption,
      category: ['ECharts Editor'],
      editor: EChartsEditor,
    });

  return builder;
});

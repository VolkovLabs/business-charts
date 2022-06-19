import { PanelPlugin } from '@grafana/data';
import { EchartsEditor, EchartsPanel } from './components';
import { DefaultOptions } from './constants';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EchartsPanel).setPanelOptions((builder) => {
  builder
    .addBooleanSwitch({
      path: 'followTheme',
      name: 'Follow Grafana Theme',
      description: 'Use default theme or follow theme of grafana (light or dark).',
      defaultValue: DefaultOptions.followTheme,
    })
    .addCustomEditor({
      id: 'getOption',
      path: 'getOption',
      name: 'Echarts options',
      description: 'Return options called by echarts or just use echartsInstance.setOption(...).',
      defaultValue: DefaultOptions.getOption,
      editor: EchartsEditor,
    });

  return builder;
});

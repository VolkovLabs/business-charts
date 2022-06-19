import { PanelPlugin } from '@grafana/data';
import { EChartsEditor, EChartsPanel } from './components';
import { DefaultOptions } from './constants';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EChartsPanel).setPanelOptions((builder) => {
  builder
    .addSliderInput({
      path: 'editor.height',
      name: 'Editor Height, px',
      defaultValue: DefaultOptions.editor.height,
      settings: {
        min: 100,
        max: 2000,
      },
    })
    .addCustomEditor({
      id: 'getOption',
      path: 'getOption',
      name: 'Function',
      description: 'Return options called by ECharts. Parameters: data, theme, echartsInstance, echarts',
      defaultValue: DefaultOptions.getOption,
      editor: EChartsEditor,
    });

  return builder;
});

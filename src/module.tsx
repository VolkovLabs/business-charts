import { PanelPlugin } from '@grafana/data';
import { EChartsEditor, EChartsPanel } from './components';
import { DefaultOptions, RendererOptions } from './constants';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EChartsPanel).setPanelOptions((builder) => {
  builder
    .addRadio({
      path: 'renderer',
      name: 'Renderer',
      description:
        'Canvas is more suitable for charts with a large number of elements. SVG has less memory usage, no blur when using the browser zoom.',
      settings: {
        options: RendererOptions,
      },
      defaultValue: DefaultOptions.renderer,
    })
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
      name: 'setOptions Function',
      description:
        'Should return options for setOptions(). Available parameters: data, theme, echartsInstance, echarts',
      defaultValue: DefaultOptions.getOption,
      editor: EChartsEditor,
    });

  return builder;
});

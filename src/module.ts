import { PanelPlugin } from '@grafana/data';
import { EChartsEditor, EChartsPanel } from './components';
import { DefaultOptions, FormatOptions, Map, MapOptions, RendererOptions } from './constants';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EChartsPanel).setPanelOptions((builder) => {
  builder.addRadio({
    path: 'renderer',
    name: 'Renderer',
    description:
      'Canvas is more suitable for charts with a large number of elements. SVG has less memory usage, no blur when using the browser zoom.',
    settings: {
      options: RendererOptions,
    },
    defaultValue: DefaultOptions.renderer,
  });

  /**
   * Editor
   */
  builder
    .addSliderInput({
      path: 'editor.height',
      name: 'Height, px',
      defaultValue: DefaultOptions.editor.height,
      settings: {
        min: 100,
        max: 2000,
      },
      category: ['Editor'],
    })
    .addRadio({
      path: 'editor.format',
      name: 'Formatting',
      settings: {
        options: FormatOptions,
      },
      defaultValue: DefaultOptions.editor.format,
      category: ['Editor'],
    });

  /**
   * Function
   */
  builder.addCustomEditor({
    id: 'getOption',
    path: 'getOption',
    name: 'setOptions() Function',
    description: 'Should return parameters and data for setOptions().',
    defaultValue: DefaultOptions.getOption,
    editor: EChartsEditor,
    category: ['Function'],
  });

  /**
   * Maps
   */
  builder
    .addRadio({
      path: 'map',
      name: 'Map',
      description: 'ECharts Map, default is none, bmap is Baidu map.',
      settings: {
        options: MapOptions,
      },
      defaultValue: DefaultOptions.map,
    })
    .addTextInput({
      path: 'accessKey',
      name: 'Access Key',
      description:
        'Set Access Key to use Baidu Maps. You can get it from https://lbsyun.baidu.com/apiconsole/key#/home',
      defaultValue: '',
      showIf: (config) => config.map === Map.BMAP,
    });

  return builder;
});

import { PanelPlugin } from '@grafana/data';
import { EChartsEditor, EChartsPanel } from './components';
import { DefaultOptions, FormatOptions, Map, MapOptions, RendererOptions } from './constants';
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
    .addRadio({
      path: 'map',
      name: 'Maps',
      settings: {
        options: MapOptions,
      },
      defaultValue: DefaultOptions.map,
    });

  /**
   * Baidu
   */
  builder
    .addTextInput({
      path: 'baidu.key',
      name: 'Access Key',
      description:
        'Set Access Key to use Baidu Maps. You can get it from https://lbsyun.baidu.com/apiconsole/key#/home',
      defaultValue: DefaultOptions.baidu.key,
      showIf: (config) => config.map === Map.BMAP,
      category: ['Baidu'],
    })
    .addTextInput({
      path: 'baidu.callback',
      name: 'Callback',
      description: 'Name of the Callback function.',
      defaultValue: DefaultOptions.baidu.callback,
      showIf: (config) => config.map === Map.BMAP,
      category: ['Baidu'],
    });

  /**
   * Gaode
   */
  builder
    .addTextInput({
      path: 'gaode.key',
      name: 'Access Key',
      description: 'Set Access Key to use Gaode Maps. You can get it from https://console.amap.com/dev/key/app',
      defaultValue: DefaultOptions.gaode.key,
      showIf: (config) => config.map === Map.AMAP,
      category: ['Gaode'],
    })
    .addTextInput({
      path: 'gaode.plugin',
      name: 'Plugins',
      description: 'Name of the Plugins to use.',
      defaultValue: DefaultOptions.gaode.plugin,
      showIf: (config) => config.map === Map.AMAP,
      category: ['Gaode'],
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
    })
    .addCustomEditor({
      id: 'getOption',
      path: 'getOption',
      name: 'Function',
      description: 'Should return parameters and data for setOptions().',
      defaultValue: DefaultOptions.getOption,
      editor: EChartsEditor,
      category: ['Editor'],
    });

  return builder;
});

import { PanelPlugin } from '@grafana/data';
import { EChartsEditor, EChartsPanel } from './components';
import { DefaultOptions, FormatOptions, RendererOptions, MapOptions } from './constants';
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
    name: 'Should return options for setOptions()',
    description: 'Parameters: data, theme, echartsInstance, echarts, replaceVariables, locationService',
    defaultValue: DefaultOptions.getOption,
    editor: EChartsEditor,
    category: ['Function'],
  });

  /**
   * Type
   */

  builder.addRadio({
    path: 'map',
    name: 'Map',
    description:
      'Echarts Map, default is none, bmap is baidu map, amap is amap map, if you want to use map, you need to get a ak from baidu',
    settings: {
      options: MapOptions,
    },
    defaultValue: DefaultOptions.map,
  })
  .addTextInput({
    path: 'ak',
    name: 'ak',
    description: 'Bmap ak, if you want to use bmap, you need to set ak. https://lbsyun.baidu.com/apiconsole/key#/home',
    defaultValue: 'ak',
    showIf: config => config.map === 'bmap' || config.map === 'amap',
  });
  return builder;
});

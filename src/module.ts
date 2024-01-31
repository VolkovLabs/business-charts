import { PanelPlugin } from '@grafana/data';

import { EChartsEditor, EChartsPanel, VisualEditor } from './components';
import {
  DefaultOptions,
  Editor,
  EditorMode,
  EditorModeOptions,
  FormatOptions,
  Map,
  MAP_OPTIONS,
  RendererOptions,
  Theme,
  ThemeOptions,
} from './constants';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EChartsPanel)
  .setNoPadding()
  .setPanelOptions((builder) => {
    const isCodeEditor = (config: PanelOptions) => config.editorMode !== EditorMode.VISUAL;
    const isVisualEditor = (config: PanelOptions) => config.editorMode === EditorMode.VISUAL;

    builder
      .addRadio({
        path: 'renderer',
        name: 'Renderer',
        settings: {
          options: RendererOptions,
        },
        defaultValue: DefaultOptions.renderer,
      })
      .addRadio({
        path: 'map',
        name: 'Maps',
        settings: {
          options: MAP_OPTIONS,
        },
        defaultValue: DefaultOptions.map,
      })
      .addRadio({
        path: 'themeEditor.name',
        name: 'Theme',
        settings: {
          options: ThemeOptions,
        },
        defaultValue: Theme.DEFAULT,
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
     * Google
     */
    builder
      .addTextInput({
        path: 'google.key',
        name: 'Access Key',
        description:
          'Set Access Key to use Google Maps. You can get it from https://console.cloud.google.com/apis/credentials',
        defaultValue: DefaultOptions.google.key,
        showIf: (config) => config.map === Map.GMAP,
        category: ['Google'],
      })
      .addTextInput({
        path: 'google.callback',
        name: 'Callback',
        description: 'Name of the Callback function.',
        defaultValue: DefaultOptions.google.callback,
        showIf: (config) => config.map === Map.GMAP,
        category: ['Google'],
      });

    /**
     * Editor
     */
    builder.addRadio({
      path: 'editorMode',
      name: 'Editor Mode',
      defaultValue: EditorMode.CODE,
      settings: {
        options: EditorModeOptions,
      },
      category: ['Editor'],
    });

    /**
     * Visual Editor
     */
    builder
      .addCustomEditor({
        id: 'visualEditor',
        path: 'visualEditor',
        name: 'Visual Editor',
        defaultValue: DefaultOptions.visualEditor,
        editor: VisualEditor,
        category: ['Visual Editor'],
        showIf: isVisualEditor,
      })
      .addSliderInput({
        path: 'visualEditor.codeHeight',
        name: 'Height, px',
        defaultValue: DefaultOptions.visualEditor.codeHeight,
        settings: {
          min: 100,
          max: 2000,
        },
        category: ['Visual Editor'],
        showIf: isVisualEditor,
      })
      .addCustomEditor({
        id: Editor.VISUALCODE,
        path: 'visualEditor.code',
        name: 'Function',
        description: 'Should return parameters and data for setOption() or an extended result object.',
        defaultValue: DefaultOptions.visualEditor.code,
        editor: EChartsEditor,
        category: ['Visual Editor'],
        showIf: isVisualEditor,
      });

    /**
     * Code Editor
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
        category: ['Code'],
        showIf: isCodeEditor,
      })
      .addRadio({
        path: 'editor.format',
        name: 'Formatting',
        settings: {
          options: FormatOptions,
        },
        defaultValue: DefaultOptions.editor.format,
        category: ['Code'],
        showIf: isCodeEditor,
      })
      .addCustomEditor({
        id: Editor.CODE,
        path: 'getOption',
        name: 'Function',
        description: 'Should return parameters and data for setOption() or an extended result object.',
        defaultValue: DefaultOptions.getOption,
        editor: EChartsEditor,
        category: ['Code'],
        showIf: isCodeEditor,
      });

    /**
     * Theme
     */
    builder
      .addSliderInput({
        path: 'themeEditor.height',
        name: 'Height, px',
        defaultValue: DefaultOptions.themeEditor.height,
        settings: {
          min: 100,
          max: 2000,
        },
        category: ['Theme'],
        showIf: (config) => config.themeEditor.name === Theme.CUSTOM,
      })
      .addCustomEditor({
        id: Editor.THEME,
        path: 'themeEditor.config',
        name: 'Configuration',
        description: 'Custom Theme from the Theme Builder.',
        defaultValue: DefaultOptions.themeEditor.config,
        editor: EChartsEditor,
        category: ['Theme'],
        showIf: (config) => config.themeEditor.name === Theme.CUSTOM,
      });

    return builder;
  })
  .setDataSupport({
    annotations: true,
    alertStates: true,
  });

import { PanelPlugin } from '@grafana/data';

import { EchartsEditor, EchartsPanel, VisualEditor } from './components';
import {
  DEFAULT_OPTIONS,
  Editor,
  EDITOR_MODE_OPTIONS,
  EditorMode,
  FORMAT_OPTIONS,
  Map,
  MAP_OPTIONS,
  RENDERER_OPTIONS,
  Theme,
  THEME_OPTIONS,
} from './constants';
import { getMigratedOptions } from './migration';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EchartsPanel)
  .setNoPadding()
  .setMigrationHandler(getMigratedOptions)
  .setPanelOptions((builder) => {
    const isCodeEditor = (config: PanelOptions) => config.editorMode !== EditorMode.VISUAL;
    const isVisualEditor = (config: PanelOptions) => config.editorMode === EditorMode.VISUAL;

    builder
      .addRadio({
        path: 'renderer',
        name: 'Renderer',
        settings: {
          options: RENDERER_OPTIONS,
        },
        defaultValue: DEFAULT_OPTIONS.renderer,
      })
      .addRadio({
        path: 'map',
        name: 'Maps',
        settings: {
          options: MAP_OPTIONS,
        },
        defaultValue: DEFAULT_OPTIONS.map,
      })
      .addRadio({
        path: 'themeEditor.name',
        name: 'Theme',
        settings: {
          options: THEME_OPTIONS,
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
        defaultValue: DEFAULT_OPTIONS.baidu.key,
        showIf: (config) => config.map === Map.BMAP,
        category: ['Baidu'],
      })
      .addTextInput({
        path: 'baidu.callback',
        name: 'Callback',
        description: 'Name of the Callback function.',
        defaultValue: DEFAULT_OPTIONS.baidu.callback,
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
        defaultValue: DEFAULT_OPTIONS.gaode.key,
        showIf: (config) => config.map === Map.AMAP,
        category: ['Gaode'],
      })
      .addTextInput({
        path: 'gaode.plugin',
        name: 'Plugins',
        description: 'Name of the Plugins to use.',
        defaultValue: DEFAULT_OPTIONS.gaode.plugin,
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
        defaultValue: DEFAULT_OPTIONS.google.key,
        showIf: (config) => config.map === Map.GMAP,
        category: ['Google'],
      })
      .addTextInput({
        path: 'google.callback',
        name: 'Callback',
        description: 'Name of the Callback function.',
        defaultValue: DEFAULT_OPTIONS.google.callback,
        showIf: (config) => config.map === Map.GMAP,
        category: ['Google'],
      });

    /**
     * Editor
     */
    builder
      .addRadio({
        path: 'editorMode',
        name: 'Editor Mode',
        defaultValue: EditorMode.VISUAL,
        settings: {
          options: EDITOR_MODE_OPTIONS,
        },
        category: ['Editor'],
      })
      .addRadio({
        path: 'editor.format',
        name: 'Formatting',
        settings: {
          options: FORMAT_OPTIONS,
        },
        defaultValue: DEFAULT_OPTIONS.editor.format,
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
        defaultValue: DEFAULT_OPTIONS.visualEditor,
        editor: VisualEditor,
        category: ['Visual Editor'],
        showIf: isVisualEditor,
      })
      .addCustomEditor({
        id: Editor.VISUALCODE,
        path: 'visualEditor.code',
        name: 'Function',
        description: 'Should return parameters and data for setOption() or an extended result object.',
        defaultValue: DEFAULT_OPTIONS.visualEditor.code,
        editor: EchartsEditor,
        category: ['Visual Editor'],
        showIf: isVisualEditor,
      });

    /**
     * Code Editor
     */
    builder.addCustomEditor({
      id: Editor.CODE,
      path: 'getOption',
      name: 'Function',
      description: 'Should return parameters and data for setOption() or an extended result object.',
      defaultValue: DEFAULT_OPTIONS.getOption,
      editor: EchartsEditor,
      category: ['Code'],
      showIf: isCodeEditor,
    });

    /**
     * Theme
     */
    builder.addCustomEditor({
      id: Editor.THEME,
      path: 'themeEditor.config',
      name: 'Configuration',
      description: 'Custom Theme from the Theme Builder.',
      defaultValue: DEFAULT_OPTIONS.themeEditor.config,
      editor: EchartsEditor,
      category: ['Theme'],
      showIf: (config) => config.themeEditor.name === Theme.CUSTOM,
    });

    return builder;
  })
  .setDataSupport({
    annotations: true,
    alertStates: true,
  });

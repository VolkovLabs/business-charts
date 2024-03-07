import { PanelPlugin } from '@grafana/data';

import { Map, Theme } from './constants';
import { plugin } from './module';

/**
 * Skip Register Maps
 */
jest.mock('./maps', () => ({
  registerMaps: () => {
    return;
  },
}));

/**
 * Mock echarts-wordcloud
 */
jest.mock('echarts-wordcloud', () => ({
  extendSeriesModel: jest.fn(),
}));

/*
 Plugin
 */
describe('plugin', () => {
  /**
   * Builder
   */
  const builder: any = {
    addCustomEditor: jest.fn().mockImplementation(() => builder),
    addSliderInput: jest.fn().mockImplementation(() => builder),
    addRadio: jest.fn().mockImplementation(() => builder),
    addTextInput: jest.fn().mockImplementation(() => builder),
  };

  it('Should be instance of PanelPlugin', () => {
    expect(plugin).toBeInstanceOf(PanelPlugin);
  });

  it('Should add inputs', () => {
    /**
     * Supplier
     */
    plugin['optionsSupplier'](builder);

    /**
     * Inputs
     */
    expect(builder.addCustomEditor).toHaveBeenCalled();
    expect(builder.addRadio).toHaveBeenCalled();
    expect(builder.addTextInput).toHaveBeenCalled();
  });

  describe('Inputs visibility', () => {
    beforeEach(() => {
      builder.addTextInput.mockClear();
    });

    const addInputImplementation =
      (config: { map?: Map; themeEditor?: { name: Theme } }, result: string[]) => (input: any) => {
        if (input.showIf && input.showIf(config)) {
          result.push(input.path);
        }
        return builder;
      };

    it('Should show inputs only for Baidu', () => {
      const shownInputPaths: string[] = [];
      builder.addTextInput.mockImplementation(addInputImplementation({ map: Map.BMAP }, shownInputPaths));
      plugin['optionsSupplier'](builder);
      expect(shownInputPaths).toEqual(expect.arrayContaining(['baidu.key', 'baidu.callback']));
    });

    it('Should show inputs only for Gaode', () => {
      const shownInputPaths: string[] = [];
      builder.addTextInput.mockImplementation(addInputImplementation({ map: Map.AMAP }, shownInputPaths));
      plugin['optionsSupplier'](builder);
      expect(shownInputPaths).toEqual(expect.arrayContaining(['gaode.key', 'gaode.plugin']));
    });

    it('Should show inputs only for Google', () => {
      const shownInputPaths: string[] = [];
      builder.addTextInput.mockImplementation(addInputImplementation({ map: Map.GMAP }, shownInputPaths));
      plugin['optionsSupplier'](builder);
      expect(shownInputPaths).toEqual(expect.arrayContaining(['google.key', 'google.callback']));
    });

    it('Should not show any inputs', () => {
      const shownInputPaths: string[] = [];
      builder.addTextInput.mockImplementation(addInputImplementation({ map: Map.NONE }, shownInputPaths));
      plugin['optionsSupplier'](builder);
      expect(shownInputPaths).toHaveLength(0);
    });

    it('Should show theme editor when theme is custom', () => {
      const shownSliderInputPaths: string[] = [];
      const shownEditorPaths: string[] = [];
      builder.addSliderInput.mockImplementation(
        addInputImplementation({ themeEditor: { name: Theme.CUSTOM } }, shownSliderInputPaths)
      );
      builder.addCustomEditor.mockImplementation(
        addInputImplementation({ themeEditor: { name: Theme.CUSTOM } }, shownEditorPaths)
      );

      plugin['optionsSupplier'](builder);

      expect(shownEditorPaths).toEqual(expect.arrayContaining(['themeEditor.config']));
    });
  });
});

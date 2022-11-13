import { PanelPlugin } from '@grafana/data';
import { plugin } from './module';

/**
 * Skip Register Maps
 */
jest.mock('./utils', () => ({
  registerMaps: () => {
    return;
  },
}));

/*
 Plugin
 */
describe('plugin', () => {
  it('Should be instance of PanelPlugin', () => {
    expect(plugin).toBeInstanceOf(PanelPlugin);
  });

  it('Should add inputs', () => {
    /**
     * Builder
     */
    const builder: any = {
      addCustomEditor: jest.fn().mockImplementation(() => builder),
      addSliderInput: jest.fn().mockImplementation(() => builder),
      addRadio: jest.fn().mockImplementation(() => builder),
      addTextInput: jest.fn().mockImplementation(() => builder),
    };

    /**
     * Supplier
     */
    plugin['optionsSupplier'](builder);

    /**
     * Inputs
     */
    expect(builder.addCustomEditor).toHaveBeenCalled();
    expect(builder.addSliderInput).toHaveBeenCalled();
    expect(builder.addRadio).toHaveBeenCalled();
    expect(builder.addTextInput).toHaveBeenCalled();
  });
});

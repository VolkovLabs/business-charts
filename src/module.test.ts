import { PanelPlugin } from '@grafana/data';
import { plugin } from './module';

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
      addBooleanSwitch: jest.fn().mockImplementation(() => builder),
      addCustomEditor: jest.fn().mockImplementation(() => builder),
      addSliderInput: jest.fn().mockImplementation(() => builder),
    };

    /**
     * Supplier
     */
    plugin['optionsSupplier'](builder);

    /**
     * Inputs
     */
    expect(builder.addBooleanSwitch).toHaveBeenCalled();
    expect(builder.addCustomEditor).toHaveBeenCalled();
    expect(builder.addSliderInput).toHaveBeenCalled();
  });
});

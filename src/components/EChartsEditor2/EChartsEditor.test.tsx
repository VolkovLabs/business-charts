import { shallow } from 'enzyme';
import React from 'react';
import { EChartsEditor } from './EChartsEditor';

/**
 * Editor
 */
describe('Editor', () => {
  it('Should find component', async () => {
    const getComponent = ({ options = {}, ...restProps }: any) => {
      return <EChartsEditor {...restProps} options={options} />;
    };

    const wrapper = shallow(getComponent({}));
    const div = wrapper.find('div');
    expect(div.exists()).toBeTruthy();
  });
});

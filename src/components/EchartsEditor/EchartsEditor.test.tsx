import { shallow } from 'enzyme';
import React from 'react';
import { EchartsEditor } from './EchartsEditor';

/**
 * Editor
 */
describe('Editor', () => {
  it('Should find component', async () => {
    const getComponent = ({ options = {}, ...restProps }: any) => {
      return <EchartsEditor {...restProps} options={options} />;
    };

    const wrapper = shallow(getComponent({}));
    const textarea = wrapper.find('textarea');
    expect(textarea.exists()).toBeTruthy();
  });
});

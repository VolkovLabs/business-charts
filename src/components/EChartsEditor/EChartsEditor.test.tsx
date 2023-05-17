import { render, screen } from '@testing-library/react'
import React from 'react';
import { EChartsEditor } from './EChartsEditor';

/**
 * Editor
 */
describe('Editor', () => {
  it('Should find component', async () => {
    const context = {
      options: { editor: { height: 300 } },
    };

    const getComponent = ({ ...restProps }: any) => {
      return <EChartsEditor {...restProps} context={context} />;
    };

    render(getComponent({}));
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });
});

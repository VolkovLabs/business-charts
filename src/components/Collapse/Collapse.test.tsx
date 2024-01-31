import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Collapse } from './Collapse';

type Props = React.ComponentProps<typeof Collapse>;

/**
 * In Test Ids
 */
const InTestIds = {
  header: 'data-testid header',
  content: 'data-testid content',
  buttonRemove: 'data-testid button-remove',
};

describe('Collapse', () => {
  /**
   * Get Tested Component
   */
  const getComponent = (props: Partial<Props>) => {
    return <Collapse headerTestId={InTestIds.header} contentTestId={InTestIds.content} {...props} />;
  };

  it('Should expand content', () => {
    const { rerender } = render(getComponent({ isOpen: false }));

    expect(screen.queryByTestId(InTestIds.content)).not.toBeInTheDocument();

    rerender(getComponent({ isOpen: true }));

    expect(screen.getByTestId(InTestIds.content)).toBeInTheDocument();
  });

  it('Actions should not affect collapse state', () => {
    const onToggle = jest.fn();

    render(getComponent({ onToggle, actions: <button data-testid={InTestIds.buttonRemove}>remove</button> }));

    fireEvent.click(screen.getByTestId(InTestIds.buttonRemove));

    expect(onToggle).not.toHaveBeenCalled();
  });
});

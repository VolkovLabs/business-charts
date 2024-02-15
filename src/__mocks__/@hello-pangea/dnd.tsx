import React from 'react';

const actual = jest.requireActual('@hello-pangea/dnd');

/**
 * Mock DragDropContext
 */
const DragDropContext = jest.fn(({ children }) => children);

/**
 * Mock Droppable
 */
const Droppable = jest.fn(({ children }) => children({}));

/**
 * Draggable
 */
const Draggable = jest.fn(({ children }) => (
  <div data-testid="draggable">
    {children(
      {
        draggableProps: {},
      },
      {}
    )}
  </div>
));

module.exports = {
  ...actual,
  DragDropContext,
  Droppable,
  Draggable,
};

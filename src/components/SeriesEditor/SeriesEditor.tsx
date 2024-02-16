import { Button, Icon, InlineField, InlineFieldRow, Input, useTheme2 } from '@grafana/ui';
import { DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, NotDraggingStyle } from '@hello-pangea/dnd';
import { Collapse } from '@volkovlabs/components';
import React, { useCallback, useMemo, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../types';
import { getSeriesUniqueId, getSeriesWithNewType, reorder } from '../../utils';
import { SeriesItemEditor } from '../SeriesItemEditor';
import { getStyles } from './SeriesEditor.styles';

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {SeriesItem[]}
   */
  value: SeriesItem[];

  /**
   * Dataset
   *
   * @type {DatasetItem[]}
   */
  dataset: DatasetItem[];

  /**
   * On Change
   * @param items
   */
  onChange: (items: SeriesItem[]) => void;
}

/**
 * Get Item Style
 */
const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  /**
   * styles we need to apply on draggables
   */
  ...draggableStyle,
});

/**
 * Series Editor
 * @constructor
 */
export const SeriesEditor: React.FC<Props> = ({ value, onChange, dataset }) => {
  /**
   * Styles and Theme
   */
  const theme = useTheme2();
  const styles = getStyles(theme);

  /**
   * States
   */
  const [items, setItems] = useState<SeriesItem[]>(value);
  const [newItem, setNewItem] = useState('');
  const [collapseState, setCollapseState] = useState<Record<string, boolean>>({});

  /**
   * Change Items
   */
  const onChangeItems = useCallback(
    (items: SeriesItem[]) => {
      setItems(items);
      onChange(items);
    },
    [onChange]
  );

  /**
   * Drag End
   */
  const onDragEnd = useCallback(
    (result: DropResult) => {
      /**
       * Dropped outside the list
       */
      if (!result.destination) {
        return;
      }

      onChangeItems(reorder(items, result.source.index, result.destination.index));
    },
    [items, onChangeItems]
  );

  /**
   * Toggle collapse state for item
   */
  const onToggleItem = useCallback((item: SeriesItem) => {
    setCollapseState((prev) => ({
      ...prev,
      [item.uid]: !prev[item.uid],
    }));
  }, []);

  /**
   * Add new item
   */
  const onAddNewItem = useCallback(() => {
    setNewItem('');
    const addedItem = getSeriesWithNewType({ id: newItem, name: '', uid: getSeriesUniqueId() }, SeriesType.LINE);
    onChangeItems(items.concat(addedItem));
    onToggleItem(addedItem);
  }, [items, newItem, onChangeItems, onToggleItem]);

  /**
   * Change Item
   */
  const onChangeItem = useCallback(
    (updatedItem: SeriesItem) => {
      onChangeItems(items.map((item) => (item.uid === updatedItem.uid ? updatedItem : item)));
    },
    [items, onChangeItems]
  );

  /**
   * Is Id Exists error
   */
  const isNameExistsError = useMemo(() => {
    return items.some((item) => item.id === newItem);
  }, [items, newItem]);

  return (
    <div data-testid={TEST_IDS.seriesEditor.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="series-editor">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.uid} draggableId={item.uid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      className={styles.item}
                    >
                      <Collapse
                        headerTestId={TEST_IDS.seriesEditor.itemHeader(item.id)}
                        contentTestId={TEST_IDS.seriesEditor.itemContent(item.id)}
                        isOpen={collapseState[item.uid]}
                        onToggle={() => onToggleItem(item)}
                        title={
                          <>
                            {item.name} [{item.id}]
                          </>
                        }
                        actions={
                          <>
                            <Button
                              icon="trash-alt"
                              variant="secondary"
                              fill="text"
                              size="sm"
                              className={styles.removeButton}
                              onClick={() => {
                                /**
                                 * Remove Item
                                 */
                                onChangeItems(items.filter((series) => series.uid !== item.uid));
                              }}
                              data-testid={TEST_IDS.seriesEditor.buttonRemove}
                            />
                            <div {...provided.dragHandleProps}>
                              <Icon name="draggabledots" className={styles.dragIcon} />
                            </div>
                          </>
                        }
                      >
                        <SeriesItemEditor value={item} onChange={onChangeItem} dataset={dataset} />
                      </Collapse>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <InlineFieldRow data-testid={TEST_IDS.seriesEditor.newItem}>
        <InlineField
          label="New Series"
          grow={true}
          invalid={isNameExistsError}
          error="Series with the same id already exists."
        >
          <Input
            placeholder="Unique Id"
            value={newItem}
            onChange={(event) => setNewItem(event.currentTarget.value)}
            data-testid={TEST_IDS.seriesEditor.newItemId}
          />
        </InlineField>
        <Button
          icon="plus"
          title="Add Series"
          disabled={!newItem || isNameExistsError}
          onClick={onAddNewItem}
          data-testid={TEST_IDS.seriesEditor.buttonAddNew}
        >
          Add
        </Button>
      </InlineFieldRow>
    </div>
  );
};

import React, { useCallback, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { Button, Icon, InlineField, InlineFieldRow, Input, useTheme2 } from '@grafana/ui';
import { TestIds } from '../../constants';
import { DatasetItem, SeriesItem } from '../../types';
import { reorder } from '../../utils';
import { Collapse } from '../Collapse';
import { SeriesItemEditor } from '../SeriesItemEditor';
import { Styles } from './SeriesEditor.styles';

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
  const styles = Styles(theme);

  /**
   * States
   */
  const [items, setItems] = useState<SeriesItem[]>(value);
  const [newItem, setNewItem] = useState('');
  const [collapseState, setCollapseState] = useState<Record<string, boolean>>({});

  /**
   /**
   * Change groups
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
   * Toggle collapse state for group
   */
  const onToggleGroup = useCallback((name: string) => {
    setCollapseState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  /**
   * Add new group
   */
  const onAddNewGroup = useCallback(() => {
    setNewItem('');
    onChangeItems(items.concat([{ id: newItem }]));
    onToggleGroup(newItem);
  }, [items, newItem, onChangeItems, onToggleGroup]);

  /**
   * Change Item
   */
  const onChangeItem = useCallback(
    (updatedItem: SeriesItem) => {
      onChangeItems(items.map((item) => (item.name === updatedItem.name ? updatedItem : item)));
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="groups-editor">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      className={styles.group}
                    >
                      <Collapse
                        key={item.id}
                        title={<div className={styles.groupHeader}>{item.id}</div>}
                        headerTestId={TestIds.seriesEditor.item(item.id)}
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
                                 * Remove group
                                 */
                                onChangeItems(items.filter((series) => series.id !== item.id));
                              }}
                              data-testid={TestIds.seriesEditor.buttonRemove}
                            />
                            <Icon name="draggabledots" {...provided.dragHandleProps} className={styles.dragIcon} />
                          </>
                        }
                        isOpen={collapseState[item.id]}
                        onToggle={() => onToggleGroup(item.id)}
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

      <InlineFieldRow className={styles.newGroup} data-testid={TestIds.seriesEditor.newItem}>
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
            data-testid={TestIds.seriesEditor.newItemName}
          />
        </InlineField>
        <Button
          icon="plus"
          title="Add Series"
          disabled={!newItem || isNameExistsError}
          onClick={onAddNewGroup}
          data-testid={TestIds.seriesEditor.buttonAddNew}
        >
          Add
        </Button>
      </InlineFieldRow>
    </>
  );
};

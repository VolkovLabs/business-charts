import React, { useCallback, useMemo, useState } from 'react';
import { cx } from '@emotion/css';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { Button, Icon, IconButton, InlineField, InlineFieldRow, Select, useStyles2 } from '@grafana/ui';
import { DataFrame, SelectableValue } from '@grafana/data';
import { TestIds } from '../../constants';
import { DatasetItem } from '../../types';
import { getDatasetItemUniqueName, reorder } from '../../utils';
import { Styles } from './DatasetEditor.styles';

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
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {DatasetItem[]}
   */
  value: DatasetItem[];

  /**
   * On Change
   *
   * @type {Function}
   */
  onChange: (items: DatasetItem[]) => void;

  /**
   * Data
   *
   * @type {DataFrame[]}
   */
  data: DataFrame[];
}

/**
 * Dataset Editor
 */
export const DatasetEditor: React.FC<Props> = ({ value, onChange, data }) => {
  /**
   * Styles and Theme
   */
  const styles = useStyles2(Styles);

  /**
   * States
   */
  const [items, setItems] = useState(value);
  const [newItem, setNewItem] = useState<(DatasetItem & { value: string }) | null>(null);

  /**
   * Change Items
   */
  const onChangeItems = useCallback(
    (items: DatasetItem[]) => {
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
   * Available Field Options
   */
  const availableFieldOptions = useMemo(() => {
    return data.reduce((acc: SelectableValue[], dataFrame) => {
      return acc.concat(
        dataFrame.fields.map((field) => ({
          value: `${dataFrame.refId}:${field.name}`,
          fieldName: field.name,
          label: `${dataFrame.refId ? `${dataFrame.refId}:` : ''}${field.name}`,
          source: dataFrame.refId,
        }))
      );
    }, []);
  }, [data]);

  /**
   * Add New Item
   */
  const onAddNewItem = useCallback(() => {
    if (newItem) {
      onChangeItems([
        ...items,
        {
          name: newItem.name,
          source: newItem.source,
        },
      ]);
      setNewItem(null);
    }
  }, [items, newItem, onChangeItems]);

  return (
    <div data-testid={TestIds.datasetEditor.root} className={styles.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dataset">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable
                  key={getDatasetItemUniqueName(item)}
                  draggableId={getDatasetItemUniqueName(item)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      className={styles.item}
                      data-testid={TestIds.datasetEditor.item(getDatasetItemUniqueName(item))}
                    >
                      <div className={styles.header}>
                        <div className={styles.column}>
                          {item.name && (
                            <div className={styles.titleWrapper}>
                              <div className={cx(styles.title)}>
                                {item.source ? `${item.source}:` : ''}
                                {item.name}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className={styles.column}>
                          <IconButton
                            name="trash-alt"
                            onClick={() =>
                              onChangeItems(
                                items.filter(
                                  (field) => getDatasetItemUniqueName(field) !== getDatasetItemUniqueName(item)
                                )
                              )
                            }
                            data-testid={TestIds.datasetEditor.buttonRemove}
                          />
                          <Icon
                            title="Drag and drop to reorder"
                            name="draggabledots"
                            size="lg"
                            className={styles.dragIcon}
                            {...provided.dragHandleProps}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <InlineFieldRow data-testid={TestIds.datasetEditor.newItem}>
        <InlineField label="New Item" grow={true}>
          <Select
            options={availableFieldOptions}
            value={newItem?.value || null}
            aria-label={TestIds.datasetEditor.newItemName}
            onChange={(event) => {
              setNewItem({
                value: event.value,
                source: event.source,
                name: event.fieldName,
              });
            }}
          />
        </InlineField>
        <Button
          icon="plus"
          title="Add Item"
          disabled={!newItem}
          onClick={onAddNewItem}
          data-testid={TestIds.datasetEditor.buttonAddNew}
        >
          Add
        </Button>
      </InlineFieldRow>
    </div>
  );
};

import { cx } from '@emotion/css';
import {
  Button,
  Icon,
  IconButton,
  InlineField,
  InlineFieldRow,
  Input,
  RadioButtonGroup,
  Select,
  useStyles2,
} from '@grafana/ui';
import { DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, NotDraggingStyle } from '@hello-pangea/dnd';
import React, { useCallback, useMemo, useState } from 'react';

import {
  SUNBURST_EMPHASIS_FOCUS_OPTIONS,
  SUNBURST_LABEL_ROTATE_OPTIONS,
  SUNBURST_SHOW_LABEL_OPTIONS,
  SUNBURST_SORT_OPTIONS,
  TEST_IDS,
} from '../../../constants';
import { DatasetItem, Level, SeriesByType, SeriesItem, SeriesType } from '../../../types';
import { getDatasetItemUniqueName, reorder } from '../../../utils';
import { getStyles } from './SunburstEditor.style';

/**
 * Get Item Style
 */
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  index: number
) => ({
  marginLeft: index * 4,
  /**
   * styles we need to apply on draggables
   */
  ...draggableStyle,
});

/**
 * Sunburst Item
 */
type SunburstSeriesItem = SeriesByType<SeriesItem, SeriesType.SUNBURST>;

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {SunburstSeriesItem}
   */
  value: SunburstSeriesItem;

  /**
   * On Change
   */
  onChange: (value: SeriesItem) => void;

  /**
   * Dataset
   */
  dataset: DatasetItem[];
}

/**
 * Sunburst editor
 */
export const SunburstEditor: React.FC<Props> = ({ value, onChange, dataset }) => {
  /**
   * Styles and Theme
   */
  const styles = useStyles2(getStyles);

  /**
   * State
   */
  const [newLevel, setNewLevel] = useState<Level | null>(null);

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

      onChange({
        ...value,
        groups: reorder(value.groups, result.source.index, result.destination.index),
      });
    },
    [onChange, value]
  );

  /**
   * Options
   */
  const availableOptions = useMemo(() => {
    const options = dataset.map((item) => ({
      value: getDatasetItemUniqueName(item),
      label: getDatasetItemUniqueName(item),
    }));

    return options.filter((item) => !value.groups.some((firstItem) => firstItem.value === item.value));
  }, [dataset, value]);

  return (
    <>
      <InlineFieldRow className={styles.valueLevel}>
        <InlineField label="Level value" grow tooltip="Applicable for levels without children">
          <Input
            placeholder="value"
            value={value.levelValue}
            onChange={(event) => {
              onChange({
                ...value,
                levelValue: event.currentTarget.value,
              });
            }}
            data-testid={TEST_IDS.seriesEditor.sunburstLevelField}
          />
        </InlineField>
      </InlineFieldRow>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={value.name}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {value.groups.map((item, index) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, index)}
                      className={styles.item}
                      data-testid={TEST_IDS.seriesEditor.sunburstLevelItem(item.name)}
                    >
                      <div className={styles.header}>
                        <div className={styles.column}>
                          {item.name && (
                            <div className={styles.titleWrapper}>
                              <div className={cx(styles.title)}>{item.name}</div>
                            </div>
                          )}
                        </div>

                        <div className={styles.column}>
                          <IconButton
                            name="trash-alt"
                            onClick={() => {
                              const newGroups = value.groups.filter((field) => field.name !== item.name);
                              onChange({
                                ...value,
                                groups: newGroups,
                              });
                            }}
                            aria-label="Remove"
                            data-testid={TEST_IDS.seriesEditor.sunburstLevelItemRemoveButton}
                          />
                          <div className={styles.dragHandle} {...provided.dragHandleProps}>
                            <Icon
                              title="Drag and drop to reorder"
                              name="draggabledots"
                              size="lg"
                              className={styles.dragIcon}
                            />
                          </div>
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

      <InlineFieldRow data-testid={TEST_IDS.seriesEditor.sunburstNewLevel} className={styles.add}>
        <InlineField label="New Level" grow={true}>
          <Select
            options={availableOptions}
            value={newLevel?.value || null}
            data-testid={TEST_IDS.seriesEditor.sunburstNewLevelName}
            onChange={(event) => {
              if (event.value) {
                const option = event.value.split(':');

                setNewLevel({
                  value: event.value,
                  source: option[0],
                  name: option[1],
                });
              }
            }}
          />
        </InlineField>

        <Button
          icon="plus"
          title="Add Level"
          disabled={!newLevel}
          onClick={() => {
            if (newLevel) {
              const newGroups = value.groups;
              newGroups.push(newLevel);
              onChange({
                ...value,
                groups: newGroups,
              });
              setNewLevel(null);
            }
          }}
          data-testid={TEST_IDS.seriesEditor.sunburstNewLevelButtonAddNew}
        >
          Add
        </Button>
      </InlineFieldRow>

      <InlineFieldRow>
        <InlineField label="Inner Radius" grow>
          <Input
            placeholder="radius"
            value={value.innerRadius}
            onChange={(event) =>
              onChange({
                ...value,
                innerRadius: event.currentTarget.value,
              })
            }
            data-testid={TEST_IDS.seriesEditor.sunburstInnerRadius}
          />
        </InlineField>
        <InlineField label="Outer Radius" grow>
          <Input
            placeholder="radius"
            value={value.outerRadius}
            onChange={(event) =>
              onChange({
                ...value,
                outerRadius: event.currentTarget.value,
              })
            }
            data-testid={TEST_IDS.seriesEditor.sunburstOuterRadius}
          />
        </InlineField>
      </InlineFieldRow>

      <InlineFieldRow>
        <InlineField label="Sunburst Sort" grow labelWidth={20} data-testid={TEST_IDS.seriesEditor.sunburstSort}>
          <RadioButtonGroup
            options={SUNBURST_SORT_OPTIONS}
            value={value.sort}
            onChange={(currentValue) => {
              onChange({
                ...value,
                sort: currentValue,
              });
            }}
          />
        </InlineField>
      </InlineFieldRow>

      <InlineFieldRow>
        <InlineField
          label="Emphasis Focus"
          grow
          labelWidth={20}
          data-testid={TEST_IDS.seriesEditor.sunburstEmphasisFocus}
        >
          <RadioButtonGroup
            options={SUNBURST_EMPHASIS_FOCUS_OPTIONS}
            value={value.emphasis.focus}
            onChange={(currentValue) => {
              onChange({
                ...value,
                emphasis: {
                  ...value.emphasis,
                  focus: currentValue,
                },
              });
            }}
          />
        </InlineField>
      </InlineFieldRow>

      <InlineFieldRow>
        <InlineField label="Show label" grow labelWidth={20} data-testid={TEST_IDS.seriesEditor.sunburstShowLabel}>
          <RadioButtonGroup
            options={SUNBURST_SHOW_LABEL_OPTIONS}
            value={value.label.show}
            onChange={(currentValue) => {
              onChange({
                ...value,
                label: {
                  ...value.label,
                  show: currentValue,
                },
              });
            }}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Label rotate" grow labelWidth={20} data-testid={TEST_IDS.seriesEditor.sunburstLabelRotate}>
          <RadioButtonGroup
            options={SUNBURST_LABEL_ROTATE_OPTIONS}
            value={value.label.rotate}
            onChange={(currentValue) => {
              onChange({
                ...value,
                label: {
                  ...value.label,
                  rotate: currentValue,
                },
              });
            }}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

import { DataFrame, FieldType } from '@grafana/data';
import { InlineField, InlineFieldRow, Input, Select, useStyles2 } from '@grafana/ui';
import { Collapse } from '@volkovlabs/components';
import React, { useMemo, useState } from 'react';

import { RADAR_SHAPE_OPTIONS, TEST_IDS } from '../../../constants';
import { VisualEditorOptions } from '../../../types';
import { multipleQueriesFields } from '../../../utils';
import { getStyles } from './RadarOptions.styles';

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {VisualEditorOptions}
   */
  value: VisualEditorOptions;

  /**
   * On Change
   */
  onChange: (value?: VisualEditorOptions | undefined) => void;

  /**
   * Data
   *
   * @type {DataFrame[]}
   */
  data: DataFrame[];
}

/**
 * Radar Options Editor
 */
export const RadarOptionsEditor: React.FC<Props> = ({ value, onChange, data }) => {
  /**
   * Styles and Theme
   */
  const styles = useStyles2(getStyles);

  /**
   * Options
   */
  const options = useMemo(() => multipleQueriesFields(data, [FieldType.string]), [data]);

  /**
   * States
   */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-testid={TEST_IDS.seriesEditor.radarOptionsRoot} className={styles.root}>
      <Collapse
        headerTestId={TEST_IDS.seriesEditor.radarOptionsHeader}
        contentTestId={TEST_IDS.seriesEditor.radarOptionsContent}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prevState) => !prevState)}
        title="Radar Options"
      >
        <>
          <InlineFieldRow>
            <InlineField label="Shape" labelWidth={20} grow={true}>
              <Select
                value={value.radar?.shape}
                options={RADAR_SHAPE_OPTIONS}
                isClearable
                onChange={(event) => {
                  onChange({
                    ...value,
                    radar: {
                      ...value.radar,
                      shape: event?.value,
                    },
                  });
                }}
                data-testid={TEST_IDS.seriesEditor.radarOptionsShape}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField
              label="Radius"
              tooltip="Set radar radius. For example, 20 is the directly set radius. '20%' means that the outside radius is 20% of the viewport size (the little one between width and height of the chart container)."
              labelWidth={20}
              grow={true}
            >
              <Input
                value={value.radar?.radius ?? ''}
                onChange={(event) => {
                  let inputValue = event.currentTarget.value;

                  /**
                   * Normalize value if no 10 or 10% format
                   */
                  if (!/^\d*%?$/g.test(inputValue)) {
                    inputValue = '0';
                  }

                  onChange({
                    ...value,
                    radar: {
                      ...value.radar,
                      radius: inputValue,
                    },
                  });
                }}
                data-testid={TEST_IDS.seriesEditor.radarOptionsRadius}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField label="Indicator" tooltip="Select field for indicator names" labelWidth={20} grow={true}>
              <Select
                value={value.radar?.indicator}
                options={options}
                isClearable
                isMulti={false}
                onChange={(event) => {
                  onChange({
                    ...value,
                    radar: {
                      ...value.radar,
                      indicator: event?.value || '',
                    },
                  });
                }}
                data-testid={TEST_IDS.seriesEditor.radarOptionsIndicator}
              />
            </InlineField>
          </InlineFieldRow>
        </>
      </Collapse>
    </div>
  );
};

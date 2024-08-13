import { SelectableValue } from '@grafana/data';

import { SunburstSeriesOptions } from '../types';
import { TEST_IDS } from './tests';

/**
 * Sunburst label rotate
 */
export enum SunburstLabelRotate {
  RADIAL = 'radial',
  TANGENTIAL = 'tangential',
}

/**
 * Sunburst emphasis focus option
 */
export enum SunburstEmphasisFocusOption {
  SELF = 'self',
  SERIES = 'series',
  ANCESTOR = 'ancestor',
  DESCENDANT = 'descendant',
  NONE = 'none',
}

/**
 * Sunburst sort option
 */
export enum SunburstSortOption {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

/**
 * Sunburst label rotate options
 */
export const SUNBURST_LABEL_ROTATE_OPTIONS: SelectableValue[] = [
  {
    ariaLabel: TEST_IDS.seriesEditor.labelRotateOption(SunburstLabelRotate.RADIAL),
    description: 'Radial',
    label: 'Radial',
    value: SunburstLabelRotate.RADIAL,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.labelRotateOption(SunburstLabelRotate.TANGENTIAL),
    description: 'Tangential',
    label: 'Tangential',
    value: SunburstLabelRotate.TANGENTIAL,
  },
];

/**
 * Sunburst sort options
 */
export const SUNBURST_SORT_OPTIONS: SelectableValue[] = [
  {
    ariaLabel: TEST_IDS.seriesEditor.sortOption(SunburstSortOption.ASC),
    description: 'Ascending order.',
    label: 'A to Z',
    value: SunburstSortOption.ASC,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.sortOption(SunburstSortOption.DESC),
    description: 'Descending order.',
    label: 'Z to A',
    value: SunburstSortOption.DESC,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.sortOption(SunburstSortOption.NONE),
    description: 'Not sorting,',
    label: 'None',
    value: SunburstSortOption.NONE,
  },
];

/**
 * Show label options
 */
export const SUNBURST_SHOW_LABEL_OPTIONS: SelectableValue[] = [
  {
    ariaLabel: TEST_IDS.seriesEditor.showLabelOption(true),
    description: 'Show label',
    label: 'True',
    value: true,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.showLabelOption(false),
    description: 'Hide Label',
    label: 'False',
    value: false,
  },
];

/**
 * Sunburst focus options
 */
export const SUNBURST_EMPHASIS_FOCUS_OPTIONS: SelectableValue[] = [
  {
    ariaLabel: TEST_IDS.seriesEditor.emphasisFocusOption(SunburstEmphasisFocusOption.ANCESTOR),
    description: 'Focus on all ancestor nodes.',
    label: 'Ancestor',
    value: SunburstEmphasisFocusOption.ANCESTOR,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.emphasisFocusOption(SunburstEmphasisFocusOption.DESCENDANT),
    description: 'Focus on all descendants nodes.',
    label: 'Descendants',
    value: SunburstEmphasisFocusOption.DESCENDANT,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.emphasisFocusOption(SunburstEmphasisFocusOption.NONE),
    description: 'Do not fade out other data, it`s by default.',
    label: 'None',
    value: SunburstEmphasisFocusOption.NONE,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.emphasisFocusOption(SunburstEmphasisFocusOption.SELF),
    description: 'Only focus (not fade out) the element of the currently highlighted data.',
    label: 'Self',
    value: SunburstEmphasisFocusOption.SELF,
  },
  {
    ariaLabel: TEST_IDS.seriesEditor.emphasisFocusOption(SunburstEmphasisFocusOption.SERIES),
    description: 'Focus on all elements of the series which the currently highlighted data belongs to.',
    label: 'Series',
    value: SunburstEmphasisFocusOption.SERIES,
  },
];

/**
 * Sunburst Default
 */
export const SUNBURST_DEFAULT: SunburstSeriesOptions = {
  groups: [],
  sort: SunburstSortOption.DESC,
  label: {
    show: true,
    rotate: SunburstLabelRotate.RADIAL,
  },
  emphasis: {
    focus: SunburstEmphasisFocusOption.NONE,
  },
  innerRadius: '0',
  outerRadius: '100%',
  levelValue: '1',
};

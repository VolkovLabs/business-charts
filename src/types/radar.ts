import { EChartOption } from 'echarts';

/**
 * Radar Shape Type
 */
export enum RadarShapeType {
  POLYGON = 'polygon',
  CIRCLE = 'circle',
}

/**
 * Radar Indicator Item
 */
export interface RadarIndicatorItem {
  /**
   * Name
   *
   * @type {string}
   */
  name: string;

  /**
   * Max
   *
   * @type {number}
   */
  max: number;

  /**
   * Min
   *
   * @type {number}
   */
  min?: number;
}

/**
 * Radar Options
 */
export interface RadarChartOptions {
  /**
   * Shape
   *
   * @type {RadarShapeType}
   */
  shape?: RadarShapeType;

  /**
   * Radius
   *
   * @type {number | string}
   */
  radius?: number | string;

  /**
   * Indicator
   *
   * @type {RadarIndicatorItem[]}
   */
  indicator?: RadarIndicatorItem[];
}

/**
 * Radar Config Options
 */
export interface RadarConfigOptions {
  /**
   * Shape
   *
   * @type {RadarShapeType | ''}
   */
  shape?: RadarShapeType;

  /**
   * Radius
   *
   * @type {number | string}
   */
  radius?: number | string;

  /**
   * Indicator
   *
   * @type {string}
   */
  indicator?: string;
}

/**
 * Radar Dimension Item
 */
export interface RadarDimensionItem {
  /**
   * Name
   *
   * @type {string}
   */
  name: string;

  /**
   * Value
   *
   * @type {string}
   */
  value: string;

  /**
   * UID
   *
   * @type {string}
   */
  uid: string;
}

/**
 * Radar Series Options
 */
export interface RadarSeriesOptions extends EChartOption.SeriesRadar {
  /**
   * Radar Dimensions
   *
   * @type {RadarDimensionItem[]}
   */
  radarDimensions: RadarDimensionItem[];
}

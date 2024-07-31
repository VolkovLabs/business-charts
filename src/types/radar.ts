import { EChartOption } from 'echarts';

/**
 * Radar Shape Options
 */
export enum RadarShapeOptions {
  POLYGON = 'polygon',
  CIRCLE = 'circle',
}

/**
 * Radar Indicator Item
 */
export interface RadarIndicatorItem {
  name: string;
  max: number;
  min?: number;
}

/**
 * Radar Options
 */
export interface RadarChartOptions {
  shape?: RadarShapeOptions | '';
  radius?: number | string;
  indicator?: RadarIndicatorItem[];
}

/**
 * Radar Options
 */
export interface RadarOptions {
  shape?: RadarShapeOptions | '';
  radius?: number | string;
  indicator?: string | '';
}

/**
 * Radar Dimension Item
 */
export interface RadarDimensionItem {
  name: string;
  value: string;
  uid: string;
}

/**
 * Radar Series Options
 */
export interface RadarSeriesOptions extends EChartOption.SeriesRadar {
  radarDimensions: RadarDimensionItem[];
}

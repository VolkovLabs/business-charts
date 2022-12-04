/**
 * Map Extensions
 */
export enum Map {
  DEFAULT = 'json',
  BMAP = 'bmap',
  AMAP = 'amap',
  GMAP = 'gmap',
}

/**
 * Map Extensions Options
 */
export const MapOptions = [
  { value: Map.DEFAULT, label: 'JSON' },
  { value: Map.BMAP, label: 'Baidu' },
  { value: Map.AMAP, label: 'Gaode' },
  { value: Map.GMAP, label: 'Google' },
];

/**
 * API
 */
export const BaiduApi = 'https://api.map.baidu.com/api';
export const GaodeApi = 'https://webapi.amap.com/maps';
export const GoogleApi = 'https://maps.googleapis.com/maps/api/js';

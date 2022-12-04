/**
 * Map Extensions
 */
export enum Map {
  DEFAULT = 'json',
  BMAP = 'bmap',
  AMAP = 'amap',
}

/**
 * Map Extensions Options
 */
export const MapOptions = [
  { value: Map.DEFAULT, label: 'JSON' },
  { value: Map.BMAP, label: 'Baidu' },
  { value: Map.AMAP, label: 'Gaode' },
];

/**
 * API
 */
export const BaiduApi = 'https://api.map.baidu.com/api';
export const GaodeApi = 'https://webapi.amap.com/maps';

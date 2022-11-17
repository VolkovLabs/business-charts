import * as echarts from 'echarts';
import { BaiduApi } from './constants';
import { BaiduOptions } from './types';

/**
 * Register maps
 */
export const registerMaps = () => {
  const maps = require.context('./maps', false, /\.json/);
  maps.keys().map((m: string) => {
    const matched = m.match(/\.\/([0-9a-zA-Z_]*)\.json/);
    if (!matched) {
      return;
    }

    echarts.registerMap(matched[1], maps(m));
  });
};

/**
 * Load Baidu Maps
 */
export const loadBaidu = (baidu: BaiduOptions) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `${BaiduApi}?v=3.0&ak=${baidu.key}&callback=${baidu.callback}`;

  document.body.appendChild(script);
};

import * as echarts from 'echarts';
import { BaiduApi, GaodeApi, GoogleApi } from './constants';
import { BaiduOptions, GaodeOptions, GoogleOptions } from './types';

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

/**
 * Load Gaode Maps
 */
export const loadGaode = (gaode: GaodeOptions) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `${GaodeApi}?v=1.4.15&ak=${gaode.key}&plugin=${gaode.plugin}`;

  document.body.appendChild(script);
};

/**
 * Load Google Maps
 */
export const loadGoogle = (google: GoogleOptions) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `${GoogleApi}?key=${google.key}&callback=${google.callback}`;

  document.body.appendChild(script);
};

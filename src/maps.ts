import * as echarts from 'echarts';
import { MapApi } from './constants';
import { BaiduOptions, GaodeOptions, GoogleOptions } from './types';

/**
 * Register maps
 */
export const registerMaps = () => {
  const maps = require.context('./maps', false, /\.json/);
  maps.keys().map((m: string) => {
    const matched = m.match(/\.\/([0-9a-zA-Z_]*)\.json/);
    if (!matched || echarts.getMap(matched[1])) {
      return;
    }

    echarts.registerMap(matched[1], maps(m));
  });
};

/**
 * Load Baidu Maps
 */
export const loadBaidu = (options: BaiduOptions) => {
  if ((window as any).BMap) {
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `${MapApi.baidu}?v=3.0&ak=${options.key}&callback=${options.callback}`;

  document.body.appendChild(script);
};

/**
 * Load Gaode Maps
 */
export const loadGaode = (options: GaodeOptions) => {
  if ((window as any).AMap) {
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `${MapApi.gaode}?v=1.4.15&ak=${options.key}&plugin=${options.plugin}`;

  document.body.appendChild(script);
};

/**
 * Load Google Maps
 */
export const loadGoogle = (options: GoogleOptions) => {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `${MapApi.google}?key=${options.key}&callback=${options.callback}`;

  document.body.appendChild(script);
};

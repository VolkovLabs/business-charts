import * as echarts from 'echarts';

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

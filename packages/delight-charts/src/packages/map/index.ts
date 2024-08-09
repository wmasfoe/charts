import type { DefineComponent } from 'vue'
import { map } from "./getOptions";
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";
import type { MapType } from '../../const/interface/map'

const getGeoJson = async () => {
    try {
      // 'https://fe-video-qc.xhscdn.com/fe-platform/e75ba413c6d3a540a1b467d7203985519338a6a8.json';

      const url = 'xxx'
      const res = await fetch(url);
      const json = await res.json();
      return json;
    } catch (error) {
      console.error('error', error)
    }
  };
// 地图
const component = /* #__PURE__ */ generateChart("Map", map, {
    plugins: async () => {
        const { MapChart } = await import("echarts/charts");
        const { GeoComponent }  = await import('echarts/components');
        const chinaGeoJson = await getGeoJson()
        return {
            usePlugins: [MapChart,GeoComponent],
            mapJson: chinaGeoJson,
        }
    }
});

const Map = withInstall(component as DefineComponent<MapType>);

// 导出Vue插件
export { Map, Map as default };

import "echarts/lib/chart/bar";
import type { DefineComponent } from 'vue'
import { bullet } from "./getOptions";
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";
import type { BulletType } from '../../const/interface/bullet'

// Bullet
const component = /* #__PURE__ */ generateChart("Bullet", bullet, {
  plugins: async () => {
    const { ScatterChart } = await import("echarts/charts");
    return {
      usePlugins: [ScatterChart],
    };
  },
});
const Bullet = withInstall(component as DefineComponent<BulletType>);
// 导出Vue插件
export { Bullet, Bullet as default };

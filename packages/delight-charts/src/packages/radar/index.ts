
import "echarts/lib/chart/radar";
import type { DefineComponent } from 'vue'
import { radar } from "./getOptions";
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";

import type { RadarType } from '../../const/interface/radar'

// Radar
const component = /* #__PURE__ */ generateChart("Radar", radar)

const Radar = withInstall(component as DefineComponent<RadarType>);
// 导出Vue插件
export { Radar, Radar as default };

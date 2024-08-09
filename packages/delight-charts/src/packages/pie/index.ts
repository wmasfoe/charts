import "echarts/lib/chart/pie";
import type { DefineComponent } from 'vue'
import { pie } from "./getOptions";
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";

import type { PieType } from '../../const/interface/pie'

// Pie
const component = /* #__PURE__ */ generateChart("Pie", pie);
const Pie = withInstall(component as DefineComponent<PieType>);
// 导出Vue插件
export { Pie, Pie as default };

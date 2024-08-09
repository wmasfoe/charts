import "echarts/lib/chart/treemap";
import type { DefineComponent } from 'vue'
import { treemap } from "./getOptions";
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";

import type { TreeMapType } from '../../const/interface/treemap'

// treemap矩形树图
const component = /* #__PURE__ */ generateChart("Treemap", treemap);
const Treemap = withInstall(component as DefineComponent<TreeMapType>);
// 导出Vue插件
export { Treemap, Treemap as default };

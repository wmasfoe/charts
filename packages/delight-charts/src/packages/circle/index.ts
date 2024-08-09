import "echarts/lib/chart/pie";
import type { DefineComponent } from 'vue'
import { circle } from "./getOptions";
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";

import type { CircleType } from '../../const/interface/circle'

// 环形图
const component = /* #__PURE__ */ generateChart("Circle", circle);
const Circle = withInstall(component as DefineComponent<CircleType>);

// 导出Vue插件
export { Circle, Circle as default };

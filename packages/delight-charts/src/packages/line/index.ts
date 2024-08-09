import "echarts/lib/chart/line";
import type { DefineComponent } from 'vue'
import { line } from "./getOptions";
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";

import type { LineType } from '../../const/interface/line'

// Line
const component = /* #__PURE__ */ generateChart("Line", line);
const Line = withInstall(component as DefineComponent<LineType>);
// 导出Vue插件
export { Line, Line as default };

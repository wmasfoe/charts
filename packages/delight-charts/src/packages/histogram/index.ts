// 条形图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import type { DefineComponent } from 'vue'
import { histogram } from "./getOptions";

import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";

import type { HistogramType } from '../../const/interface/histogram'

// Histogram
const component = /* #__PURE__ */ generateChart("Histogram", histogram);
const Histogram = withInstall(component as DefineComponent<HistogramType>);
// 导出Vue插件
export { Histogram, Histogram as default };

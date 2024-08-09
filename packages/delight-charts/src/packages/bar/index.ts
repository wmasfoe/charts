import "echarts/lib/chart/bar";
import type { DefineComponent } from 'vue'
import { bar } from "./getOptions"
import { generateChart } from "../../chart.core"
import { withInstall } from "../../utils/install"
import type { BarType } from '../../const/interface/bar'
// Bar
const component = /* #__PURE__ */ generateChart("Bar", bar);
const Bar = withInstall(component as DefineComponent<BarType>);
// 导出Vue插件
export { Bar, Bar as default };
import { chart } from "./getOptions";
import type { DefineComponent } from 'vue'
import { generateChart } from "../../chart.core";
import { withInstall } from "../../utils/install";

import type { ChartType } from '../../const/interface/chart'

// Chart
const component = /* #__PURE__ */ generateChart("Chart", chart, {
    plugins: async () => {
        const {LineChart, PieChart, BarChart, ScatterChart, TreemapChart, GaugeChart, RadarChart} = await import('echarts/charts');
        return {
            usePlugins: [LineChart, PieChart, BarChart, ScatterChart, TreemapChart, GaugeChart, RadarChart]
        }
    }
});

const Chart = withInstall(component as DefineComponent<ChartType>);
// 导出Vue插件
export { Chart, Chart as default };
import 'echarts/lib/chart/gauge'
import { gauge } from './getOptions'
import { generateChart } from '../../chart.core'
import { withInstall } from '../../utils/install'

// gauge
const component = /* #__PURE__ */ generateChart('Gauge', gauge)

const Gauge = withInstall(component)
// 导出Vue插件
export { Gauge, Gauge as default }


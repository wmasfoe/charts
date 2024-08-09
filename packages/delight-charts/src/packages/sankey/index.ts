import "echarts/lib/chart/sankey";
import type { DefineComponent } from 'vue'
import { withInstall } from "../../utils/install";
import component from './Sankey.vue'

import type { SankeyType } from '../../const/interface/sankey'

const Sankey = withInstall(component as DefineComponent<SankeyType>, 'Sankey');
// 导出Vue插件
export { Sankey, Sankey as default };

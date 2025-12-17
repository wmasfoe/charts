import { initMobileTounch } from './../../../mobile-docs/.vitepress/initMobileTounch';
import './styles/index.css'
import VPApp from './components/VPApp.vue'
import VPNotFound from './components/VPNotFound.vue'
// @ts-ignore
import '@dx/delight-charts/dist/style.css'
import { Theme } from 'vitepress'
import { withConfigProvider } from './composables/config'
// @ts-ignore
import DelightCharts, { useLabelFormat, Line, Bar, Pie, Histogram, Circle } from '@dx/delight-charts'

console.log(4444444, DelightCharts)
import { vuePlugin, addImportMap } from "./plugins/mdx";
import "./plugins/mdx/style.css";
const VPTheme: Theme = {
    Layout: withConfigProvider(VPApp),
    NotFound: VPNotFound,
    enhanceApp({ app }) {
        app.use(DelightCharts)
        app._context.provides.useLabelFormat = useLabelFormat
        
        // 添加 import map 让 demo 系统能正确引用 DelightCharts
        addImportMap('@dx/delight-charts', { 
            default: DelightCharts,
            Line,
            Bar, 
            Pie,
            Histogram,
            Circle,
            useLabelFormat
        })
        
        // 确保 vue 的 ref 等可以正确访问
        addImportMap('vue', app.config.globalProperties.$vue || (window as any)._vue)
        
        app.use(vuePlugin, {
            onMonacoCreated(monaco: any) {
                // Monaco编辑器创建后的回调
            }
        })
    }
}

export default VPTheme

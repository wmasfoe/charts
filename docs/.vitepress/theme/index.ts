import { initMobileTounch } from './../../../mobile-docs/.vitepress/initMobileTounch';
import './styles/index.css'
import VPApp from './components/VPApp.vue'
import VPNotFound from './components/VPNotFound.vue'
// @ts-ignore
import '@{symbol}/delight-charts/dist/style.css'
import { Theme } from 'vitepress'
import { withConfigProvider } from './composables/config'
// @ts-ignore
import DelightCharts, { useLabelFormat } from '@{symbol}/delight-charts'

console.log(4444444, DelightCharts)
import { vuePlugin } from "./plugins/mdx";
import "./plugins/mdx/style.css";
const VPTheme: Theme = {
    Layout: withConfigProvider(VPApp),
    NotFound: VPNotFound,
    enhanceApp({ app }) {
        app.use(DelightCharts)
        app._context.provides.useLabelFormat = useLabelFormat
        app.use(vuePlugin, {
            onMonacoCreated(monaco) {
                //

            }
        })
    }
}

export default VPTheme

import './styles/index.css'
import VPApp from './components/VPApp.vue'
import VPNotFound from './components/VPNotFound.vue'
// @ts-ignore
import '@{symbol}/delight-charts-mobile/dist/style.css'
import { Theme } from 'vitepress'
import { withConfigProvider } from './composables/config'
// @ts-ignore
import DelightChartsMobile from '@{symbol}/delight-charts-mobile'

import { vuePlugin } from "./plugins/mdx";
import "./plugins/mdx/style.css";
console.log(4444444, DelightChartsMobile)
const VPTheme: Theme = {
    Layout: withConfigProvider(VPApp),
    NotFound: VPNotFound,
    enhanceApp({ app }) {
        app.use(DelightChartsMobile)
        app.use(vuePlugin, {
            onMonacoCreated(monaco) {
                //

            }
        })
    }
}

export default VPTheme

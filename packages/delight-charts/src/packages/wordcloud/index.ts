import type { DefineComponent } from 'vue'
import { wordcloud } from './getOptions'
import { generateChart } from '../../chart.core'
import { withInstall } from '../../utils/install'

import type { WordCloudType } from '../../const/interface/wordcloud'

// WordCloud
const component = /* #__PURE__ */ generateChart('WordCloud', wordcloud, {
    plugins: async () => {
        await import('echarts-wordcloud') as Promise<any>
    }
})

const WordCloud = withInstall(component as DefineComponent<WordCloudType>)
// 导出Vue插件
export { WordCloud, WordCloud as default }

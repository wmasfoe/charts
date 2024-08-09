import { getOptions } from '../../utils/getOptions'
import { radar } from '../../packages/radar/getOptions'

import type { GetChartOptions } from '../../const/interface/core'

export const chart: GetChartOptions = (data, settings = {}, extra = {}) => {
    if (!settings.type) {
        throw new Error('使用通用chart组件，必须指定图表chartType类型')
    }
    return settings.type === 'radar' ? radar(data, {
        ...settings,
        chartType: settings.type
    }, extra) : getOptions(data, {
        ...settings,
        chartType: settings.type
    }, extra)
}
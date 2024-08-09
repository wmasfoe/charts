import { isEmpty, cloneDeep } from 'lodash'
import { merge } from './merge'
import { DEFAULT_VISUALMAP_CONFIG } from '../const/defaultMapConfig'

const getMaxMapData = (data: any) => {
    return cloneDeep(data).sort((v1: any, v2: any) => +v2.value - +v1.value)
}
export const getVisualMap = (config = {}, chartType: string, data: any[]) => {
    const max = Math.ceil(getMaxMapData(data)[0]?.value)
    if (chartType === 'map') {
        const result = merge(DEFAULT_VISUALMAP_CONFIG, config)
        if (!config?.max) {
            result.max = max || 100 // max不存在就设置一个默认的map，避免地图报错
        }
        return result
    }
    return isEmpty(config) ? null : config
}
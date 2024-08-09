import { DEFAULT_MAP_CONFIG } from '../../const/defaultMapConfig'

// 获取seriesItem的默认基本信息
let seriesItem: any = {
    name: (seriesName || ''),
    type: 'map',
    map: mapType || 'china',
    ...defaultConfig,
    itemStyle: { ...defaultItemConfig },
    ...seriesConfig
}
seriesResult.push(seriesItem)
export const DEFAULT_MAP_CONFIG = {
    map: "china",
    roam: false,
    showLegendSymbol: false,
    scaleLimit: {
        min: 1,
        max: 1,
    },
    emphasis: {
        itemStyle: {
            areaColor: '#F9BE92',
            borderColor: '#000',
        },
        label: {
            color: 'rgba(0, 0, 0, 0.85)'
        }
    }
}
export const DEFAULT_MAP_GEO_CONFIG = {
    map: "china",
    roam: false,
}
export const DEFAULT_VISUALMAP_CONFIG = {
    formatter: '{value}%',
    inRange: {
        color: ['#ECF0FF', '#849FFF'] // 渐变颜色
    },
    min: 0,
    max: 100,
    text: ['高', '低'],
    itemWidth: 12,
    left: '10%',
    itemHeight: 90,
    realtime: false,
    calculable: true,
    // indicatorIcon: 
}

export const DEFAULT_MAP_ITEM_CONFIG = {
    "normal": {
        show: true,
        borderColor: "rgba(0, 0, 0, 0.3)" // 省级分割线颜色
    },
}

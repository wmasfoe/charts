import type { ArrayOrObjectType } from './defaultTooltipConfig'
export const DEFAULT_CIRCLE_SERIES_CONFIG = {
  type: 'pie',
  radius: [70, 90],
  center: ['65%', '50%'],
}
export const DEFAULT_HORIZONTAL_LEGEND = {
  legendMode: 0, // 0 表示点谁亮谁，1表示点谁灭谁
  itemHeight: 9,
  itemWidth: 9,
  show: true,
  left: '-3',
  top: '0',
  icon: 'path://M904.5,437.5h-7a1,1,0,0,1-1-1v-7a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v7A1,1,0,0,1,904.5,437.5Z',
  borderRadius: 1,
  type: "scroll",
  pageIcons: {
    horizontal: [
      "path://M4.112,9.333c-0.889-0.667-0.889-2,0-2.667L10.068,2.2c0.659-0.494,1.6-0.024,1.6,0.8v10  c0,0.824-0.941,1.294-1.6,0.8L4.112,9.333z",
      "path://M11.888,6.667c0.889,0.667,0.889,2,0,2.667L5.932,13.8c-0.659,0.494-1.6,0.024-1.6-0.8V3  c0-0.824,0.941-1.294,1.6-0.8L11.888,6.667z",
    ],
    vertical: [
      "path://M4.112,9.333c-0.889-0.667-0.889-2,0-2.667L10.068,2.2c0.659-0.494,1.6-0.024,1.6,0.8v10  c0,0.824-0.941,1.294-1.6,0.8L4.112,9.333z",
      "path://M11.888,6.667c0.889,0.667,0.889,2,0,2.667L5.932,13.8c-0.659,0.494-1.6,0.024-1.6-0.8V3  c0-0.824,0.941-1.294,1.6-0.8L11.888,6.667z",
    ],
  },
}
export const DEFAULT_CIRCLE_LEGEND = {
  ...DEFAULT_HORIZONTAL_LEGEND,
  top: 'center',
  align: 'left',
  left: '92',
  // width: 50,
  orient: 'vertical',
  // formatter: (params: ArrayOrObjectType<any>) => {
  //     return params
  // }
  // legend不支持html
  // orient: 'vertical',
  // 需要展示百分比的话写formatter,,然后用chartData来算数据百分比
}

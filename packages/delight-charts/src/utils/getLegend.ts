import { DEFAULT_CIRCLE_LEGEND, DEFAULT_HORIZONTAL_LEGEND } from '../const/defaultCircleConfig'
import { isNil } from 'lodash'
export const getCircleDefaultLegend = (obj = { orient: 'horizontal' }) => {
  if (obj.orient === 'vertical') {
    return ({ ...DEFAULT_CIRCLE_LEGEND, ...obj })
  }
  return ({ ...DEFAULT_HORIZONTAL_LEGEND, ...obj })
}
export function getLegend(args: any, titleVisible = false, chartType = '', grid?: {}) {
  const legend =
    chartType === 'circle'
      ? getCircleDefaultLegend(args)
      : {
        ...DEFAULT_HORIZONTAL_LEGEND,
        ...args,
      }
  // 气泡图 桑基图默认不展示图例
  if (['bubble', 'sankey'].includes(chartType) && isNil(args)) {
    legend.show = false
  }
  // 有title legend往下移33
  if (titleVisible && !isNaN(+legend.top) && isNil(args?.top)) {
    legend.top = '34'
  }
  // 气泡图的图例默认和grid一致
  if (chartType === 'bubble' && legend.show && isNil(args?.left) && grid?.left) { 
    legend.left = grid.left
  }
  if (chartType === 'bubble' && legend.show && isNil(args?.top) && grid?.top) {
    legend.top = grid.top
  }

  if (!isNil(args?.bottom) && isNil(args?.top)) {
    delete legend.top
  }
  if (!isNil(args?.right) && isNil(args?.left)) {
    delete legend.left
  }
  return legend
}

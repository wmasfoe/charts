import { DEFAULT_TOOLTIP, TOOLTIPS_CONTENT, PARAM_ITEM } from '../const/defaultTooltipConfig'
import { isNil, isEmpty, isArray } from 'lodash'
import { merge } from './merge'
import { defaultBubbleTooltipFormatter } from '../const/defaultBubbleConfig'

export type ArrayOrObjectType<T> = Array<T> | T
export function getToolTip(args: any, toolTipsText: any, chartType = '', rest) {
  const { chartConfig, metrics } = rest
  if ((!isNil(args) && !isEmpty(args)) || chartType === 'radar') {
    const tooltip: {[k: string]: any} = {
      position: function (point: any[], params: any, dom: any, rect: any, size: any) {
        if(['radar', 'bubble'].includes(chartType)) {
          return undefined
        }
        const isNotEmptyToolTipsText = isArray(toolTipsText) && toolTipsText.length>0 || !isEmpty(toolTipsText)

        // 固定在顶部,避免数据太多溢出顶部区域
        return isNotEmptyToolTipsText ? [point[0], '20%'] : 'inside';
      },
      // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
      formatter: (params: PARAM_ITEM) => {
        return TOOLTIPS_CONTENT(toolTipsText, params, { ...args, chartType, half: chartConfig?.half, ...chartConfig, metrics })
      },
    }
    if(chartType === 'map') {
      tooltip.position = undefined // 跟随鼠标
    }
    // 传入的 tooltip 是数组，tooltip 配置项取第一个
    const mergeArgs = Array.isArray(args) ? args[0] : args
    return merge(DEFAULT_TOOLTIP(toolTipsText,{ chartType, chartConfig }), { ...tooltip, ...mergeArgs })
  }
  return DEFAULT_TOOLTIP(toolTipsText, { chartType, chartConfig, metrics })
}

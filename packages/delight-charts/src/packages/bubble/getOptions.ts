import { getOptions } from '../../utils/getOptions'
import type { EChartsOption } from '../../const/interface/core'
import type { OriginDataType } from '../../const/interface/option'
import type { BubbleType, BubbleConfig } from '../../const/interface/bubble'

export const bubble = (data: OriginDataType, settings: BubbleConfig, extra: BubbleType): EChartsOption => {
  const options = getOptions(data, {
    ...settings,
    chartType: 'bubble'
  }, extra)
  return options
}


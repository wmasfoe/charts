import { getOptions } from '../../utils/getOptions'
import type { EChartsOption } from '../../const/interface/core'
import type { OriginDataType } from '../../const/interface/option'
import type { CircleConfig, CircleType } from '../../const/interface/circle'

export const circle = (data: OriginDataType, settings: CircleConfig, extra: CircleType): EChartsOption => {
  return getOptions(data, {
    ...settings,
    chartType: 'circle'
  }, extra)
}

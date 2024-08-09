import type { EChartsOption } from 'echarts'
import type { OriginDataType } from '../../const/interface/option'
import type { BarConfig, BarType } from '../../const/interface/bar'
import { getOptions } from '../../utils/getOptions'

export const bar = (data: OriginDataType, settings: BarConfig, extra: BarType): EChartsOption => {
  return getOptions(data, {
    ...settings, 
    chartType: 'bar'
  }, extra)
}
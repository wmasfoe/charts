import { getOptions } from '../../utils/getOptions'
import type { GetChartOptions } from '../../const/interface/core'

export const histogram: GetChartOptions = (data, settings = {}, extra = {}) => {
  return getOptions(data, {
    ...settings, 
    chartType: 'histogram'
  }, extra)
}

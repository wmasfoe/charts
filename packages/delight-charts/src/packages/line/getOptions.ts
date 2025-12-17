import { getOptions } from '../../utils/getOptions'
import type { GetChartOptions } from '../../const/interface/core'

export const line: GetChartOptions = (data = [], settings = {}, extra = {}) => {
  const lineOpt = getOptions(data, {
    ...settings,
    chartType: 'line'
  }, extra);

  console.log(lineOpt)

  return lineOpt;
}

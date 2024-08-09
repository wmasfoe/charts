import { getOptions } from '../../utils/getOptions'
import type { EChartsOption } from '../../const/interface/core'
import type { OriginDataType } from '../../const/interface/option'
import type { PieConfig, PieType } from '../../const/interface/pie'

export const pie = (data: OriginDataType, settings: PieConfig, extra: PieType): EChartsOption => {
  return getOptions(data, {
    ...settings,
    chartType: 'pie'
  }, extra)
}

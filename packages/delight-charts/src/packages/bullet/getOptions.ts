import { DEFAULT_GRID } from '../../const/defaultBulletConfig'
import type { GetChartOptions } from '../../const/interface/core'
import { handleyAxis, handleSeries, handleTooltip, handlexAxis } from './utils'
export const bullet: GetChartOptions = (chartData: any[] = [], settings = {}, extra: any = {}) => {
  const { metrics = [] } = extra
  if (!chartData.length) return {}
  const title = chartData.map(i => i[metrics?.[0]] || '') || []
  const seriesData: any = handleSeries(chartData, extra, settings)
  const resultOption = {
    yAxis: handleyAxis(title),
    xAxis: handlexAxis(settings?.xAxis || {}),
    tooltip: handleTooltip(extra?.tooltipVisible || true, settings),
    legend: seriesData?.legend || undefined,
    grid: {
      ...DEFAULT_GRID,
      height: 52 * chartData.length,
      ...settings.grid
    },
    series: seriesData?.series || []
  }

  return resultOption
}

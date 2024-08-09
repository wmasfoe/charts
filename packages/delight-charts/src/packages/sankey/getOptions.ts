import { getOptions } from '../../utils/getOptions'

export const sankey = (data = [], settings = {}, extra = {}) => {
  const colors = extra?.color || []
  const usingData = data.map((v, index) => ({
    ...(v || {}),
    itemStyle: {
      ...(v?.itemStyle || {}),
      color: colors[index % colors.length]
    }
  }))

  const options = getOptions(usingData, {
    ...settings,
    chartType: 'sankey'
  }, extra)
  return options
}

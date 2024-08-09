export const legendDefault = {
  style: {
    justifyContent: 'flex-start',
  },
  itemStyle: {
    justifyContent: 'start',
  },
  nameStyle: {
    fontSize: '20px',
    fill: '#000',
  },
  valueStyle: {
    fontSize: '20px',
    fill: '#000',
  },
}
const positionValues = ['top', 'left', 'bottom', 'right']

export const isShowLegend = (config: any) => {
  return (
    (config?.legend?.show ?? config?.legendVisible ?? true)
  )
}

export const legendConfig = (config: any) => {
  const obj = config?.legend
  if (config?.legend?.formatter) {
    obj.itemFormatter = config?.legend.formatter
  }
  if (config?.legend?.icon) {
    obj.marker = config?.legend.icon
  }
  const keys = Object.keys(config?.legend || {})
  if (keys.length) {
    keys.forEach((element) => {
      if (positionValues.includes(element)) {
        obj.position = element
      }
    })
  }

  return {
    ...legendDefault,
    ...obj,
  }
}

import type { BulletDataItem } from '../../const/interface/bullet'
import { DEFAULT_COLOR, DEFAULT_XAXIS, DEFAULT_TOOLTIP, DEFAULT_BAR_WIDTH, DEFAULT_BAR_MEASURES_WIDTH, DEFAULT_TARGET_COLOR, DEFAULT_MEASURES_COLOR, DEFAULT_ICON } from '../../const/defaultBulletConfig'
import { isArray } from 'lodash'
export const handleyAxis = (title: string[]) => {
  return [{
    type: 'category',
    data: title,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }, {
    type: 'category',
    data: title.map(i => ''),
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }]
}

export const handlexAxis = (settings: any) => {
  return {
    ...DEFAULT_XAXIS,
    ...settings,
  }
}

export const handleSeries = (chartData: BulletDataItem[], extra: any = {}, settings: any = {}) => {
  if (!chartData.length) return []
  const { ranges = [], targets = [], measures = [], seriesConfig } = settings
  const { dimensions = [], chartConfig } = extra
  let realData: any[] = []
  let list: any = []
  let seriesList: any[] = [];
  if (chartData.length > 1) {
    chartData.forEach(element => {
      const item = isArray(element[dimensions?.[0]]) ? element[dimensions?.[0]] : [element[dimensions?.[0]]]
      realData.push(item)
    });
    const result: any[] = [];
    // 改变结构
    for (let i = 0; i < realData.length; i++) {
      for (let j = 0; j < realData[i].length; j++) {
        if (!result[j]) {
          result[j] = [];
        }
        result[j][i] = realData[i][j];
      }
    }
    result.forEach((item: any, idx: number) => {
      if (realData?.[idx]?.[idx]) {
        seriesList.push({
          name: measures[idx]?.label || `实际值${idx + 1}`,
          stack: 'total',
          data: item,
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              barBorderRadius: measures.length - 1 === idx ? [0, 2, 2, 0] : [0, 0, 0, 0] //堆叠的只有最后一个加圆角
            }
          },
          barWidth: DEFAULT_BAR_MEASURES_WIDTH,
          color: measures[idx]?.color || DEFAULT_MEASURES_COLOR,
          value: 'measures',
          z: 3,
          ...seriesConfig,
        })
      }
    });

    for (let index = 0; index < chartData.length; index++) {
      targets.forEach((item: any, idx: number) => {
        seriesList.push({
          name: item.label || `目标值${idx}`,
          type: 'scatter',
          symbol: 'rect',
          symbolOffset: index === 0 ? [] : [0, - 45 * index],
          symbolSize: [2, 24],
          data: [item.value || item],
          color: item.color || DEFAULT_TARGET_COLOR,
          hoverAnimation: false,
          value: 'targets',
          z: 4,
        })
      });
    }

  } else {
    realData = isArray(chartData?.[0][dimensions?.[0]]) ? chartData?.[0][dimensions?.[0]] : [chartData?.[0][dimensions?.[0]]]
    realData.forEach((item: any, idx: number) => {
      seriesList.push({
        name: measures[idx]?.label || `实际值${idx}`,
        stack: 'total',
        data: [item],
        type: 'bar',
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: measures.length - 1 === idx ? [0, 2, 2, 0] : [0, 0, 0, 0] //堆叠的只有最后一个加圆角
          }
        },
        barWidth: DEFAULT_BAR_MEASURES_WIDTH,
        color: measures[idx]?.color || DEFAULT_MEASURES_COLOR,
        value: 'measures',
        z: 3,
        ...seriesConfig,
      })
    });
    targets.forEach((item: any, idx: number) => {
      seriesList.push({
        name: item.label || `目标值${idx}`,
        type: 'scatter',
        symbol: 'rect',
        symbolSize: [2, 24],
        data: [item.value || item],
        color: item.color || DEFAULT_TARGET_COLOR,
        hoverAnimation: false,
        value: 'targets',
        z: 4
      })
    });

  }
  ranges.forEach((item: any, idx: number) => {
    seriesList.push({
      name: (ranges?.[idx] as any)?.label || '',
      data: [(ranges?.[idx] as any)?.value || ranges?.[idx]],
      type: 'bar',
      yAxisIndex: 0,
      stack: 'range',
      silent: true,
      barWidth: DEFAULT_BAR_WIDTH * chartData.length * 10,
      color: item.color || DEFAULT_COLOR,
      value: 'ranges',
    })
  });

  seriesList.forEach(item => {
    if ((chartConfig.rangesLegend ?? true) && item.value === 'ranges') {
      list.push(item)
    }
    if ((chartConfig.measuresLegend ?? true) && item.value === 'measures') {
      list.push(item)
    }
    if ((chartConfig.targetsLegend ?? true) && item.value === 'targets') {
      list.push(item)
    }
  })

  const legendList = handleLegend(list, extra.legendVisible && (chartConfig.legend?.show ?? true), settings.lengend)
  return {
    series: seriesList,
    legend: legendList
  }
}

export const handleTooltip = (tooltipVisible: boolean, settings: any) => {
  if (!tooltipVisible) return undefined;
  return {
    ...DEFAULT_TOOLTIP,
    ...settings.tooltip
  }
}

export const handleLegend = (list: any[], legendVisible: boolean, settings: any) => {
  if (!legendVisible) return undefined
  const legend = {
    icon: 'path://M904.5,437.5h-7a1,1,0,0,1-1-1v-7a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v7A1,1,0,0,1,904.5,437.5Z',
    data: list.map((i: any) => {
      if (i.type === 'bar') {
        return i.name
      }
      return {
        name: i.name,
        icon: DEFAULT_ICON
      }
    }),
    selectedMode: false,
    ...settings
  }
  return legend
}
import { merge } from 'lodash'
import { defaultBubbleSplitLine } from '../const/defaultBubbleConfig';
import { isArray } from './chart'
import { useLabelFormat } from '../chart-utils'

const xAxisType = {
  value: 'value',
  category: 'value',
  time: 'time',
  log: 'log'
}
export function getXAxis(args: any, chartType?: string) {
  const { dimensions, data, xAxis = {}, seriesField } = args
  const { digit, type, valueType, unit } = xAxis
  const typeType = type ? type : ((chartType === 'histogram' || chartType === 'bubble') ? 'value' : 'category')
  const defaultAxisLine = {
    lineStyle: {
      // color: '#CCCCCC',
      // width: 2
    }
  }
  const baseAxis = {
    axisLine: defaultAxisLine,
    type: typeType,
    splitLine: chartType === 'bubble' ? defaultBubbleSplitLine : {
      lineStyle: {
        // color: '#CCCCCC',
        // type: 'dashed'
      }
    },
    nameTextStyle: {
      // color: 'rgba(0, 0, 0, 0.85)',
      fontFamily: 'PingFang SC'
    },
    axisLabel: {
      // color: 'rgba(0, 0, 0, 0.45)',
      formatter(val: any) {
        return useLabelFormat(val, valueType, digit, unit)
      },
    },
    axisTick: {
      show: false,
    },
  }

  // 双x轴配置
  if (isArray(xAxis) && xAxis?.length) {
    let xAxisConfig = []
    for (let i = 0; i < xAxis.length; i++) {
      xAxisConfig[i] = {
        ...baseAxis,
        axisLabel: {
          formatter(val: any) {
            return useLabelFormat(
              val,
              xAxis[i]?.valueType,
              xAxis[i]?.digit,
              xAxis[i]?.unit,
            )
          },
        },
        ...xAxis[i],
      }
    }
    return xAxisConfig
  }

  let xAxisData = []
  if(typeType === 'category' ) {
    // 条形图特殊处理
    const dimension = Array.isArray(dimensions) && dimensions?.length ? dimensions[0] : dimensions
    
    xAxisData = dimension?.length ? data.map((row: any) => row[dimension]) : []
    if (seriesField) {
      xAxisData = Array.from(new Set(xAxisData))
    }

    if (Array.isArray(dimensions) && dimensions?.length) {
      if (dimensions.length === 1) {
        return merge(baseAxis, {
          data: xAxisData, 
        }, xAxis)
      }
      return dimensions.map((item: any) => (merge(baseAxis, {
        data: data.map((row: any) => row[item]),
      }, xAxis)))
    }
  }
  
  return merge(baseAxis,
  {
    data: xAxisData.concat(xAxis?.data || []), // 兼容echarts原生配置
  }, xAxis)
}

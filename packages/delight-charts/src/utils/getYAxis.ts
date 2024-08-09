import { isArray } from './chart'
import { useLabelFormat } from '../chart-utils'
import { merge } from './merge'
import { defaultBubbleSplitLine } from '../const/defaultBubbleConfig';


export function getYAxis(args:any, chartType?: string,) {
  const { dimensions, data, yAxis = {}, seriesField } = args
  const { digit, type, unit, valueType  } = yAxis
  // 默认type值
  const typeType = type ? type  : (chartType === 'histogram' ? 'category' : 'value')
  const yAxisBase: any = {
    boundaryGap: true, // 防止柱状图超过y轴
    axisTick: {
      show: false,
    },
    splitLine: chartType === 'bubble' ? defaultBubbleSplitLine : {
      lineStyle: {
        // color: '#CCCCCC',
        // type: 'dashed',
      },
    },
    axisLine: {
      show: typeType === 'category',
      lineStyle: {
        // color: '#CCCCCC',
        // width: 2,
      },
    },
    nameTextStyle: {
      // color: 'rgba(0, 0, 0, 0.67)',
      fontFamily: 'PingFang SC',
      padding: [0, 0, 0, -32], // 四个数字分别为上右下左与原位置距离
    },
    axisLabel: {
      // color: 'rgba(0, 0, 0, 0.45)',
      // axisLabel: {
      formatter(val: any) {
        return useLabelFormat(val, valueType, digit, unit)
      },
      // },
    },
    
    show: true,
  }
  // 双y轴配置
  if (isArray(yAxis) && yAxis?.length) {
    let yAxisData = []
    for (let i = 0; i < yAxis.length; i++) {
      const type: string = yAxis[i]?.type === 'histogram' ? 'category' : 'value'
      yAxisData[i] = merge(
        yAxisBase,
        {
          axisLabel: {
            formatter(val: any) {
              return useLabelFormat(
                val,
                yAxis[i]?.valueType,
                yAxis[i]?.digit,
                yAxis[i]?.unit,
              )
          },
        },
      }, yAxis[i],  {type: type})
    }
    return yAxisData
  }

  if(chartType === 'histogram' && typeType === 'category' ){
    // 条形图特殊处理
    const dimension = Array.isArray(dimensions) && dimensions?.length ? dimensions[0] : dimensions
    yAxisBase.data = dimension?.length ? data.map((row: any) => row[dimension]) : []
  } 

  if (chartType === 'histogram' && seriesField) {
    yAxisBase.data = Array.from(new Set(yAxisBase.data))
  }
  
  return merge( 
    yAxisBase,
    yAxis,
    {type: typeType}
  )
}

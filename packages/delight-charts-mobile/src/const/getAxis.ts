import { valueFormat } from "../utils/utils";

// 第三个参数：对于直方图x/y轴是反着的，因此设置标记
export function getAxisProp(propsInfo: any, type: 'x' | 'y', reverse = false): any {
  const { xAxis, yAxis, showLine } = propsInfo.chartConfig
  const usingYAxis = Array.isArray(yAxis) ? yAxis.slice(0) : (yAxis ? [yAxis] : [{}]);

  if ((showLine || [])?.length > 0 || yAxis?.length > 1) {
    usingYAxis[1] = {
      ...(usingYAxis?.[1] || {}),
      position: 'right',
      field: 'valueRight'
    }
  }

  let usingType = type
  if (reverse) {
    usingType = usingType === 'x' ? 'y' : 'x'
  }
  
  if (usingType === 'x') {
    const xAxisResult = dealAxisInfo(xAxis, reverse ? 'y' : 'x', 0)

    // 如果非条形图，则对x轴的展示数量进行计算 = width / 最长标签长度
    const { width, chartData } = propsInfo
    const xLabelLenList = (chartData || []).map((i: { date: any; }) => xAxisResult.formatter(i.date)?.length)
    const maxLabelWidth = Math.max.apply(null, xLabelLenList)
    const tickCount = Math.floor(width / (maxLabelWidth * 12))
    return [{
      ...xAxisResult,
      field: 'date',
      tickCount: xAxis?.splitNumber || (reverse ? undefined : tickCount)
    }]
  }

  if (usingType === 'y') {
    return usingYAxis.map((i, index) => dealAxisInfo(i, reverse ? 'x' : 'y', index))
  }

  return {}
}

function dealAxisInfo(info: any, type: 'x' | 'y', index = 0) {
  const {
    field: originField,
    show: visible,
    min,
    max,
    scale: nice,
    splitNumber: tickCount = 6,
    axisLabel,
    position: originPosition,

    valueType,
    digit,
    unit,
    grid,
  } = info || {}
  const positionMap = {
    x_0: 'bottom',
    x_1: 'top',
    y_0: 'left',
    y_1: 'right',
  }
  return {
    visible,
    valueType,
    field: originField || 'value', // x轴的field在上面方法中进行了覆盖修改
    position: originPosition || positionMap[[type, index].join('_')] || 'left',
    tickCount,
    // range: [],
    formatter: axisLabel?.formatter || ((v: string) => {
      if (isNaN(+v)) {
        return v
      }
      // 小于1w，则展示及证书
      const isGt1w = Math.abs(+v) >= 1e4
      const isInt = (~~+v) === +v
      return valueFormat(v, valueType || 'value', (digit || (isGt1w || !isInt ? 1 : 0)), (unit || isGt1w))
    }) ,
    min,
    max,
    nice: nice === false ? false : true,
    grid: '',
    style: {
      label: {
        opacity: axisLabel?.show === false ? 0 : 1,
        fontSize: 12,
        fontWeight: 400,
        fill: 'rgba(0, 0, 0, 0.45)',
        fontFamily: 'Inter',
        fontStyle: 'normal'
      },
      line: {
        stroke: type === 'y' ? 'transparent' : undefined,
      },
      grid: {
        stroke: type === 'x' ? 'transparent' : undefined,
        ...grid,
      },
    }

  }
}
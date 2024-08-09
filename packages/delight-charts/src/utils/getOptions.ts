import { isObject, isBoolean } from 'lodash';
import { isArray } from './chart'
import { merge } from './merge'
import type { EChartsOption, ChartOptions } from '../const/interface/core'
import type { OptionsExtra, OptionsSetting, OriginDataType } from '../const/interface/option'
import { getToolTip } from './getTooltip'
import { getLegend } from './getLegend'
import { getTitle } from './getTitle'
import { getGrid } from './getGrid'
import { getXAxis } from './getXAxis'
import { getYAxis } from './getYAxis'
import { getSeries } from './getSeries'
import { getVisualMap } from './getVisualMap'
import { getGeo } from './getGeo'
import {
  DEFAULT_TITLE,
  DEFAULT_LEGEND,
  notShowAxisChart,
} from '../const/chart'
/**
 * 生成option信息
 * @param data 数据的集合
 * @param settings 配置项
 * @param extra 其余配置信息
 * @returns
 */
export function getOptions(data: OriginDataType, settings: OptionsSetting, extra: OptionsExtra): ChartOptions & EChartsOption {
  const { chartType } = settings

  const {
    axisSite = {},
    xAxisType = "category",
    area,
    stack,
    nullAddZero = false,
    itemStyle,
    lineStyle,
    areaStyle,
    showLine,
    radius,
    circleCenter,
    center,
    markPoint,
    symbolConfig,
    barConfig,
    seriesConfig,
    mapType,
    seriesField,
    symbolZoomConfig,
    markLineConfig,
    chartLinks = [],
    emphasis,
    select,
    half
  } = settings
  const {
    dimensions = [], // 维度
    metrics = [], // 指标
    legendVisible,
    tooltipVisible,
    titleVisible,
    chartConfig,
    gridVisible,
    toolTipsText = [],
  } = extra
  const {
    labelMap = {},
    label = null,
    dataZoom = null,
    toolbox = null,
  } = {
    ...chartConfig,
  }

  // 当前的指标
  let curMetrics = [];
  if (axisSite.left && axisSite.right) {
    curMetrics = axisSite.left.concat(axisSite.right);
  } else if (axisSite.left && !axisSite.right) {
    curMetrics = axisSite.left;
  } else if (settings.metrics) {
    curMetrics = settings.metrics;
  } else {
    curMetrics = [...(metrics || [])]
  }

  const tooltip = tooltipVisible && getToolTip(chartConfig?.tooltip, toolTipsText, chartType, { chartConfig, metrics })
  const title = titleVisible ? getTitle(chartConfig?.title) : DEFAULT_TITLE

  const isYaxisNameVisible = isArray(chartConfig?.yAxis)
    ? chartConfig?.yAxis?.some?.((v: any) => v.name)
    : chartConfig?.yAxis?.name
  const isYaxisHidden = isBoolean(chartConfig?.yAxis?.show) && !chartConfig?.yAxis?.show
  const grid = getGrid(chartConfig?.grid, {
    chartType,
    isYaxisHidden,
    isYaxisNameVisible, legendVisible, titleVisible, gridVisible
  })
  const legend = legendVisible
    ? getLegend(chartConfig?.legend, titleVisible, chartType, grid)
    : DEFAULT_LEGEND

  if (notShowAxisChart.includes(chartType) || chartType === 'bubble') {
    if (!chartConfig?.tooltip?.trigger) {
       tooltip.trigger = "item";
    }
  }

  const xAxis = getXAxis({ dimensions, data, xAxis: chartConfig?.xAxis, seriesField }, chartType)

  const yAxis = getYAxis({ dimensions, data, yAxis: chartConfig?.yAxis, seriesField }, chartType)
  const axisData = (chartType !== 'histogram' ? xAxis?.data : yAxis?.data) || []

  const geo = getGeo(chartConfig.geo || {}, mapType)

  const visualMap = getVisualMap(chartConfig.visualMap || {}, chartType, data)

  const series = getSeries({
    data,
    axisSite,
    metrics,
    area,
    areaStyle,
    stack,
    nullAddZero,
    labelMap,
    label,
    itemStyle,
    lineStyle,
    xAxisType,
    axisData,
    dimensions,
    showLine,
    radius: ['circle', 'pie'].includes(chartType) ? radius : undefined,
    circleCenter,
    center,
    markPoint,
    symbolConfig,
    barConfig,
    seriesConfig,
    seriesField,
    symbolZoomConfig,
    yAxis: chartConfig?.yAxis,
    markLineConfig,
    chartLinks,
    emphasis,
    select,
    half
  }, chartType)

  const caculatedOption = {
    legend,
    xAxis,
    series,
    yAxis,
    tooltip,
    title,
    visualMap,
    dataZoom,
    toolbox,
    grid,
  };

  switch (chartType) {
    case "line":
      if (!series.length && chartConfig.series.length) {
        // 原配置
        chartConfig.series.forEach((element: any) => {
          element.emphasis = {
            focus: chartConfig.series.length > 1 ? "series" : "none",
          };
        });
      }
      break;
    case "bar":
    case "histogram":
      if (series.length) {
        // 原配置
        chartConfig.series.forEach((element: any) => {
          element.emphasis = {
            focus: chartConfig.series.length > 1 ? "series" : "none",
          };
        });
      }
      break;
    default:
      break;
  }

  const resultOption = merge(chartConfig, caculatedOption);

  // pie 不显示声明显示x轴和y轴就隐藏坐标轴
  if (notShowAxisChart.includes(chartType)) {
    if (!xAxis?.show || !yAxis?.show) {
      delete resultOption.xAxis
      delete resultOption.yAxis
    }
  }
  if (chartType === 'map') {
    return {
      ...resultOption,
      geo,
    }
  }
  // seriesField是个字符串，别用判断对象是否为空的方法判断seriesField是否存在
  // 后续这个补0操作建议移出去
  if (!seriesField && !notShowAxisChart.includes(chartType) && chartType !== 'bubble') {
    const list = (chartType !== 'histogram' ? resultOption?.xAxis?.data : resultOption?.yAxis?.data) || []
    // 解决echarts原生写法data是个简单数组的时候会有问题，数据全被置为0了
    if (list.length) {
      const data = resultOption?.series || []
      const dataList = data.map((item: any) => {
        const itemData = list.map((i: any, index: number) => {
          const isObjectData = item.data.filter((o: any) => isObject(o))?.length
          return isObjectData ? item.data.filter((o: any) => o.name === i)?.[0] || {
            name: i,
            value: 0,
            itemStyle: {},
            detailData: [],
          } : item.data[index]
        })
        return {
          ...item,
          data: itemData
        }
      })
      resultOption.series = dataList
    }
  }
  return resultOption
}

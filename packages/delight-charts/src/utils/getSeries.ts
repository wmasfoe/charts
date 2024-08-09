import { isNil, cloneDeep, isEmpty, pick } from 'lodash'
import deepmerge from 'deepmerge';
import { formatAreaData } from './formatAreaData';
import { getStackMap } from './chart'
import { getLabelName } from './getLabelName'
import {
  DEFAULT_BAR_CONFIG,
  DEFAULT_BAR_ITEM_CONFIG,
  DEFAULT_HISBAR_ITEM_CONFIG,
  DEFAULT_CIRCLE_ITEM_CONFIG
} from '../const/defaultBarConfig'
import { DEFAULT_CIRCLE_SERIES_CONFIG } from '../const/defaultCircleConfig'
import { defaultBubbleChartConfig, defaultBubbleSizeConfig, defaultBubbleLabelRichConfig } from '../const/defaultBubbleConfig';
import { DEFAULT_LINE_ITEM_CONFIG } from '../const/defaultLineConfig'
import { DEFAULT_PIE_SERIES, notShowAxisChart } from '../const/chart';
import { DEFAULT_TREEMAP_CONFIG } from '../const/defaultTreemapConfig'
import { DEFAULT_FUNNEL_CONFIG } from '../const/defaultFunnelConfig'
import { DEFAULT_MAP_CONFIG, DEFAULT_MAP_ITEM_CONFIG } from '../const/defaultMapConfig'
import { isArray } from '../utils/chart'
import { getBubbleMarkLine } from './getBubbleMarkLine'
import { DEFAULT_SANKEY_SERIES_CONFIG, defaultSankeyEmphasis, defaultSankeyBlur } from '../const/defaultSankeyConfig'
import { getActiveDataStyle } from '../utils/bubbleHighLight'
const getBarCatagoryGap = (series: [], barGap: number | string) => {
  if (!series?.length) {
    return;
  }
  const gap = String(barGap).includes('%')
    ? (String(barGap).replace('', '%') as any) / 100
    : +barGap
  const n = series?.length
  const result = (2 / (n + ((n - 1) * gap) / 6 + 2)) * 100
  return result + '%'
}

const getRadius = (radius = '', metricName = '') => {
  if (typeof radius === 'string' || typeof radius === 'number' || Array.isArray(radius)) {
    return radius
  }
  return radius[metricName];
};

type Params = {
  series: Record<string, any>;
  metrics: any;
  data: any;
}
// 将series中的数据转为多个seriesItem
function seriesDataToSeriesItemData ({ series, metrics, data }: Params) {
  const seriesRes = cloneDeep(series)
  const keys = Object.keys(seriesRes).filter(v => v !== 'data')
  const seriesData = seriesRes.data
  const otherInfo = pick(seriesRes, keys)
  

  let sortData: any[] = []
  // 对数据进行排序
  if(!isEmpty(metrics?.[2])) {
    const index = metrics[2]
    sortData = data?.map((item: any) => {
      const v = item?.[index]
      return v?.includes('%') ? parseFloat(v) * 100 : +v
    })
    sortData.sort((p: number, v: number) => v - p)
    sortData = Array.from(new Set(sortData))
  }
  
  const seriesResult = seriesData.map((item: any) => {
    const z = sortData.findIndex((v) => v === item.value[2]) ?? 0
    return {
      ...otherInfo,
      data: [
        {
          ...item,
          value: item.value
        }
      ],
      z: z + 1
    }
  })

  return seriesResult
}

export const getCircleCenterLabel = (circleCenter: any, data: any[], labelOption: any) => {
  if (!circleCenter) {
    return;
  }
  // TODO 点击之后修改 circleCenter 相关参数
  const { mainTitle, mainLabel, subText, subNum,
    mainTitleStyle, mainLabelStyle, subTextStyle, subNumStyle,
    selectedInfo
  } = circleCenter
  const result = {
    show: true,
    position: "center",
    fontSize: 16,
    fontWeight: 600,
    // label不支持html格式,这种格式可以用来说明这个变量带样式，在rich里面可以设置'{mainTitle|' + mainTitle + '}'
    formatter: () => {
      let str = ''

      if (typeof mainTitle === 'function') {
        str = '{mainTitle|' + mainTitle(selectedInfo?.datum, selectedInfo?.data ?? data) + '}'
      } else {
        str = mainTitle ? '{mainTitle|' + mainTitle + '}' : ''
      }
      if (typeof mainLabel === 'function') {
        str = str + '\n' + '{mainLabel|' + mainLabel(selectedInfo?.datum, selectedInfo?.data ?? data) + '}'
      } else {
        str = mainLabel ? str + '\n' + '{mainLabel|' + mainLabel + '}' : str
      }

      str = subText ? str + '\n' + '{subText|' + subText + '}' : str
      str = subNum ? str + '{subNum|' + subNum + '}' : str
      return str
    },
    rich: {
      mainTitle: !!mainTitle ? {
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 22,
        ...{ ...mainTitleStyle || {} }
      } : null,
      mainLabel: !!mainLabel ? {
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 28,
        ...{ ...mainLabelStyle || {} }
      } : null,
      subText: !!subText ? {
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 20,
        padding: [0, 6, 0, 0],
        ...{ ...subTextStyle || {} }
      } : null,
      subNum: !!subNum ? {
        color: !isNaN(+subNum.replace('%', '')) ? (+subNum.replace('%', '') > 0 ? '#F03860' : '#91DAA6') : 'rgba(0, 0, 0, 0.45)',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 20,
        ...{ ...subNumStyle || {} }
      } : null
    }
  }
  return result
}

/**
 * 获取所需要的series数据
 * @param args 传入的参数集
 * @param chartType 当前的图标类型
 * @returns series[] 使用在e-charts中的数据数组
 */
export function getSeries(args: any, chartType: string) {
  const {
    data, // 数据集合
    axisSite,
    dimensions, // 维度，如日期
    metrics, // 指标
    area,
    areaStyle,
    stack, // 堆叠选项
    nullAddZero,
    labelMap,
    label,
    axisData,
    itemStyle,
    lineStyle,
    radius,
    smooth = false,
    showLine = [],
    seriesName,
    emphasis,
    select,
    circleCenter,
    yAxis,
    markPoint,
    center,
    barConfig,
    seriesConfig,
    symbolConfig,
    mapType,
    seriesField,
    symbolZoomConfig,
    markLineConfig,
    canClick,
    chartLinks,
    half
  } = args

  // 根据传入的chartType查找默认配置
  const DEFAULT_CHART_CONFIG = {
    bar: DEFAULT_BAR_CONFIG,
    histogram: DEFAULT_BAR_CONFIG,
    pie: DEFAULT_PIE_SERIES,
    circle: DEFAULT_CIRCLE_SERIES_CONFIG,
    treemap: DEFAULT_TREEMAP_CONFIG,
    funnel: DEFAULT_FUNNEL_CONFIG,
    map: DEFAULT_MAP_CONFIG,
    bubble: defaultBubbleChartConfig,
    line: DEFAULT_LINE_ITEM_CONFIG,
    sankey: DEFAULT_SANKEY_SERIES_CONFIG
  }
  const defaultConfig = DEFAULT_CHART_CONFIG[chartType] || {}

  // 查找传入的默认item配置
  const DEFAULT_CHART_ITEM_CONFIG = {
    bar: DEFAULT_BAR_ITEM_CONFIG,
    histogram: DEFAULT_HISBAR_ITEM_CONFIG,
    circle: DEFAULT_CIRCLE_ITEM_CONFIG,
    map: DEFAULT_MAP_ITEM_CONFIG
  }
  const defaultItemConfig = DEFAULT_CHART_ITEM_CONFIG[chartType] || {}
  const stackMap = (stack && getStackMap(stack)) as any
  if (chartType === 'map') {
    return [{
      name: seriesName || '',
      type: 'map',
      // map的数据结构
      data: data.map((item: any) => ({
        ...item,
        value: item.value,
        name: formatAreaData(item.name),
      })) || [],
      ...defaultConfig,
      map: mapType || 'china',
      itemStyle: { ...defaultItemConfig },
      ...seriesConfig
    }]
  }
  let dimList: string[] = []
  if (chartType === 'bubble' && seriesField) {
    dimList = Array.from(new Set(data.map((item: any) => item[seriesField])))
  }

  // 将指标与数据共同生成series
  const usingMetricName = chartType === 'bubble' ? (seriesField ? dimList : dimensions) : metrics
  let seriesResult = usingMetricName.map((metricName: string, index: number) => {
    // 通过指标名，获取值，如果值为Null且nullAddZero为true则将其置为0
    let dataList = []
    if (chartType === 'bubble') {
      function toNum(str: any) {
        let num: string | number = parseFloat(str) || 0;
        if (str?.includes?.('%')) {
          num /= 100;
        }
        return num;
      }
      let bubbleData = data.slice(0)
      if (seriesField) {
        bubbleData = data.filter((item) => item[seriesField] === metricName)
      }
      dataList = bubbleData.map((row: any) => {
        const config: any = {}

        config.itemStyle = {
          color: row?.color
        }
        config.value = []
        // 按 metrics 取值，气泡图对 metrics 传入顺序有要求，x y z
        for (const metricsItem of metrics) {
          config.value.push(toNum(row?.[metricsItem]))
        }
        // 按 dimensions 取 name
        config.name = row?.[dimensions[0]]
        if (isEmpty(row?.detailData)) {
          // 没有 detailData，手动生成
          const extra: any = {
            tooltipInfo: [],
            chartInfo: row
          }
          metrics.forEach((metricsItem: any, index: number) => {
            extra.tooltipInfo.push({
              name: labelMap[metricsItem] || metricsItem,
              value: row?.[metricsItem]
            })
          })
          config.extra = extra
        } else {
          config.extra = {
            tooltipInfo: row?.detailData,
            chartInfo: row
          }
        }

        // 当前data激活
        if(row?.active) {
          const res = getActiveDataStyle({
            selectStyle: isEmpty(emphasis) ? select : emphasis,
            symbolZoomConfig,
            defaultBubbleSizeConfig,
            config
          })
          for (const key in res) {
            config[key] = res[key]
          }
        }
        return config
      })
    } else {
      const notHasTargetNodes = []
      // 根据link找没有 source 的节点，这些节点是最后一个层级，label在左
      if(chartType === 'sankey') {
        const hasTargetNodes = chartLinks?.map(v => v?.source) || []
        data?.map?.(v => {
          if(!hasTargetNodes.includes(v?.name)) {
            notHasTargetNodes.push(v?.name)
          }
        })
      }
      dataList = data.reduce((total: any, row: any) => {
        if (row[metricName] === null && nullAddZero) {
          if (notShowAxisChart.includes(chartType)) {
            total.push({ name: row[dimensions[0]], value: 0, detailData: row?.detailData || [], extra: row })
            return total
          }
          total.push(0)
          return total
        }
        if (seriesField && typeof row[metricName] === 'undefined') {
          // 如果有分组，且该项为undefined，则舍弃
          return total
        }
        const dimensionsKey = chartType === 'sankey' ? 'name' : dimensions[0]
        if (notShowAxisChart.includes(chartType)) {

          const dataItem = ['pie', 'circle'].includes(chartType) ?
            {
              value: row[metricName]?.value || row[metricName],
              itemStyle: row[metricName]?.itemStyle || {},
              name: row[dimensionsKey],
              detailData: row?.detailData || [],
              extra: row
            } :
            {
              name: row[dimensionsKey],
              value: row[metricName]?.value || row[metricName],
              detailData: row?.detailData || [],
              extra: row
            }
          
          // 桑基图添加 itemStyle 用来点击高亮
          if(chartType === 'sankey') {
            dataItem.itemStyle = row?.itemStyle || {}
            dataItem.label = row?.label || {}
          }

          if(notHasTargetNodes.includes(row?.name)) {
            dataItem.label = {
              ...(dataItem.label || {}),
              position: 'left'
            }
          }

          total.push(dataItem)
          return total
        }
        // 需要给其他chartType类型的组件增加 itemStyle 防止下钻功能丢失
        total.push({
          name: row[dimensionsKey],
          value: row[metricName]?.value || row[metricName],
          itemStyle: row[metricName]?.itemStyle || {},
          detailData: row?.detailData || [],
          extra: row
        })
        return total
      }, [])
      // 有分组的数据得保证所有列都按坐标轴的顺序来，否则会错乱
      if (axisData?.length && seriesField) {
        const formatDataList = axisData.map(axisItem => {
          const queItem = dataList.filter(dataitem => dataitem.name === axisItem)
          return queItem[0];
        })
        dataList = formatDataList
      }
    }

    // 获取使用的type
    let useType = chartType;
    switch (chartType) {
      case 'bar':
      case 'histogram':
        useType = showLine.includes(metricName) ? 'line' : 'bar'
        break;
      case 'circle':
        useType = 'pie'
        break;
      case 'bubble':
        useType = 'scatter'
        break;
      default:
        break;
    }
    // 获取seriesItem的默认基本信息

    let seriesItem: any = {
      // pie/circle使用传入的值作为name，其中只有多环才需要展示
      name: ['circle', 'pie'].includes(chartType) ? (seriesName || (usingMetricName.length > 1 && metricName) || '') : getLabelName(labelMap, metricName),
      type: useType,
      data: dataList,
      smooth,
      ...defaultConfig,
      markPoint: Array.isArray(markPoint) ? markPoint[index] : markPoint,
      itemStyle: { ...defaultItemConfig },
    }
    if(useType === 'sankey') {
      seriesItem.links = chartLinks || []
    }
    if (chartType === 'bubble' && symbolZoomConfig?.symbolZoomMax) {
      const symbolZoomMax = symbolZoomConfig?.symbolZoomMax
      const symbolMax: number = !isNil(symbolZoomConfig?.symbolMax) ? symbolZoomConfig?.symbolMax : defaultBubbleSizeConfig.symbolMax
      const symbolMin: number = !isNil(symbolZoomConfig?.symbolMin) ? symbolZoomConfig?.symbolMin : defaultBubbleSizeConfig.symbolMin

      seriesItem.symbolSize = (value: number[]) => {
        if(typeof symbolZoomMax === 'function') {
          return symbolZoomMax(value?.[2], { max: symbolMax, min: symbolMin, zoom: symbolZoomMax, seriesItem })
        }
        // 以100为基准，按最大值缩放比例
        const num = (value?.[2] / symbolZoomMax) * symbolMax

        // 保证下限最小值为5
        if (num <= symbolMin || isNaN(num)) {
          return symbolMin
        }
        return num
      };
    }
    //在单个图表实例中存在多个y轴的时候有用
    if (isArray(yAxis) && yAxis[index]) {
      seriesItem.yAxisIndex = yAxis[index]?.yAxisIndex || index
    }

    let ItemConfig: any = {}
    if (Array.isArray(seriesConfig) && seriesConfig[index]) {
      seriesItem = deepmerge(seriesItem, seriesConfig[index])
      ItemConfig = seriesConfig?.[index] || {}
    } else if (seriesConfig) {
      seriesItem = deepmerge(seriesItem, seriesConfig)
      ItemConfig = seriesConfig || {}
    }
    if (barConfig) {
      seriesItem = {
        ...seriesItem,
        ...barConfig
      }
    }
    if (Array.isArray(symbolConfig) && symbolConfig[index]) {
      seriesItem = {
        ...seriesItem,
        ...symbolConfig[index]
      }
    }
    if (center) {
      seriesItem.center = center;
    }
    if (chartType === "treemap") {
      seriesItem.name = "";
    }

    // 只有一个数据点的时候展示圆圈，不然图上什么也没有
    if (chartType === 'line' && data.length === 1) {
      seriesItem.showSymbol = true
    }
    // 默认不显示折线点, bubble必须得有symbol不然显示不出来
    if (!seriesItem.symbol && chartType !== 'bubble') {
      seriesItem.symbol = "none"
    }

    // 是否有填充区域
    if (area) {
      seriesItem.areaStyle = areaStyle || {};
    }

    // 指标所在的轴
    if (axisSite.right) {
      seriesItem.yAxisIndex = ~axisSite.right.indexOf(metricName) ? 1 : 0;
    }

    // 是否设置了堆叠
    if (stack && stackMap[metricName]) {
      seriesItem.stack = stackMap[metricName];
    }

    // 设置label
    if (['circle', 'pie'].includes(chartType)) {
      const circleCenterLabel = getCircleCenterLabel(circleCenter, data, label);
      // position = outside 就不需要中心文案了
      const needCenterLabel = label?.position !== 'outside'
      const mergedLabel = needCenterLabel ? deepmerge(circleCenterLabel || {}, label || {}) : label;
      seriesItem.label = isEmpty(mergedLabel) ? null : mergedLabel
    } else if (chartType === "bubble") {
      // 防止直接覆盖label
      seriesItem.label = {
        ...defaultConfig.label,
        ...label
      }

      if(label?.after || label?.before) {
        const before = label?.before ? `{b|${label.before?.text || ''}}` : '';
        const after = label?.after ? `{a|${label.after?.text || ''}}` : '';

        // label样式
        const textStyle = label?.mainTextStyle || {}

        const richStyle = {
          c: {...defaultBubbleLabelRichConfig.c, ...textStyle},
          a: deepmerge(defaultBubbleLabelRichConfig.common || {}, label.after || {}),
          b: deepmerge(defaultBubbleLabelRichConfig.common || {}, label.before || {})
        }

        const beforeImage = label?.before?.image
        const afterImage = label?.after?.image

        richStyle.b.backgroundColor = label.before?.backgroundColor || {...defaultBubbleLabelRichConfig.backgroundColor}
        richStyle.a.backgroundColor = label.after?.backgroundColor || {...defaultBubbleLabelRichConfig.backgroundColor}

        if(beforeImage) {
          richStyle.b.backgroundColor = {
            image: beforeImage
          }
        }

        if(afterImage) {
          richStyle.a.backgroundColor = {
            image: afterImage
          }
        }

        seriesItem.label = {
          normal: {
            position: label.position || 'bottom',
            show: true,
            formatter(param: any) {
              const data = param?.data

              let afterIsShow = true
              if(typeof label?.after?.show === 'function') {
                afterIsShow = label.after?.show(data)
              }

              let beforeIsShow = true
              if(typeof label?.before?.show === 'function') {
                beforeIsShow = label.before?.show(data)
              }

              const finalBefore = beforeIsShow ? before : ''
              const finalAfter = afterIsShow ? after : ''

              return finalBefore + `{c|${data?.name}}` + finalAfter;
            },
            rich: richStyle,
          },
        }
      }
    } else if (chartType === 'sankey') {
      seriesItem.label = {
        ...seriesItem.label,
        formatter(v) {
          return labelMap?.[v?.name] || v?.name
        },
        ...label
      }
    } else if (label) {
      seriesItem.label = label;
    }

    // 设置了line样式相关
    if (itemStyle) {
      seriesItem.itemStyle = deepmerge(seriesItem?.itemStyle || {}, itemStyle);
    }
    if (lineStyle) {
      seriesItem.lineStyle = deepmerge(seriesItem?.lineStyle || {}, lineStyle);
    }

    // 计算使用的focus
    let useFocus: string | undefined = 'self'
    let useScale = undefined
    if (chartType === 'pie' || chartType === 'circle') {
      useFocus = ItemConfig?.emphasis?.focus
        ? ItemConfig?.emphasis?.focus
        : undefined
    } else if(chartType === 'sankey') {
      useFocus = emphasis?.focus || defaultSankeyEmphasis.focus
    } else {
      useFocus = ItemConfig?.emphasis?.focus
        ? ItemConfig?.emphasis?.focus
        : metrics.length > 1
          ? 'series'
          : 'none'
    }
    switch (chartType) {
      case 'bar':
        seriesItem.barCategoryGap = !seriesItem.barCategoryGap ? getBarCatagoryGap(metrics, seriesItem.barGap as string | number) : seriesItem.barCategoryGap
        break;
      case 'histogram':
        seriesItem.barCategoryGap = !seriesItem.barCategoryGap ? getBarCatagoryGap(metrics, seriesItem.barGap as string | number) : seriesItem.barCategoryGap
        break;
      case 'pie':
        seriesItem.radius = getRadius(radius || DEFAULT_PIE_SERIES.radius, metricName)
        break;
      case 'circle':
        seriesItem.radius = radius ? radius : seriesItem.radius
        seriesItem.hoverAnimation = false
        useScale = true
        break
      case 'bubble':
        useScale = true
        useFocus = undefined
        break
      default:
        break;
    }

    if(chartType === 'sankey') {
      seriesItem.emphasis = deepmerge({
        ...defaultSankeyEmphasis,
        focus: useFocus,
        scale: useScale,
      }, emphasis || {})
      seriesItem.blur = deepmerge(defaultSankeyBlur, seriesConfig?.blur || {})
    } else {
      seriesItem.emphasis = {
        focus: useFocus,
        scale: useScale,
        ...(emphasis || {}),
      }
    }

    // 半环图
    if (['circle', 'pie'].includes(chartType) && half) {
      // 计算 seriesItem 中的 value 和
      const res = seriesItem.data?.reduce((p, v) => ({ value: p.value + v.value }))
      const totalData = res.value
      seriesItem.data.push({
        value: totalData,
        // 当前空白值不渲染
        itemStyle: {
          color: 'none',
          decal: {
            symbol: 'none'
          },
          borderRadius: 0,
          borderWidth: 0,
          opacity: 0
        },
        label: {
          show: ''
        }
      })
      if(seriesItem.name === '') {
        delete seriesItem.name
      }
      seriesItem.startAngle = seriesItem.startAngle ?? 180
    }
    return seriesItem;
  });

  const zLevel = typeof seriesConfig?.zLevel === 'boolean' ? seriesConfig?.zLevel : false
  // 每个 data 生成一个 seriesItem，为了小气泡覆盖大气泡
  if(chartType === 'bubble' && zLevel) {
    let res: any[] = []

    // 每个 series 数组项都进行转换
    for (const item of seriesResult) {
      const transferResult = seriesDataToSeriesItemData({
        series: item,
        metrics,
        data,
      })
      res = res.concat(transferResult)
    }
    seriesResult = res
  }

  // 气泡图 benchmark
  if (!isNil(markLineConfig) && chartType === 'bubble') {
    seriesResult.push({
      // name 必须为空，否则会多生成 legend
      "name": "",
      "type": "scatter",
      markLine: getBubbleMarkLine(markLineConfig)
    })
  }

  if (chartType === "circle") {
    // Circle只支持分析一个指标，多个指标以最后一个为准
    return seriesResult[seriesResult.length - 1];
  }
  return seriesResult
}
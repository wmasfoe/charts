import { toolTipsText2 } from '../../demo/constant';
import { isArray, isObject, isEmpty } from 'lodash'
import { useLabelFormat } from '../chart-utils'
import { getFormatType } from './defaultTooltipConfig'

// 气泡颜色，根据默认颜色变透明
export const defaultBubbleColor = 'rgba(60,102,255,0.5)';

export const defaultBubbleSizeConfig = {
  symbolMax: 60,
  symbolMin: 8,
}
export const defaultBubbleLabelConfig = {
  show: true,
  formatter: (params: any) => {
    const data = params?.data
    // return data?.name || params.seriesName
    return data?.name
  },
  color: 'rgba(0,0,0,.65)',
  fontWeight: '400',
  position: 'bottom'
}
export const defaultBubbleLabelRichConfig = {
  c: {
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 12,
    fontFamily: 'PingFang SC',
    fontWeight: 400,
    padding: 2,
  },
  common: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'PingFang SC',
    fontWeight: 600,
    borderRadius: 2,
    padding: 1.5,
  },
  backgroundColor: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: 'rgba(255,164,112)',
      },
      {
        offset: 1,
        color: 'rgba(255,76,87, 1)',
      },
    ],
  }
}
export const defaultBubbleLabelLayoutConfig = {
  hideOverlap: true
}
export const defaultBubbleTooltipFormatter = (params: any, toolTipsText: any, args: any) => {
  const data = params?.data;
  const { digit, type, unit, valueType, tooltip, metrics, labelMap } = args || {}
  const value = data[1] || null
  const { name, extra } = data
  const { tooltipInfo: detailData } = extra || {}
  let dom = '';
  const isText: boolean = !!(isArray(toolTipsText) && toolTipsText?.length) || !isEmpty(toolTipsText);
  if (detailData?.length) {
    dom += `<div class="toolTip-tips-xlabel-wrap"><div class="toolTip-tips-xlabel">${name}</div>`
    detailData && detailData.forEach((item: { marker: any; name: any; value: any; }) => {
      if(item.value === undefined) return
      const { currentDigit, currentUnit, currentValueType } = getFormatType(item.name, { tooltip, metrics, valueType, digit, unit, labelMap })
      dom += `<div class="toolTip-tips-xlabel-content">
            <span class="${isText ? 'toolTip-tips-xlabel-marker' : 'toolTip-tips-xlabel-marker-min'}">${item.name}</span>
            <span class="toolTip-tips-xlabel-value">${useLabelFormat(item.value, currentValueType, currentDigit, currentUnit)}</span></div>`
    })
  }
  const { currentDigit, currentUnit, currentValueType } = getFormatType(params.name, { tooltip, metrics, valueType, digit, unit, labelMap })
  const commonString = `<div class="toolTip-tips-xlabel-wrap"><div class="toolTip-tips-xlabel">${name}</div>
    <div class="toolTip-tips-xlabel-content">
        <span class="toolTip-tips-xlabel-value toolTip-tips-xlabel-bubble-value">${useLabelFormat(value, currentValueType, currentDigit, currentUnit)}</span></div>`
  if (!dom && name && value) {
    return commonString
  }
  return dom;
}
export const defaultBubbleSplitLine = {
  show: false,
}
export const defaultBubbleGridConfig = {
  show: true,
  top: '8%',
  left: '7%',
  right: '15%',
  bottom: '10%',
  containLabel: false,
}
export const defaultBubbleChartConfig = {
  label: defaultBubbleLabelConfig,
  labelLayout: defaultBubbleLabelLayoutConfig,
  grid: defaultBubbleGridConfig
};


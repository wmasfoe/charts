import { isArray } from 'lodash';
import { useLabelFormat } from '../chart-utils';

export const defaultRadarItemConfig = {
  splitLine: {
    lineStyle: {
      color: "rgba(0, 0, 0, 0.08)"
    }
  },
  splitArea: {
    areaStyle: {
      color: ["#ffffff", "rgba(0, 0, 0, 0.03)"]
    }
  },
}

export const defaultRadarSeriesItemConfig = {
  // 圆点隐藏
  symbol: 'none',
  // 填充颜色
  areaStyle: {
    normal: {
      opacity: 0
    },
    // hover 透明度上升 20%
    emphasis: {
      opacity: 0.2,
    }
  },
}

export const defaultRadarTooltipFormatter = (params: any, args: any) => {
  const { data, marker } = params || {};
  const { digit, type, unit, valueType } = args || {}

  const { indicator, name, value } = data || {};

  let dom = '';

  if (indicator?.length) {
    dom += `<div class="toolTip-tips-xlabel-wrap"><div class="toolTip-tips-xlabel">${marker}${name}</div>`
    isArray(indicator) && indicator.forEach((item: { marker: any; name: any; value: any; }, index) => {
      const v = value[index]
      dom += `<div class="toolTip-tips-xlabel-content">
            <span class="'toolTip-tips-xlabel-marker'">${item.name}</span>
            <span class="toolTip-tips-xlabel-value">${useLabelFormat(v, valueType, digit, unit)}</span></div>`
    })
  }
  const commonString = `<div class="toolTip-tips-xlabel-wrap"><div class="toolTip-tips-xlabel">${name}</div>
    <div class="toolTip-tips-xlabel-content">
        <span class="toolTip-tips-xlabel-value toolTip-tips-xlabel-bubble-value">${useLabelFormat(value, valueType, digit, unit)}</span></div>`
  if (!dom) {
    return commonString
  }
  return dom;
}
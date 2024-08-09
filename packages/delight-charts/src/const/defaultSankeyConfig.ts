import useLabelFormat from '../chart-utils/useLabelFormat'
import { getFormatType } from './defaultTooltipConfig'

export const DEFAULT_SANKEY_SERIES_CONFIG = {
  layout: 'none',
  draggable: false,
  nodeWidth: 8,
  nodeGap: 12,
  lineStyle: {
    color: 'source',
    opacity: 0.15
  },
  labelLayout: {
    hideOverlap: true
  },
  label: {
    borderWidth: 0,          // 标签边框宽度
    backgroundColor: 'transparent', // 标签背景颜色
    distance: 12
  },
}

export const defaultSankeyEmphasis = {
  focus: 'adjacency',
  itemStyle: {
    opacity: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.85)'
  },
  lineStyle: {
    opacity: 0.25
  },
}

export const defaultSankeyBlur = {
  lineStyle: {
    opacity: 0.05,
  },
  itemStyle: {
    opacity: 0.25,
  },
  label: {
    color: 'rgba(0, 0, 0, 0.28)',
    opacity: 1,
  },
  active: {
    lineStyle: {
      color: 'rgba(0, 0, 0, 0.02)',
      opacity: 1
    },
    itemStyle: {
      color: '#E2E2E2',
      opacity: 1
    },
    label: {
      color: 'rgba(0, 0, 0, 0.28)',
      opacity: 1
    }
  }
}

export const defaultSankeyTooltipFormatter = (params, args) => {
  const data = params?.data;
  const { digit, type, unit, valueType, chartConfig, metrics, tooltip } = args || {}

  const labelMap = chartConfig?.labelMap || {}
  if(params.dataType === 'node') {
    return `<div class="toolTip-tips-xlabel-content" style="display: flex; align-items: center;">
      ${params.marker}
      <span class="toolTip-tips-xlabel-value" style="font-weight: 400; margin-left: 0;">
        ${labelMap[data?.name] || data?.name}
      </span>
    </div>`
  } else {
    const { currentDigit, currentUnit, currentValueType } = getFormatType(params?.seriesName || params?.name, { valueType, digit, unit, metrics, tooltip: chartConfig?.tooltip || tooltip })
    const source = labelMap[data?.source] || data?.source
    const target = labelMap[data?.target] || data?.target
    const value = data?.value
    // hover link 没有 marker
    const commonString = `
      <div class="toolTip-tips-xlabel-content">
        <span class="toolTip-tips-xlabel-value" style="margin-left: 0; font-weight: 400;">
          ${source}
          <span style="color: rgba(0, 0, 0, 0.28);margin-inline: 2px; font-weight: 400;">至</span>
          ${target}
          <span style="margin-left: 23px; font-weight: 400;">${useLabelFormat(value, currentValueType, currentDigit, currentUnit)}</span>
        </span>
      </div>`  
    return commonString
  }
}

export const DEFAULT_SANKEY_ITEM_SERIES_CONFIG = {

}

export const DEFAULT_SANKEY_COLOR = [
  '#4A7CFF',
  '#FF8B1F',
  '#00B8F5',
  '#F6C122',
  '#58679D',
  '#46CF6F',
  '#9060F0',
  '#FF667A',
  '#0FB39D',
  '#E77EE7',
]

import { isArray, isObject, isEmpty, cloneDeep , isNil } from 'lodash'
import { defaultBubbleTooltipFormatter } from './defaultBubbleConfig'
import { useLabelFormat } from '../chart-utils'
import { defaultRadarTooltipFormatter } from './defaultRadarConfig'
import { defaultSankeyTooltipFormatter } from './defaultSankeyConfig'

export type ArrayOrObjectType<T> = Array<T> | T

export type PARAM_ITEM = {
    axisValueLabel: string;
    seriesName: string;
    marker: string | boolean;
    name: string;
    value: any
} | {
    componentSubType: string
    value(value: any): unknown
    seriesName: any
    axisValueLabel: any
    marker: any
    name: string
}[]
type ValueFormatterType = (value: number | string) => string

type ARGS = Partial<{
    digit: number;
    type: string;
    unit: boolean;
    valueFormatter: ValueFormatterType;
    valueType: string;
    chartType: string;
    chartConfig?: any;
    half: boolean;
    [key: string]: any;
}>
const downloadSvg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.66455 0.999674C7.66455 0.631485 7.36607 0.333008 6.99788 0.333008C6.62969 0.333008 6.33122 0.631485 6.33122 0.999674V8.0541L4.47206 6.19494C4.21171 5.93459 3.7896 5.93459 3.52925 6.19494C3.2689 6.45529 3.2689 6.8774 3.52925 7.13775L6.49166 10.1002C6.61393 10.2427 6.79536 10.333 6.99788 10.333L6.99923 10.333C7.17032 10.3334 7.34152 10.2683 7.47206 10.1377L10.4721 7.13775C10.7324 6.8774 10.7324 6.45529 10.4721 6.19494C10.2117 5.93459 9.7896 5.93459 9.52925 6.19494L7.66455 8.05963V0.999674Z" fill="#3C66FF"/>
<path d="M13.0007 6.33301C13.3688 6.33301 13.6673 6.63148 13.6673 6.99967V12.9997C13.6673 13.3679 13.3688 13.6663 13.0007 13.6663H1.00065C0.632461 13.6663 0.333984 13.3679 0.333984 12.9997V7.00244C0.333984 6.63425 0.632461 6.33577 1.00065 6.33577C1.36884 6.33577 1.66732 6.63425 1.66732 7.00244V12.333H12.334V6.99967C12.334 6.63148 12.6325 6.33301 13.0007 6.33301Z" fill="#3C66FF"/>
</svg>
`
export const DEFAULT_TOOLTIP_CONFIG = {
    // zlevel: 0,
    z: 60,
    show: true,
    position: 'inside',
    // tooltip main content
    showContent: true,
    // 'trigger' only works on coordinate system.
    // 'item' | 'axis' | 'none'
    trigger: 'axis',
    // 'click' | 'mousemove' | 'none'
    triggerOn: 'mousemove|click',

    alwaysShowContent: false,

    displayMode: 'single', // 'single' | 'multipleByCoordSys'

    renderMode: 'auto', // 'auto' | 'html' | 'richText'

    // whether restraint content inside viewRect.
    // If renderMode: 'richText', default true.
    // If renderMode: 'html', defaut false (for backward compat).
    // 是否将 tooltip 框限制在图表的区域内。
    confine: true,

    showDelay: 0,

    hideDelay: 100,
    shadowStyle: {
        color: 'rgba(0, 0, 0, 0.05)'
    },
    // Animation transition time, unit is second
    transitionDuration: 0.4,

    backgroundColor: '#fff',

    // box shadow
    shadowBlur: 10,
    shadowColor: 'rgba(0, 0, 0, 0.09)',
    shadowOffsetX: 1,
    shadowOffsetY: 8,

    // tooltip border radius, unit is px, default is 4
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',

    // tooltip border width, unit is px, default is 0 (no border)
    borderWidth: 0.5,

    // Tooltip inside padding, default is 5 for all direction
    // Array is allowed to set up, right, bottom, left, same with css
    // The default value: See `tooltip/tooltipMarkup.ts#getPaddingFromTooltipModel`.
    padding: 12,
    // Extra css text
    extraCssText: 'border: none',

    // axis indicator, trigger by axis
    axisPointer: {
        // default is line
        // legal values: 'line' | 'shadow' | 'cross'
        type: 'shadow',
        shadowStyle: {
            color: 'rgba(0, 0, 0, 0.05)',
        },

        // Valid when type is line, appoint tooltip line locate on which line. Optional
        // legal values: 'x' | 'y' | 'angle' | 'radius' | 'auto'
        // default is 'auto', chose the axis which type is category.
        // for multiply y axis, cartesian coord chose x axis, polar chose angle axis
        axis: 'auto',

        animation: 'auto',
        animationDurationUpdate: 200,
        animationEasingUpdate: 'exponentialOut',

        crossStyle: {
            color: '#999',
            width: 1,
            type: 'dashed',

            // TODO formatter
            textStyle: {},
        },

        // lineStyle and shadowStyle should not be specified here,
        // otherwise it will always override those styles on option.axisPointer.
    },
    textStyle: {
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: 12,
    },
}

export const DEFAULT_TOOLTIP_LINE_CONFIG = {
  ...DEFAULT_TOOLTIP_CONFIG,
  axisPointer: {
    ...DEFAULT_TOOLTIP_CONFIG.axisPointer,
    type: 'line',
  },
}

export const DEFAULT_TOOLTIP = (toolTipsText?: any, args?: any) => {
    const { chartType, chartConfig } = args || {}
    const isText = isArray(toolTipsText) && toolTipsText.length>0 || !isEmpty(toolTipsText)
    return {
        ...(chartType === 'line' ? DEFAULT_TOOLTIP_LINE_CONFIG : DEFAULT_TOOLTIP_CONFIG),
        // 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
        enterable: isText,
        position: function (point: any[], params: any, dom: any, rect: any, size: any) {
            if(['map', 'bubble', 'sankey'].includes(chartType)) return undefined
            // 固定在顶部,避免数据太多溢出顶部区域
            // TODO 会影响其他图表吗
            return isText ? [point[0], '30%'] : 'inside';
        },
        formatter: (params: PARAM_ITEM) => {
            return TOOLTIPS_CONTENT(toolTipsText, params, { ...args })
        },

    }
}

export function getFormatType(seriesName: any, options: {valueType: any, digit: any, unit: any, [key: string]: any}) {
    const { valueType, digit, unit, tooltip, metrics, labelMap } = options

    let currentValueType = valueType
    let currentDigit = digit
    let currentUnit = unit

    if(isObject(valueType) && typeof valueType !== 'function') {
        currentValueType = valueType?.[seriesName] || 'value'
    }
    if(isObject(digit)) {
        currentDigit = digit?.[seriesName] || digit
    }
    if(isObject(unit)) {
        currentUnit = unit?.[seriesName] || unit
    }

    if(Array.isArray(tooltip)) {
        let usingSeriesName = seriesName
        if (!isEmpty(labelMap)) {
          let res = ''
          for (let item in labelMap) {
            if (labelMap[item] === seriesName) {
              res = item
            }
          }
          usingSeriesName = res || seriesName
        }
        // seriesName 是 labelMap 之后的 name 所以找不到
        const index = metrics.findIndex(v => v === usingSeriesName)
        currentValueType = tooltip?.[index]?.valueType
        currentDigit = tooltip?.[index]?.digit
        currentUnit = tooltip?.[index]?.unit
    }

    return {
        currentValueType,
        currentDigit,
        currentUnit
    }
}


export const TOOLTIPS_CONTENT = (toolTipsText: { [x: string]: any }, tparams: PARAM_ITEM | PARAM_ITEM[], args?: ARGS) => {
    const { digit, unit, valueType, chartType, valueFormatter = undefined, half, tooltip, metrics, labelMap } = args || {}

    const showMark = chartType !== 'map'
    let html: string = ''
    const params: any = cloneDeep(tparams)
    if(chartType === 'bubble') {
        html = defaultBubbleTooltipFormatter(params, toolTipsText, args)
    } else if(chartType === 'radar') {
        html = defaultRadarTooltipFormatter(params, args)
    } else if(chartType === 'sankey') {
        html = defaultSankeyTooltipFormatter(params, args)
    } else {
    if (isArray(params)) {
        if(args?.order === 'valueAsc') {
            params.sort((a,b) => {return +a.value - +b.value});
        } else if(args?.order === 'valueDesc'){
            params.sort((a,b) => {return +b.value - +a.value});
        }
        const isText = isArray(toolTipsText) && toolTipsText.length>0 || !isEmpty(toolTipsText)
        html = '<div class="toolTip-tips-xlabel-wrap">'
        if(params[0].axisValueLabel) html += `<div class="toolTip-tips-xlabel">${params[0].axisValueLabel}</div>`
        params.forEach((item, index) => {
            const { currentDigit, currentUnit, currentValueType } = getFormatType(item?.seriesName || item.name, { tooltip, metrics, valueType, digit, unit, labelMap })
            html += `<div class="toolTip-tips-xlabel-content">
            <span class="${isText ? 'toolTip-tips-xlabel-marker' : 'toolTip-tips-xlabel-marker-min'}">${showMark ? item.marker : ''}${item.seriesName}</span>
            <span class="toolTip-tips-xlabel-value">${isNil(valueFormatter) ? useLabelFormat(item.value, currentValueType as any, currentDigit, currentUnit) : valueFormatter(item.value)}</span></div>`
        })
    } else {
        const { currentDigit, currentUnit, currentValueType } = getFormatType(params.seriesName || params.name, { tooltip, metrics, valueType, digit, unit, labelMap })
        html = '<div class="toolTip-tips-xlabel-wrap">'
        const halfCircle = chartType === 'circle' && half
        if(params.seriesName && !halfCircle) html += `<div class="toolTip-tips-xlabel">${params.seriesName}</div>`
        html += `<div class="toolTip-tips-xlabel-content">
        <span class="${!isEmpty(toolTipsText) ? 'toolTip-tips-xlabel-marker' : 'toolTip-tips-xlabel-marker-min'}">${showMark ? params.marker : ''}${params.name}</span>
        <span class="toolTip-tips-xlabel-value">${isNil(valueFormatter) ? useLabelFormat(params.value, currentValueType as any, currentDigit, currentUnit) : valueFormatter(params.value)}</span></div>`
    }
}
    let name = ''
    if (isArray(params)) {
        if (params[0]?.componentSubType === "scatter") {
            name = params[0]?.axisValueLabel
        } else {
            name = params[0]?.name
        }
    } else {
        name = params?.name || params?.axisValueLabel
    }
    const toolTipsData = isArray(toolTipsText) ? toolTipsText : toolTipsText[name]
    let download: boolean | undefined = false
    if (isArray(toolTipsText) && toolTipsText.length > 0) {
        // 只提示辅助类文字
        html += `<div class="toolTip-tips-divider"></div>`
        toolTipsData?.forEach((v: { text: string }, index: number) => {
            html += `<div class="toolTip-tips-text" onClick="toolTipClick${index + 1}(\'${name}\')"> <span>${v.text}</span></div>`
        })
    }
    // 单个数据的辅助类文字
    let footTooltips
    if(chartType === 'bubble') {
        footTooltips = params?.data?.extra?.chartInfo?.footTooltips
    } else if (params instanceof Array) {
        footTooltips = params?.[0]?.data?.extra?.footTooltips
    } else {
        footTooltips = params?.data?.extra?.footTooltips
    }
    if(footTooltips) {
        html += `<div class="toolTip-tips-divider"></div>`
        html += `<div class="toolTip-tips-text"> <span>${footTooltips}</span></div>`
    }

    if (isObject(toolTipsText) && !isEmpty(toolTipsText)) {
        // 带波峰展示
        download = toolTipsData?.download
        toolTipsData?.data?.forEach((v: { title: any; detail: { link: any; text: any; value: any }[], download: boolean | undefined }) => {
            html += `<div class="toolTip-tips-divider"></div>`
            html += `<div class="toolTip-tips-link-title">${v.title}</div>`
            v?.detail.forEach((item: { link: any; text: any; value: any }, index: number) => {
                let text = item.link ? `<a class="toolTip-tips-link-content" 
                    onMouseOver="this.style.color='#3C66FF'"
                    onMouseOut="this.style.color='rgba(0, 0, 0, 0.85)'"
                    href="${item.link}"
                    target="_blank"
                   > 
                   <div class="toolTip-tips-link-left">
                    <div class="toolTip-tips-link-text">${index + 1}. ${item.text}</div>
                    <div class="toolTip-tips-link-icon"><i class="iconfont icon-a-VectorStroke"></i></div>
                   </div>
                   <div class="toolTip-tips-link-right">${isNil(valueFormatter) ? useLabelFormat(item.value, valueType as any, digit,  unit) : valueFormatter(item.value)}</div>
                 </a>`: `<div class="toolTip-tips-link-content"> 
                        <div class="toolTip-tips-link-left">
                        <div class="toolTip-tips-link-text">${index + 1}. ${item.text}</div>
                        </div>
                        <div class="toolTip-tips-link-right">${isNil(valueFormatter) ? useLabelFormat(item.value, valueType as any, digit,  unit) : valueFormatter(item.value)}</div>
                    </div>`
                html += `<div class="toolTip-tips-link-wrap">
                 ${text} 
                 </div>`
            });
        })
        if (download) {
            // 是否下载
            html += `<div class="toolTip-tips-divider"></div>`
            html += `<div class="toolTip-tips-download" 
                onClick="toolTipDownLoad(\'${name}\')">
                <div class="toolTip-tips-download-icon">${downloadSvg}</div>
                <span class="toolTip-tips-download-text">下载波峰事件</span>
                </div>`
        }
    }
    html += '</div>'
    html = html.replace(/border-radius:10px/g, 'border-radius:1px')
    return html
}
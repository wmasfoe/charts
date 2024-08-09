/** popover */
export type Placement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'
export type Trigger = 'hover' | 'click' | 'manual'

const cacheStringFunction = fn => {
    const cache = Object.create(null)
    return str => {
        const hit = cache[str]
        // eslint-disable-next-line no-return-assign
        return hit || (cache[str] = fn(str))
    }
}
const camelizeRE = /-(\w)/g
const camelize = cacheStringFunction(str => str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : '')))

const parseStyleText = (cssText = '', camel) => {
    const res = {}
    const listDelimiter = /;(?![^(]*\))/g
    const propertyDelimiter = /:(.+)/
    if (typeof cssText === 'object') return cssText
    cssText.split(listDelimiter).forEach(item => {
        if (item) {
            const tmp = item.split(propertyDelimiter)
            if (tmp.length > 1) {
                const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim()
                res[k] = tmp[1].trim()
            }
        }
    })
    return res
}
export const getStyle = (ele: VNode, camel?: string[]): Record<string, string> => {
    const props = ele.props || {}
    let style = props.style || {}
    if (typeof style === 'string') {
        style = parseStyleText(style, camel)
    } else if (camel && style) {
        // 驼峰化
        const res = {}
        Object.keys(style).forEach(k => {
            res[camelize(k)] = style[k]
        })
        return res
    }
    return style
}
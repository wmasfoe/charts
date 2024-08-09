import { isNil } from 'lodash'
import deepmerge from 'deepmerge'
export const defaultMarkLineStyle = {
    lineStyle: {
        "normal": {
            "width": 1,
            "type": "dashed",
            "color": "#0000001A"
        }
    },
    labelStyle: {
        "distance": 12,
        "fontSize": 12,
        "color": "rgba(0, 0, 0, 0.85)",
        "fontFamily": "PingFang SC",
        "fontWeight": "500",
        "letterSpacing": "3px",
        "wordSpacing": "2px"
    }
}
export const getBubbleMarkLine = (markLineConfig: any) => {
    const {
        markLineValueX,
        markLineValueY,
        titleX,
        titleY,
        startX,
        endX,
        startY,
        endY,
        style
    } = markLineConfig

    return {
        ...markLineConfig,
        "symbol": "none",
        lineStyle: deepmerge(defaultMarkLineStyle.lineStyle, style?.lineStyle || {}),
        "silent": true,
        "animation": false,
        "symbolSize": 10,
        "data": [
            [
                {
                    "name": titleY?.split(':')?.join('\n'),
                    "x": isNil(startX) ? '7%' : startX,
                    "yAxis": markLineValueY
                },
                {
                    "x": isNil(endX) ? '85%' : endX,
                    "yAxis": markLineValueY
                }
            ],
            [
                {
                    "xAxis": markLineValueX,
                    "y": isNil(endY) ? '85%' : endY
                },
                {
                    "name": titleX,
                    "xAxis": markLineValueX,
                    "y": isNil(startY) ? '8%' : startY
                }
            ]
        ],
        "label": deepmerge(defaultMarkLineStyle.labelStyle, style?.labelStyle || {})
    }
}

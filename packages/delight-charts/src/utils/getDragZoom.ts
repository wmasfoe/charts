import { DEFAULT_DRAG_ZOOM } from '../const/defaultToolbox'
import { isNil, isEmpty, isArray } from 'lodash'
import { merge } from './merge'

export type argType = {
  show?: boolean,
  dragIcons?: string[] | string,
  axisIndex?: any[]
}

// 支持局部放大配置
export function getDragZoom(args: argType) {
  if (!isNil(args) && !isEmpty(args)) {
    let toolbox: {
      show: boolean;
      feature?: {
        dataZoom?: {
          xAxisIndex?: string | string[] | number[],
          yAxisIndex?: string | string[] | number[],
          icon?: any
        }
      }
    }
    toolbox = merge<any>(DEFAULT_DRAG_ZOOM, {})

    toolbox.show = args.show || false

    if(isArray(args.axisIndex)) {
      // @ts-ignore
      toolbox.feature.dataZoom['xAxisIndex'] = args.axisIndex[0]
      // @ts-ignore
      toolbox.feature.dataZoom['yAxisIndex'] = args.axisIndex[1]
    }

    if(isArray(args.dragIcons)) {
      toolbox.feature = {
        dataZoom: {
          ...(toolbox?.feature?.dataZoom || {}),
          icon: {}
        }
      };
      // @ts-ignore
      toolbox.feature.dataZoom.icon['zoom'] = args.dragIcons[0]
      // @ts-ignore
      toolbox.feature.dataZoom.icon['back'] = args.dragIcons[1]
    }

    return merge<any>(DEFAULT_DRAG_ZOOM, toolbox)
  }

  return DEFAULT_DRAG_ZOOM
}

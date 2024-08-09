import { cloneDeep, isEqual, pick } from 'lodash';

const key = 'name'
type ConfigItem = {
  nodes: Record<string, any>;
  links: Record<string, any>;
}
export type ExtraConfig = {
  highlightOpacityConfig: ConfigItem & { activeNode?: Record<string, any>; };
  lowlightOpacityConfig: ConfigItem;
  [x: string]: any;
}

export type ChartOptionsType = {
  nodes: Record<'name', any>[];
  links: Record<'source' | 'target' | 'value', string | number>[];
  [key: string]: any;
}

// 返回 newData 和 newLinks 在外面进行merge
export const sankeyHighlight = () => {
  // 二次点击置灰缓存
  let linkPrevClickValue = ''
  let edgePrevClickValue = {}
  return (params: any, chartOptions: ChartOptionsType, extraConfig: ExtraConfig) => {

    // 上次成功设置的 option，用来二次点击重置
    const prevOptions = cloneDeep(chartOptions)
    let { highlightOpacityConfig, lowlightOpacityConfig } = extraConfig

    // 当前 点击的node 高亮样式
    const activeNodeHighlightConfig = highlightOpacityConfig.activeNode || highlightOpacityConfig.nodes
    let options = {}
    const clickId = params[key]

    const seriesOptions = chartOptions || {}
    // 点击 node 变淡效果
    if (params.dataType === 'node') {
      // 清空 edge 缓存
      edgePrevClickValue = {}
      // 取消高亮
      if(linkPrevClickValue === clickId) {
        linkPrevClickValue = ''
        return prevOptions
      }
  
      // links 中有关联的 node
      const lightNodes: (string|number)[] = []
      // links 高亮逻辑
      const newLinkOptions = seriesOptions.links.map(v => {
        const sourceId = v.source
        const targetId = v.target
  
        if (sourceId === clickId || targetId === clickId) {
          lightNodes.push(...[sourceId, targetId])
          return {
            ...v,
            ...cloneDeep(highlightOpacityConfig.links || {})
          }
        } else {
          return {
            ...v,
            ...cloneDeep(lowlightOpacityConfig.links || {})
          }
        }
      })
  
      // 与高亮 links 有关的 node 全部高亮
      const newNodeOptions = seriesOptions.nodes.map(v => v[key] === clickId ? {
        ...v,
        ...cloneDeep(activeNodeHighlightConfig || {})
      } : lightNodes.includes(v[key]) ? {
          ...v,
          ...cloneDeep(highlightOpacityConfig.nodes || {})
        }: {
          ...v,
          ...cloneDeep(lowlightOpacityConfig.nodes || {})
        })
  
      options = {
        links: newLinkOptions,
        nodes: newNodeOptions
      }
      linkPrevClickValue = clickId
    }
    // 点击 links 变淡效果
    if (params.dataType === 'edge') {
      // 清空 node 缓存
      linkPrevClickValue = ''
      const data = params.data
      if(isEqual(pick(edgePrevClickValue, ['source', 'target']), pick(data, ['source', 'target']))) {
        // 恢复
        edgePrevClickValue = {}
        return prevOptions
      }
      const lightNodes = []
      // link高亮，同时记录 node
      const newLinkOptions = seriesOptions.links.map(v => {
        const sourceId = v.source
        const targetId = v.target
        if (sourceId === data?.source && targetId === data?.target) {
          lightNodes.push(...[sourceId, targetId])
          return {
            ...v,
            ...cloneDeep(highlightOpacityConfig.links || {})
          }
        } else {
          return {
            ...v,
            ...cloneDeep(lowlightOpacityConfig.links || {}),
            // hover 其他link颜色
            emphasis: {
              lineStyle: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            }
          }
        }
      })
  
      // 高亮 node
      const newNodeOptions = seriesOptions.nodes.map((v) => lightNodes.includes(v[key]) ? {
        ...v,
        ...cloneDeep(highlightOpacityConfig.nodes || {})
      }: {
        ...v,
        ...cloneDeep(lowlightOpacityConfig.nodes || {}),
      })
  
      options = {
        links: newLinkOptions,
        nodes: newNodeOptions
      }
  
      edgePrevClickValue = data
    }
  
    return options
  }
}
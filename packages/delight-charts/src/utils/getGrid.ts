import { ChartType } from './../const/interface/chart';
import { defaultBubbleGridConfig } from '../const/defaultBubbleConfig'
export function getGrid(args: any, visibleConfig = { chartType: '', gridVisible: false, legendVisible: false, titleVisible: false, isYaxisNameVisible: false, isYaxisHidden: false }) {
  const { chartType, gridVisible, legendVisible, titleVisible, isYaxisNameVisible, isYaxisHidden } = visibleConfig
  const grid = chartType === 'bubble' ? defaultBubbleGridConfig : {
    left: '2',
    bottom: '2',
    right: '10',
    width: 'auto',
    height: 'auto',
    top: '12',
    containLabel: true,
    show: false
  }
  grid.show = gridVisible
  // 图例和y轴名字都存在的时候，留白多一些
  if ((!titleVisible && legendVisible && !isYaxisNameVisible) || (titleVisible && !isYaxisNameVisible && !legendVisible)) {
    grid.top = '50'
  } else if (!titleVisible && !legendVisible && isYaxisNameVisible) {
    grid.top = '32'
  } else if (!titleVisible && legendVisible && isYaxisNameVisible) {
    grid.top = '64'
  } else if (titleVisible && !isYaxisNameVisible && legendVisible) {
    grid.top = '75'
  } else if (titleVisible && isYaxisNameVisible && !legendVisible) {
    grid.top = '70'
  } else if (titleVisible && isYaxisNameVisible && legendVisible) {
    grid.top = '96'
  }
  if(isYaxisHidden && chartType === 'histogram') {
    grid.left = '-96'
  }
  return {
    ...grid,
    ...args
  }
}

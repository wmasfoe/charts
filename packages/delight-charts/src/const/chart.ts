// 饼图默认高亮的样式
export const DEFAULT_PIE_SERIES = {
  emphasis: {
    focus: 'self',
    minAngle: 3,
  },
  hoverAnimation: false,
  radius: '65%',
  type: 'pie',
}
// 条形图默认x轴 y轴
export const DEFAULT_HISTOGRAMXAXIS = {
  type: 'value',
}
export const DEFAULT_HISTOGRAMYAXIS = {
  type: 'category',
}
export const DEFAULT_COLORS_RGBA = [
  'rgba(60,102,255,1)',
  'rgba(145,211,237,1)',
  'rgba(43,72,181,1)',
  'rgba(246,160,94,1)',
  'rgba(145,218,166,1)',
  'rgba(243,92,125,1)',
  'rgba(241,168,220,1)',
  'rgba(160,109,255,1)',
];

export const DEFAULT_COLORS = [
  '#3c66ff',
  '#91d3ed',
  '#2b48b5',
  '#f6a05e',
  '#91daa6',
  '#f35c7d',
  '#f1a8dc',
  '#a06dff',
]

export const HEAT_MAP_COLOR = [
  '#313695',
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#e0f3f8',
  '#ffffbf',
  '#fee090',
  '#fdae61',
  '#f46d43',
  '#d73027',
  '#a50026',
]

export const HEAT_BMAP_COLOR = ['blue', 'blue', 'green', 'yellow', 'red']

export const itemPoint = (color: any) => {
  return [
    '<span style="',
    `background-color:${color};`,
    'display: inline-block;',
    'width: 10px;',
    'height: 10px;',
    'border-radius: 50%;',
    'margin-right:2px;',
    '"></span>',
  ].join('')
}

export const STATIC_PROPS = [
  'initOptions',
  'loading',
  'dataEmpty',
  'judgeWidth',
  'widthChangeDelay',
]

export const ECHARTS_SETTINGS = [
  'grid',
  'dataZoom',
  'visualMap',
  'toolbox',
  'title',
  'legend',
  'xAxis',
  'yAxis',
  'radar',
  'tooltip',
  'axisPointer',
  'brush',
  'geo',
  'timeline',
  'graphic',
  'series',
  'backgroundColor',
  'textStyle',
]
export const notShowAxisChart = [
  'pie',
  'circle',
  'treemap',
  'radar',
  'funnel',
  'map',
  'sankey'
]
export const DEFAULT_TITLE = {
  fontSize: 18,
  fontWeight: 500,
  top: '0',
  left: '0',
  padding: [0, 0, 20, 0],
  lineHeight: '26px',
  fontFamily: 'PingFang SC',
}

export const DEFAULT_LEGEND = {
  itemHeight: 9,
  itemWidth: 9,
  icon: 'path://M904.5,437.5h-7a1,1,0,0,1-1-1v-7a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v7A1,1,0,0,1,904.5,437.5Z',
  show: false,
  left: '-3',
  top: '25',
  type: 'scroll',
  pageIcons: {
    horizontal: [
      'path://M4.112,9.333c-0.889-0.667-0.889-2,0-2.667L10.068,2.2c0.659-0.494,1.6-0.024,1.6,0.8v10  c0,0.824-0.941,1.294-1.6,0.8L4.112,9.333z',
      'path://M11.888,6.667c0.889,0.667,0.889,2,0,2.667L5.932,13.8c-0.659,0.494-1.6,0.024-1.6-0.8V3  c0-0.824,0.941-1.294,1.6-0.8L11.888,6.667z',
    ],
  },
}
export const DEFAULT_GRID = {
  show: false,
  left: 2,
  containLabel: true,
}

export const DEFAULT_WORDCLOUD = {
  type: 'wordCloud',
  sizeRange: [9, 58],
  rotationRange: [0, 0],
  gridSize: 16,
  left: '0',
  top: '0',
  right: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  drawOutOfBound: false,
  textStyle: {
    fontFamily: 'PingFang SC',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 48,
    color: '#3C66FF',
  },
  emphasis: {
    textStyle: {
      textShadowBlur: 10,
      textShadowOffsetX: 4,
      textShadowOffsetY: 0,
      textShadowColor: 'rgba(0, 0, 0, 0.15)',
    },
  },
}

export const DEFAULT_WORDCOLUD_LEVEL = {
  levelTotal: 4,
  levelWordNums: [3, 12, 15],
  levelWordColors: ['#FF7B61', '#295EFF', '#5283FF', '#8792BD'],
}

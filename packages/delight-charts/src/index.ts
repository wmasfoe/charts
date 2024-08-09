import { StatisticCardConfig } from './const/interface/statistic-card';
export { Line } from "./packages/line";
export { Bar } from "./packages/bar";
export { Pie } from "./packages/pie";
export { Histogram } from "./packages/histogram";
export { Circle } from "./packages/circle";
export { Bubble } from './packages/bubble'
export { WordCloud } from './packages/wordcloud'
export { Treemap } from './packages/treemap'
export { Chart } from './packages/chart'
export { Funnel } from './packages/funnel'
export { Map } from './packages/map'
export { Gauge } from './packages/gauge'
export { Bullet } from './packages/bullet'
export { Radar } from './packages/radar'
export { Atlas } from './packages/atlas'
export { IndicatorCard } from './packages/indicatorcard'
export { StatisticCard } from './packages/statistic-card'
export { Sankey } from './packages/sankey'
export { useLabelFormat } from './chart-utils'
export * from './const/interface'

import { install } from "./installer";
import "./style.css"
import { Plugin } from 'vue'
export default {
  install,
} as Plugin;

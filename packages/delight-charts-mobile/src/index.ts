// @ts-nocheck
export { Line } from "./packages/line";
export { Bar } from "./packages/bar";
export { Pie } from "./packages/pie";
export { IndicatorCard } from './packages/indicator-card'
export { Histogram } from "./packages/histogram";
export { Circle } from "./packages/circle";
export { Bullet } from "./packages/bullet";

import { install } from "./install";
import { Plugin } from 'vue'
export default {
  install,
} as Plugin;
import "./style.css"

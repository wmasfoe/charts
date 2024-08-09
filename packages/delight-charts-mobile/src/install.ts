// @ts-nocheck
import { Line } from "./packages/line";
import { Bar } from "./packages/bar";
import { Pie } from "./packages/pie";
import { Histogram } from "./packages/histogram";
import { Circle } from "./packages/circle";
import { IndicatorCard } from './packages/indicator-card'

import type { App, Plugin } from "vue";
interface DelightChartsOptions {
  //
}

export const install: Required<Plugin>["install"] = (
  app: App,
  opts?: DelightChartsOptions
) => {
  const components = [
    Bar,
    Line,
    Pie,
    Histogram,
    Circle,
    IndicatorCard,
  ];
  components.forEach((component) => {
    app.use(component);
  });
};
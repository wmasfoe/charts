import type { OptionsSetting, OptionsExtra } from './../dist/const/interface/option';
import type { DefineComponent } from 'vue'
import { Line } from "./packages/line";
import { Bar } from "./packages/bar";
import { Pie } from "./packages/pie";
import { Histogram } from "./packages/histogram";
import { Circle } from "./packages/circle";
import { Bubble } from './packages/bubble';
import { WordCloud } from './packages/wordcloud';
import { Funnel } from './packages/funnel';
import { Atlas } from './packages/atlas';
import { IndicatorCard } from './packages/indicatorcard';
import { StatisticCard } from './packages/statistic-card';
import { Treemap } from './packages/treemap';
import { Chart } from "./packages/chart";
import { Map } from "./packages/map";
import { Gauge } from "./packages/gauge";
import { Bullet } from "./packages/bullet";
import { Radar } from "./packages/radar";
import { Sankey } from "./packages/sankey";
import type { App, Plugin } from "vue";
import { SFCWithInstall } from './utils/install';

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
    Bubble,
    Map,
    WordCloud,
    Gauge,
    Bullet,
    Atlas,
    Funnel,
    Treemap,
    IndicatorCard,
    StatisticCard,
    Chart,
    Radar,
    Sankey,
  ];
  components.forEach((component) => {
    app.use(component);
  });
};

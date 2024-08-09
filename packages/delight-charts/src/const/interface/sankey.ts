import type { CommonType, CommonChartConfig, NormalObject } from './common';

type Config = {
  itemStyle?: NormalObject
  lineStyle?: NormalObject
  focus?: string
  label?: NormalObject
}

export interface SankeyChartConfig extends CommonChartConfig {
  emphasis?: Config;
  blur?: Config & {
    active?: Config
  };
}

export interface SankeyType extends CommonType<SankeyChartConfig> {
  chartType?: string;
  chartData: {
    source: string;
    target: string;
    value: number | string;
  }[];
  columnTitle?: {
    title?: string[];
    link?: string[];
  }
}

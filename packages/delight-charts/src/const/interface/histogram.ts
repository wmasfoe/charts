import type { CommonType, CommonChartConfig, NormalObject } from './common';

export interface HistogramConfig extends CommonChartConfig {
  showLine?: string[];
  stack?: NormalObject;
  labelMap?: NormalObject;
  canClick?: boolean;
  [key: string]: any;
}

export interface HistogramType extends CommonType<HistogramConfig> {
  dimensions: string[];
  metrics: string[];
  chartType?: string;
}

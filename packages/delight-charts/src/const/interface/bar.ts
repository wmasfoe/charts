import type { CommonType, CommonChartConfig, NormalObject } from './common';

export interface BarConfig extends CommonChartConfig {
  canClick?: boolean;
  showLine?: string[];
  [key: string]: any;
}

export interface BarType extends CommonType<BarConfig> {
  dimensions: string[];
  metrics: string[];
  chartType?: string;
  seriesField?: string;
}

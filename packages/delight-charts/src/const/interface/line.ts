import type { CommonType, CommonChartConfig, NormalObject } from './common';

export interface LineConfig extends CommonChartConfig {
  area?: boolean;
  canClick?: boolean;
  [key: string]: any;
}

export interface LineType extends CommonType<LineConfig> {
  dimensions: string[];
  metrics: string[];
  chartType?: string;
}

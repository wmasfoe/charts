import type { CommonType, CommonChartConfig } from './common';

export interface TreeMapConfig extends CommonChartConfig {
  canClick?: boolean;
  [key: string]: any;
}

export interface TreeMapType extends CommonType<TreeMapConfig> {
  dimensions: string[];
  metrics: string[];
  chartType?: string;
}

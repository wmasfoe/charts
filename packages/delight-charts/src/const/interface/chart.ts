import type { CommonType, CommonChartConfig, NormalObject } from './common';

export interface ChartConfig extends CommonChartConfig {
  showLine?: string[];
  area?: boolean;
  stack?: NormalObject;
  roseType?: boolean | 'radius' | 'area';
  center?: (string | number)[];
  canClick?: boolean;
  [key: string]: any;
}

export interface ChartType extends CommonType<ChartConfig> {
  dimensions: string[];
  metrics: string[];
  chartType?: string;
}

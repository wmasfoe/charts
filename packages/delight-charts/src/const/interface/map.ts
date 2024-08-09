import type { CommonType, CommonChartConfig, NormalObject } from './common';

export interface MapConfig extends CommonChartConfig {
  geo?: NormalObject;
  canClick?: boolean;
  [key: string]: any;
}

export interface MapType extends CommonType<MapConfig> {
  chartType?: string;
  getJson?: NormalObject[];
  mapType?: string | 'china';
}

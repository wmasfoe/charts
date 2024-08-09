import type { CommonType, CommonChartConfig, NormalObject } from './common';

interface RadarItem {
  indicator: NormalObject[];
  center?: string[];
}

export interface RadarConfig extends CommonChartConfig {
  radar: RadarItem[];
  canClick?: boolean;
  [key: string]: any;
}

export interface RadarType extends CommonType<RadarConfig> {
  chartType?: string;
}

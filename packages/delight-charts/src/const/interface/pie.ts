import type { CommonType, CommonChartConfig, NormalObject } from './common';

export interface PieConfig extends CommonChartConfig {
  canClick?: boolean;
  radius?: string | string[] | NormalObject<(string | number)[]>;
  circleCenter?: {
    mainTitle: string;
    mainLabel?: string | number;
    subText?: string;
    subNum?: string;
  };
  [key: string]: any;
}

export interface PieType extends CommonType<PieConfig> {
  dimensions: string[];
  metrics: string[];
  chartType?: string;
}

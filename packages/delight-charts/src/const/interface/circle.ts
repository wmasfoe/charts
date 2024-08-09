import type { CommonType, CommonChartConfig, NormalObject } from './common';

type CircleCenterCallBack = (datum: { value: string; label: string }, data: []) => string | number;
interface CircleCenter {
  mainTitle: string | CircleCenterCallBack;
  mainLabel: number | string | CircleCenterCallBack;
  subText?: string;
  subNum?: string;
}

export interface CircleConfig extends CommonChartConfig {
  canClick?: boolean;
  circleCenter?: CircleCenter;
  half: boolean;
  [key: string]: any;
}

export interface CircleType extends CommonType<CircleConfig> {
  dimensions: string[];
  metrics: string[];
  chartType?: string;
}

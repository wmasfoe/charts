import type { CommonType, CommonChartConfig } from './common';

export interface WordCloudConfig extends CommonChartConfig {
  canClick?: boolean;
  [key: string]: any;
}

export interface WordCloudType extends CommonType<WordCloudConfig> {
  chartType?: string;
}

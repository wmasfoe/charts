export interface IndicatorCardData {
  title?: string;
  tips?: string;
  value?: string | number;
  prefixUnit?: string | number;
  suffixUnit?: string | number;
  rate?: string | number;
  rateLabel?: string | number;
  subRate?: string | number;
  subRateLabel?: string | number;
}

export interface IndicatorCardConfig {
  multiple?: boolean;
  tipsType?: string;
  tipsPlacement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
  type?: 'arealy' | 'linear';
  titleMaxSize?: number;
}

export interface IndicatorType {
  chartData: IndicatorCardData[];
  chartConfig: IndicatorCardConfig;
}

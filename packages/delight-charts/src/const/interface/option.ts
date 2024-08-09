import type { ChartEvents } from './events'

export interface FormatType {
  digit?: number | string;
  unit?: boolean;
  valueType?: 'KMB' | 'normal' | 'percent' | 'currency' | 'value' | 'label' | undefined | Function;
  [key: string]: string | number | any;
}

export type OriginDataType<T = Record<string | number, any>> = (string | number | T)[];
export interface OptionsSetting {
  showLine?: string[];
  area?: boolean;
  itemStyle?: Record<string | number, any>;
  dataOrder?: Record<string | number, any>;
  stack?: Record<string | number, any>;
  roseType?: boolean | 'radius' | 'area';
  center?: (string | number)[];
  radius?: string | string[] | Record<string | number, any>;
  labelMap?: Record<string | number, any>;
  seriesConfig?: Record<string | number, any> | Record<string | number, any>[];
  tooltip?: FormatType;
  xAxis?: FormatType;
  yAxis?: FormatType;
  canClick?: boolean;
  chartType?: string;
  [key: string]: any;
}

export interface DataEmptyConfig {
  emptyImgUrl?: string
  emptyTitle?: string
  emptySubTitle?: string
}

export interface OptionsExtra {
  dimensions?: string[];
  metrics?: string[];
  chartData: (string | number | Record<string | number, any>)[];
  chartConfig: Record<string | number, any>;
  colors?: string[];
  theme?: string | 'dark' | 'light' | 'delightThemeName';
  isLoading?: boolean;
  renderType?: 'canvas' | 'svg';
  changeDelay?: string;
  cssClass?: string;
  dataEmptyConfig?: Record<string | number, any>;
  ops?: Record<string | number, any>;
  seriesField?: string;
  events?: ChartEvents;
  [key: string]: any;
}

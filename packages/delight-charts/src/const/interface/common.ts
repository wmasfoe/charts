import type { EChartsOption } from 'echarts'
import type { ChartEvents } from './events'

export type NormalObject<T = any> = Record<string | symbol, T>

export type CommonDataType<T = NormalObject> = (string | number | T)[];

interface FormatType {
  digit?: number | string;
  unit?: boolean;
  valueType?: 'KMB' | 'normal' | 'percent' | 'currency' | 'value' | 'label' | undefined | Function;
  [key: string]: string | number | any;
}

export interface EchartsOpts {
  notMerge: boolean;
  replaceMerge: string[];
  lazyUpdate: boolean;
  silent: boolean;
}

export interface DataEmptyConfig {
  emptyImgUrl?: string
  emptyTitle?: string
  emptySubTitle?: string
}
interface XAxisType extends FormatType {
  xAxisIndex?: number;
}
interface YAxisType extends FormatType {
  yAxisIndex?: number;
}
interface LegendType {
  legendMode?: number
}
interface DataOrder {
  sortField: string;
  sortOrder: 'asc' | 'desc'
}

export interface CommonChartConfig extends EChartsOption {
  title?: NormalObject & EChartsOption['title'];
  xAxis?: XAxisType & EChartsOption['xAxis'] & NormalObject;
  yAxis?:  YAxisType & EChartsOption['yAxis'] & NormalObject;
  legend?: NormalObject & LegendType & EChartsOption['legend'];
  tooltip?: FormatType & EChartsOption['tooltip'];
  itemStyle?: NormalObject;
  stack?: NormalObject;
  roseType?: boolean | 'radius' | 'area';
  center?: (string | number)[];
  radius?: string | string[] | NormalObject<(string | number)[]>;
  labelMap?: NormalObject;
  dataOrder?: DataOrder;
  seriesConfig?: NormalObject | NormalObject[];
}

export interface CommonType<T = CommonChartConfig> {
  chartData: CommonDataType;
  chartConfig: T;
  colors?: string[];
  theme?: string | 'dark' | 'light' | 'delightThemeName';
  isLoading?: boolean;
  renderType?: 'canvas' | 'svg';
  changeDelay?: string;
  cssClass?: string;
  dataEmptyConfig?: DataEmptyConfig;
  ops?: Partial<EchartsOpts>;
  seriesField?: string;
  events?: ChartEvents;
}

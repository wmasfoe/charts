import type { EChartsOption } from 'echarts'
import type { OptionsSetting, OriginDataType, OptionsExtra } from './option'
export type { FormatType } from './option'
import type { NormalObject } from './common'

export type { EChartsOption } from 'echarts'
export type { EventsValueType as EventsConfig, ChartEvents as EventsDataConfig } from './events'
export interface ChartOptions {
  legend?: EChartsOption['legend'];
  tooltip?: EChartsOption['tooltip'];
  title?: EChartsOption['title'];
  label?: EChartsOption['label'];
  labelMap?: Record<string | number, string | number>;
  dataZoom?: EChartsOption['dataZoom'];
  [key: string]: any;
}
export type GetWordCloudOptions = (
  data: { name: string; value: number }[],
  settings: OptionsSetting,
  extra: OptionsExtra
) => EChartsOption
export interface BreadcrumbData {
  title: string;
  id?: number | string
}
export interface DrillBreadcrumb {
  isShowDrillBreadcrumb: boolean;
  breadcrumbData: BreadcrumbData[];
  breadcrumbDataText?: string;
  drillBreadcrumbItemWidth?: number;
  showOverflowTooltip?: boolean;
}
export type GetChartOptions = (
  // chartData数据
  data: OriginDataType,
  // chartConfig中的数据
  settings: OptionsSetting,
  // 其他属性传递
  extra: OptionsExtra | {},
) => EChartsOption;

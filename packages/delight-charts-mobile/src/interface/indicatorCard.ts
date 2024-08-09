
export type StatisticCardRate = {
  label: string;
  value: string | number;
  unit?: string;
  // type 不传：有颜色有符号；传none：有符号无颜色；传text：无符号无颜色
  type?: 'none' | 'text';
}

export type ProgressType = {
  label: string;
  progress: `${string}%`;
  color?: string;
}

export interface DataType {
  title: string;
  tips?: string;
  tagList?: {value:string, style: any, color?: string, bgColor?: string}[];
  amount: string | number;
  unit?: string;
  detailList?: StatisticCardRate[];
  progressInfo?: ProgressType[];
  [key: string]: any;
}

export interface ChartConfig {
  border?: boolean; // 是否需要边框
  align?: 'center' | 'left'; // 对齐方式
  tipsPlacement?: 'top' | 'bottom' | 'left' | 'right';
  emptyText?: string;
  upColor?: string; // 上涨颜色，默认为 rgb(0, 168, 48) 绿色
  downColor?: string; // 下跌颜色，默认为 rgb(240, 56, 96) 红色
  upIdentify?: string; // 上涨标识，默认为 +
  downIdentify?: string; // 下跌标识，默认为 -
  simple?: boolean | 'default'; // 简单指标 column >= 3 默认为true
  tooltipType?: 'tooltip' | 'modal';
  multiple: boolean | number;
  focusColors?: string[];
  detailDirection?: 'row' | 'column';
  [key: string]: any;
}

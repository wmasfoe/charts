import { IndicatorCardConfig, IndicatorCardData} from './indicatorcard'
export type StatisticCardRate = {
  label: string // 名称
  value: string | number // 数额
  tips?: string // 提示内容
  unit?: string // 单位, 默认为%
  type?: 'none' | undefined // 比率前符号类型，none无符号字体
}

export type StatisticCardProgress = {
  label: string // 进度条展示名称
  progress: string | number // 进度数值
}

export type StatisticCardJudgeInfo = {
  tag?: string // 标签
  tagInfo?: {
    color: string // 标签字色
    backgroundColor: string // 标签背景色
  }
  description?: string // 诊断文案
}

type _StatisticCardData = {
  title: string // 左上角标题
  tips: string // 标题提示
  tagList?: string[] // 标题右侧展示的标签
  headImg?: string // 头部左侧图片
  headImgStyle?: Record<string, string> // 头部左侧图片样式

  amount: string | number // 展示的数值
  unit?: string // 数值的单位
  thumbUrl?: string // 缩略图图片
  amountFormat?: (amount: string) => string // amount用户自定义格式化函数

  detailList?: StatisticCardRate[] // 同环比信息部分
  progressList?: StatisticCardProgress[] // 进度相关信息
  
  judgeInfo?: StatisticCardJudgeInfo // 诊断部分

  __index?: number // 组件内部排序使用
}

type _StatisticCardConfig = {
  multiple: boolean // 多选还是单选
  emptyText: string // 空时展示文本，默认为 --
  upColor: string // 上涨颜色，默认为 rgb(0, 168, 48) 绿色
  downColor: string // 下跌颜色，默认为 rgb(240, 56, 96) 红色
  upIdentify: string // 上涨标识，默认为 +
  downIdentify: string // 下跌标识，默认为 -
  showCount: number | string // 一次展示多少个
  defaultValues: number | number[]  // 默认选中的卡片索引
  showPagination: boolean // 是否展示翻页，默认是
  couldSelected: boolean // 是否可点击选择，默认是
  titleStyle: any
  titlePosition: 'left' | 'right'
  detailListStyle: Record<string, string | number>
  hideHoverStyle: boolean
}

export type StatisticCardData = _StatisticCardData & IndicatorCardData
export type StatisticCardConfig = _StatisticCardConfig & IndicatorCardConfig

export type StatisticCardType = {
  chartData: StatisticCardData[]
  chartConfig?: Partial<StatisticCardConfig>
}
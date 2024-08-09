type ItemType = {
  label?: string
  value: number
  color?: string
}

export type BulletDataItem = {
  measures: number[] | ItemType[]
  targets: number[] | ItemType[]
  ranges: number[] | ItemType[]
  title: string
}

export type BulletType = {
  chartType?: string;
  chartData: BulletDataItem[]
}
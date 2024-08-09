# IndicatorCard 指标卡

### 单选指标卡

:::demo

```vue
<template>
  <IndicatorCard
    @event="event"
    :chartData="chartData"
    :chartConfig="chartConfig"
  >
  </IndicatorCard>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const chartConfig = ref({
  multiple: false,
  tipsType: 'icon', //line or icon
  tipsPlacement: 'top',
  titleMaxSize: 7,
})

const chartData = ref([
  {
    title: '笔记阅读人数笔记阅读人数',
    tips: 'tips me',
    rate: 4,
    subRate: 4,
    rateLabel: '环比',
    subRateLabel: '环比1',
    value: 123456,
  },
  {
    title: 'AAAAAA',
    tips: 'tips me～',
    rate: -4,
    subRate: '5',
    rateLabel: '环比',
    subRateLabel: '环比1',
    value: '123456',
  },
  {
    title: 'aaaaaa',
    tips: 'tips me！',
    prefixUnit: '¥',
    suffixUnit: '分',
    subRate: '0',
    rateLabel: '环比',
    subRateLabel: '环比1',
    value: 1234567,
  },
])

const event = (index: Record<string, number>) => {
  console.log(index)
}
</script>
```

:::

### 双选指标卡

:::demo

```vue
<template>
  <IndicatorCard
    @event="event"
    :chartData="chartData"
    :chartConfig="chartConfig"
  >
  </IndicatorCard>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const chartConfig = ref({
  multiple: true,
  tipsType: 'line', //line or icon
  tipsPlacement: 'top',
  type: 'linear', // arealy or linear
  titleMaxSize: 7,
})

const chartData = ref([
  {
    title: '笔记阅读人数笔记阅读人数',
    tips: 'tips me',
    rate: 4,
    subRate: 4,
    rateLabel: '环比',
    subRateLabel: '环比1',
    value: 123456,
  },
  {
    title: 'AAAAAA',
    tips: 'tips me～',
    rate: -4,
    subRate: '5',
    rateLabel: '环比',
    subRateLabel: '环比1',
    value: '123456',
  },
  {
    title: 'aaaaaa',
    tips: 'tips me！',
    prefixUnit: '¥',
    suffixUnit: '分',
    subRate: '0',
    rateLabel: '环比',
    subRateLabel: '环比1',
    value: 1234567,
  },
])

const event = (index: Record<string, number>) => {
  console.log(index)
}
</script>
```

:::

## IndicatorCard API

| 属性        | 类型   | 说明           | 默认值 |
| ----------- | :----- | :------------- | :----- |
| chartData   | Array  | 指标卡数据     | []     |
| chartConfig | Object | 指标卡整体设置 | {}     |

## chartData API

| 属性                 | 类型    | 说明                             | 默认值 |
| -------------------- | :------ | :------------------------------- | :----- |
| title                | Array   | 指标卡标题                       | ''     |
| tips                 | String  | 指标卡 tips                      | ''     |
| value                | Number  | 指标卡 value                     | ''     |
| prefixUnit           | String  | value 前置单位，比如$            | ''     |
| suffixUnit           | String  | value 后置单位，比如'分'         | ''     |
| rate                 | Number  | 首行评分                         | ''     |
| rateLabel            | String  | 首行 label，如：'环比'           | ''     |
| rateSymbol           | String  | 首行 label 的符号                | %      |
| rateShowTrendIcon    | Boolean | 首行是否展示趋势符号（"+"、"-"） | true   |
| subRate              | Number  | 次行评分                         | ''     |
| subRateLabel         | String  | 次行 label，如：'对比同行'       | ''     |
| subRateSymbol        | String  | 次行 label 的符号                | %      |
| subRateShowTrendIcon | Boolean | 次行是否展示趋势符号（"+"、"-"） | true   |

## chartConfig API

| 属性          | 类型    | 说明                                                                                                                                                      | 默认值   |
| ------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| multiple      | Boolean | 是否是多选                                                                                                                                                | true     |
| tipsType      | String  | tooltip 类型：下划线 、 ❓(问号 icon)                                                                                                                     | 'icon'   |
| tipsPlacement | String  | tooltip 位置,'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end' | 'top'    |
| type          | String  | 指标卡类型：'arealy' or 'linear'                                                                                                                          | 'linear' |
| titleMaxSize  | Number  | 标题最大字数                                                                                                                                              | 自适应   |
| defaultValues | Array   | 指标卡被选中下标，不传则默认选中第一个（index=0）                                                                                                         | 0        |
| width         | Number  | 指标卡宽度数                                                                                                                                              | auto     |
| customStyle   | Object  | 自定义样式                                                                                                                                                | {}       |

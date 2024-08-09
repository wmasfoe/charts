# Circle 环形图

## 环形图
使用radius来配置环形图的内外半径: ['40%', '70%'],
使用center来配置环形图内外圆的中心位置: ['50%', '50%'],
:::demo

```vue
<template>
  <Circle
    :dimensions="['日期']"
    :metrics="['年龄']"
    :chartData="chartData"
    :chartConfig="circleChartConfig"
  />
</template>

<script setup>
import { ref } from 'vue'

const circleChartConfig = ref({
  title: {
    text: '环形图',
  },
  legend: {
    left: '10',
  },
  radius: ['40%', '70%'],
  center: ['50%', '50%'],
  tooltip: {
    trigger: 'item',
  },
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    // subText: '较上一周期',
    // subNum: '+23%'
  },
  tooltipVisible: true,
})

const chartData = ref([
  {
    日期: '1-1',
    余额1: 12,
    余额2: 11,
    年龄: 22,
  },
  {
    日期: '1-2',
    余额1: 13,
    余额2: 12,
    年龄: 21,
  },
  {
    日期: '1-3',
    余额1: 14,
    余额2: 13,
    年龄: 25,
  },
  {
    日期: '1-4',
    余额1: 12,
    余额2: 11,
    年龄: 28,
  },
  {
    日期: '1-5',
    余额1: 15,
    余额2: 14,
    年龄: 28,
  },
  {
    日期: '1-6',
    余额1: 11,
    余额2: 10,
    年龄: 20,
  },
])
</script>
```

:::

## 环形图显示label

:::demo
```vue
<template>
  <Circle
    :dimensions="['日期']"
    :metrics="['年龄']"
    :chartData="chartData"
    :chartConfig="circleChartConfig"
  />
</template>

<script setup>
import { ref } from 'vue'

const circleChartConfig = ref({
  title: {
    text: '环形图',
  },
  label: {
    show: true,
    // 默认是 center
    position: 'outside',
  },
  legend: {
    left: '10',
  },
  radius: ['40%', '70%'],
  center: ['50%', '50%'],
  tooltip: {
    trigger: 'item',
  },
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    // subText: '较上一周期',
    // subNum: '+23%'
  },
  tooltipVisible: true,
})

const chartData = ref([
  {
    日期: '1-1',
    余额1: 12,
    余额2: 11,
    年龄: 22,
  },
  {
    日期: '1-2',
    余额1: 13,
    余额2: 12,
    年龄: 21,
  },
  {
    日期: '1-3',
    余额1: 14,
    余额2: 13,
    年龄: 25,
  },
  {
    日期: '1-4',
    余额1: 12,
    余额2: 11,
    年龄: 28,
  },
  {
    日期: '1-5',
    余额1: 15,
    余额2: 14,
    年龄: 28,
  },
  {
    日期: '1-6',
    余额1: 11,
    余额2: 10,
    年龄: 20,
  },
])
</script>
```
:::

## 半环图显示label

:::demo
```vue
<template>
  <Circle
    :dimensions="['日期']"
    :metrics="['年龄']"
    :chartData="chartData"
    :chartConfig="circleChartConfig"
  />
</template>

<script setup>
import { ref } from 'vue'

const circleChartConfig = ref({
  title: {
    text: '环形图',
  },
  // 半环
  half: true,
  label: {
    show: true,
    // 默认是 center
    position: 'outside',
  },
  legend: {
    left: '10',
  },
  radius: ['40%', '70%'],
  center: ['50%', '70%'],
  tooltip: {
    trigger: 'item',
  },
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    // subText: '较上一周期',
    // subNum: '+23%'
  },
  tooltipVisible: true,
})

const chartData = ref([
  {
    日期: '1-1',
    余额1: 12,
    余额2: 11,
    年龄: 22,
  },
  {
    日期: '1-2',
    余额1: 13,
    余额2: 12,
    年龄: 21,
  },
  {
    日期: '1-3',
    余额1: 14,
    余额2: 13,
    年龄: 25,
  },
  {
    日期: '1-4',
    余额1: 12,
    余额2: 11,
    年龄: 28,
  },
  {
    日期: '1-5',
    余额1: 15,
    余额2: 14,
    年龄: 28,
  },
  {
    日期: '1-6',
    余额1: 11,
    余额2: 10,
    年龄: 20,
  },
])
</script>
```
:::

## 环形图（支持下钻）
配置canClick: true,支持环形图点击下钻效果

:::demo

```vue
<template>
  <Circle
    :dimensions="['日期']"
    :metrics="['年龄']"
    type="circle"
    :chartData="chartData"
    :chartConfig="circleChartConfig"
  />
</template>

<script setup>
import { ref } from 'vue'

const circleChartConfig = ref({
  title: {
    text: '环形图（支持下钻）',
  },
  legend: {
    show: true,
    left: '10',
  },
  radius: ['50%', '70%'],
  tooltip: {
    trigger: 'item',
  },
  circleCenter: {
    mainTitle: '环形图（支持下钻）',
    // mainLabel: 10000,
    mainLabel: (datum, data) => {
      const { value } = datum || {}
      return `￥${value?.reduce?.((r, d) => r + d, 0) ?? data.reduce((r, d) => r + d['年龄'], 0)}`
    },
  },
  tooltipVisible: true,
  canClick: true,
})

const chartData = ref([
  {
    日期: '1-1',
    年龄: 22,
  },
  {
    日期: '1-2',
    年龄: 21,
  },
  {
    日期: '1-3',
    年龄: 25,
  },
  {
    日期: '1-4',
    年龄: 28,
  },
  {
    日期: '1-5',
    年龄: 28,
  },
  {
    日期: '1-6',
    年龄: 20,
  },
])
</script>
```

:::

## 环形图设置 colors 的下钻

下钻的环形图如果需要设置具体的 colors,需要转换成 rgba 格式，否则会导致下钻失败！！

例如：`:colors="['rgba(255,192,203,1)', 'rgba(255,255,0,1)', 'rgba(173,216,230,1)']"`
:::demo

```vue
<template>
  <Circle
    :dimensions="['日期']"
    :metrics="['年龄']"
    type="circle"
    :colors="[
      'rgba(255,192,203,1)',
      'rgba(255,255,0,1)',
      'rgba(173,216,230,1)',
    ]"
    :chartData="chartData"
    :chartConfig="circleChartConfig"
  />
</template>

<script setup>
import { ref } from 'vue'

const circleChartConfig = ref({
  title: {
    text: '环形图（支持下钻）',
  },
  legend: {
    show: true,
    left: '10',
  },
  radius: ['50%', '70%'],
  tooltip: {
    trigger: 'item',
  },
  circleCenter: {
    mainTitle: '环形图（支持下钻）',
    // mainLabel: 10000,
    mainLabel: (datum, data) => {
      const { value } = datum || {}
      return `￥${value?.reduce?.((r, d) => r + d, 0) ?? data.reduce((r, d) => r + d['年龄'], 0)}`
    },
  },
  tooltipVisible: true,
  canClick: true,
})

const chartData = ref([
  {
    日期: '1-1',
    年龄: 22,
  },
  {
    日期: '1-2',
    年龄: 21,
  },
  {
    日期: '1-3',
    年龄: 25,
  },
])
</script>
```

:::

## chartConfig API

| 属性     | 类型    | 说明                             | 默认值 |
| -------- | :------ | :------------------------------- | :----- |
| canClick | boolean | 是否支持下钻（点击之后其他变暗） | false  |

⚠️ 注意： canClick 需要配合 type 一起使用

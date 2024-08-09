# Histogram 柱状图

### 基础条形图

:::demo

```vue
<template>
  <Histogram
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '基础条形图',
  },
})
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19,
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15,
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14,
  },
])
</script>
```

:::

### 堆叠条形图
堆叠图需要配置stack，将需要堆叠在一起的指标配置成同一个key，key名字可以随便取。 stack: { money: ['age', 'rebalance'], }, 表示age和rebalance堆叠在一起
:::demo

```vue
<template>
  <Histogram
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '堆叠条形图',
  },
  stack: {
    money: ['age', 'rebalance'],
  },
})
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19,
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15,
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14,
  },
])
</script>
```

:::

### 条线组合图
配置showLine将某个指标展示成折线图，例如showLine: ['money'],表示money是折线图

:::demo

```vue
<template>
  <Histogram
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '条线组合图',
  },
  showLine: ['money'],
})
const chartData = ref([
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15,
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14,
  },
  {
    date: '2022-09-16',
    money: 11,
    age: 20,
    rebalance: 14,
  },
])
</script>
```

:::
### 条形图支持下钻
配置canClick: true,支持柱状图点击下钻效果

:::demo

```vue
<template>
  <Histogram
    :chartData="chartData"
    :dimensions="dimensions"
    :chartConfig="chartConfig"
    :metrics="metrics"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  canClick: true
})
const chartData = ref([
  {
    date: '2022-09-12',
    money: 14,
  },
  {
    date: '2022-09-13',
    money: 12,
  },
  {
    date: '2022-09-14',
    money: 15,
  },
  {
    date: '2022-09-15',
    money: 11,
  },
  {
    date: '2022-09-16',
    money: 11,
  },
])
</script>
```

:::


### 数据序列分组 seriesField 配置
适合配置同一指标不同序列的场景，例如看不同面霜的nps（雅诗兰黛面霜的nps和兰蔻面霜的nps）


:::demo

```vue
<template>
  <Histogram
    :chartData="seriesFieldData"
    :seriesField="seriesField"
    :dimensions="['dtm']"
    :metrics="['nps']"
    :chartConfig="barChartConfig"
    :isLoading="isLoading"
  />
</template>
<script setup>
import { ref } from 'vue'
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const seriesField = ref('dim')
const dimensions = ref(['dtm'])
const metrics = ref(['nps', 'impressions'])
const seriesFieldData = ref([
  {
    dim: '雅诗兰黛白金面霜',
    dtm: '6.23~6.30',
    nps: '0.8',
    impressions: 1000,
  },
  {
    dim: '雅诗兰黛白金面霜',
    dtm: '7.01~7.07',
    nps: '0.8',
    impressions: 1000,
  },
  {
    dim: '雅诗兰黛白金面霜',
    dtm: '7.08~7.014',
    nps: '0.8',
    impressions: 1000,
  },
  {
    dim: '经典面霜',
    dtm: '6.23~6.30',
    nps: '0.6',
    impressions: 1000,
  },
  {
    dim: '经典面霜',
    dtm: '7.01~7.07',
    nps: '0.9',
    impressions: 1000,
  },
  {
    dim: '经典面霜',
    dtm: '7.08~7.014',
    nps: '1.2',
    impressions: 1000,
  },
])
</script>
```

:::
### 瀑布图（堆叠图模拟）
使用堆叠柱状图模拟瀑布图，然后将堆叠的某个指标颜色变成透明colors="['transparent', '#3481fe']"


:::demo

```vue
<template>
  <Histogram
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :colors="['transparent', '#3481fe']"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '瀑布图',
  },
  barConfig: {
    barMaxWidth: 24,
  },
  stack: {},
})
const chartData = ref([
  {
    date: '2022-09-12',
    money: 0,
    age: 10,
  },
  {
    date: '2022-09-13',
    money: 10,
    age: 20,
  },
  {
    date: '2022-09-14',
    money: 20,
    age: 30,
  },
  {
    date: '2022-09-15',
    money: 30,
    age: 40,
  },
  {
    date: '2022-09-16',
    money: 40,
    age: 50,
  },
])
</script>
```

:::
### Echarts 配置条形图

:::demo

```vue
<template>
  <Histogram :chartConfig="chartConfig" :isLoading="isLoading" />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  legend: {},
  title: {
    text: 'Echarts配置条形图',
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      data: [320, 302, 301, 334, 390, 330, 320],
    },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },

      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ad',
      type: 'bar',
      stack: 'total',
      barWidth: '16',
      label: {
        show: true,
      },
      data: [150, 212, 201, 154, 190, 330, 410],
    },
  ],
})
</script>
```

:::

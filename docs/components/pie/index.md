# Pie 饼图

### 基础饼图

:::demo

```vue 
<template>
  <Pie 
       :chartData="chartData" 
       :dimensions="['日期']"
       :metrics="['余额1']"
       :chartConfig="pieChartConfig"
    />
</template>

<script setup>
import {ref} from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const pieChartConfig = ref({
  title: {
    text: '基础饼图',
    show: true
  },
  tooltip: {
    trigger: "item",
  },
  tooltipVisible: true,
});

const chartData = ref([
  {
    '日期': '1-1',
    '余额1': 12,
  },
  {
    '日期': '1-2',
    '余额1': 13,
  },
  {
    '日期': '1-3',
    '余额1': 14,
  },
  {
    '日期': '1-4',
    '余额1': 12,
  },
  {
    '日期': '1-5',
    '余额1': 15,
  },
  {
    '日期': '1-6',
    '余额1': 11,
  }
])
</script>

```
:::

### 基础环形图
配置radius为数组来实现单环形图，数组按顺序表示内外半径
:::demo

```vue 
<template>
  <Pie 
    :chartData="chartData"
    :dimensions="['日期']"
    :metrics="['余额1']"
    :chartConfig="circleChartConfig"
    />
</template>

<script setup>
import {ref} from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const circleChartConfig = ref({
  title: {
    text: '环形图',
    show: true
  },
  radius: ['40%', '70%'],
  tooltip: {
    trigger: "item",
  },
  tooltipVisible: true,
});


const chartData = ref([
  {
    '日期': '1-1',
    '余额1': 12,
  },
  {
    '日期': '1-2',
    '余额1': 13,
  },
  {
    '日期': '1-3',
    '余额1': 14,
  },
  {
    '日期': '1-4',
    '余额1': 12,
  },
  {
    '日期': '1-5',
    '余额1': 15,
  },
  {
    '日期': '1-6',
    '余额1': 11,
  }
])
</script>

```
:::

### 多环形图
配置radius为对象来实现多环图，radius的key代表某个指标的环形图的内外半径
:::demo

```vue 
<template>
  <Pie 
    :chartData="chartData"
    :dimensions="['日期']"
    :metrics="['余额1', '余额2']"
    :chartConfig="circleChartConfig"
    />
</template>

<script setup>
import {ref} from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const circleChartConfig = ref({
  title: {
    text: '多环形图',
    show: true
  },
  seriesName: '季度数据',
  radius: {
    '余额2': [0, '30%'],
    '余额1': ['40%', '80%'],
  },
  label: {
    show: false
  },
  tooltip: {
    trigger: "item",
  },
  tooltipVisible: true,
});


const chartData = ref([
  {
    '日期': '1-1',
    '余额1': 12,
    '余额2': 30,
  },
  {
    '日期': '1-2',
    '余额1': 13,
    '余额2': 15,
  },
  {
    '日期': '1-3',
    '余额1': 14,
    '余额2': 10,
  },
  {
    '日期': '1-4',
    '余额1': 12,
    '余额2': 15,
  },
  {
    '日期': '1-5',
    '余额1': 15,
    '余额2': 9,
  },
  {
    '日期': '1-6',
    '余额1': 11,
    '余额2': 18,
  }
])
</script>

```
:::

### 带中心label的多环形图
配置circleCenter来实现中心带文字的环形图，支持配置四个属性，分别是mainTitle: 主标题, mainLabel: 主数字,subText: 副文案, subNum: 副数字
:::demo

```vue 
<template>
  <Pie 
    :chartData="chartData"
    :dimensions="['日期']"
    :metrics="['余额1', '余额2']"
    :chartConfig="circleChartConfig"
    />
</template>

<script setup>
import {ref} from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const circleChartConfig = ref({
  title: {
    text: '多环形图',
    show: true
  },
  radius: {
    '余额2': ['60%', '70%'],
    '余额1': ['75%', '85%'],
  },
  label: {
    show: true
  },
  tooltip: {
    trigger: "item",
  },
  tooltipVisible: true,
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    subText: '较上一周期',
    subNum: '+23%'
  },
});


const chartData = ref([
  {
    '日期': '1-1',
    '余额1': 12,
    '余额2': 30,
  },
  {
    '日期': '1-2',
    '余额1': 13,
    '余额2': 15,
  },
  {
    '日期': '1-3',
    '余额1': 14,
    '余额2': 10,
  },
  {
    '日期': '1-4',
    '余额1': 12,
    '余额2': 15,
  },
  {
    '日期': '1-5',
    '余额1': 15,
    '余额2': 9,
  },
  {
    '日期': '1-6',
    '余额1': 11,
    '余额2': 18,
  }
])
</script>

```
:::
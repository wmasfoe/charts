# Pie 饼图

### 基础饼图

:::demo

```vue
<template>
  <Pie
    :chartData="pieData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="pieConfig"
    :isLoading="isLoading"
    :width='375'
    @legendSelectChanged="legendSelectChanged"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['name'])
const metrics = ref(['percent'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const pieConfig = ref({})

const pieData = [
  {
    name: '长津湖',
    percent: 0.4,
  },
  {
    name: '我和我的父辈',
    percent: 0.2,
  },
  {
    name: '失控玩家',
    percent: 0.18,
  },
  {
    name: '宝可梦',
    percent: 0.15,
  },
  {
    name: '峰爆',
    percent: 0.05,
  },
  {
    name: '其他',
    percent: 0.02,
  },
]
</script>
```

:::

### 带文本的饼图

:::demo

```vue
<template>
  <Pie
    :chartData="pieData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="pieConfig"
    :isLoading="isLoading"
    :width='375'
    @legendSelectChanged="legendSelectChanged"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['name'])
const metrics = ref(['percent'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const pieConfig = ref({
  legend: {
    icon: 'line',
  },
  label: {
    show: true,
  },
})

const pieData = [
  {
    name: '长津湖',
    percent: 0.4,
  },
  {
    name: '我和我的父辈',
    percent: 0.2,
  },
  {
    name: '失控玩家',
    percent: 0.18,
  },
  {
    name: '宝可梦',
    percent: 0.15,
  },
  {
    name: '峰爆',
    percent: 0.05,
  },
  {
    name: '其他',
    percent: 0.02,
  },
]
</script>
```

:::


### 饼图支持下钻

:::demo

```vue
<template>
  <Pie
    :chartData="pieData"
    :dimensions="['name']"
    :metrics="['percent']"
    :chartConfig="pieConfig"
    :width='375'
    :event="chartEvents"
    @legendSelectChanged="legendSelectChanged"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['value'])

const pieConfig = ref({
  canClick: true
})
const chartEvents = {
  click: {
    callback(e) {
      console.log(e);
    },
  },
};
const pieData = [
  {
    name: '长津湖',
    percent: 0.4,
  },
  {
    name: '我和我的父辈',
    percent: 0.2,
  },
  {
    name: '失控玩家',
    percent: 0.18,
  },
  {
    name: '宝可梦',
    percent: 0.15,
  },
  {
    name: '峰爆',
    percent: 0.05,
  },
  {
    name: '其他',
    percent: 0.02,
  },
]
</script>
```

:::
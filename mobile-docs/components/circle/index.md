# Circle 环形图

### 基础环形图

:::demo

```vue
<template>
  <Circle
    :chartData="circleData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="circleConfig"
    :isLoading="isLoading"
    :width="375"
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
const circleConfig = ref({
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    mainTitleStyle: {
      marginTop: '24px',
      fontSize: '32px',
      fontWeight: 600,
    },
    mainLabelStyle: {
      marginTop: '12px',
      fontSize: '32px',
      fontWeight: 600,
    },
  },
})
const circleData = [
  {
    name: '长津湖',
    percent: 40,
  },
  {
    name: '我和我的父辈',
    percent: 22,
  },
  {
    name: '失控玩家',
    percent: 18,
  },
  {
    name: '宝可梦',
    percent: 15,
  },
  {
    name: '峰爆',
    percent: 5,
  },
  {
    name: '其他',
    percent: 20,
  },
]
</script>
```

:::

### 带文本的环形图

:::demo

```vue
<template>
  <Circle
    :chartData="circleData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="circleConfig"
    :width='375'
   :event="chartEvents"
    @legendSelectChanged="legendSelectChanged"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['name'])
const metrics = ref(['percent'])

const circleConfig = ref({
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    mainTitleStyle: {
      marginTop: '24px',
      fontSize: '32px',
      fontWeight: 600,
    },
    mainLabelStyle: {
      marginTop: '12px',
      fontSize: '32px',
      fontWeight: 600,
    },
  },
  label: {
    show: true,
  },
})

const circleData = [
  {
    name: '长津湖',
    percent: 40,
  },
  {
    name: '我和我的父辈',
    percent: 22,
  },
  {
    name: '失控玩家',
    percent: 18,
  },
  {
    name: '宝可梦',
    percent: 15,
  },
  {
    name: '峰爆',
    percent: 5,
  },
  {
    name: '其他',
    percent: 20,
  },
]
</script>
```

:::

### 环形图支持下钻

:::demo

```vue
<template>
  <Circle
    :chartData="circleData"
    :dimensions="['name']"
    :metrics="['percent']"
    :chartConfig="circleConfig"
    :width='375'
    @legendSelectChanged="legendSelectChanged"
  />
</template>

<script setup>
import { ref } from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['value'])

const circleConfig = ref({
  canClick: true,
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    mainTitleStyle: {
      marginTop: '24px',
      fontSize: '32px',
      fontWeight: 600,
    },
    mainLabelStyle: {
      marginTop: '12px',
      fontSize: '32px',
      fontWeight: 600,
    },
  },
})

const chartEvents = {
  click: {
    callback(e) {
      console.log(e);
    },
  },
};
const circleData = [
  {
    name: '长津湖',
    percent: 40,
  },
  {
    name: '我和我的父辈',
    percent: 22,
  },
  {
    name: '失控玩家',
    percent: 18,
  },
  {
    name: '宝可梦',
    percent: 15,
  },
  {
    name: '峰爆',
    percent: 5,
  },
  {
    name: '其他',
    percent: 20,
  },
]
</script>
```

:::
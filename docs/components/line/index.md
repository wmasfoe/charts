# Line 折线图

### 基础折线图

:::demo

```vue 
<template>
  <Line :chartData="chartData" :dimensions="dimensions" :metrics="metrics" 
        :chartConfig="chartConfig" :isLoading="isLoading"/>
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '基础折线图',
  },
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>


```
:::
### 折线面积图
配置area: true
:::demo

```vue 
<template>
   <Line 
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '折线面积图',
  },
  area: true,
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::

### 折线图图例交互
配置legend: {
    legendMode: 1, // 1点谁灭谁 2点谁亮谁
  }
:::demo

```vue
<template>
   <Line 
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const chartConfig = ref({
  legend: {
    legendMode: 1, // 点击图例变灭
  },
  title: {
    text: '折线面积图',
  }
});
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::

### Echarts原生配置折线图

:::demo

```vue 
<template>
  <Line 
    :chartConfig="chartConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import {ref} from 'vue'
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: "echarts Line",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2022-09-10",
      "2022-09-11",
      "2022-09-12",
      "2022-09-13",
      "2022-09-14",
      "2022-09-15",
      "2022-09-16",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
  ],
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 17,
    rebalance: 25
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 13,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>


```
:::

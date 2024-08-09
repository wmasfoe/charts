# 通用图表组件

### 基本使用

:::demo

```vue
<template>
   <Chart 
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
    text: '通用图表',
  },
  type: 'bar'
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

### 渲染delight-charts暂不支持的雷达图

:::demo

```vue
<template>
   <Chart 
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
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  tooltip: {
    show: true
  },
  type: 'radar',
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
});
</script>
```

:::

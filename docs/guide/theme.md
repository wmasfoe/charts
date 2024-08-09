# 简介
<a href="//fe.devops.beta.justdev.com/apps/delightchartstheme" target="_blank">delight-charts主题配置工具</a>：0.1.71版本及以上支持使用主题工具配置主题
<script setup>
import Theme from '../components/theme/index.vue'
</script>

<Theme />
:::

### 主题配置DEMO

:::demo

```vue 
<template>
  <Line 
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics" 
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :theme="'light'"
   />
</template>

<script setup>
import {ref} from 'vue'
// 导入本地json主题配置文件，引入echarts注册名字和json
// import json from './json'
// import * as echarts from "echarts/core";
// echarts.registerTheme('light', json);

const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '主题配置',
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
])
</script>

```
:::
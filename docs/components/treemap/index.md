# Treemap 矩形树图

### 基础矩形树图

:::demo

```vue 
<template>
  <Treemap 
       :chartData="chartData" 
       :dimensions="['catagory']"
       :metrics="['ratio']"
       :chartConfig="treemapChartConfig"
    />
</template>

<script setup>
import {ref} from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const treemapChartConfig = ref({
  title: {
    text: '基础矩形树状图',
    show: true
  },
});

const chartData = ref([
  {
    catagory: '眼影',
    ratio: 12
  },
  {
    catagory: '口红',
    ratio: 13
  },
  {
    catagory: '化妆水',
    ratio: 14,
  },
  {
    catagory: '眼线笔',
    ratio: 12,
  },
  {
    catagory: '唇膏',
    ratio: 15,
  },
  {
    catagory: '高光',
    ratio: 11,
  }
])
</script>

```
:::
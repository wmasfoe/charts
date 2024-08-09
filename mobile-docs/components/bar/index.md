# Bar 柱状图

### 基础柱状图

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age", "rebalance"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
    rebalance: 19,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
    rebalance: 15,
  },
]);
</script>
```

:::

### 堆叠柱状图

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age", "rebalance", "sex", "key"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
  stack: true,
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
    rebalance: 9,
    sex: 10,
    key: 20,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
    rebalance: 19,
    sex: 10,
    key: 20,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
    rebalance: 29,
    sex: 10,
    key: 20,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
    rebalance: 21,
    sex: 10,
    key: 20,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
    rebalance: 15,
    sex: 16,
    key: 20,
  },
  {
    date: "2022-09-15",
    money: 15,
    age: 28,
    rebalance: 15,
    sex: 15,
    key: 30,
  },
]);
</script>
```

:::

### 线柱组合图

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="['money', 'age', 'rebalance']"
    :chartConfig="{ ...chartConfig, showLine: ['age'] }"
    :isLoading="isLoading"
    :event="chartEvents"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age", "rebalance"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
    rebalance: 19,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
    rebalance: 15,
  },
  {
    date: "2022-09-15",
    money: 15,
    age: 28,
    rebalance: 15,
  },
]);
</script>
```

<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="{ canClick: true }"
    :isLoading="isLoading"
    :event="chartEvents"
    :width="375"
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
    money: 15,
    age: 28,
    rebalance: 15,
  },
])
</script>

````

:::

### 柱状图（单柱支持下钻）

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :width="375"
    :event="chartEvents"
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
   canClick: true,
})
const chartEvents = {
  click: {
    callback(e) {
      console.log('柱状图（单柱支持下钻）', e);
    },
  },
};
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
    money: 12,
    age: 28,
    rebalance: 21,
  },
])
</script>
````
:::

### 带标注柱状图

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :width="375"
    :event="chartEvents"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
  stack: true,
  showGuide: true,
  guide: {
    x: -10,
    y: -15,
  },
});
const chartEvents = {
  click: {
    callback(e) {
      console.log("柱状图（单柱支持下钻）", e);
    },
  },
};
const chartData = ref([
  {
    date: "2022-09-10",
    money: 121231,
  },
  {
    date: "2022-09-11",
    money: 21233,
  },
  {
    date: "2022-09-12",
    money: 45244,
  },
  {
    date: "2022-09-13",
    money: 11242,
  },
  {
    date: "2022-09-14",
    money: 68644,
  },
]);
</script>
```

:::

### 带标注堆叠柱状图

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :width="375"
    :event="chartEvents"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
  stack: true,
  showGuide: true,
  guide: {
    x: -10,
    y: -7,
  },
});
const chartEvents = {
  click: {
    callback(e) {
      console.log("柱状图（单柱支持下钻）", e);
    },
  },
};
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
    rebalance: 19,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    date: "2022-09-14",
    money: 12,
    age: 28,
    rebalance: 21,
  },
]);
</script>
```
:::

### 图例默认配置

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age", "rebalance"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
   legend: {
    selected: {
      money: false,
    },
  },
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
    rebalance: 19,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
    rebalance: 15,
  },
]);
</script>
```
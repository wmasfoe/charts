# Histogram 条形图

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
    money: 11,
    age: 20,
    rebalance: 14,
  },
]);
</script>
```

:::

### 堆叠条形图

:::demo

```vue
<template>
  <Histogram
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
  stack: true,
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
  {
    date: "2022-09-15",
    money: 11,
    age: 20,
    rebalance: 14,
  },
]);
</script>
```

:::

### 条形图支持下钻

:::demo

```vue
<template>
  <Histogram
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :event="chartEvents"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money"]);

const chartEvents = {
  click: {
    callback(e) {
      console.log("柱状图（单柱支持下钻）", e);
    },
  },
};
const chartConfig = ref({
  canClick: true,
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
  },
  {
    date: "2022-09-11",
    money: 13,
  },
  {
    date: "2022-09-12",
    money: 14,
  },
  {
    date: "2022-09-13",
    money: 12,
  },
  {
    date: "2022-09-14",
    money: 15,
  },
  {
    date: "2022-09-15",
    money: 11,
  },
]);
</script>
```

:::

### 图例默认配置

:::demo

```vue
<template>
  <Histogram
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
  {
    date: "2022-09-15",
    money: 11,
    age: 20,
    rebalance: 14,
  },
]);
</script>
```

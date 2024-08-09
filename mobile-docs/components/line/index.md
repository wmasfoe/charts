# Line 折线图

### 基础折线图

:::demo

```vue
<template>
  <Line
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
const metrics = ref(["money"]);
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

### 单折线面积图

:::demo

```vue
<template>
  <Line
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
const metrics = ref(["age"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
  area: true,
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

:::

### 多折线面积图

:::demo

```vue
<template>
  <Line
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
  area: true,
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 30,
    age: 11,
    rebalance: 9,
  },
  {
    date: "2022-09-11",
    money: 35,
    age: 21,
    rebalance: 12,
  },
  {
    date: "2022-09-12",
    money: 34,
    age: 25,
    rebalance: 11,
  },
  {
    date: "2022-09-13",
    money: 34,
    age: 28,
    rebalance: 13,
  },
  {
    date: "2022-09-14",
    money: 34,
    age: 28,
    rebalance: 15,
  },
]);
</script>
```

:::

### 折线指示器

:::demo

```vue
<template>
  <Line
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
  symbolConfig: { symbol: "emptyCircle" },
  tooltip: {
    axisPointer: {
      type: "cross",
      axis: "xy",
      lineStyle: {
        width: 1,
        type: "dotted",
      },
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

:::

### 中文映射图

:::demo

```vue
<template>
  <Line
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
  labelMap: {
    money: "薪水",
    age: "年龄",
    rebalance: "账户余账户",
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

:::

### 双 Y 轴折线图

:::demo

```vue
<template>
  <Line
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);
const isLoading = ref(true);

const chartConfig = ref({
  legend: {
    // 图例icon类型： 'circle' | 'square' | 'line', 默认为 'circle'
    icon: "square",
  },
  tooltip: {
    valueFormatter: [
      {},
      {
        valueType: "percent",
        digit: 1,
      },
    ],
  },
  yAxis: [
    {
      name: "金钱",
      type: "value",
    },
    {
      name: "年龄",
      type: "value",
      valueType: "percent",
      digit: 0,
      unit: false,
    },
  ],
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 11232,
    age: 50,
  },
  {
    date: "2022-09-11",
    money: 11233,
    age: 50,
  },
  {
    date: "2022-09-12",
    money: 12314,
    age: 40,
  },
  {
    date: "2022-09-13",
    money: 11232,
    age: 50,
  },
  {
    date: "2022-09-14",
    money: 12435,
    age: 40,
  },
]);
</script>
```

:::

### 图例默认配置

:::demo

```vue
<template>
  <Line
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age", "rebalance"]);
const isLoading = ref(true);

const chartConfig = ref({
  legend: {
    // 图例icon类型： 'circle' | 'square' | 'line', 默认为 'circle'
    icon: "square",
    selected: {
      money: false,
    },
  },
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 1122,
    age: 50,
    rebalance: 100,
  },
  {
    date: "2022-09-11",
    money: 1123,
    age: 50,
    rebalance: 200,
  },
  {
    date: "2022-09-12",
    money: 1231,
    age: 40,
  },
  {
    date: "2022-09-13",
    money: 1123,
    age: 50,
    rebalance: 300,
  },
  {
    date: "2022-09-14",
    money: 1243,
    age: 40,
    rebalance: 400,
  },
]);
</script>
```

:::

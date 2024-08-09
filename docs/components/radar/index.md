# Radar 雷达图

### 基础雷达图

:::demo

```vue
<template>
  <Radar
    :chartData="chartData"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from "vue";

const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);

const chartConfig = ref({
  title: {
    text: "基础雷达图",
  },
  radar: [
    {
      indicator: [
        { name: "Sales", key: "sale" },
        { name: "Administration", key: "admin" },
        { name: "Information Technology", key: "info" },
        { name: "Customer Support", key: "custom_support", max: 38000 },
        { name: "Development", key: "dev" },
        { name: "Marketing", key: "market" },
      ],
    },
  ],
});

const chartData = ref([
  {
    name: "budget",
    value: [4200, 3000, 20000, 35000, 50000, 18000],
    lineStyle: {
      type: "dashed",
    },
  },
  {
    name: "spending",
    value: [5000, 14000, 28000, 26000, 42000, 21000],
  },
]);
</script>
```

:::

### 多个雷达图

:::demo

```vue
<template>
  <Radar
    :chartData="chartData"
    :chartConfig="chartConfig"
    :width="800"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from "vue";

const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);

const chartConfig = ref({
  title: {
    text: "多个雷达图",
  },
  radar: [
    {
      center: ["25%", "50%"],
      indicator: [
        { name: "Sales", key: "sale" },
        { name: "Administration", key: "admin" },
        { name: "Information Technology", key: "info" },
        { name: "Customer Support", key: "custom_support", max: 38000 },
        { name: "Development", key: "dev" },
        { name: "Marketing", key: "market" },
      ],
    },
    {
      center: ["75%", "50%"],
      indicator: [
        { name: "Sales", key: "sale" },
        { name: "Administration", key: "admin" },
        { name: "Information Technology", key: "info" },
        { name: "Customer Support", key: "custom_support", max: 38000 },
        { name: "Development", key: "dev" },
        { name: "Marketing", key: "market" },
      ],
    },
  ],
});

const chartData = ref([
  [
    {
      name: "budget",
      value: [4200, 3000, 20000, 35000, 50000, 18000],
      lineStyle: {
        type: "dashed",
      },
    },
    {
      name: "spending",
      value: [5000, 14000, 28000, 26000, 42000, 21000],
    },
  ],
  [
    {
      name: "budget2",
      radarIndex: 1,
      value: [4200, 1, 333, 35000, 50000, 18000],
    },
    {
      name: "spending2",
      value: [5000, 14000, 28000, 26000, 42000, 21000],
    },
  ],
]);
</script>
```

:::

### 调整雷达图位置

其他图表可以通过设置 `gird` 调整图表四周留白，echarts 雷达图不支持通过 `grid` 调整，只能通过 [`center`](https://echarts.apache.org/zh/option.html#radar.center) 调整。

:::demo

```vue
<template>
  <Radar
    :chartData="chartData"
    :chartConfig="chartConfig"
  />
</template>

<script setup>
import { ref } from "vue";

const chartConfig = ref({
  title: {
    text: "调整雷达图位置",
  },
  radar: [
    {
      // 调整位置
      center: ['55%', '50%'],
      indicator: [
        { name: "Sales", key: "sale" },
        { name: "Administration", key: "admin" },
        { name: "Information Technology", key: "info" },
        { name: "Customer Support", key: "custom_support", max: 38000 },
        { name: "Development", key: "dev" },
        { name: "Marketing", key: "market" },
      ],
    },
  ],
});

const chartData = ref([
  {
    name: "budget",
    value: [4200, 3000, 20000, 35000, 50000, 18000],
    lineStyle: {
      type: "dashed",
    },
  },
  {
    name: "spending",
    value: [5000, 14000, 28000, 26000, 42000, 21000],
  },
]);
</script>
```

:::

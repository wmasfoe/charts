# 图表 API

### 基本用法

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);

const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
  },
]);
</script>
```

:::

### 基础图表配置项

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :chartConfig="chartConfig"
    :metrics="metrics"
    :isLoading="isLoading"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);
const chartConfig = ref({
  title: {
    text: "基础柱状图",
  },
  tooltip: {
    trigger: "axis",
  },
  yAxis: {
    axisLabel: {
      color: "red",
    },
  },
  grid: {
    show: true,
  },
  xAxis: {
    axisLabel: {
      color: "green",
    },
  },
  dataZoom: {
    type: "slider",
    show: true,
  },
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
  },
]);
</script>
```

:::

### 自定义设置图表宽高

width 定义图表宽度，height 定义图表高度
:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :width="500"
    :height="300"
    :chartConfig="chartConfig"
    :metrics="metrics"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);
const chartConfig = ref({
  title: {
    text: "基础柱状图",
  },
  tooltip: {
    trigger: "axis",
  },
  yAxis: {
    axisLabel: {
      color: "red",
    },
  },
  grid: {
    show: true,
  },
  xAxis: {
    axisLabel: {
      color: "green",
    },
  },
  dataZoom: {
    type: "slider",
    show: true,
  },
});
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
  },
]);
</script>
```

:::

### 图表主题配色自定义

colors 支持自定义配置图表主题配色
:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :colors="customColors"
    :metrics="metrics"
    :style="{backgroundColor: '#efefef'}"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age", "salary"]);
const customColors = ref(["#59c4e6", "#edafda", "#93b7e3"]);
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
    salary: 30,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
    salary: 20,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
    salary: 50,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
    salary: 40,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
    salary: 32,
  },
]);
</script>
```

:::

### Loading 用法

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :isLoading="isLoading"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);

const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
  },
]);
</script>
```

:::

### Loading icon 配置

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :isLoading="isLoading"
    :loadingConfig="loadingConfig"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);

const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
  },
]);
const loadingConfig = ref({
  loadingIcon: "red",
});
</script>
```

:::

### 图表 events

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :isLoading="isLoading"
    :events="chartEvents"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);

const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);
const chartEvents = {
  click: {
    callback: function (e) {
      alert("只有在money响应点击事件哦");
    },
    query: { seriesName: "money" }, // name为xxx的时候出发click事件
  },
};
const chartData = ref([
  {
    date: "2022-09-10",
    money: 12,
    age: 11,
  },
  {
    date: "2022-09-11",
    money: 13,
    age: 21,
  },
  {
    date: "2022-09-12",
    money: 14,
    age: 25,
  },
  {
    date: "2022-09-13",
    money: 12,
    age: 28,
  },
  {
    date: "2022-09-14",
    money: 15,
    age: 28,
  },
]);
</script>
```

:::

### 组合图 showLine 配置

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
  title: {
    text: "柱线组合图",
  },
  showLine: ["money"],
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

### 面积图 area 配置

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
  title: {
    text: "面积图",
  },
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

### dataOrder 排序配置

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
const dimensions = ref(["name"]);
const metrics = ref(["money", "age", "rebalance"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
  title: {
    text: "dataOrder排序",
  },
  dataOrder: {
    sortfield: "age",
    sortOrder: "asc",
  },
});
const chartData = ref([
  {
    name: "亚奇",
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    name: "荣荣",
    age: 21,
    money: 9,
    rebalance: 19,
  },
  {
    name: "黑星",
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    name: "临渊",
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    name: "仲谋",
    money: 15,
    age: 28,
    rebalance: 15,
  },
  {
    name: "果果",
    money: 11,
    age: 20,
    rebalance: 14,
  },
]);
</script>
```

:::

### 堆叠配置

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
const dimensions = ref(["name"]);
const metrics = ref(["money", "age", "rebalance"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
  title: {
    text: "堆叠配置",
  },
  stack: {
    rebalance: ["age", "money"],
  },
  dataOrder: {
    sortfield: "age",
    sortOrder: "asc",
  },
});
const chartData = ref([
  {
    name: "亚奇",
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    name: "荣荣",
    age: 21,
    money: 9,
    rebalance: 19,
  },
  {
    name: "黑星",
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    name: "临渊",
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    name: "仲谋",
    money: 15,
    age: 28,
    rebalance: 15,
  },
  {
    name: "果果",
    money: 11,
    age: 20,
    rebalance: 14,
  },
]);
</script>
```

:::

### labelMap 配置 label 重命名

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
const dimensions = ref(["name"]);
const metrics = ref(["money", "age", "rebalance"]);
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 1000);
const chartConfig = ref({
  labelMap: {
    money: "薪水",
    age: "年龄",
    rebalance: "账户余额",
  },
  title: {
    text: "label重命名",
  },
});
const chartData = ref([
  {
    name: "亚奇",
    money: 12,
    age: 11,
    rebalance: 9,
  },
  {
    name: "荣荣",
    age: 21,
    money: 9,
    rebalance: 19,
  },
  {
    name: "黑星",
    money: 14,
    age: 25,
    rebalance: 29,
  },
  {
    name: "临渊",
    money: 12,
    age: 28,
    rebalance: 21,
  },
  {
    name: "仲谋",
    money: 15,
    age: 28,
    rebalance: 15,
  },
  {
    name: "果果",
    money: 11,
    age: 20,
    rebalance: 14,
  },
]);
</script>
```

:::

### tooltip 配置

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
  title: {
    text: "tooltip配置",
  },
  tooltip: {
    valueType: "percent",
    digit: 2,
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

### tooltip 格式化多指标配置

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
  tooltip: {
    valueFormatter: [
      // 格式化配置项，index 和传入的 metrics 对应
      {
        valueType: "currency",
        digit: 2,
        unit: true,
      },
      {
        valueType: "normal",
        digit: 0,
        unit: "岁",
      },
      {
        valueType: "percent",
        digit: 1,
      },
    ],
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

### legend 配置

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
  title: {
    text: "legend配置",
  },
  legend: {
    show: true,
    position: "top",
    icon: "line",
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

### grid 配置

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
  title: {
    text: "grid配置",
  },
  grid: {
    show: true,
    left: 20,
  },
  yAxis: [
    {
      name: "年龄",
      type: "value",
      nameTextStyle: { color: "red" },
    },
    {
      name: "薪水",
      valueType: "percent",
      digit: 2, // 保留几位小数，
      nameTextStyle: { color: "blue" },
    },
  ],
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

### 坐标轴配置

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
  title: {
    text: "坐标轴配置",
  },
  xAxis: {
    name: "薪水",
  },
  yAxis: [
    {
      name: "年龄",
      type: "value",
      nameTextStyle: { color: "red" },
    },
    {
      name: "薪水",
      valueType: "percent",
      digit: 2, // 保留几位小数，
      nameTextStyle: { color: "blue" },
    },
  ],
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

### 支持 Echarts 原生配置

:::demo

```vue
<template>
  <Line :chartConfig="chartConfigNativeLine" :width="375" />
</template>

<script setup>
import { ref } from "vue";
const chartConfigNativeLine = ref({
  xAxis: {
    type: "category",
    data: ["2022-09-10", "2022-09-11", "2022-09-12"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      data: [120, 132, 101],
    },
    {
      name: "Union Ads",
      type: "line",
      data: [220, 182, 191],
    },
    {
      name: "Video Ads",
      type: "line",
      data: [150, 232, 201],
    },
  ],
});
</script>
```

:::

### 数据默认空状态

:::demo

```vue
<template>
  <Bar
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);

const chartData = ref([]);
</script>
```

:::

### 自定义空态内容

:::demo

```vue
<template>
  <Bar
    :dataEmptyConfig="dataEmptyConfig"
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :width="375"
  />
</template>

<script setup>
import { ref } from "vue";
const dimensions = ref(["date"]);
const metrics = ref(["money", "age"]);
const dataEmptyConfig = ref({
  emptyImgUrl:
    "https://picasso-static.justdev.com/fe-platform/3b7969ef184979a942aa0ee10eb0fecbecb5b418.png",
  emptyTitle: "我是用户自定义的空状态标题",
});
const chartData = ref([]);
</script>
```

:::

## 全局 API

| 属性        | 类型      | 说明                                                                                                                                                                                                                             | 默认值   |
| ----------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| dimensions  | string [] | 维度, 一般指 x 轴指标                                                                                                                                                                                                            | [ ]      |
| metrics     | string [] | 指标，一般指 y 轴指标                                                                                                                                                                                                            | [ ]      |
| chartData   | Object [] | 图表数据                                                                                                                                                                                                                         | [ ]      |
| chartConfig | object    | 图表配置,传入 echarts 原生配置也支持渲染                                                                                                                                                                                         | {}       |
| colors      | string[]  | 全局 colors 配置(如果是环形图需要下钻，请传 rgba 格式)                                                                                                                                                                           | [ ]      |
| theme       | string    | 自定义主题                                                                                                                                                                                                                       | ''       |
| isLoading   | boolean   | 是否显示 isLoading                                                                                                                                                                                                               | false    |
| renderType  | string    | 渲染类型                                                                                                                                                                                                                         | 'canvas' |
| changeDelay | string    | 配置项，数据，resize 时的延迟渲染时间                                                                                                                                                                                            | 300ms    |
| cssClass    | string    | 自定义 class                                                                                                                                                                                                                     | ''       |
| events      | object    | 需要监听的事件名，触发的 callback, query 是可选的过滤条件，能够只在指定的组件或者元素上进行响应。{click: {callback: () => {}, query: {seriesIndex: 1, name: 'xx'}}, 表示只在 seriesIndex 为 1，name 为 xxx 的时候出发 click 事件 | {}       |

## chartConfig API

| 属性         | 类型              | 说明                                                                                                                                                           | 默认值            |
| ------------ | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| showLine     | string[]          | 哪几个指标显示为折线，用这个 prop 可实现柱线组合图                                                                                                             | [ ]               |
| area         | boolean           | 是否显示面积区域                                                                                                                                               | false             |
| itemStyle    | object            | 图形样式                                                                                                                                                       | {}                |
| dataOrder    | object            | 图形按什么字段排序，支持设置排序字段 sortField 和 sortOrder 和升降序                                                                                           | {}                |
| stack        | object            | 设置堆叠字段，两个指标设置在同一个 key 下就表示堆叠在一起，例如 stack:{a:[b,c]} 说明 bc 要堆叠在一起                                                           | {}                |
| center       | array             | 饼图的中心点设置，数组的第一项是横坐标，第二项是纵坐标                                                                                                         | ['65%', '50%']    |
| radius       | string            | 饼图半径，类型 string, array, object，string 是饼图， array 是单个环形图，object 是多环形图或多饼。例如 //{'指标 1': [0, '30%'],'指标 2': ['50%', '70%']}'     | ''                |
| labelMap     | object            | 设置指标字段的别名，同时作用于提示框和图例，例如 labelMap: {'a': '好多钱'},                                                                                    | {}                |
| seriesConfig | object[]或 object | 支持 echarts series 里面属性的配置，例如 symbol, symbolsize，itemstyle 等                                                                                      | []                |
| tooltip      | object            | 选填 digit: 4 保留几位小数，选填 unit: true 单位格式化，valueType: percent 百分比，tooltip 设置和 echarts 配置一致                                             | {}                |
| legend       | object            | 设置和 echarts 配置一致, 支持设置图例模式，默认点击图例高亮；legendMode 设置为 1 图例点击变灭, 默认 legendMode: 0                                              | '{legendMode: 0}' |
| yAxis        | object            | y 轴设置和 echarts 配置一致；选填 digit: 4 保留几位小数，选填 unit: true 单位格式化,yAxisIndex:1 在单个图表实例中配置多个 y 轴, valueType: percent 百分比 ｜{} |
| xAxis        | object            | x 轴设置和 echarts 配置一致，选填 digit: 4 保留几位小数，选填 unit: true 单位格式化,yAxisIndex:1 在单个图表实例中配置多个 y 轴, valueType: percent 百分比      | {}                |
| title        | object            | 标题设置和 echarts 配置一致                                                                                                                                    | {}                |

## legend API

| 属性     | 类型   | 说明                                                | 默认值   |
| -------- | :----- | --------------------------------------------------- | -------- |
| icon     | string | 图例标记, 可选值为： 'circle' \| 'square' \| 'line' | 'circle' |
| position | string | 可选值为：'top' \| 'right' \| 'bottom' \| 'left'    | 'top'    |

## tooltip API

| 属性        | 类型     | 说明                                                     | 默认值  |
| ----------- | :------- | :------------------------------------------------------- | :------ |
| valueType   | string   | 数据格式化类型: percent:百分比，label:单位，value:千分位 | 'value' |
| unit        | boolean  | 数据格式化是否显示单位                                   | true    |
| digit       | string   | 数据格式化小数点位数: 2                                  | -       |
| formatter   | function | 自定义 tooltip                                           | -       |
| axisPointer | object   | 指示器： 同 echarts 配置                                 | -       |

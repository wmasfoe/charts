# Bullet 子弹图

### 基础子弹图

:::demo

```vue
<template>
  <div style="font-weight: 500">基础:</div>
  <Bullet
    :chartData="bulletBaseData"
    :chartConfig="bulletConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '70px' }"
  />
  <div style="font-weight: 500">标题:</div>
  <Bullet
    :chartData="bulletTitleData"
    :chartConfig="{ ...bulletConfig }"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '70px' }"
  />
  <div style="font-weight: 500">背景色:</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="{
      ...bulletConfig,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '70px' }"
  />
  <div style="font-weight: 500">数字显示:</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="{
      ...bulletConfig,
      label: {
        show: true,
      },
      title: '标题',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '70px' }"
  />
  <div style="font-weight: 500">数字格式化显示:</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="{
      ...bulletConfig,
      label: {
        show: true,
        valueType: 'label',
        digit: 1,
        unit: true,
      },
      title: '标题',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '70px' }"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
const bulletConfig = ref({
  measures: [
    {
      label: "已下单金额",
      color: "#ff8b1f",
    },
    {
      label: "实际进度",
      color: "#4a7cff",
    },
  ],
  targets: [
    {
      label: "双月目标值",
      value: 180000,
      color: "#58679d",
    },
    {
      label: "当前时间目标值",
      value: 48000,
      color: "#ff667a",
    },
  ],
});
const bulletBaseData = [
  {
    b: "",
    a: [46696, 87204],
  },
];
const bulletData = [
  {
    b: "",
    a: [46696, 87204],
  },
];
const bulletTitleData = [
  {
    b: "标题",
    a: [46696, 87204],
  },
];
</script>
```

:::

### 图例子弹图

:::demo

```vue
<template>
  <div style="font-weight: 500">图例上:</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
  <div style="font-weight: 500">图例下:</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig2"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
const bulletConfig = ref({
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  legend: {
    show: true,
  },
  measures: [
    {
      label: "实际进度",
      value: 1700,
      color: "#4a7cff",
    },
    {
      label: "已下单金额",
      value: 1000,
      color: "#ff8b1f",
    },
  ],
  targets: [
    {
      label: "当前时间目标值",
      value: 2600,
      color: "#ff667a",
    },
    {
      label: "双月目标值",
      value: 3700,
      color: "#58679d",
    },
  ],
});
const bulletConfig2 = ref({
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  legend: {
    show: true,
    legendPosition: "bottom",
  },
  measures: [
    {
      label: "实际进度",
      color: "#4a7cff",
    },
    {
      label: "已下单金额",
      color: "#ff8b1f",
    },
  ],
  targets: [
    {
      label: "当前时间目标值",
      value: 2600,
      color: "#ff667a",
    },
    {
      label: "双月目标值",
      value: 3700,
      color: "#58679d",
    },
  ],
});
const bulletData = [
  {
    b: "",
    a: [1700, 1000],
  },
];
</script>
```

:::

### 刻度子弹图

:::demo

```vue
<template>
  <div style="font-weight: 500">刻度上:</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
  <div style="font-weight: 500">刻度下:</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig2"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
const bulletConfig = ref({
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  legend: {
    show: true,
  },
  xAxis: {
    show: true,
  },

  measures: [
    {
      label: "实际进度",
      value: 1700,
      color: "#4a7cff",
    },
    {
      label: "已下单金额",
      value: 1000,
      color: "#ff8b1f",
    },
  ],
  targets: [
    {
      label: "当前时间目标值",
      value: 2600,
      color: "#ff667a",
    },
    {
      label: "双月目标值",
      value: 3700,
      color: "#58679d",
    },
  ],
});
const bulletConfig2 = ref({
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  legend: {
    show: true,
    legendPosition: "bottom",
  },
  xAxis: {
    show: true,
  },
  measures: [
    {
      label: "实际进度",
      value: 1700,
      color: "#4a7cff",
    },
    {
      label: "已下单金额",
      value: 1000,
      color: "#ff8b1f",
    },
  ],
  targets: [
    {
      label: "当前时间目标值",
      value: 2600,
      color: "#ff667a",
    },
    {
      label: "双月目标值",
      value: 3700,
      color: "#58679d",
    },
  ],
});
const bulletData = [
  {
    b: "",
    a: [1700, 1000],
  },
];
</script>
```

:::

### 多色范围子弹图

:::demo

```vue
<template>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);

const commonConfig = {
  measures: [
    {
      label: "实际进度",
      color: "#4a7cff",
    },
    {
      label: "已下单金额",
      color: "#ff8b1f",
    },
  ],
  targets: [
    {
      label: "当前时间目标值",
      value: 2600,
      color: "#ff667a",
    },
    {
      label: "双月目标值",
      value: 3700,
      color: "#58679d",
    },
  ],
  ranges: [
    {
      label: "熔断",
      value: "25%",
      color: "#ffebed",
    },
    {
      label: "减速",
      value: "25%",
      color: "#fff3e0",
    },
    {
      label: "不变",
      value: "25%",
      color: "#ebf0ff",
    },
    {
      label: "加速",
      value: "25%",
      color: "#f1fef2",
    },
  ],
};

const bulletConfig = ref({
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  legend: {
    show: true,
  },
  xAxis: {
    show: true,
  },
  ...commonConfig,
});

</script>
```

:::

### tooltip 触发类型

:::demo

```vue
<template>
  <div style="font-weight: 500">hover触发</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
  <div style="font-weight: 500">点击触发</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig2"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);
const commonConfig = {
  measures: [
    {
      label: "实际进度",
      color: "#4a7cff",
    },
    {
      label: "已下单金额",
      color: "#ff8b1f",
    },
  ],
  targets: [
    {
      label: "当前时间目标值",
      value: 2600,
      color: "#ff667a",
    },
    {
      label: "双月目标值",
      value: 3700,
      color: "#58679d",
    },
  ],
  ranges: [
    {
      label: "熔断",
      value: "25%",
      color: "#ffebed",
    },
    {
      label: "减速",
      value: "25%",
      color: "#fff3e0",
    },
    {
      label: "不变",
      value: "25%",
      color: "#ebf0ff",
    },
    {
      label: "加速",
      value: "25%",
      color: "#f1fef2",
    },
  ],
};
const bulletConfig = ref({
  legend: {
    show: true,
  },
  xAxis: {
    show: true,
  },
  ...commonConfig,
});
const bulletConfig2 = ref({
  tooltip: {
    triggerOn: "click",
  },
  legend: {
    show: true,
    legendPosition: "bottom",
  },
  xAxis: {
    show: true,
  },
  ...commonConfig,
});
const bulletData = [
  {
    b: "",
    a: [1700, 1000],
  },
];
</script>
```

:::

### tooltip 自定义

:::demo

```vue
<template>
  <div style="font-weight: 500">tooltip</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '150px' }"
  />
  <div style="font-weight: 500">tooltip footer自定义</div>
  <Bullet
    :chartData="bulletData"
    :chartConfig="bulletConfig2"
    :dimensions="['a']"
    :metrics="['b']"
    :style="{ height: '100px' }"
  />
</template>

<script setup>
import { ref } from "vue";
const isLoading = ref(true);

const commonConfig = {
  measures: [
    {
      label: "实际进度",
      color: "#4a7cff",
    },
    {
      label: "已下单金额",
      color: "#ff8b1f",
    },
  ],
  targets: [
    {
      label: "当前时间目标值",
      value: 2600,
      color: "#ff667a",
    },
    {
      label: "双月目标值",
      value: 3700,
      color: "#58679d",
    },
  ],
  ranges: [
    {
      label: "熔断",
      value: "25%",
      color: "#ffebed",
    },
    {
      label: "减速",
      value: "25%",
      color: "#fff3e0",
    },
    {
      label: "不变",
      value: "25%",
      color: "#ebf0ff",
    },
    {
      label: "加速",
      value: "25%",
      color: "#f1fef2",
    },
  ],
};
const bulletConfig = ref({
  legend: {
    show: true,
  },
  xAxis: {
    show: true,
  },
  tooltip: {
    formatter: () => {
      return 123;
    },
  },
  ...commonConfig,
});
const bulletConfig2 = ref({
  tooltip: {
    formatterFootSlot: () => {
      return "tooltip额外自定义";
    },
  },
  legend: {
    show: true,
    legendPosition: "bottom",
  },
  xAxis: {
    show: true,
  },
  ...commonConfig,
});
const bulletData = [
  {
    b: "",
    a: [1700, 1000],
  },
];
</script>
```

:::

## chartConfig API

interface ItemType { 
  label: string
  value?: string | number | boolean
  color?: string
}

| 属性     | 类型                       | 说明               | 默认值 |
| -------- | :------------------------- | :----------------- | :----- |
| targets  | ItemType\[\] \| number\[\] | 子弹图目标值       | -      |
| measures | ItemType\[\] \| number\[\] | 子弹图实际值       | -      |
| ranges   | ItemType\[\] \| number\[\] | 子弹图色条范围区间 | -      |
| targetsLegend  | boolean | 是否展示目标值的图例 | -      |
| measuresLegend | boolean | 是否展示实际值的图例 | -      |
| rangesLegend   | boolean | 是否展示范围区间的图例 | -      |

### tooltip API

| 属性              | 类型     | 说明                      | 默认值 |
| ----------------- | :------- | :------------------------ | :----- |
| formatterFootSlot | function | 自定义 tooltipfoot slot | -      |

其他同 echart 配置

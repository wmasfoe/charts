# Bullet 子弹图

### 基础子弹图 (单目标和多目标)

:::demo

```vue
<template>
  <Bullet
    height="200"
    :chartData="data"
    :chartConfig="chartConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :isLoading="isLoading"
  />
  <Bullet
    height="200"
    :chartData="data2"
    :chartConfig="chartConfig2"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

const chartConfig = ref({
  legendVisible: false,
  xAxis: {
    show: false,
  },
  measures: [
    {
      label: '实际值',
      color: '#4a7cff',
    },
  ],
  targets: [
    {
      label: '目标值',
      value: 90,
    },
  ],
  ranges: [{ value: 100, color: '#ffffff' }],
})

const data = ref([
  {
    b: '',
    a: 11,
  },
])

const chartConfig2 = ref({
  legendVisible: false,
  measures: [
    {
      label: '实际值',
    },
  ],
  targets: [
    {
      value: 70,
      color: '#ff667a',
    },
    {
      value: 90,
      color: '#58679d',
    },
  ],
  ranges: [{ value: 100, color: '#ffffff' }],
})

const data2 = [
  {
    b: '',
    a: 50,
  },
]
</script>
```

:::

### 基础子弹图显示具体数值

注：子弹图的 seriesConfig 仅支持配置对象，控制子弹图实际值的设置
:::demo

```vue
<template>
  <Bullet
    height="200"
    :chartData="data"
    :chartConfig="chartConfig"
    :dimensions="['a']"
    :metrics="['b']"
    :isLoading="isLoading"
  />
  <Bullet
    height="200"
    :chartData="data2"
    :chartConfig="chartConfig2"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

const chartConfig = ref({
  legendVisible: false,
  seriesConfig: {
    label: {
      show: true,
    },
  },
  xAxis: {
    show: false,
  },
  measures: [
    {
      label: '实际值',
      color: '#4a7cff',
    },
  ],
  targets: [
    {
      label: '目标值',
      value: 90,
    },
  ],
  ranges: [{ value: 100, color: '#ffffff' }],
})

const data = ref([
  {
    b: '',
    a: 11,
  },
])

const chartConfig2 = ref({
  legendVisible: false,
  seriesConfig: {
    label: {
      show: true,
    },
  },
  measures: [
    {
      label: '实际值',
    },
  ],
  targets: [
    {
      value: 70,
      color: '#ff667a',
    },
    {
      value: 90,
      color: '#58679d',
    },
  ],
  ranges: [{ value: 100, color: '#ffffff' }],
})

const data2 = [
  {
    b: '',
    a: 50,
  },
]
</script>
```

:::

### 分组子弹图 (单目标和多目标)

:::demo

```vue
<template>
  <Bullet
    height="200"
    :chartData="data"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
  <Bullet
    height="200"
    :chartData="data2"
    :chartConfig="chartConfig2"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

const chartConfig2 = ref({
  legendVisible: false,
  measures: [
    {
      label: '实际值1',
      color: '#4a7cff',
    },
    {
      label: '实际值2',
      color: '#ff8b1f',
    },
  ],
  targets: [
    {
      value: 50,
      color: '#ff667a',
    },
    {
      value: 90,
      color: '#58679d',
    },
  ],
  ranges: [{ value: 100, color: '#ffffff' }],
})

const data = [
  {
    b: '',
    a: [30, 40],
  },
]

const chartConfig = ref({
  legendVisible: false,
  measures: [
    {
      label: '实际值1',
      color: '#4a7cff',
    },
    {
      label: '实际值2',
      color: '#ff8b1f',
    },
  ],
  targets: [
    {
      label: '目标值',
      value: 90,
    },
  ],
  ranges: [{ value: 100, color: '#ffffff' }],
})

const data2 = [
  {
    b: '',
    a: [30, 40],
  },
]
</script>
```

:::

### 基础子弹图(带颜色范围区间)

:::demo

```vue
<template>
  <Bullet
    height="200"
    :chartData="data"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
  <Bullet
    height="200"
    :chartData="data2"
    :chartConfig="chartConfig2"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

const chartConfig = ref({
  legendVisible: false,
  measures: [
    {
      label: '实际值1',
      color: '#4a7cff',
    },
    {
      label: '实际值2',
      color: '#ff8b1f',
    },
  ],
  targets: [
    {
      label: '目标值',
      value: 90,
    },
  ],
  ranges: [
    { value: 25, color: '#ffebed' },
    { value: 25, color: '#fff3e0' },
    { value: 25, color: '#ebf0ff' },
    { value: 25, color: '#f1fef2' },
  ],
})

const data = [
  {
    a: [30, 40],
    b: '',
  },
]

const chartConfig2 = ref({
  legendVisible: false,
  measures: [
    {
      label: '实际值1',
      color: '#4a7cff',
    },
    {
      label: '实际值2',
      color: '#ff8b1f',
    },
  ],
  targets: [
    {
      value: 50,
      color: '#ff667a',
    },
    {
      value: 90,
      color: '#58679d',
    },
  ],
  ranges: [
    { value: 25, color: '#ffebed' },
    { value: 25, color: '#fff3e0' },
    { value: 25, color: '#ebf0ff' },
    { value: 25, color: '#f1fef2' },
  ],
})

const data2 = [
  {
    a: [30, 40],
    b: '',
  },
]
</script>
```

:::

### 基础子弹图(x 轴在上)

支持 echarts 原生配置项 xAxis.position 可以配置 轴的位置
:::demo

```vue
<template>
  <Bullet
    height="200"
    :chartData="data2"
    :chartConfig="chartConfig2"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

const chartConfig2 = ref({
  legendVisible: false,
  xAxis: {
    position: 'top',
  },
  measures: [
    {
      label: '实际值1',
      value: 30,
      color: '#4a7cff',
    },
    {
      label: '实际值2',
      value: 40,
      color: '#ff8b1f',
    },
  ],
  targets: [
    {
      value: 50,
      color: '#ff667a',
    },
    {
      value: 90,
      color: '#58679d',
    },
  ],
  ranges: [25, 25, 25, 25],
})

const data2 = [
  {
    b: '',
    a: [30, 40],
  },
]
</script>
```

:::

### 基础子弹图(显示标题)

:::demo

```vue
<template>
  <Bullet
    height="200"
    :chartData="data2"
    :chartConfig="chartConfig2"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

const chartConfig2 = ref({
  legendVisible: false,
  measures: [
    {
      label: '实际值1',
      color: '#4a7cff',
    },
    {
      label: '实际值2',
      color: '#ff8b1f',
    },
  ],
  targets: [
    {
      value: 50,
      color: '#ff667a',
    },
    {
      value: 90,
      color: '#58679d',
    },
  ],
  ranges: [25, 25, 25, 25],
})

const data2 = [
  {
    a: [30, 40],
    b: '标题',
  },
]
</script>
```

:::

### 复杂子弹图

如果需要设置具体的颜色（比如区间颜色、实际值线的颜色等,则自己配置）, 具体请看 demo 哦
:::demo

```vue
<template>
  <Bullet
    height="200"
    :chartData="data2"
    :chartConfig="chartConfig2"
    :isLoading="isLoading"
    :dimensions="['a']"
    :metrics="['b']"
  />
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

const chartConfig2 = ref({
  measures: [
    {
      label: '实际进度',
      color: '#4a7cff',
    },
    {
      label: '已下单金额',
      color: '#ff8b1f',
    },
  ],
  targets: [
    {
      label: '当前时间目标值',
      value: 260,
      color: '#ff667a',
    },
    {
      label: '双月目标值',
      value: 370,
      color: '#58679d',
    },
  ],
  ranges: [
    {
      label: '熔断',
      value: 100,
      color: '#ffebed',
    },
    {
      label: '减速',
      value: 100,
      color: '#fff3e0',
    },
    {
      label: '不变',
      value: 100,
      color: '#ebf0ff',
    },
    {
      label: '加速',
      value: 100,
      color: '#f1fef2',
    },
  ],
})

const data2 = [
  {
    b: '标题',
    a: [170, 100],
  },
  {
    b: '标题',
    a: [70, 10],
  },
  {
    b: '标题',
    a: [70, 100],
  },
]
</script>
```

:::

## chartConfig API

| 属性           | 类型                       | 说明                   | 默认值 |
| -------------- | :------------------------- | :--------------------- | :----- |
| targets        | ItemType\[\] \| number\[\] | 子弹图目标值           | -      |
| measures       | ItemType\[\] \| number\[\] | 子弹图实际值           | -      |
| ranges         | ItemType\[\] \| number\[\] | 子弹图色条范围区间     | -      |
| rangesLegend   | boolean                    | 是否展示范围区间的图例 | -      |
| measuresLegend | boolean                    | 是否展示实际值的图例   | -      |
| targetsLegend  | boolean                    | 是否展示目标值的图例   | -      |

## ItemType API

| 属性  | 类型   | 说明                       | 默认值 |
| ----- | :----- | :------------------------- | :----- |
| label | string | 需要 legend,则需要配置     | ''     |
| value | number | 区间的数值、目标值、实际值 | -      |
| color | string | 需要设置颜色则需要配置     | -      |

ranges、measures、targets 可以直接配置 数值的数组，如[90]、[100,100]

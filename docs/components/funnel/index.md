# Funnel 漏斗图

### 场景漏斗图

rateGap 是层层之间的间距
:::demo

```vue
<template>
  <Funnel
    :chartData="FunnelData"
    :chartConfig="funnelConfig"
    :width="700"
    :height="height"
  />
</template>

<script setup>
import { ref } from 'vue'

const funnelConfig = ref({
  barHeight: 30,
})
const height = ref(500)
const FunnelData = ref([
  {
    name: '保险',
    value: 10000,
  },
  {
    name: '保险2',
    value: 8500,
  },
  {
    name: '主页私信点击123456789',
    value: 7000,
  },
  {
    name: '保险4',
    value: 5500,
  },
  {
    name: '保险5',
    value: 4000,
  },
  {
    name: '保险51',
    value: 500,
  },
])

setTimeout(() => {
  FunnelData.value = [
    {
      name: '保险1',
      value: 1000,
    },
    {
      name: '保险2',
      value: 850,
    },
    {
      name: '保险3',
      value: 700,
    },
  ]
}, 2000)
</script>
```

:::

### 自定义背景色漏斗图

:::demo

```vue
<template>
  <Funnel
    :chartData="FunnelData"
    :chartConfig="funnelConfig"
    :width="700"
    :height="height"
  />
</template>

<script setup>
import { ref } from 'vue'

const funnelConfig = ref({
  barHeight: 30,
  barClass: 'abc',
  barBackground: 'pink',
  fontColor: 'yellow',
  fontClass: 'bbb',
})
const height = ref(500)
const FunnelData = ref([
  {
    name: '保险',
    value: 10000,
  },
  {
    name: '保险2',
    value: 8500,
  },
  {
    name: '主页私信点击123456789',
    value: 7000,
  },
  {
    name: '保险4',
    value: 5500,
  },
  {
    name: '保险5',
    value: 4000,
  },
  {
    name: '保险51',
    value: 500,
  },
])

setTimeout(() => {
  FunnelData.value = [
    {
      name: '保险1',
      value: 1000,
    },
    {
      name: '保险2',
      value: 850,
    },
    {
      name: '保险3',
      value: 700,
    },
  ]
}, 2000)
</script>
```

:::

### 反转漏斗图

配置 isReverse 为 true 则是反转的漏斗图
配置 lineWidth 代表虚线长度
配置 showLine 代表是否展示虚线
:::demo

```vue
<template>
  <Funnel
    :chartData="FunnelData"
    :chartConfig="funnelConfig"
    :width="700"
    :height="height"
  />
</template>

<script setup>
import { ref } from 'vue'

const funnelConfig = ref({
  barHeight: 40,
  rateGap: 30,
  isReverse: true,
  showLine: true,
  lineWidth: 120,
})
const height = ref(400)
const FunnelData = ref([
  {
    name: '保险',
    value: 10000,
  },
  {
    name: '保险2',
    value: 8500,
  },
  {
    name: '主页私信点击123456789',
    value: 7000,
  },
])
</script>
```

:::

### 漏斗图插槽

插槽 rate

:::demo

```vue
<template>
  <Funnel
    :chartData="FunnelData"
    :chartConfig="funnelConfig"
    :width="700"
    :height="height"
  >
    <template #rate="{ $index, length }">
      <span
        v-if="$index !== length - 1"
        style="margin: 10px; color: pink; font-size: 12px"
      >
        rate {{ $index }}
      </span>
    </template>
  </Funnel>
</template>

<script setup>
import { ref } from 'vue'

const funnelConfig = ref({
  barHeight: 40,
  rateGap: 30,
  isReverse: true,
  showLine: true,
  lineWidth: 120,
})
const height = ref(400)
const FunnelData = ref([
  {
    name: '保险',
    value: 10000,
  },
  {
    name: '保险2',
    value: 8500,
  },
  {
    name: '主页私信点击123456789',
    value: 7000,
  },
])
</script>
```

:::

### 漏斗图插槽

:::demo

```vue
<template>
  <Funnel
    :chartData="FunnelData"
    :chartConfig="funnelConfig"
    :width="700"
    :height="height"
  >
    <template #name="{ $index }">
      <span> 我是名字的slot </span>
    </template>
    <template #value="{ $index }">
      <span> 我是value的slot </span>
    </template>
    <template #allRate="{ data }">
      <span> 整体rate</span>
    </template>
  </Funnel>
</template>

<script setup>
import { ref } from 'vue'

const funnelConfig = ref({
  barHeight: 30,
})
const height = ref(500)
const FunnelData = ref([
  {
    name: '保险',
    value: 10000,
  },
  {
    name: '保险2',
    value: 8500,
  },
  {
    name: '主页私信点击123456789',
    value: 7000,
  },
  {
    name: '保险4',
    value: 5500,
  },
  {
    name: '保险5',
    value: 4000,
  },
  {
    name: '保险51',
    value: 2000,
  },
])
</script>
```

:::

## Funnel API

| 属性        | 类型                              | 说明     | 默认值 |
| ----------- | :-------------------------------- | :------- | :----- |
| chartData   | { name: String; value: Number }[] | 图表数据 | []     |
| chartConfig | Object                            | 图表配置 | {}     |
| width       | Number                            | 宽度     | auto   |
| height      | Number                            | 高度     | 400    |

## chartConfig API

| 属性          | 类型    | 说明                                              | 默认值             |
| ------------- | :------ | :------------------------------------------------ | :----------------- |
| barHeight     | Number  | 自定义设置漏斗图柱子宽度，范围：24-52，单位：px   | 默认不传自适应布局 |
| type          | String  | 比较类型：整体进行比较（all）或者逐级比较（level) | 'level'            |
| digit         | Number  | 保留几位小数                                      | 1                  |
| isReverse     | Boolean | 是否镜像翻转                                      | false              |
| showLine      | Boolean | 是否展示转化率虚线                                | false              |
| lineWidth     | Number  | 虚线长度                                          | auto               |
| rateGap       | Number  | 转化率上下的间距                                  | ''                 |
| fontClass     | String  | 漏斗图柱上字的 class 名                           | ''                 |
| fontColor     | String  | 漏斗图柱上字的颜色                                | ''                 |
| barBackground | String  | 漏斗图柱的背景色                                  | ''                 |
| barClass      | String  | 漏斗图柱的 class 名                               | ''                 |

## 插槽

| 属性 | 说明        | 参数          |
| ---- | :---------- | :------------ |
| rate | 转化率 插槽 | $index,length |

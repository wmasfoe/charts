# Atlas 图谱图

### 标准图谱图

content 是中间圆的名称

levelList：层级数据 展示在图谱图的描述性内容，不配置的话只展示 图谱

:::demo

```vue
<template>
  <Atlas
    :chartData="chartData"
    :metrics="['rate', 'tgi']"
    seriesField="dim"
    :dimensions="['preferenceType']"
    :chartConfig="bubbleChartConfig"
    :width="600"
    levelPosition="bottom"
    :height="400"
    :levelList="levelList"
    content="标准图谱图"
  ></Atlas>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

const levelList = [
  {
    levelRange: '100%',
    label: '泛人群',
    value: 'top60%-100%',
    index: 0,
  },
  {
    levelRange: '80%',
    label: '兴趣人群',
    value: 'top20%-60%',
    index: 1,
  },
  {
    levelRange: '70%',
    label: '核心人群',
    value: 'top20%',
    index: 2,
  },
]

const chartData = ref<any[]>([
  {
    dim: '雅诗兰黛',
    preferenceType: '美食',
    rate: '-54.33',
    tgi: '82.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '生活记录',
    rate: '53.12',
    tgi: '1.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '时尚',
    rate: '78.93',
    tgi: '76.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '家居家装',
    rate: '-64.44',
    tgi: '-20.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '旅游',
    rate: '-12.49',
    tgi: '95.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '潮流',
    rate: '-32.47',
    tgi: '32.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '情感',
    rate: '-41.40',
    tgi: '-14.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '科技数码',
    rate: '-39.64',
    tgi: '91.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '教育',
    rate: '38.94',
    tgi: '38.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '影视',
    rate: '18.62',
    tgi: '-48.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '职场',
    rate: '37.61',
    tgi: '83.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '汽车',
    rate: '97.37',
    tgi: '-20.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '兴趣爱好',
    rate: '-25.75',
    tgi: '73.00',
  },
])

const bubbleChartConfig = ref<any>({
  symbolZoomConfig: {
    symbolMin: 14,
    symbolZoomMax: 1,
  },
  dragZoom: {
    show: false,
  },
  legend: {
    show: false,
  },
  labelMap: {
    rate: '占比',
    tgi: 'TGI',
  },
  seriesConfig: {
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 1,
    },
    labelLayout: {
      hideOverlap: false,
    },
  },
})
</script>
```

:::

### 自定义样式图谱图

levelPosition ：描述内容的位置，如 demo 配置了 center
其他配置 则和气泡图一致

https://delight-charts.devops.justdev.com/components/bubble/index.html

:::demo

```vue
<template>
  <Atlas
    :chartData="chartData"
    :metrics="['rate', 'tgi']"
    seriesField="dim"
    :dimensions="['preferenceType']"
    :chartConfig="bubbleChartConfig"
    :width="600"
    :height="400"
    levelPosition="center"
    :showRelevance="true"
    :levelList="levelList"
    content="自定义样式图谱图"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

const levelList = [
  {
    levelRange: '100%',
    index: 1,
  },
  {
    levelRange: '70%',
    index: 2,
  },
  {
    levelRange: '60%',
    index: 3,
  },
]

const chartData = ref<any[]>([
  {
    dim: '雅诗兰黛',
    preferenceType: '美食',
    rate: '-54.33',
    tgi: '82.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '生活记录',
    rate: '53.12',
    tgi: '-31.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '时尚',
    rate: '78.93',
    tgi: '76.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '家居家装',
    rate: '-64.44',
    tgi: '-20.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '旅游',
    rate: '-12.49',
    tgi: '-75.00',
  },
  {
    dim: '雅诗兰黛',
    preferenceType: '潮流',
    rate: '-32.47',
    tgi: '32.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '情感',
    rate: '-41.40',
    tgi: '-14.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '科技数码',
    rate: '-39.64',
    tgi: '-91.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '教育',
    rate: '38.94',
    tgi: '38.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '影视',
    rate: '18.62',
    tgi: '-48.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '职场',
    rate: '37.61',
    tgi: '83.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '汽车',
    rate: '97.37',
    tgi: '-20.00',
  },
  {
    dim: '兰蔻',
    color: 'rgba(255, 139, 31, 1)',
    preferenceType: '兴趣爱好',
    rate: '-25.75',
    tgi: '73.00',
  },
])

const bubbleChartConfig = ref<any>({
  symbolZoomConfig: {
    symbolMin: 14,
    symbolZoomMax: 1,
  },
  dragZoom: {
    show: false,
  },
  legend: {
    show: false,
  },
  labelMap: {
    rate: '占比',
    tgi: 'TGI',
  },
  seriesConfig: {
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 1,
    },
    labelLayout: {
      hideOverlap: false,
    },
  },
})
</script>
<style>
.atlas-title {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10px;
}
</style>
```

:::

## Atlas API

| 属性             | 类型        | 说明                                              | 默认值 |
| ---------------- | :---------- | :------------------------------------------------ | :----- |
| width            | Number      | 图表的宽度                                        | auto   |
| levelCenterClass | String      | 图谱图中心的 ClassName，用于自定义样式            | -      |
| levelTitleClass  | String      | 图谱图 title 的 ClassName，用于自定义样式         | -      |
| levelList        | LevelItem[] | 层级数据                                          | -      |
| levelPosition    | string      | 图谱图的 title 类型，目前支持'center' 和 'bottom' | -      |
| showRelevance    | boolean     | 是否展示"相关性"指标                              | false  |

其他 API 和 气泡图一致，请看通用 API

```
// levelList默认值
[
  {
    levelRange: "100%",
    bg: "",
    label:'最外层',
    value:'top60-100%',
    index: 1,
  },
  {
    levelRange: "70%",
    bg: "",
    label:'第二层',
    value:'top20%-60%',
    index: 2,
  },
  {
    levelRange: "40%",
    bg: "",
    label:'中心层',
    value:'top20%',
    index: 3,
  },
]
```

## LevelItem API

| 属性       | 类型   | 说明                                       | 默认值 |
| ---------- | :----- | :----------------------------------------- | :----- |
| levelRange | string | 层级范围（vw calc px % em 等均可）         | -      |
| bg         | string | 层级背景色                                 | -      |
| label      | string | 此层级的 label 值                          | -      |
| value      | string | 此层级的 value 值                          | -      |
| index      | number | 层级，1 表示最外层，2 表示第二层，依此类推 | -      |

## slot API

| 属性        | 说明                     | 默认值 |
| ----------- | :----------------------- | :----- |
| level-title | 定位到图谱图的 tips 文案 | -      |

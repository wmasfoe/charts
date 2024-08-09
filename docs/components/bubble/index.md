# Bubble 气泡散点图

### 基础气泡图
metrics的第三项指标表示气泡大小

通过 `symbolZoomConfig` 配置项，可以配置气泡大小。

内部的计算逻辑是：按照 `chartData` 中最大的气泡作为基准值，其他气泡按照基准值进行百分比缩小，可以保证气泡不会过大。
需要手动过滤一遍 `chartData` 并把最大值传入到 `chartConfig` 中。

:::demo

```vue
<template>
   <Bubble
    :chartData="chartData"
    :isLoading="isLoading"
    :metrics="['rate', 'tgi','brandNum']"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
const chartData = ref([
  {
    preferenceType: "美食",
    rate: "54.33",
    tgi: "22.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "生活记录",
    rate: "98",
    tgi: "10",
    brandNum: 20,
  },
  {
   
    preferenceType: "旅游",
    rate: "42.49",
    tgi: "50",
    brandNum: 1000,  
},
  {
   
    preferenceType: "潮流",
    rate: "42.47",
    tgi: "100.00",
    brandNum: 10,
  },
  {
   
    preferenceType: "情感",
    rate: "41.40",
    tgi: "20",
    brandNum: 300,
  },
  {
   
    preferenceType: "科技数码",
    rate: "90",
    tgi: "91.00",
    brandNum: 500,
  },
  {
   
    preferenceType: "教育",
    rate: "70",
    tgi: "58.00",
    brandNum: 80,
  },
  {
   
    preferenceType: "影视",
    rate: "10.62",
    tgi: "78.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "职场",
    rate: "5.61",
    tgi: "83.00",
    brandNum: 480,
  },
  {
   
    preferenceType: "汽车",
    rate: "37.37",
    tgi: "110.00",
    brandNum: 810,
  },
  {
   
    preferenceType: "兴趣爱好",
    rate: "75.75",
    tgi: "73.00",
    brandNum: 330,
  },
  {
   
    preferenceType: "宠物",
    rate: "80.22",
    tgi: "83.00",
    brandNum: 600,
  },
  {
   
    preferenceType: "摄影",
    rate: "40.15",
    tgi: "75.00",
    brandNum: 420,
  },
  {
   
    preferenceType: "时尚",
    rate: "2.33",
    tgi: "101.00",
    brandNum: 40,
  },
  {
   
    preferenceType: "健身减肥",
    rate: "26.67",
    tgi: "74.00",
    brandNum: 400,
  },
  {
   
    preferenceType: "人文",
    rate: "6.74",
    tgi: "66.00",
    brandNum: 210,
  },
  {
   
    preferenceType: "母婴",
    rate: "24.59",
    tgi: "52.00",
    brandNum: 803,
  },
])
// 计算 chartData 中 brandNum 最大值，用来设置气泡图大小
const maxValue = computed(() => {
  let max: any = 0;
  for (let index = 0; index < chartData.value.length; index++) {
      if(chartData.value[index].brandNum > max) {
        max = chartData.value[index].brandNum
      }
  }
  return max;
})


// loading
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false;
}, 2000);
const bubbleChartConfig = computed(() =>({
  // 设置气泡大小
  symbolZoomConfig: {
    symbolZoomMax: maxValue.value,
  },
  // 自定义缩放按钮
  dragZoom: {
    show: false,
  },
  legend: {
    show: false,
  },
  tooltipVisible: true,
  titleVisible: true,
  xAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  yAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
}));
</script>
```

:::

### 基础散点图
散点图的metrics是个长度为2的数组，没有表示气泡大小的指标

:::demo

```vue
<template>
  <Bubble
    :chartData="chartData"
    :isLoading="isLoading"
    :metrics="['rate', 'tgi']"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);

const chartData = ref([
  {
    preferenceType: "美食",
    rate: "54.33",
    tgi: "22.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "生活记录",
    rate: "98",
    tgi: "10",
    brandNum: 20,
  },
  {
   
    preferenceType: "旅游",
    rate: "42.49",
    tgi: "50",
    brandNum: 1000,  
  },
  {
    preferenceType: "潮流",
    rate: "42.47",
    tgi: "105.00",
    brandNum: 10,
  },
  {
   
    preferenceType: "情感",
    rate: "41.40",
    tgi: "20",
    brandNum: 300,
  },
  {
   
    preferenceType: "科技数码",
    rate: "90",
    tgi: "91.00",
    brandNum: 500,
  },
  {
   
    preferenceType: "教育",
    rate: "70",
    tgi: "58.00",
    brandNum: 80,
  },
  {
   
    preferenceType: "影视",
    rate: "10.62",
    tgi: "78.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "职场",
    rate: "5.61",
    tgi: "83.00",
    brandNum: 480,
  },
  {
   
    preferenceType: "汽车",
    rate: "37.37",
    tgi: "110.00",
    brandNum: 810,
  },
  {
   
    preferenceType: "兴趣爱好",
    rate: "75.75",
    tgi: "73.00",
    brandNum: 330,
  },
  {
   
    preferenceType: "宠物",
    rate: "80.22",
    tgi: "83.00",
    brandNum: 600,
  },
  {
   
    preferenceType: "摄影",
    rate: "40.15",
    tgi: "75.00",
    brandNum: 420,
  },
  {
   
    preferenceType: "时尚",
    rate: "2.33",
    tgi: "101.00",
    brandNum: 40,
  },
  {
   
    preferenceType: "健身减肥",
    rate: "26.67",
    tgi: "74.00",
    brandNum: 400,
  },
  {
   
    preferenceType: "人文",
    rate: "6.74",
    tgi: "66.00",
    brandNum: 210,
  },
  {
   
    preferenceType: "母婴",
    rate: "24.59",
    tgi: "52.00",
    brandNum: 803,
  },
])

const bubbleChartConfig = ref<any>({
  // 自定义缩放按钮
  dragZoom: {
    show: false,
  },
  labelMap: {
    rate: '占比',
    tgi: 'TGI',
  },
  legend: {
    show: false,
  },
  tooltipVisible: true,
  titleVisible: true,
  xAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  yAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
});
</script>
```

:::

### 散点图 label 伪元素
设置label来自定义气泡图label

`label.before`、`label.after` 支持传入的属性：[series-scatter.label.rich](https://echarts.apache.org/zh/option.html#series-scatter.label.rich.%3Cstyle_name%3E)。除此之外，还可以通过 `show: (params) => boolean` 属性控制是否展示，见下面🌰。

:::demo

```vue
<template>
  <Bubble
    :chartData="chartData"
    :isLoading="isLoading"
    :metrics="['rate', 'tgi']"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);

const chartData = ref([
  {
    preferenceType: "美食",
    rate: "54.33",
    tgi: "22.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "生活记录",
    rate: "98",
    tgi: "10",
    brandNum: 20,
  },
  {
   
    preferenceType: "旅游",
    rate: "42.49",
    tgi: "50",
    brandNum: 1000,  
  },
  {
    preferenceType: "潮流",
    rate: "42.47",
    tgi: "105.00",
    brandNum: 10,
  },
  {
   
    preferenceType: "情感",
    rate: "41.40",
    tgi: "20",
    brandNum: 300,
  },
  {
   
    preferenceType: "科技数码",
    rate: "90",
    tgi: "91.00",
    brandNum: 500,
  },
  {
   
    preferenceType: "教育",
    rate: "70",
    tgi: "58.00",
    brandNum: 80,
  },
  {
   
    preferenceType: "影视",
    rate: "10.62",
    tgi: "78.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "职场",
    rate: "5.61",
    tgi: "83.00",
    brandNum: 480,
  },
  {
   
    preferenceType: "汽车",
    rate: "37.37",
    tgi: "110.00",
    brandNum: 810,
  },
  {
   
    preferenceType: "兴趣爱好",
    rate: "75.75",
    tgi: "73.00",
    brandNum: 330,
  },
  {
   
    preferenceType: "宠物",
    rate: "80.22",
    tgi: "83.00",
    brandNum: 600,
  },
  {
   
    preferenceType: "摄影",
    rate: "40.15",
    tgi: "75.00",
    brandNum: 420,
  },
  {
   
    preferenceType: "时尚",
    rate: "2.33",
    tgi: "101.00",
    brandNum: 40,
  },
  {
   
    preferenceType: "健身减肥",
    rate: "26.67",
    tgi: "74.00",
    brandNum: 400,
  },
  {
   
    preferenceType: "人文",
    rate: "6.74",
    tgi: "66.00",
    brandNum: 210,
  },
  {
   
    preferenceType: "母婴",
    rate: "24.59",
    tgi: "52.00",
    brandNum: 803,
  },
])

const bubbleChartConfig = ref<any>({
  // 自定义缩放按钮
  dragZoom: {
    show: false,
  },
  labelMap: {
    rate: '占比',
    tgi: 'TGI',
  },
  legend: {
    show: false,
  },
  label: {
    before: {
      // 可以控制是否展示
      show(param) {
        return ['教育', '兴趣爱好', '旅游'].includes(param.name)
      },
      // 支持图片
      backgroundColor: {
        image:  '//interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      }
    },
    after: {
      // 文本内容
      text: 'C',
      show(param) {
        return ['教育', '兴趣爱好', '旅游'].includes(param.name)
      },
      backgroundColor: 'green'
    },
  },
  tooltipVisible: true,
  titleVisible: true,
  xAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  yAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
});
</script>
```

:::

### 配置均值线

配置markLineConfig来定义气泡图均值线，更多属性详细见https://echarts.apache.org/zh/option.html#series-line.markLine

:::demo

```vue
<template>
   <Bubble
    :chartData="chartData"
    :isLoading="isLoading"
    :metrics="['rate', 'tgi', 'brandNum']"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
// 均值线 配置
const markLineConfig = {
    markLineValueX: 14,
    markLineValueY: 100,
    titleX: 'x title',
    titleY: 'y title',
    startX: '7%',
    endX: '85%',
    startY: '13%',
    endY: '90%',
};
const chartData = ref([
  {
    preferenceType: "美食",
    rate: "54.33",
    tgi: "22.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "生活记录",
    rate: "98",
    tgi: "10",
    brandNum: 20,
  },
  {
   
    preferenceType: "旅游",
    rate: "42.49",
    tgi: "50",
    brandNum: 1000,  
},
  {
   
    preferenceType: "潮流",
    rate: "42.47",
    tgi: "100.00",
    brandNum: 10,
  },
  {
   
    preferenceType: "情感",
    rate: "41.40",
    tgi: "20",
    brandNum: 300,
  },
  {
   
    preferenceType: "科技数码",
    rate: "90",
    tgi: "91.00",
    brandNum: 500,
  },
  {
   
    preferenceType: "教育",
    rate: "70",
    tgi: "58.00",
    brandNum: 80,
  },
  {
   
    preferenceType: "影视",
    rate: "10.62",
    tgi: "78.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "职场",
    rate: "5.61",
    tgi: "83.00",
    brandNum: 480,
  },
  {
   
    preferenceType: "汽车",
    rate: "37.37",
    tgi: "110.00",
    brandNum: 810,
  },
  {
   
    preferenceType: "兴趣爱好",
    rate: "75.75",
    tgi: "73.00",
    brandNum: 330,
  },
  {
   
    preferenceType: "宠物",
    rate: "80.22",
    tgi: "83.00",
    brandNum: 600,
  },
  {
   
    preferenceType: "摄影",
    rate: "40.15",
    tgi: "75.00",
    brandNum: 420,
  },
  {
   
    preferenceType: "时尚",
    rate: "2.33",
    tgi: "101.00",
    brandNum: 40,
  },
  {
   
    preferenceType: "健身减肥",
    rate: "26.67",
    tgi: "74.00",
    brandNum: 400,
  },
  {
   
    preferenceType: "人文",
    rate: "6.74",
    tgi: "66.00",
    brandNum: 210,
  },
  {
   
    preferenceType: "母婴",
    rate: "24.59",
    tgi: "52.00",
    brandNum: 803,
  },
])

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);


// 计算 chartData 中 tgi 最大值，用来设置气泡图大小
const maxValue = computed(() => {
  let max: any = 0;
  for (let index = 0; index < chartData.value.length; index++) {
      if(chartData.value[index].brandNum > max) {
        max = chartData.value[index].brandNum
      }
  }
  return max;
})

const bubbleChartConfig = computed(()=>({
  // 配置 benchmark
  markLineConfig: markLineConfig,
  // 自定义缩放按钮
  dragZoom: {
    show: false,
  },
  legend: {
    show: false,
  },
  tooltipVisible: true,
  titleVisible: true,
  xAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  yAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  symbolZoomConfig: {
    symbolZoomMax: maxValue.value || 10,
  },
}));
</script>
```

:::

### 配置四象限标签

:::demo

```vue

<template>
   <Bubble
    :chartData="chartData"
    :isLoading="isLoading"
    :metrics="['rate', 'tgi', 'brandNum']"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
    :quadrant-list="quadrantList"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
// 四象限 对应 label：左上 - 右上 - 右下 - 左下
const quadrantList = [
  {
    text: '高需求高供给',
  },
  {
    text: '高需求高供给',
    tooltip: '高需求高供给，气泡越大市场机会越小',
  },
  {

    text: '高需求高供给',
    tooltip: '高需求高供给，气泡越大市场机会越小',
    color: '#b5552b'
  },
  {
    text: '高需求高供给',
    tooltip: '高需求高供给，气泡越大市场机会越小',
    backgroundColor: 'lightgray'
  },
];
const chartData = ref([
  {
    preferenceType: "美食",
    rate: "54.33",
    tgi: "22.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "生活记录",
    rate: "98",
    tgi: "10",
    brandNum: 20,
  },
  {
   
    preferenceType: "旅游",
    rate: "42.49",
    tgi: "50",
    brandNum: 1000,  
},
  {
   
    preferenceType: "潮流",
    rate: "42.47",
    tgi: "100.00",
    brandNum: 10,
  },
  {
   
    preferenceType: "情感",
    rate: "41.40",
    tgi: "20",
    brandNum: 300,
  },
  {
   
    preferenceType: "科技数码",
    rate: "90",
    tgi: "91.00",
    brandNum: 500,
  },
  {
   
    preferenceType: "教育",
    rate: "70",
    tgi: "58.00",
    brandNum: 80,
  },
  {
   
    preferenceType: "影视",
    rate: "10.62",
    tgi: "78.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "职场",
    rate: "5.61",
    tgi: "83.00",
    brandNum: 480,
  },
  {
   
    preferenceType: "汽车",
    rate: "37.37",
    tgi: "110.00",
    brandNum: 810,
  },
  {
   
    preferenceType: "兴趣爱好",
    rate: "75.75",
    tgi: "73.00",
    brandNum: 330,
  },
  {
   
    preferenceType: "宠物",
    rate: "80.22",
    tgi: "83.00",
    brandNum: 600,
  },
  {
   
    preferenceType: "摄影",
    rate: "40.15",
    tgi: "75.00",
    brandNum: 420,
  },
  {
   
    preferenceType: "时尚",
    rate: "2.33",
    tgi: "101.00",
    brandNum: 40,
  },
  {
   
    preferenceType: "健身减肥",
    rate: "26.67",
    tgi: "74.00",
    brandNum: 400,
  },
  {
   
    preferenceType: "人文",
    rate: "6.74",
    tgi: "66.00",
    brandNum: 210,
  },
  {
   
    preferenceType: "母婴",
    rate: "24.59",
    tgi: "52.00",
    brandNum: 803,
  },
])

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);


// 计算 chartData 中 tgi 最大值，用来设置气泡图大小
const maxValue = computed(() => {
  let max: any = 0;
  for (let index = 0; index < chartData.value.length; index++) {
      if(chartData.value[index].brandNum > max) {
        max = chartData.value[index].brandNum
      }
  }
  return max;
})

const bubbleChartConfig = computed(()=>({
  // 自定义缩放按钮
  dragZoom: {
    show: false,
  },
  grid: {
    "show": true,
    "left": "10%",
    "right": "15%",
    "top": "15%",
    "bottom": "20%"
  },
  legend: {
    show: false,
  },
  tooltipVisible: true,
  titleVisible: true,
  xAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  yAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  symbolZoomConfig: {
    symbolZoomMax: maxValue.value || 10,
  },
}));
</script>

<style scoped></style>
```

:::
### 气泡图分组序列seriesField

:::demo

```vue

<template>
  <Bubble
    :height="600"
    :chartData="chartData"
    :metrics="['rate', 'tgi']"
    seriesField="dim"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const chartData = ref([
  {
    dim: '雅诗兰黛',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "美食",
    "rate": "54.33",
    "tgi": "82.00",
    "preferenceTypeCode": "5ab094be481d26b8ef9045f1"
  },
  {
    dim: '雅诗兰黛',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "生活记录",
    "rate": "53.12",
    "tgi": "91.00",
    "preferenceTypeCode": "5ab094be481d26b8ef90460a"
  },
  {
    dim: '雅诗兰黛',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "时尚",
    "rate": "78.93",
    "tgi": "76.00",
    "preferenceTypeCode": "5ab094be481d26b8ef9045ee"
  },
  {
    dim: '雅诗兰黛',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "家居家装",
    "rate": "64.44",
    "tgi": "80.00",
    "preferenceTypeCode": "5ab094be481d26b8ef9045ed"
  },
  {
    dim: '雅诗兰黛',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "旅游",
    "rate": "12.49",
    "tgi": "95.00",
    "preferenceTypeCode": "5ab094be481d26b8ef9045f0"
  },
  {
    dim: '雅诗兰黛',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "潮流",
    "rate": "32.47",
    "tgi": "105.00",
    "preferenceTypeCode": "c00000000000000000000563"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "情感",
    "rate": "41.40",
    "tgi": "84.00",
    "preferenceTypeCode": "5ab094be481d26b8ef9045fe"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "科技数码",
    "rate": "39.64",
    "tgi": "91.00",
    "preferenceTypeCode": "5ab094be481d26b8ef904606"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "教育",
    "rate": "38.94",
    "tgi": "78.00",
    "preferenceTypeCode": "5ab094be481d26b8ef904608"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "影视",
    "rate": "18.62",
    "tgi": "78.00",
    "preferenceTypeCode": "5ab094be481d26b8ef9045fc"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "职场",
    "rate": "37.61",
    "tgi": "83.00",
    "preferenceTypeCode": "c00000000000000000000722"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "体育运动",
    "rate": "27.51",
    "tgi": "13.00",
    "preferenceTypeCode": "5bceca4a126ef99bc6213c18"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "汽车",
    "rate": "97.37",
    "tgi": "20.00",
    "preferenceTypeCode": "5ab094be481d26b8ef904601"
  },
  {
    dim: '兰蔻',
    "rollUpOption": "firstTaxonomyTerm=-1",
    "preferenceType": "兴趣爱好",
    "rate": "25.75",
    "tgi": "73.00",
    "preferenceTypeCode": "c00000000000000000000371"
  },
])

// 当前适配的 data

// 计算 chartData 中 z(第三项) 最大值，用来设置气泡图大小
const maxValue = computed(() => {
  let max: any = 0;
  for (const item of chartData.value) {
    const value = Number(item.value)
    if(value > max) {
      max = value
    }
  }
  return max;
})

const bubbleChartConfig = ref<any>({
  dragZoom: {
    show: false,
  },
  legend: {
    show: true,
    top: 0,
  },
  labelMap: {
    rate: '占比',
    tgi: 'TGI',
  },
  xAxis: {
    type: 'value',
    nameLocation: 'middle',
    valueType: 'percent',
    digit: 2, // 保留几位小数，
    unit: true,
    name: '占比',
    nameTextStyle: {
      padding: [10, 0, 0, 0], // 四个数字分别为上右下左与原位置距离
    },
    splitLine: {
      show: false,
    },
    textStyle: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontFamily: 'PingFang SC',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '12px',
    },
  },
  yAxis: {
    type: 'value',
    name: 'TGI',
    digit: 0,
    unit: true,
    splitLine: {
      show: false,
    },
  },
});
</script>

<style scoped></style>
```

:::

### 点击高亮

配置 `canClick: true` 使图表可以下钻，然后通过 `select` 配置高亮的样式，除了 [echarts 支持的四个属性之外](https://echarts.apache.org/zh/option.html#series-scatter.select)，我们还支持：

- symbol：配置选中时的图片见 [data.symbol](https://echarts.apache.org/zh/option.html#series-scatter.data.symbol)
- symbolSize：配置选中时的图片大小 `Function(val, { zoom, max, min }) | number`

:::demo

```vue
<template>
  <Bubble
    :chartData="chartData"
    :metrics="['rate', 'tgi', 'brandNum']"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const metricsMaxVal = ref(1000)
const bubbleChartConfig = ref<any>({
  // 支持点击下钻
  canClick: true,
  select: {
    // 支持 svg dataURI img
    symbol: 'image://data:application/octet-stream;base64,UklGRngEAABXRUJQVlA4TGsEAAAvbUAbEKehqG0jKcMfcDOvvReDmbZtMv50m72ZfwNp28S/2fcKprZtG8Y9W+4ARgcCgUDgwb55HlGnEBGF8CGUAT0GcNyXg4i0DPAhCiIOBZIEgG3bhtRoolFF8d7KsB3FrdyYwv8flxogCSD3iP5LlGy3bhtc3CEFgVCSlm98geHFrK2LhzRN7DeSNMuLejIzOrFoq8wGIq8mC2Uy/53bSOTNXE/7JrcsyFoVhmmRWD4Uc/FabpmRT+Vr7BUxh0Vhg7DcHLq30zfeut1mqSjMUxLg2/XDCB6MQ39YWS/SRqCv+VvtegfBuPU7f2Uua931I0TCXXzNE1bjovLVBmDB0FkaFaObZ2jsHLDBdSJes5T2uAErXMevMzLGegB20J9LZgzybCm8jiCA8dVSeI6nxyqEYcWnMzKmAzG4jSUQ93KeUG4giiNPgzn1oSOAsLJ8h+IFxPFBze6LUKlIKsAlejR7slg+AHRpExghoIWaBkmQT6qOAMT4ksfYNqAIW8IU/q210yRuhU3egMTaZwBVGIg1kq/0Dl0Kfaa05Ng2apNxFdRk6hlOlJqmIWUHCrHFRch7p1FuAUVBlCrR4SABpU5x3r7e0qXm1829ZL4BRW+Q3PO8BtBezP9Lo6SPj19f4dIjqelO7mTlcxkzkYzk4wKvJGV5RuNt7ON34wmSXgGt/RP72BpTIvmngfYU29VL4s1aBe1fCMUSLTKNsfeyl2V8331Bwxix4+hV0MUHnWHPQTVhwI41klELY3t6/YjOYNQw1rFALTfKCZt7+ZWhEUw54YC2dSnDnHrttm+OjdGh0uRe3mL/cGsnTHhDHT12rANw+BeRJZzsPeKlJ36VKGoS6peJoCYZyF8nmKzC4HIkf6EI8rkQgZg0gmyBUjzRcSkDI9co2QMeMdk0gjwjZk7MBnwaQZ7ZgJjp2HQZQ5aZriVmcS6VIVyRTPhWKEceMqxQTMK2sTpKEg5IiJ3VEhhUkLAitgQl4/bjKMcbtWpuOZeWR7Fzqh57UrudLfDp2oltHBfkTm5k0x0/Hb0prnlX6ePgBM9jG3oHvgW1WFE7cPJx4BWJASwzd9JoLzq8R0XXfIn2UyHPszGPP+TEK+Cg8qa/9DhvNZc5fQqrN8iFOGL+cSfMQcW7Nnn3vsdBlJquATcDuK8rvfUIv/xrrMaAm5jbsVyhz9niMu4m7qyGvpu4AJOyu49P8pYxDKXWG9QyOOUjsxifmpiy3HyfxVvw5GTMEi36bqkIXBkLG8mMhS2dsRCHVkM2xnVlCWmN4VP7LpNp8m5JcmfRXASs4Vk0LN+xtmMOeSNj2nRmDJPqyH7K5oYNpfVUrkxxtpZGyZo52iS+HfAl2n3st8FZa3xePmz7r4h/uX6rIMGxSQNOL/b91Z9teO27/wmOgVZu42NoJuUWZ1LugzMpxXJ95zJZotMfmwErFIZRkuKuJl5pMyb/Rk9u9rzJoy31XFvG+aQMfZVkZbswOjGb1EWe4Wz69KGoW+ZsegMA',
    // 高亮后的大小
    symbolSize(val) {
      // 最大为 60%，最小 15%
      const res = Math.max(Math.min(val / metricsMaxVal.value * 100, 100) * 0.6, 15)
      return res * 1.2
    },
    // 气泡的样式
    itemStyle: {
    },
    // label的样式
    label: {
      color: '#4A7CFF',
      fontSize: 14,
      fontWeight: 500
    },
  },

  // 自定义缩放按钮
  dragZoom: {
    show: false,
  },
  labelMap: {
    rate: '占比',
    tgi: 'TGI',
  },
  legend: {
    show: false,
  },
  tooltipVisible: true,
  titleVisible: true,
  xAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  yAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  symbolZoomConfig: {
    symbolZoomMax: 1000,
  },
});

const chartData = ref([
  {
    preferenceType: "美食",
    rate: "54.33",
    tgi: "22.00",
    brandNum: 100,
  },
  {
    preferenceType: "生活记录",
    rate: "98",
    tgi: "10",
    brandNum: 20,
  },
  {
    preferenceType: "旅游",
    rate: "42.49",
    tgi: "50",
    brandNum: 1000,  
  },
  {
    preferenceType: "潮流",
    rate: "42.47",
    tgi: "105.00",
    brandNum: 10,
  },
  {
    preferenceType: "情感",
    rate: "41.40",
    tgi: "20",
    brandNum: 300,
  },
  {
    preferenceType: "科技数码",
    rate: "90",
    tgi: "91.00",
    brandNum: 500,
  },
  {
    preferenceType: "教育",
    rate: "70",
    tgi: "58.00",
    brandNum: 80,
  },
  {
    preferenceType: "影视",
    rate: "10.62",
    tgi: "78.00",
    brandNum: 100,
  },
  {
    preferenceType: "职场",
    rate: "5.61",
    tgi: "83.00",
    brandNum: 480,
  },
  {
    preferenceType: "汽车",
    rate: "37.37",
    tgi: "110.00",
    brandNum: 810,
  },
  {
    preferenceType: "兴趣爱好",
    rate: "75.75",
    tgi: "73.00",
    brandNum: 330,
  },
  {
    preferenceType: "宠物",
    rate: "80.22",
    tgi: "83.00",
    brandNum: 600,
  },
  {
    preferenceType: "摄影",
    rate: "40.15",
    tgi: "75.00",
    brandNum: 420,
  },
  {
    preferenceType: "时尚",
    rate: "2.33",
    tgi: "101.00",
    brandNum: 40,
  },
  {
    preferenceType: "健身减肥",
    rate: "26.67",
    tgi: "74.00",
    brandNum: 400,
  },
  {
    preferenceType: "人文",
    rate: "6.74",
    tgi: "66.00",
    brandNum: 210,
  },
  {
    preferenceType: "母婴",
    rate: "24.59",
    tgi: "52.00",
    brandNum: 803,
  },
])
</script>
```

:::

## Bubble API
公共API见http://delight-charts.devops.sit.justdev.com/guide/chartApi.html
## chartConfig API

| 属性      | 类型   | 说明                                            | 默认值             |
| --------- | :----- | :---------------------------------------------- | :----------------- |
| quadrantList | Array\<\{ text: string; tooltip?: string; position?: Object; color?: string, backgroundColor?: string \}\> | text: 标签文案； tooltip: 标签tooltip；position: 气泡图标签位置，范围：24-52，单位：px，支持 top left right bottom； color: 标签文本颜色； backgroundColor: 标签背景颜色 | - |
| symbolZoomConfig | Object | 气泡图气泡大小配置,symbolZoomMax表示气泡缩放比例，symbolMax最大气泡限制，symbolMin最小气泡限制 | '{ symbolZoomMax: '0', symbolMax: '100', symbolMin: '5'}' |
| markLineConfig | Object | 图表标线设置和echarts的markLine一致 | '{ markLineValueX: '0', markLineValueY: '0', titleX: '', titleY: '', startX: '', endX: '', startY: '', endY: ''}' |
| label.before | \{ text: string, image: string, show: (params: Object) => boolean, backgroundColor: string \| Object \} | label的前置伪元素 | - |
| label.after | \{ text: string, image: string, show: (params: Object) => boolean, backgroundColor: string \| Record\<'image' \| string, any> \} | label的后置伪元素 | - |
| label.mainTextStyle | Record\<string\, any\> | label样式 | - |
| seriesConfig.zLevel | boolean | 按 metrics 第三个 item 的值设置气泡层级（小气泡在上，大气泡在下） | false |
| canClick | boolean | 是否支持下钻 | false |
| select | \{symbol: string, symbolSize: Function\(val, \{zoom, max, min\}\) \| number \} | 选中后的气泡样式 | \{\} |

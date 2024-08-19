# 图表API
### 基本用法
:::demo

```vue 
<template>
  <Bar 
    :chartData="chartData"
    :dimensions="dimensions"      
    :metrics="metrics"
  />
</template>

<script setup>
import {ref} from 'vue';
const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])

const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20
  }
])
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
  />
</template>

<script setup>
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);
const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])
const chartConfig = ref({
  title: {
    text: "基础柱状图",
  },
  tooltip: {
    trigger: "axis",
  },
  yAxis: {
      axisLabel: {
          color: 'red'
      }
  },
  grid: {
    show: true,
  },
  xAxis: {
    axisLabel: {
        color: 'green'
      }
  },
  legend: {
      left: 'center',
  },
  dataZoom: {
    type: 'slider',
    show: true
  }
})
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20
  }
])
</script>
```

:::
### 自定义设置图表宽高
width定义图表宽度，height定义图表高度
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
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);
const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])
const chartConfig = ref({
  title: {
    text: "基础柱状图",
  },
  tooltip: {
    trigger: "axis",
  },
  yAxis: {
      axisLabel: {
          color: 'red'
      }
  },
  grid: {
    show: true,
  },
  xAxis: {
    axisLabel: {
        color: 'green'
      }
  },
  legend: {
      left: 'center',
  },
  dataZoom: {
    type: 'slider',
    show: true
  }
})
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20
  }
])
</script>
```

:::
### 图表主题配色自定义
colors支持自定义配置图表主题配色
:::demo

```vue 
<template>
  <Bar 
    :chartData="chartData" 
    :dimensions="dimensions"
    :colors="customColors"     
    :metrics="metrics"
  />
</template>

<script setup>
import {ref} from 'vue';
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'salary'])
const customColors = ref([
    '#59c4e6',
    '#edafda',
    '#93b7e3'
])
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    salary: 30
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    salary: 20
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    salary: 50
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    salary: 40
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    salary: 32
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    salary: 28
  }
])
</script>
```
:::
### Loading用法
配置isLoading开启图表loading
:::demo

```vue 
<template>
  <Bar 
    :chartData="chartData" 
    :dimensions="dimensions"      
    :metrics="metrics"
    :isLoading="isLoading"
  />
</template>

<script setup>
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);
const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])

const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20
  }
])
</script>
```
:::

### 图表events
支持图表常用事件，events是个对象，key为事件名称
:::demo

```vue 
<template>
  <Bar 
    :chartData="chartData" 
    :dimensions="dimensions"      
    :metrics="metrics"
    :isLoading="isLoading"
    :events="chartEvents"
  />
</template>

<script setup>
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);

const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])
const chartEvents = {
  click: {
    callback: function (e) {
      alert('只有在money响应点击事件哦')
    },
    query: { seriesName: "money" }, // name为xxx的时候出发click事件
  },
};
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20
  }
])
</script>
```

:::
### 数据序列分组seriesField配置
适合配置同一指标不同序列的场景，例如看不同面霜的nps（雅诗兰黛面霜的nps和兰蔻面霜的nps）
:::demo

```vue 
<template>
<Bar 
      :chartData="seriesFieldData"
      :seriesField="seriesField"
      :dimensions="['dtm']"
      :metrics="['nps']"
      :chartConfig="barChartConfig"
      :isLoading="isLoading"
    />
</template>
<script setup>
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);
const seriesField= ref('dim')
const dimensions = ref(['dtm'])
const metrics = ref(['nps', 'impressions'])
const seriesFieldData = ref([
    {
        dim: "雅诗兰黛白金面霜",
        dtm: "6.23~6.30",
        nps: "0.8",
        impressions: 1000
    },
    {
        dim: "雅诗兰黛白金面霜",
        dtm: "7.01~7.07",
        nps: "0.8",
        impressions: 1000
    },
    {
        dim: "雅诗兰黛白金面霜",
        dtm: "7.08~7.014",
        nps: "0.8",
        impressions: 1000
    },
    {
        dim: "经典面霜",
        dtm: "6.23~6.30",
        nps: "0.6",
        impressions: 1000
    },
    {
        dim: "经典面霜",
        dtm: "7.01~7.07",
        nps: "0.9",
        impressions: 1000
    },
   {
        dim: "经典面霜",
        dtm: "7.08~7.014",
        nps: "1.2",
        impressions: 1000

    }
])
</script>


```
:::
### 图例legendMode设置
图例legend: {legendMode: 2}支持配置两种模式，一种是点谁只灭谁（legendMode = 1），适合目前国内大部分图表图例交互场景，另外一种是点谁只亮谁（legendMode = 2），适合快速聚焦某个指标的数据场景
:::demo

```vue 
<template>
  <Line 
    :chartData="chartData" 
    :chartConfig="chartConfig"
    :dimensions="dimensions"      
    :metrics="metrics"
    :isLoading="isLoading"
  />
</template>

<script setup>
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);

const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20
  }
])
const chartConfig = ref({
  legend: {
    legendMode: 1
  }
})
</script>
```

:::
### 图表支持下钻
使用canClick为true设置图表点击选中下钻效果

:::demo

```vue 
<template>
  <Histogram
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="chartConfig"
    :isLoading="isLoading"
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
  title: {
    text: '条形图支持下钻',
  },
})
const chartData = ref([
  {
    date: '2022-09-12',
    money: 14,
  },
  {
    date: '2022-09-13',
    money: 12,
  },
  {
    date: '2022-09-14',
    money: 15,
  },
  {
    date: '2022-09-15',
    money: 11,
  },
  {
    date: '2022-09-16',
    money: 11,
  },
])
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
    :isLoading="isLoading"
  />
</template>

<script setup>
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);

const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])
const chartData = ref([])
</script>
```

:::
### 数据空状态支持自定义配置
使用dataEmptyConfig设置自定义空态的图片和文案

emptyImgUrl: 设置空态兜底图片;
emptyTitle: 设置空态标题文案;
emptySubTitle: 设置空态描述文案;
:::demo

```vue 
<template>
  <Bar 
    :chartData="chartData" 
    :dimensions="dimensions"      
    :metrics="metrics"
    :dataEmptyConfig ="dataEmptyConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import {ref} from 'vue';
const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 1000);

const dimensions = ref(['date'])
const metrics = ref(['money', 'age'])
const chartData = ref([])
const dataEmptyConfig = ref({
    emptyImgUrl: 'https://picasso-static.justdev.com/fe-platform/3b7969ef184979a942aa0ee10eb0fecbecb5b418.png',
    emptyTitle: '我是用户自定义的空状态标题',
    emptySubTitle: '我是用户自定义的空状态副标题'
})
</script>
```
:::
### 组合图showLine配置
配置showLine字段，将把对应指标以折线图的形式展示
:::demo

```vue 
<template>
   <Bar 
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '柱线组合图',
  },
  showLine: ['money']
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::
### 下钻支持显示面包屑drillBreadcrumbConfig
配置drillBreadcrumbConfig支持配置下钻面包屑，示例中湖南省支持下钻

isShowDrillBreadcrumb: true, 支持显示面包屑
breadcrumbData: [{title: '全部省份'}]面包屑的文案
:::demo

```vue 
<template>
   <Bar 
        :chartData="chartData" 
        :dimensions="dimensions"
        :drillBreadcrumbConfig="drillBreadcrumbConfig" 
        @selectBreadcrumb="selectBreadcrumb"
        :events="eventConfig"
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['province'])
const metrics = ref(['data'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  labelMap: {
    data: 'gdp'
  }
});
const drillBreadcrumbConfig = ref({
  isShowDrillBreadcrumb: true,
  breadcrumbData: [{title: '全部省份'}]
})
const selectBreadcrumb = (item) => {
  if(item.title === '全部省份') {
    chartData.value = provinceData.value
    drillBreadcrumbConfig.value.breadcrumbData.length = 1;
  } else if(item.title === '全部') {
    chartData.value = drillCityData.value
  }
}
const eventConfig  = {
  click: {
    callback: function (e) {
      console.log(333333, e)
      if(e.name === '湖南省') {
        drillBreadcrumbConfig.value.breadcrumbData.push({
          title: e.name
        })
        chartData.value = drillCityData.value
      }
      
    },
  },
}
const provinceData = ref([ 
  {
    province: '湖南省',
    data: 123,
    hasNext: true,
  },
  {
    province: '湖北省',
    data: 200,
    hasNext: true,
  },
  {
    province: '江西省',
    data: 500
  },
  {
    province: '广东省',
    data: 340
  }
])
const chartData = ref(provinceData.value.slice(0))
const drillCityData = ref([
  {
    province: '衡阳市',
    data: 20,
  },
  {
    province: '耒阳市',
    data: 300,
    hasNext: true,
  },
  {
    province: '长沙市',
    data: 200
  },
  {
    province: '岳阳市',
    data: 140
  }
])
</script>
```

:::
### 显示label
label: {show: true}显示label, 支持配置label的样式位置等，支持echarts label的所有配置，更多属性见https://echarts.apache.org/zh/option.html#series-line.label.position
:::demo

```vue 
<template>
   <Bar 
        :chartData="chartData" 
        :dimensions="dimensions"
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['province'])
const metrics = ref(['data'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  labelMap: {
    data: 'gdp'
  },
  label: {
      show: true,
      position: 'top',
      color: 'red',
      textBorderColor: 'blue'
    }
});

const chartData = ref([ 
  {
    province: '湖南省',
    data: 123,
    hasNext: true,
  },
  {
    province: '湖北省',
    data: 200,
    hasNext: true,
  },
  {
    province: '江西省',
    data: 500
  },
  {
    province: '广东省',
    data: 340
  }
])
</script>
```

:::
### 面积图area配置
设置area:true配置阴影面积图
:::demo

```vue 
<template>
   <Line 
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '面积图',
  },
  area: true,
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::
### dataOrder排序配置
图表配置dataOrder字段支持排序，支持按某个字段进行升降排序
dataOrder: {
    sortfield: 'age',
    sortOrder: 'asc'
  }，表示按年龄进行升序排列

:::demo

```vue 
<template>
   <Histogram 
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['name'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'dataOrder排序',
  },
   dataOrder: {
    sortfield: 'age',
    sortOrder: 'asc'
  },
});
const chartData = ref([
  {
    name: '亚奇',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    name: '荣荣',
    age: 21,
    money: 9,
    rebalance: 19
  },
  {
    name: '黑星',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    name: '临渊',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    name: '仲谋',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    name: '果果',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::
### 堆叠配置
设置stack支持柱状图堆叠显示，设置成同一个key值的字段会堆叠在一个柱子上，对象的key值可以任意取

stack: {
    'rebalance': ['age', 'money']
  } 表示age和money指标堆叠在一起
:::demo

```vue 
<template>
   <Histogram 
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['name'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '堆叠配置',
  },
  stack: {
    'rebalance': ['age', 'money']
  },
   dataOrder: {
    sortfield: 'age',
    sortOrder: 'asc'
  },
});
const chartData = ref([
  {
    name: '亚奇',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    name: '荣荣',
    age: 21,
    money: 9,
    rebalance: 19
  },
  {
    name: '黑星',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    name: '临渊',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    name: '仲谋',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    name: '果果',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::
### labelMap配置label重命名
配置labelMap对字段进行重命名，会在legend和tooltip里面均生效
:::demo

```vue 
<template>
   <Bar
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['name'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  labelMap: {
      money: '薪水',
      age: '年龄',
      rebalance: '账户余额'
  },
  title: {
    text: 'label重命名',
  },
});
const chartData = ref([
  {
    name: '亚奇',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    name: '荣荣',
    age: 21,
    money: 9,
    rebalance: 19
  },
  {
    name: '黑星',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    name: '临渊',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    name: '仲谋',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    name: '果果',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::
### tooltip配置
tooltip支持配置数据格式化，配置valueType，valueType默认会对所有指标生效
valueType类型支持百分比（percent）, normal: 千分位分隔， label: 千分位分割， value: 千分位分割，currency: 千分位分隔 + '元'

digit: 配置数据显示几位小数

unit: true，配置数据显示单位，对label和value生效，配置了unit: true，将按照数据图表规范显示万，百万，亿，亿万等
自定义数据格式化配置使用valueFormatter;自定义tooltip配置formatter即可

echarts的相关tooltip配置属性也支持配置，更多详细属性见https://echarts.apache.org/zh/option.html#tooltip

:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'tooltip配置',
  },
  tooltip: {
      valueType: 'percent',
      digit: 2,
  }
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::

### tooltip 格式化配置

格式化配置项的底层函数是 <a href="#格式化函数-uselabelformat">useLabelFormat</a> 。

- valueType: useLabelFormat type 配置项
- digit: 小数位数
- unit: 是否有单位

:::demo
```vue
<template>
  <Line
    :chartData="chartData" 
    :dimensions="dimensions" 
    :metrics="metrics" 
    :chartConfig="chartConfig1" 
  />

  <Line
    :chartData="chartData" 
    :dimensions="dimensions" 
    :metrics="metrics" 
    :chartConfig="chartConfig2" 
  />

  <Line
    :chartData="chartData" 
    :dimensions="dimensions" 
    :metrics="metrics" 
    :chartConfig="chartConfig3" 
  />
</template>

<script setup>
import {ref} from 'vue'

const chartConfig1 = ref({
  title: {
    text: 'tooltip格式化配置label',
  },
  yAxis: {
    name: "年龄",
    type: "value",
    // 格式化配置项
    valueType: 'label',
    digit: 0,
    unit: '岁'
  },
  tooltip: {
    // 格式化配置项
    valueType: 'label',
    digit: 0,
    unit: '岁'
  }
});

const chartConfig2 = ref({
  title: {
    text: 'tooltip格式化配置百分比',
  },
  yAxis: {
    name: "值",
    type: "value",
    // 格式化配置项
    valueType: 'percent',
    digit: 0,
    unit: false
  },
  tooltip: {
    // 格式化配置项
    valueType: 'percent',
    digit: 0,
    unit: false
  }
});

const chartConfig3 = ref({
  title: {
    text: 'tooltip格式化配置自定义函数',
  },
  yAxis: {
    name: "值",
    type: "value",
  },
  tooltip: {
    // 格式化配置项
    valueType: function(val, numerify) {
      return numerify(val, '+0,0.000')
    },
    digit: 0,
    unit: '岁'
  }
});

const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```
:::

### tooltip 格式化多指标配置

`tooltip` 支持对象和数组配置。

使用对象配置，所有数据将共用这一份配置项；
如果每个 `tooltip` 的数值想单独配置，需要使用数组配置，数组的顺序和 `metrics` 的顺序保持一致，可以针对不同指标进行不同类型的格式化。

举个例子，`metrics: ['name', 'age']`；此时传入：

```js
tooltip: [
  {
    valueType: 'currency',
    digit: 2,
    unit: true,
  }
]
```

会给 `tooltip` 为 `name` 的 value 进行格式化；
如果只想把 `age` 格式化，数组的第一项传 `{}` 就ok。

```js
tooltip: [
  {},
  {
    valueType: 'normal',
    digit: 0,
    unit: '岁',
  }
]
```

:::demo

```vue
<template>
  <Line
    :chartData="chartData" 
    :dimensions="dimensions" 
    :metrics="metrics" 
    :chartConfig="chartConfig1" 
  />
</template>

<script setup>
import { ref } from 'vue'

const chartConfig1 = ref({
  title: {
    text: 'tooltip格式化多指标配置',
  },
  yAxis: {
    name: "值",
    type: "value",
  },
  tooltip: [
    // 格式化配置项，index 和传入的 metrics 对应
    {
      valueType: 'currency',
      digit: 2,
      unit: true,
    },
    {
      valueType: 'normal',
      digit: 0,
      unit: '岁',
    },
    {
      valueType: 'percent',
      digit: 1,
    }
  ]
});

const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::

### legend配置
legend支持配置图例的隐藏显示和宽高和icon，支持配置图例的位置left top

echarts的相关图例配置属性也支持配置，更多详细配置见https://echarts.apache.org/zh/option.html#legend

:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'legend配置',
  },
  legend: {
      show: true,
      itemHeight: 36,
      itemWidth: 36,
      left: 20,
      borderRadius: 10
  }
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::
### grid配置
使用grid配置坐标轴，支持配置grid的显示隐藏，使用grid可以调整整个图表的位置（left top right bottom）

echarts的相关grid配置属性也支持配置，更多详细属性见https://echarts.apache.org/zh/option.html#grid

:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'grid配置图表左移',
  },
  grid: {
      show: true,
      left: 60,
  },
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```
:::
### seriesConfig对象配置（单配置）
使用seriesConfig配置echarts series里面支持的属性，支持对象和数组配置，使用对象配置，所有数据将共用这一份配置项，如果每条线或者每根柱子想单独配置，使用数组配置，数组的顺序和metrics的顺序保持一致

更多详细属性见https://echarts.apache.org/zh/option.html#series

:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'seriesConfig单配置',
  },
  seriesConfig: {
    symbol: 'triangle',
    symbolSize: 20,
    label: {
      show: true
    },
    lineStyle: {
      color: 'red'
     }
  }
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```
:::
### seriesConfig数组配置（多配置）
使用seriesConfig配置echarts series里面支持的属性，支持对象和数组配置，使用对象配置，所有数据将共用这一份配置项，如果每条线或者每根柱子想单独配置，使用数组配置，数组的顺序和metrics的顺序保持一致

如果配置的seriesConfig数组的长度小于metrics数组的长度，则只有前几个metrics会应用seriesConfig的配置

:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'seriesConfig单配置',
  },
  seriesConfig: [{
    symbol: 'triangle',
    symbolSize: 20,
    label: {
      show: true
    },
    lineStyle: {
      color: 'red'
     }
  },
  {
    symbol: 'emptyCircle',
    symbolSize: 20,
    label: {
      show: false
    },
    lineStyle: {
      color: 'green'
     }
  },
  {
    symbol: 'emptyCircle',
    symbolSize: 20,
    label: {
      show: false
    },
    lineStyle: {
      color: 'yellow'
     }
  }]
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```
:::
### yAxis y坐标轴单轴配置
使用yAxis配置y轴，支持配置y轴的文本（name），颜色(nameTextStyle: { color: "red" }), digit: 坐标轴小数位数，valueType: 数据格式化（percent,label,value, currency），数据类型和tooltip一样等

支持echarts所有的yAxis配置，更多详细属性见https://echarts.apache.org/zh/option.html#yAxis

使用对象配置单y轴，使用数组配置双y轴和多y轴
:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'y坐标轴配置',
  },
  yAxis:
    {
      name: "年龄",
      type: "value",
      nameTextStyle: { color: "red" },
    },
  grid: {
    left: '20'
  }
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```
:::
### yAxis y坐标轴双轴配置
使用yAxis配置y轴，支持配置y轴的文本（name），颜色(nameTextStyle: { color: "red" }), digit: 坐标轴小数位数，valueType: 数据格式化（percent,label,value, currency），数据类型和tooltip一样等

支持echarts所有的yAxis配置

使用对象配置单y轴，使用数组配置双y轴和多y轴
:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'y坐标轴配置',
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
  grid: {
    left: '20'
  }
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```
:::
### xAxis x坐标轴单轴配置
使用xAxis配置x轴，支持配置x轴的文本（name），颜色(nameTextStyle: { color: "red" })，digit: 坐标轴小数位数，valueType: 数据格式化（percent,label,value, currency），数据类型和tooltip一样等

支持echarts所有的xAxis配置，更多详细属性见https://echarts.apache.org/zh/option.html#xAxis

使用对象配置单x轴，使用数组配置双x轴和多x轴
:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'x坐标轴配置',
  },
  xAxis: {
      name: "日期",
      nameTextStyle: { color: "red" },
      axisLabel: {
        color: 'green',
        formatter(val) {
          return val.split('-').join('')
        },
    },
  },
  grid: {
    right: 40
  },
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```
:::
### xAxis x坐标轴双轴配置
使用xAxis配置x轴，支持配置x轴的文本（name），颜色(nameTextStyle: { color: "red" })，digit: 坐标轴小数位数，valueType: 数据格式化（percent,label,value, currency），数据类型和tooltip一样等

支持echarts所有的xAxis配置

使用对象配置单x轴，使用数组配置双x轴和多x轴
:::demo

```vue 
<template>
   <Line
        :chartData="chartData" 
        :dimensions="dimensions" 
        :metrics="metrics" 
        :chartConfig="chartConfig" 
        :isLoading="isLoading"
    />
</template>

<script setup>
import {ref} from 'vue'
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: 'x坐标轴配置',
  },
  xAxis: [{
      name: "日期1",
      nameTextStyle: { color: "red" },
      axisLabel: {
        color: 'green',
        formatter(val) {
          return val.split('-').join('')
        },
    },
  },
  {
      name: "日期2",
      nameTextStyle: { color: "blue" },
      axisLabel: {
        color: 'green',
        formatter(val) {
          return val.split('-').join('')
        },
    },
  }
  ],
  grid: {
    right: 40
  },
});
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::
### 支持Echarts原生配置

:::demo

```vue 
<template>
  <Line 
    :chartConfig="chartConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import {ref} from 'vue'
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: "echarts Line",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2022-09-10",
      "2022-09-11",
      "2022-09-12",
      "2022-09-13",
      "2022-09-14",
      "2022-09-15",
      "2022-09-16",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
  ],
});
</script>
```

:::

### Y轴格式化

格式化配置项的底层函数是 <a href="#格式化函数-uselabelformat">useLabelFormat</a> 。

- valueType: useLabelFormat type 配置项
- digit: 小数位数
- unit: 是否有单位

:::demo

```vue
<template>
  <Line
    :chartData="chartData" 
    :dimensions="dimensions" 
    :metrics="metrics" 
    :chartConfig="chartConfig1" 
  />

  <Line
    :chartData="chartData" 
    :dimensions="dimensions" 
    :metrics="metrics" 
    :chartConfig="chartConfig2" 
  />

  <Line
    :chartData="chartData" 
    :dimensions="dimensions" 
    :metrics="metrics" 
    :chartConfig="chartConfig3" 
  />
</template>

<script setup>
import {ref} from 'vue'

const chartConfig1 = ref({
  title: {
    text: 'Y轴格式化配置label',
  },
  yAxis: {
    name: "年龄",
    type: "value",
    // 格式化配置项
    valueType: 'label',
    digit: 0,
    unit: '岁'
  },
});

const chartConfig2 = ref({
  title: {
    text: 'Y轴格式化配置百分比',
  },
  yAxis: {
    name: "值",
    type: "value",
    // 格式化配置项
    valueType: 'percent',
    digit: 0,
    unit: false
  },
});

const chartConfig3 = ref({
  title: {
    text: 'Y轴格式化配置自定义函数',
  },
  yAxis: {
    name: "值",
    type: "value",
    // 格式化配置项
    valueType: function(val, numerify) {
      return numerify(val, '+0,0.000')
    },
    digit: 0,
    unit: '岁'
  },
});

const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const chartData = ref([
  {
    date: '2022-09-10',
    money: 12,
    age: 11,
    rebalance: 9
  },
  {
    date: '2022-09-11',
    money: 13,
    age: 21,
    rebalance: 19
  },
  {
    date: '2022-09-12',
    money: 14,
    age: 25,
    rebalance: 29
  },
  {
    date: '2022-09-13',
    money: 12,
    age: 28,
    rebalance: 21
  },
  {
    date: '2022-09-14',
    money: 15,
    age: 28,
    rebalance: 15
  },
  {
    date: '2022-09-15',
    money: 11,
    age: 20,
    rebalance: 14
  }
])
</script>
```

:::

## 格式化函数 useLabelFormat

用法：

```ts
import { useLabelFormat } from '@dx/delight-charts';
```

类型定义:

```ts
type labelFormatType = 'normal' | 'percent' | 'currency' | 'value' | 'label' | Function;
type useLabelFormatType = (val: any, type?: labelFormatType, digit?: number, unit?: boolean|string) => string;
```

说明:

- `val`: 值 number
- `type`: 默认 `'value'` 格式化类型 labelFormatType
- `digit`: 小数位数 number
- `unit`: 是否需要单位 boolean|string，配置项为label/value时，传boolean单位是万、亿，

type 支持的值:

- `normal` 数字格式化 千分位、小数点   生效配置项：digit=0
- `percent` 数字百分比 小数点   生效配置项：digit=2
- `currency` 货币  xx元  生效配置项：digit=2 默认 thousand=true
- `value` 数字单位格式化  生效配置项 `unit` `digit`
  - 如果`unit`=false，效果变为 `normal`，但会自动检测数字是否存在小数，存在小数按小数+normal处理
  - `thousand`=true
  - 当数字 > 10000 显示为 x万， > 100000000 显示为 x亿
- `label` 图表x轴y轴格式化  生效配置项 `unit` `digit`
  - 效果同 value，digit != 0时，没有千位符
- 支持传入函数，`(val, numerify) => string` 可以自己定义 template 进行格式化，参考：[numerify](https://www.npmjs.com/package/numerify)

:::demo

```vue
<script setup>
import { ref, computed, inject, reactive } from 'vue';
const useLabelFormat = inject('useLabelFormat');

const normalData = ref(9999999999);
const percentData = ref(4.79);
const valueData = ref(12312313);
const labelData = ref(12312313);
const currencyData = ref(100);
const functionData = ref(1000000);

const normalConfig = reactive({
  unit: '',
  digit: 1
});
const percentConfig = reactive({
  unit: '',
  digit: 2
});
const valueConfig = reactive({
  unit: true,
  digit: 1
});
const labelConfig = reactive({
  unit: true,
  digit: 1
});
const currencyConfig = reactive({
  unit: false,
  digit: 2
});

const resNormalData = computed(() => useLabelFormat(normalData.value, 'normal', normalConfig.digit, normalConfig.unit));
const resPercentData = computed(() => useLabelFormat(percentData.value, 'percent', percentConfig.digit, percentConfig.unit));
const resValueData = computed(() => useLabelFormat(valueData.value, 'value', valueConfig.digit, valueConfig.unit));
const resLabelData = computed(() => useLabelFormat(labelData.value, 'label', labelConfig.digit, labelConfig.unit));
const resCurrencyData = computed(() => useLabelFormat(currencyData.value, 'currency', currencyConfig.digit, currencyConfig.unit));
const resFunctionData = computed(() => useLabelFormat(functionData.value, (val, numerify) => {
  return numerify(val, '+0,0.000')
}));
</script>
<template>
  <div style="height: 550px;">
    <div class="block">
      <div class="config">
        <div>
          <label>normalData: </label>
          <input v-model="normalData" />
        </div>
        <div>
          <label>小数位数</label>
          <input type="number" v-model="normalConfig.digit">
        </div>
        <div>
          <label>单位</label>
          <input type="input" v-model="normalConfig.unit">
        </div>
      </div>
      <div>result= {{ resNormalData }}</div>
    </div>

    <div class="block">
      <div class="config">
        <div>
          <label>percentData: </label>
          <input v-model="percentData" />
        </div>
        <div>
          <label>小数位数</label>
          <input type="number" v-model="percentConfig.digit">
        </div>
        <div>
          <label>单位</label>
          <input type="input" v-model="percentConfig.unit">
        </div>
      </div>
      <div>result= {{ resPercentData }}</div>
    </div>

    <div class="block">
      <div class="config">
        <div>
          <label>valueData: </label>
          <input v-model="valueData" />
        </div>
        <div>
          <label>小数位数</label>
          <input type="number" v-model="valueConfig.digit">
        </div>
        <div>
          <label>单位</label>
          <input type="checkbox" v-model="valueConfig.unit">
        </div>
      </div>
      <div>result= {{ resValueData }}</div>
    </div>

    <div class="block">
      <div class="config">
        <div>
          <label>labelData: </label>
          <input v-model="labelData" />
        </div>
         <div>
          <label>小数位数</label>
          <input type="number" v-model="labelConfig.digit">
        </div>
        <div>
          <label>单位</label>
          <input type="checkbox" v-model="labelConfig.unit">
        </div>
      </div>
      <div>result= {{ resLabelData }}</div>
    </div>

    <div class="block">
      <div class="config">
        <div>
          <label>currencyData: </label>
          <input v-model="currencyData" />
        </div>
         <div>
          <label>小数位数</label>
          <input type="number" v-model="currencyConfig.digit">
        </div>
        <div>
          <label>单位</label>
          <input type="checkbox" v-model="currencyConfig.unit">
        </div>
      </div>
      <div>result= {{ resCurrencyData }}</div>
    </div>

    <div class="block">
      <div>
        <label>自定义function: </label>
        <input v-model="functionData" />
      </div>
      <span>result= {{ resFunctionData }}</span>
    </div>
  </div>
</template>
<style scoped>
input {
  border-radius: 4px;
}
input:not([type=checkbox]) {
  border: 1px solid lightgray;
  padding: 5px;
}
input[type=number] {
  width: 40px;
}
input[type=input] {
  width: 80px;
}
input:focus {
  border-color: skyblue;
}
.config {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
}
.block {
  display: flex;
  justify-content: start;
  align-items: start;
  border: 1px solid grey;
  flex-flow: column nowrap;
  margin-block: 16px;
}
</style>
```

:::

## 全局API

| 属性          | 类型        | 说明                           | 默认值                 |
|-------------|:----------|:-----------------------------|:--------------------|
| dimensions  | string [] | 维度, 一般指x轴指标                  | [ ]                 |
| metrics     | string [] | 指标，一般指y轴指标                   | [ ]                 |
| seriesField     | string | 序列分组字段，适用单/多指标多维度下的不同序列的业务场景，例如同时对比看在一段时间范围内的A的曝光数和B的曝光数                 | ''                 |
| chartData   | Object [] | 图表数据                         | [ ]                 |
| chartConfig | object    | 图表配置,传入echarts原生配置也支持渲染                        | {}                  |
| drillBreadcrumbConfig     |  Object | 下钻面包屑配置, isShowDrillBreadcrumb表示是否显示面包屑，breadcrumbData表示面包屑的数据，'breadcrumbData: [{title: '', id: ''}]'，需要配合图表click一起使用  | '{ isShowDrillBreadcrumb: false, breadcrumbData: []}'  |
| selectBreadcrumb     |  function | 下钻面包屑点击抛出事件，接收参数params，params和面包屑数据项一致  | '() => {}'              |
| toolTipsText| Object 或 Array | toolTips底部辅助类文字       | [ ]                 |
| colors       | string[]  | 全局colors配置(如果是环形图需要下钻，请传rgba格式)                    | [ ]                 |
| theme       | string    | 自定义主题                | ''                  |
| isLoading     | boolean   | 是否显示isLoading                | false      |         
|renderType| string   | 渲染类型                | 'canvas'   |
|changeDelay| string   | 配置项，数据，resize时的延迟渲染时间               | 300ms  |  
|cssClass| string   | 自定义class               | ''  |  
|dataEmptyConfig| string   | 空状态配置，支持配置空状态的主文案emptyTitle和副文案emptySubTitle和图片地址emptyImgUrl              | {} | 
| events      | object  | 需要监听的事件名，触发的callback, query是可选的过滤条件，能够只在指定的组件或者元素上进行响应。{click: {callback: () => {}, query: {seriesIndex: 1, name: 'xx'}}, 表示只在seriesIndex为1，name为xxx的时候出发click事件     | {}                  |
| ops      | object  | echarts setOption的第二个参数{ notMerge?: boolean,replaceMerge?: string | string[];lazyUpdate?: boolean;silent?: boolean } | {notMerge: false; replaceMerge: []; lazyUpdate:false, silent: false}                  |

## chartConfig API

| 属性          | 类型        | 说明                           | 默认值
|-------------|:----------|:-----------------------------|:--------------------|
| showLine    | string[]  |  哪几个指标显示为折线，用这个prop可实现柱线组合图                   | [ ]                 |
| area        | boolean   | 是否显示面积区域                     | false               |
| itemStyle   | object    | 图形样式                         | {}                  |
| dataOrder   | object | 图形按什么字段排序，支持设置排序字段sortField和sortOrder和升降序   |  {}         |
| stack       | object    | 设置堆叠字段，两个指标设置在同一个key下就表示堆叠在一起，例如stack:{a:[b,c]} 说明bc要堆叠在一起                           | {}                  |
| roseType    | boolean    | 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式radius和area |  radius |
| center    | array    | 饼图的中心点设置，数组的第一项是横坐标，第二项是纵坐标 |  ['65%', '50%'] |
| radius      |  string  | 饼图半径，类型string, array, object，string是饼图， array是单个环形图，object是多环形图或多饼。例如 //{'指标1': [0, '30%'],'指标2': ['50%', '70%']}'    |   ''  | 
| labelMap    | object    | 设置指标字段的别名，同时作用于提示框和图例，例如labelMap: {'a': '好多钱'}, |       {}     | 
| seriesConfig    | object[]或 object   | 支持echarts series里面属性的配置，例如symbol, symbolsize，itemstyle等，更多详细属性见https://echarts.apache.org/zh/option.html#series |      []     | 
| tooltip |    object    |    选填digit: 4 保留几位小数，选填unit: true单位格式化，valueType: percent百分比，tooltip设置和echarts配置一致，更多详细属性见https://echarts.apache.org/zh/option.html#tooltip    | {}    |
| legend |    object     |    设置和echarts配置一致, 支持设置图例模式，默认点击图例高亮；legendMode 设置为 1 图例点击变灭, 默认legendMode: 0，更多详细属性见https://echarts.apache.org/zh/option.html#legend   | '{legendMode: 0}'   |
| yAxis |   object   |  y轴设置和echarts配置一致；选填digit: 4 保留几位小数，选填unit: true单位格式化,yAxisIndex:1 在单个图表实例中配置多个y轴, valueType: percent百分比，更多详细属性见https://echarts.apache.org/zh/option.html#yAxis ｜{} |
| xAxis |   object    |      x轴设置和echarts配置一致，选填digit: 4 保留几位小数，选填unit: true单位格式化,yAxisIndex:1 在单个图表实例中配置多个y轴, valueType: percent百分比，更多详细属性见https://echarts.apache.org/zh/option.html#xAxis | {}    |
| title | object   |    标题设置和echarts配置一致，更对详细属性见https://echarts.apache.org/zh/option.html#title   | {}    |


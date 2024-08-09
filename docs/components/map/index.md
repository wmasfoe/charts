# Map 地图

### 中国地图

:::demo

```vue 
<template>
    <Map :chartData="mapData" :chartConfig="chartConfig"/>

</template>

<script setup>
import {ref} from 'vue'
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '中国地图',
  },
});
const mapData = [
    {
        "name":"广东省",
        "value":"86.85",
    },
    {
        "name":"北京市",
        "value":"273.68",
    },
    {
        "name":"江苏省",
        "value":"116.85",
    },
    {
        "name":"浙江省",
        "value":"116.23",
    },
    {
        "name":"山东省",
        "value":"89.49",
    },
    {
        "name":"四川省",
        "value":"104.01",
    },
    {
        "name":"河南省",
        "value":"79.19",
    },
    {
        "name":"上海市",
        "value":"111.84",
    },
    {
        "name":"河北省",
        "value":"97.85",
    },
    {
        "name":"安徽省",
        "value":"95.38",
    },
    {
        "name":"福建省",
        "value":"94.24",
    },
    {
        "name":"湖北省",
        "value":"90.29",
    },
    {
        "name":"辽宁省",
        "value":"118.75",
    },
    {
        "name":"湖南省",
        "value":"83.85",
    },
    {
        "name":"陕西省",
        "value":"92.24",
    },
    {
        "name":"重庆市",
        "value":"102.49",
    },
    {
        "name":"云南省",
        "value":"97.49",
    },
    {
        "name":"江西省",
        "value":"76.01",
    },
    {
        "name":"山西省",
        "value":"98.98",
    },
    {
        "name":"广西壮族自治区",
        "value":"72.91",
    },
    {
        "name":"黑龙江省",
        "value":"105.07",
    },
    {
        "name":"贵州省",
        "value":"93.49",
    },
    {
        "name":"天津市",
        "value":"109.65",
    },
    {
        "name":"吉林省",
        "value":"112.91",
    },
    {
        "name":"内蒙古自治区",
        "value":"106.50",
    },
    {
        "name":"甘肃省",
        "value":"80.79",
    },
    {
        "name":"新疆维吾尔自治区",
        "value":"65.87",
    },
    {
        "name":"台湾省",
        "value":"123.31",
    },
    {
        "name":"海南省",
        "value":"96.28",
    },
    {
        "name":"香港特别行政区",
        "value":"107.06",
    },
    {
        "name":"宁夏回族自治区",
        "value":"75.69",
    },
    {
        "name":"青海省",
        "value":"84.21",
    },
    {
        "name":"西藏自治区",
        "value":"94.23",
    },
    {
        "name":"澳门特别行政区",
        "value":"111.31",
    }
]
</script>


```
:::

## Map API

| 属性          | 类型        | 说明                           | 默认值
|-------------|:----------|:-----------------------------|:--------------------|
| geoJson    | []  |  描述绘制地图的地理信息json，符合geoJson规范，不传默认内置中国地图geoJson                 | [ ]                 |
| mapType        |   string |               绘制的地图类型，不传默认是china       | 'china'               |

## chartConfig API

| 属性          | 类型        | 说明                           | 默认值
|-------------|:----------|:-----------------------------|:--------------------|
| geo   | object    |   地理坐标系组件。用于地图的绘制，支持在地理坐标系上绘制散点图，线集和echarts配置项一致                      | {}                  |            
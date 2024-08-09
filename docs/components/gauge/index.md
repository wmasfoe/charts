# Gauge 仪表盘

## 常规仪表盘

axisTickNumber 配置 刻度尺的刻度线条数，最小为 2

showAxisTick 则代表是否显示刻度尺的刻度线
:::demo

```vue
<template>
  <Gauge
    :chartData="chartData"
    :chartConfig="chartConfig"
    :height="280"
    :width="280"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
const chartData = ref([20])

const chartConfig = computed(() => ({
  showAxisTick: true,
  axisTickNumber: 3,
  gaugeCenter: {
    mainTitle: '整体满意度',
    unit: '分',
    mainValue: chartData.value,
    fullValue: '5',
    tagValue: '方方方',
  },
  labelMap: {
    0: '异常',
    50: '一般',
    100: '健康',
  },
}))

setTimeout(() => {
  chartData.value = ['40']
}, 2000)
</script>
```

:::

mainTitle 表示 仪表盘中间标题
tagValue 表示 仪表盘中间 tag 的名称

:::demo

```vue
<template>
  <Gauge
    :chartData="chartData"
    :chartConfig="chartConfig"
    :height="280"
    :width="280"
  />
</template>

<script setup>
import { ref } from 'vue'

const chartConfig = ref({
  axisTickNumber: 3,
  gaugeCenter: {
    mainTitle: '整体满意度',
    tagValue: '方方方',
  },
})

const chartData = ref([10])

setTimeout(() => {
  chartData.value = [60]
}, 2000)
</script>
```

:::

## 不同颜色的仪表盘

tagColor 表示 中间 tag 的字体颜色
tagBackground 表示 中间 tag 的背景颜色

progressColor 表示进度条的颜色
progressBg 代表 划块的背景颜色

labelMap 不设置的话 就会默认设置刻度值，例子如下： （刻度是按照 0-100 来计算的，三个刻度的话，则是 0 50 100 三个刻度，多个刻度需要设置别名的话，需要自行计算刻度值）
:::demo

```vue
<template>
  <Gauge
    :chartData="chartData"
    :chartConfig="chartConfig"
    :height="280"
    :width="280"
  />
</template>

<script setup>
import { ref } from 'vue'

const chartConfig = ref({
  showAxisTick: true,
  axisTickNumber: 3,
  progressColor: 'rgba(255, 0, 59, 1)',
  progressBg: '#FFE9ED',
  gaugeCenter: {
    mainTitle: '当前信用状态',
    tagValue: '异常',
    tagColor: '#AA2844',
    tagBackground: '#FFE9ED',
  },
  labelMap: {
    0: '不满意',
    50: '中立',
    100: '满意',
  },
})

const chartData = ref([80])

setTimeout(() => {
  chartData.value = [10]
}, 2000)
</script>
```

:::

## 支持 echarts 配置的仪表盘

:::demo

```vue
<template>
  <Gauge
    :chartData="chartData"
    :chartConfig="chartConfig"
    :height="440"
    :width="440"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
const chartData = ref([20])
const h = ref(0)
const m = ref(0)
const s = ref(0)
const chartConfig = computed(() => ({
  seriesConfig: [
    {
      name: 'hour',
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 12,
      splitNumber: 12,
      clockwise: true,
      axisLine: {
        lineStyle: {
          width: 15,
          color: [[1, 'rgba(0,0,0,0.7)']],
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 15,
        },
      },
      splitLine: {
        lineStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 3,
          shadowOffsetX: 1,
          shadowOffsetY: 2,
        },
      },
      axisLabel: {
        fontSize: 25,
        distance: 25,
        formatter: function (value) {
          if (value === 0) {
            return ''
          }
          return value + ''
        },
      },
      anchor: {
        show: true,
        icon: 'path://M532.8,70.8C532.8,70.8,532.8,70.8,532.8,70.8L532.8,70.8C532.7,70.8,532.8,70.8,532.8,70.8z M456.1,49.6c-2.2-6.2-8.1-10.6-15-10.6h-37.5v10.6h37.5l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3v0h-22.5c-1.5,0.1-3,0.4-4.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.8c-0.6,1.7-0.9,3.4-0.9,5.3v16h10.6v-16l0,0l0,0c0-2.7,2.1-5,4.7-5.3h10.3l10.4,21.2h11.8l-10.4-21.2h0c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3C457,53,456.7,51.2,456.1,49.6z M388.9,92.1h11.3L381,39h-3.6h-11.3L346.8,92v0h11.3l3.9-10.7h7.3h7.7l3.9-10.6h-7.7h-7.3l7.7-21.2v0L388.9,92.1z M301,38.9h-10.6v53.1H301V70.8h28.4l3.7-10.6H301V38.9zM333.2,38.9v10.6v10.7v31.9h10.6V38.9H333.2z M249.5,81.4L249.5,81.4L249.5,81.4c-2.9,0-5.3-2.4-5.3-5.3h0V54.9h0l0,0c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.9-10.6h-37.5c-1.9,0-3.6,0.3-5.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.7c-0.6,1.7-0.9,3.5-0.9,5.3l0,0v21.3c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.5,0.9,5.3,0.9h33.6l3.9-10.6H249.5z M176.8,38.9v10.6h49.6l3.9-10.6H176.8z M192.7,81.4L192.7,81.4L192.7,81.4c-2.9,0-5.3-2.4-5.3-5.3l0,0v-5.3h38.9l3.9-10.6h-53.4v10.6v5.3l0,0c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.4,0.9,5.3,0.9h23.4h10.2l3.9-10.6l0,0H192.7z M460.1,38.9v10.6h21.4v42.5h10.6V49.6h17.5l3.8-10.6H460.1z M541.6,68.2c-0.2,0.1-0.4,0.3-0.7,0.4C541.1,68.4,541.4,68.3,541.6,68.2L541.6,68.2z M554.3,60.2h-21.6v0l0,0c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.8-10.6h-37.5l0,0c-6.9,0-12.8,4.4-15,10.6c-0.6,1.7-0.9,3.5-0.9,5.3c0,1.9,0.3,3.7,0.9,5.3c2.2,6.2,8.1,10.6,15,10.6h21.6l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3l0,0h-37.5v10.6h37.5c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3c0-1.9-0.3-3.7-0.9-5.3C567.2,64.6,561.3,60.2,554.3,60.2z',
        showAbove: false,
        offsetCenter: [0, '-35%'],
        size: 120,
        keepAspect: true,
        itemStyle: {
          color: '#707177',
        },
      },
      pointer: {
        icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
        width: 12,
        length: '55%',
        offsetCenter: [0, '8%'],
        itemStyle: {
          color: '#C0911F',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      detail: {
        show: false,
      },
      title: {
        offsetCenter: [0, '30%'],
      },
      animation: h.value !== 0,
      data: [
        {
          value: h.value,
        },
      ],
    },
    {
      name: 'minute',
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 60,
      clockwise: true,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
        width: 8,
        length: '70%',
        offsetCenter: [0, '8%'],
        itemStyle: {
          color: '#C0911F',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      anchor: {
        show: true,
        size: 20,
        showAbove: false,
        itemStyle: {
          borderWidth: 15,
          borderColor: '#C0911F',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      detail: {
        show: false,
      },
      title: {
        offsetCenter: ['0%', '-40%'],
      },
      animation: m.value !== 0,
      data: [
        {
          value: m.value,
        },
      ],
    },
    {
      name: 'second',
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 60,
      animationEasingUpdate: 'bounceOut',
      clockwise: true,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
        width: 4,
        length: '85%',
        offsetCenter: [0, '8%'],
        itemStyle: {
          color: '#C0911F',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      anchor: {
        show: true,
        size: 15,
        showAbove: true,
        itemStyle: {
          color: '#C0911F',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      detail: {
        show: false,
      },
      title: {
        offsetCenter: ['0%', '-40%'],
      },
      animation: s.value !== 0,
      data: [
        {
          value: s.value,
        },
      ],
    },
  ],
}))

setInterval(function () {
  var date = new Date()
  s.value = date.getSeconds()
  m.value = date.getMinutes() + s.value / 60
  h.value = (date.getHours() % 12) + m.value / 60
}, 1000)
</script>
```

:::

## Gauge API

| 属性        | 类型     | 说明     | 默认值 |
| ----------- | :------- | :------- | :----- |
| chartData   | number[] | 图表数据 | []     |
| chartConfig | Object   | 图表配置 | {}     |
| width       | number   | 宽度     | auto   |
| height      | number   | 高度     | 400    |

## chartConfig API

| 属性           | 类型              | 说明                                                                   | 默认值                   |
| -------------- | :---------------- | :--------------------------------------------------------------------- | :----------------------- |
| showAxisTick   | boolean           | 是否展示刻度尺                                                         | false                    |
| axisTickNumber | number            | 刻度尺的刻度线条数，最小为 2                                           | 2                        |
| progressColor  | string            | 仪表盘滑块颜色                                                         | 'rgba(60, 102, 255, 1)'  |
| progressBg     | string            | 仪表盘滑道背景色                                                       | 'rgba(243, 244, 245, 1)' |
| gaugeCenter    | object            | 仪表盘中间内容                                                         | {}                       |
| seriesConfig   | object[]或 object | 支持 echarts series 里面属性的配置，例如 axisLine,axisLabel,pointer 等 | []                       |
| labelMap       | object            | 设置刻度尺的别名                                                       | {}                       |

`labelMap不设置的话 就会默认设置刻度值，例子如下： （刻度是按照0-100来计算的，三个刻度的话，则是0 50 100 三个刻度，多个刻度需要设置别名的话，需要自行计算刻度值）`

```
{
  0: '不满意',
  50: '中立',
  100: '满意',
},
```

## gaugeCenter API

| 属性          | 类型   | 说明                                                      | 默认值                   |
| ------------- | :----- | :-------------------------------------------------------- | :----------------------- |
| mainTitle     | string | 仪表盘中间标题                                            | ''                       |
| tagValue      | string | tag 的 name                                               | ''                       |
| tagColor      | string | tag 字体颜色                                              | 'rgba(43, 72, 181, 1)'   |
| tagBackground | string | tag 背景色                                                | 'rgba(236, 240, 255, 1)' |
| mainValue     | string | 仪表盘中间数值                                            | ''                       |
| fullValue     | string | 整体最大值，如 4.2 / 5 分的 `'5'`，不传则只展示 mainValue | ''                       |
| unit          | string | 单位                                                      | ''                       |
| min           | number | 最小刻度                                                  | 0                        |
| max           | number | 最大刻度                                                  | 100                      |

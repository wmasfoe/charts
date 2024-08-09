<template>
  <div class="overview">
  <Line class="chart-demo" :width="320" :height="300" :chartData="chartData" :dimensions="['日期']" :metrics="['余额1', '余额2', '年龄']" :events="chartEvents"
        :chartConfig="chartConfig" :isLoading="isLoading"/>
  <Bar class="chart-demo" :width="320" :height="300" :chartData="chartData" :dimensions="['日期']" :metrics="['余额1', '余额2', '年龄']"
       :chartConfig="barChartConfig" :isLoading="isLoading"/>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
// legend做成默认展示
const chartConfig = ref<any>({
  // 不生效
  labelMap: {
    '余额1': '好多钱'
  },
});
const circleChartConfig = ref<any>({
  seriesName: '季度数据',
  radius: ['40%', '55%'],
  label: {
    show: false
  },
  tooltip: {
    trigger: "item",
  },
  tooltipVisible: true,
});
const circleTChartConfig = ref<any>({
  label: {
    show: false
  },
  seriesName: '季度数据',
  radius: ['30%', '55%'],
  tooltip: {
    trigger: "item",
  },
  legend: {
    left: 10
  },
  circleCenter: {
    mainTitle: '季度分析',
    mainLabel: 10000,
    subText: '较上一周期',
    subNum: '+23%'
  },
  tooltipVisible: true,
});
const pieChartConfig = ref<any>({
  seriesName: '季度数据',
  radius: '50%',
  tooltip: {
    trigger: "item",
  },
  label: {
    show: false
  },
  tooltipVisible: true,
  yAxis: {
    // digit: 2, // 保留几位小数，
    min: 0,
    max: 30,
  },
  xAxis: {
    text: "x轴名字",
    nameLocation: "middle",
  },
});
const barChartConfig = ref<any>({
  showLine: ['年龄'],
  tooltip: {
    trigger: "axis",
  },
  tooltipVisible: true,
  yAxis: {
    // digit: 2, // 保留几位小数，
    min: 0,
    max: 30,
  },
  xAxis: {
    text: "x轴名字",
    nameLocation: "middle",
  },
});
const hisChartConfig = ref({
  tooltip: {
    trigger: "axis",
  },
  tooltipVisible: true,
})

const chartEvents = {
  click: {
    callback: function (e) {
      console.log('11aaaaaaaappp', e)
    },
    query: { seriesIndex: 1, name: 'xx' }, // 表示只在seriesIndex为1，name为xxx的时候出发click事件
  }
}
const hisChartStackConfig = ref({
  stack: {
    "余额2": [
      "余额1",
      "年龄"
    ]
  },
  tooltip: {
    trigger: "axis",
  },
  tooltipVisible: true,
})

const chartData = ref([
  {
    '日期': '1-1',
    '余额1': 12,
    '余额2': 11,
    '年龄': 22
  },
  {
    '日期': '1-2',
    '余额1': 13,
    '余额2': 12,
    '年龄': 21
  },
  {
    '日期': '1-3',
    '余额1': 14,
    '余额2': 13,
    '年龄': 25
  },
  {
    '日期': '1-4',
    '余额1': 12,
    '余额2': 11,
    '年龄': 28
  },
  // {
  //   '日期': '1-5',
  //   '余额1': 15,
  //   '余额2': 14,
  //   '年龄': 28
  // },
])
</script>

<style>
.overview {
    display: flex;
    flex-wrap: wrap;
}
.chart-demo {
    margin-right: 20px;
    margin-top: 20px;
    box-shadow: 0 2px 8px #f0f1f2;
    overflow: hidden;
    padding-left: 10px 0 0 10px !important;
}
.chart-pie {
  padding: 0px !important;
}
</style>

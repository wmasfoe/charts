<template>
  <button @click="click">123</button>

    <Line
    :chartData="chartData"
    :dimensions="dimensions"
    :metrics="metrics"
    :chartConfig="{
      ...chartConfig,
      area: true,
      seriesConfig: [
        {
          yAxisIndex: 0,
        },
        {
          yAxisIndex: 0,
        },
        {
          yAxisIndex: 1,
        },
      ],
    }"
    :isLoading="isLoading"
    :dataEmptyConfig="dataEmptyConfig"
    :loadingConfig="loadingConfig"
    :style="{ backgroundColor: '#ede7e7' }"
    @legendSelectChanged="legendSelectChanged"
  />
  <Pie
  :chartData="pieData"
  :dimensions="['name']"
  :metrics="['percent']"
  :chartConfig="pieConfig"
  :isLoading="isLoading"
  :width='375'
  @legendSelectChanged="legendSelectChanged"
  :event="chartEvents"
/>
<Bar
  :chartData="chartData"
  :dimensions="dimensions"
  :metrics="metrics"
  :chartConfig="chartConfig"
  :isLoading="isLoading"
  :width="375"
  :dataEmptyConfig="dataEmptyConfig"
  :style="{ backgroundColor: '#ede7e7' }"
/>
<br/>
<Histogram
  :chartData="chartData1"
  :dimensions="dimensions1"
  :metrics="metrics1"
  :chartConfig="chartConfig"
  :isLoading="isLoading"
  :width="375"
/>
<Circle
  :chartData="circleData"
  :dimensions="['name']"
  :metrics="['percent']"
  :chartConfig="circleConfig"
  :isLoading="isLoading"
  :width="375"
  @legendSelectChanged="legendSelectChanged"
  :event="chartEvents"
/>
  <!-- <Line
  :chartData="chartData"
  :dimensions="dimensions"
  :metrics="metrics"
  :chartConfig="{
    area: true,
  }"
  :isLoading="isLoading"
  :width="375"
/> -->
  <!-- <Bar
  :chartData="chartData"
  :dimensions="dimensions"
  :metrics="metrics"
  :chartConfig="chartConfig"
  :isLoading="isLoading"
  :width="375"
  :dataEmptyConfig="dataEmptyConfig"
/>
<Bullet
  :chartData="bulletBaseData"
  :chartConfig="bulletConfig"
  :dimensions="['a']"
  :metrics="['b']"
  :isLoading="isLoading"
/>
<Histogram
  :chartData="chartData1"
  :dimensions="dimensions1"
  :metrics="metrics1"
  :chartConfig="chartConfig"
  :isLoading="isLoading"
  :width="375"
/>
<Pie
  :chartData="pieData"
  :dimensions="['name']"
  :metrics="['percent']"
  :chartConfig="pieConfig"
  :isLoading="isLoading"
  :width='375'
  @legendSelectChanged="legendSelectChanged"
  :event="chartEvents"
/>
<Circle
  :chartData="circleData"
  :dimensions="['name']"
  :metrics="['percent']"
  :chartConfig="circleConfig"
  :isLoading="isLoading"
  :width="375"
  @legendSelectChanged="legendSelectChanged"
  :event="chartEvents"
/> -->
  <!-- <div>多线: 测试映射echarts</div> -->

  <!-- <Line
  :chartData="chartData2"
  :dimensions="dimensions"
  :metrics="['money', 'age', 'rebalance']"
  @legendSelectChanged="legendSelectChanged"
  :chartConfig="{
    ...chartConfig,
    legend:{
      selected:{
        薪水: false,
      },
      icon: 'line'
    },
    symbolConfig: { symbol: 'emptyCircle' },
    tooltip: {
      // 以下注释都映射都ok
      valueType: 'percent',
      digit: 2,
      unit: true,
      // formatter: (ev) => {
      //   return `<div>${ev[0]?.date}我是自定义</div><div style='color: red'>我是自定义</div>`;
      // },
      axisPointer: {
        type: 'cross',
        axis: 'xy',
        lineStyle: {
          width: 1,
          type: 'dotted',
        },
      },
    },
    labelMap: {
      money: '薪水',
      age: 'age',
      rebalance: '账户余账户',
    },
  }"
  :isLoading="isLoading"
  :width="375"
  :height="400"
/> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import Line from "../src/packages/line";
import Bar from "../src/packages/bar";
import Bullet from "../src/packages/Bullet";
import Histogram from "../src/packages/Histogram";
import Pie from "../src/packages/Pie";
import Circle from "../src/packages/Circle";

import "../src/style.css";
// onMounted(() => {
//   document.body.addEventListener(
//     "touchmove",
//     function (e) {
//       // e.preventDefault();
//       // e.stopPropagation();
//     },
//     { passive: true }
//   );
// });

const dataEmptyConfig = ref({
  emptyImgUrl:
    "https://picasso-static.justdev.com/fe-platform/3b7969ef184979a942aa0ee10eb0fecbecb5b418.png",
  emptyTitle: "我是用户自定义的空状态标题",
});
const loadingConfig = ref({
  loadingIcon: "red",
});
const bulletBaseData = [
  {
    b: "",
    a: [46696, 87204],
  },
];
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

const dimensions = ref(["date"]);
const metrics = ref(["展现量", "点击率", "曝光率"]);
const isLoading = ref(true);
const chartEvents = {
  click: {
    callback(e) {
      console.log(e);
    },
  },
};
setTimeout(() => {
  isLoading.value = false;
}, 1000);

const legendSelectChanged = (r) => {
  console.log("legendSelectChanged", r);
};

const chartConfig = ref({
  legend: {
    // 图例icon类型： 'circle' | 'square' | 'line', 默认为 'circle'
    icon: "line",
  },
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
  yAxis: [
    {
      name: "展现量",
      type: "value",
      nameTextStyle: {
        color: "red",
      },
    },
    {
      name: "点击率",
      type: "value",
      nameTextStyle: {
        color: "green",
      },
    },
  ],
});
const chartData = ref([
  { date: "2023-11-11", 展现量: 41, 点击率: "18", 曝光率: "10" },
  { date: "2023-11-12", 展现量: 41, 点击率: "17", 曝光率: "20" },
  { date: "2023-11-13", 展现量: 49, 点击率: "20.36", 曝光率: "10" },
  { date: "2023-11-14", 展现量: 40, 点击率: "20.52", 曝光率: "12" },
]);
const click = () => {
  setTimeout(() => {
    dimensions.value = ["date"];
    metrics.value = ["money", "age", "rebalance"];
    chartData.value = [
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
    ];
    // chartData.value = [
    //   { date: "2023-12-30", 展现量: "0", 点击量: "2462462" },
    //   { date: "2023-12-31", 展现量: "0", 点击量: "1231231" },
    //   { date: "2024-01-01", 展现量: "0", 点击量: "1231231" },
    //   { date: "2024-01-07", 展现量: "0", 点击量: "200" },
    //   { date: "2024-01-08", 展现量: "10", 点击量: "400" },
    // ];
  }, 2000);
};
const dimensions1 = ref(["date"]);
const metrics1 = ref(["money", "age", "rebalance"]);
const chartData1 = ref([
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
  {
    date: "2022-09-15",
    money: 11,
    age: 20,
    rebalance: 14,
  },
]);
const pieConfig = ref({
  // legend: {
  //   formatter: () => {
  //     return 123
  //   },
  //   icon: 'square',
  // },
  // label: {
  //   show: true,
  // },
});
const pieData = [
  {
    name: "长津湖",
    percent: 0.4,
  },
  {
    name: "我和我的父辈",
    percent: 0.2,
  },
  {
    name: "失控玩家",
    percent: 0.18,
  },
  {
    name: "宝可梦",
    percent: 0.15,
  },
  {
    name: "峰爆",
    percent: 0.05,
  },
  {
    name: "其他",
    percent: 0.02,
  },
];
const circleConfig = ref({
  circleCenter: {
    mainTitle: "季度分析",
    mainLabel: 10000,
    mainTitleStyle: {
      marginTop: "24px",
      fontSize: "32px",
      fontWeight: 600,
    },
    mainLabelStyle: {
      marginTop: "12px",
      fontSize: "32px",
      fontWeight: 600,
    },
  },
});
const circleData = [
  {
    name: "长津湖",
    percent: 40,
  },
  {
    name: "我和我的父辈",
    percent: 22,
  },
  {
    name: "失控玩家",
    percent: 18,
  },
  {
    name: "宝可梦",
    percent: 15,
  },
  {
    name: "峰爆",
    percent: 5,
  },
  {
    name: "其他",
    percent: 20,
  },
];
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
</style>
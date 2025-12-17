<template>
  <Line :chartData="chartData" :dimensions="dimensions" :metrics="metrics" :chartConfig="chartConfig"
    :isLoading="isLoading" />
</template>

<script setup>
import { ref } from 'vue'
import { Line } from '../../src';
const dimensions = ref(['date'])
const metrics = ref(['money', 'age', 'rebalance'])
const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const chartConfig = ref({
  title: {
    text: '基础折线图',
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
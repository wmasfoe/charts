<template>
  <Sankey :dimensions="['test', 'target']" :column-title="title" :metrics="['value']" height="600" :chart-data="chartData" :chartConfig="chartConfig" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Sankey from '../../src/packages/sankey/index'
import { SankeyChartConfig } from '../../src/const/interface/sankey'

const chartData = ref([
  {
    test: 'a',
    target: 'a1',
    value: 5
  },
  {
    test: 'b',
    target: 'c',
    value: 2
  },
  {
    test: 'a',
    target: 'a2',
    value: 3
  },
  {
    test: 'b',
    target: 'b1',
    value: 8
  },
  {
    test: 'a',
    target: 'b1',
    value: 3
  },
  {
    test: 'a',
    target: 'c',
    value: 3
  },
])

const chartConfig = ref<SankeyChartConfig>({
  legendVisible: false,
  canClick: true,
  gridVisible: true,
  grid: {
    show: false
  },
  width: '90%',
  labelMap: {
    'Total': '总数',
    Environment: 'AAAA',
    'Land use': 'BBBB'
  },
  tooltip: {
    show: true,
    digit: 1,
    valueType: 'normal'
  }
  // emphasis: {
  //       itemStyle: {
  //           color: 'red'
  //       },
  //       lineStyle: {
  //           color: 'green'
  //       }
  //   },
  //   blur: {
  //       itemStyle: {
  //           color: 'blue'
  //       },
  //       lineStyle: {
  //           color: 'yellow'
  //       },
  //       label: {
  //           color: 'red'
  //       }
  //   }
})

const title = {
  title: ['一级', '二22222级', '三级', '四级'],
  link: ['资产关系']
}
</script>
<style lang="stylus" scoped>
</style>

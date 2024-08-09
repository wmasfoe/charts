<template>
  <StatisticCard
    :chartData="cardData"
    :chartConfig="chartConfig"
    @selected="handleCardSelect"
  >
    <template #moreDetail="{ data }">
      <a v-if="data.__index === 0" href="#">查看更多-{{ data.title }} ></a>
    </template>
    <template #headRight="{ data }">
      <span v-if="data.__index === 0" class="desc">数据截止时间：2024-01-01</span>
    </template>
  </StatisticCard>

  <BubbleDemo />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { StatisticCard } from '../src/index.ts'
import BubbleDemo from './components/BubbleDemo.vue'

const chartConfig = ref({
  multiple: false,
  titleStyle: {
    fontSize: '14px'
  },
  titlePosition: 'right'
})

const cardData = Array.from({ length: 3 }).map((i, index) => ({
  title: `销售额${index + 1}`,
  tips: '测试提示条',
  tagList: ['一级指标', '成交'],

  amount: '123456',
	unit: '元',
	thumbUrl: '//picasso-static.justdev.com/fe-platform/6daa2abcd411e6eca4bdab395c71e86cddbaa93b.png',
  
	detailList: [{
    label: '环比',
    value: '+122.98',
    unit: '%'
  }, {
    label: '上月同期',
    value: '-122.98',
    tips: '上月同期提示~~',
    unit: '%'
  }, {
    label: '成交大盘',
    value: '122.98',
    unit: '%',
    type: 'none'
  }],
	progressList: [{
    label: '目标进展',
    progress: '48.8'
  }, {
    label: '目标进展',
    progress: '48.8'
  }],
	judgeInfo: {
    tag: '优秀',
    tagInfo: {
      color: '#008F29',
      backgroundColor: 'rgba(0, 168, 48, 0.10)',
    },
    description: '超过了10%的人'
  }
}))

function handleCardSelect(selected, lastSelected) {
  console.log('selected:', selected, lastSelected);
}
</script>
<style>
.desc {
  color: rgba(0, 0, 0, 0.45);
  flex: 1;
  text-align: right;
}
</style>

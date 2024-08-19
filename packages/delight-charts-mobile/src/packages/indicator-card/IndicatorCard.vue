<template>
  <div class="wrap">
    <div v-if="props.title" class="card-title">{{ props.title }}</div>
    <div class="indicator-container">
      <template
        v-for="(item, index) in props.chartData"
        :key="item.title"
      >
        <IndicatorCardItem
          :column="props.column"
          :chart-data="item"
          :focus="focusIndex.includes(item.title)"
          :chart-config="chartConfig"
          :focus-color="getFocusColor"
          @touchend="() => handleSelect(item.title)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import deepmerge from 'deepmerge'
import { cloneDeep, countBy, mapKeys } from 'lodash'
import { colors } from '@dx/reds-h5-style/src'
import '@dx/reds-h5-style/src/color/theme/index.styl'
import '@dx/reds-h5-style/src/color/always/index.global.styl'
import '@dx/reds-h5-style/src/color/light/index.global.styl'
import '@dx/reds-h5-style/src/color/dark/index.global.styl'

import IndicatorCardItem from './IndicatorCardItem.vue'
import { DataType, ChartConfig } from '../../interface/indicatorCard'

const defaultChartConfig: ChartConfig = {
  align: 'left',
  tipsPlacement: 'top',
  emptyText: '--',
  upColor: 'rgb(0, 168, 48)',
  downColor: 'rgb(240, 56, 96)',
  upIdentify: '+',
  downIdentify: '-',
  border: true,
  tooltipType: 'tooltip',
  multiple: false,
  focusColors: [colors.ThemePrimary]
}

const props = withDefaults(
  defineProps<{
    title: string;
    column?: number;
    columnWidth?: {index: number | string, width: number | string}[];
    chartData: DataType[];
    chartConfig?: ChartConfig;
  }>(),
  {
    chartData: () => [],
    chartConfig: () => ({}),
    column: 1,
    
  }
);
const emit = defineEmits(['touchend'])

// 实际使用的chartConfig
const chartConfig = computed<ChartConfig>(() => deepmerge(defaultChartConfig, props.chartConfig))
const upColor = computed(() => chartConfig.value.upColor)
const downColor = computed(() => chartConfig.value.downColor)

const align = computed(() => chartConfig.value.align === 'center' ? 'center' : 'flex-start')
const gridColumn = computed(() => props.column || 1)
const templateColumns = computed(() => {
  if(!Array.isArray(props.columnWidth) || props.columnWidth?.length < 1) {
    return `repeat(${gridColumn.value}, minmax(0, 1fr))`
  }
  const arr = (new Array(props.column)).fill('1')
  const res = arr.map((v, index) => {
    const currentColumnWidth = props?.columnWidth?.find?.(item => +item.index === index + 1)?.width || '1fr'
    return `${currentColumnWidth}`
  })
  return res.join(' ')
})

const focusIndex = ref<string[]>([])
const handleSelect = (key: any) => {
  if(focusIndex.value.includes(key)) {
    focusIndex.value = focusIndex.value.filter(v => v !== key)
    return
  }
  // 多选
  if(props.chartConfig?.multiple) {
    // 限制选择个数
    if(typeof props.chartConfig?.multiple === 'number' && focusIndex.value.length >= props.chartConfig?.multiple) {
      // 移除第一个
      focusIndex.value.shift()
    }
    focusIndex.value.push(key)
  } else {
    focusIndex.value = [key]
  }
  emit('touchend', focusIndex.value)
}

const colorIndex = ref(0)
const colorList = ref<string[]>([])
const getFocusColor = (type: boolean, color?: string) => {
  const colorRes = props.chartConfig?.focusColors?.map(v => colors[v] || v)
  const c = colorRes?.[colorIndex.value % colorRes?.length] || '#FF2442'
  // true 高亮 false 取消高亮
  if(type) {
    colorIndex.value += 1

    const colorCount = countBy(colorList.value)
    const minCount = Math.min(...Object.values(colorCount))
    const minKeys = []
    mapKeys(colorCount, (value, key) => {
      if(value === minCount) {
        minKeys.push(key)
      }
    })

    colorList.value.push(c)
  } else {
    colorIndex.value -= 1
    const index = colorList.value.findIndex(v => v === color)
    const res: string[] = []
    colorList.value.forEach((v, i) => {
      if(i !== index) {
        res.push(v)
      }
    })
    colorList.value = cloneDeep(res)
  }
  return c
}
</script>

<style lang="stylus" scoped>
.wrap {
  --default-bg-color: transparent;
  --active-bg-color: rgba(48, 48, 52, 0.03);
  --focus-bg-color: rgba(255, 36, 66, 0.03);
  --focus-active-bg-color: rgba(255, 36, 66, 0.06);

  --default-border-color: rgba(0, 0, 0, 0.08);
  --active-border-color: rgba(0, 0, 0, 0.08);
  --focus-border-color: #FF2442;
  --focus-active-border-color: #FF2442;

  --default-title-color: var(--light-labels-paragraph, rgba(0, 0, 0, 0.62));
  --active-title-color: var(--light-labels-title, rgba(0, 0, 0, 0.80));
  
  --align: v-bind(align);
  --column: v-bind(gridColumn);

  --bg-color: var(--default-bg-color);
  --border-color: var(--default-border-color);
  --border-width: 1px;
  --bar-bg-color: #3030341A;
  --bar-color: #FF2442;
  // --value-up-color: #f03860;
  --value-up-color: v-bind(upColor);
  // --value-down-color: #2CAE58;
  --value-down-color: v-bind(downColor);
  --transition-delay: 100ms;

  @font-face {
    font-family: 'REDNumber'; /* 自定义字体名称 */
    src: url("./../../assets/REDNumber-Regular.ttf") format('truetype'); /* 正常字体文件 */
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'REDNumber';
    src: url("./../../assets/REDNumber-Bold.ttf") format('truetype'); /* 加粗字体文件 */
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'REDNumber';
    src: url("./../../assets/REDNumber-Medium.ttf") format('truetype'); /* 中等粗细字体文件 */
    font-weight: 500; /* 或使用 'medium' */
    font-style: normal;
  }
}
.wrap {
  padding: 16px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 16px;
  background-color: #fff;
  border-radius: 8px;

  .indicator-container {
    display: grid;
    grid-template-columns: v-bind(templateColumns);
    gap: 8px;
  }
}
</style>

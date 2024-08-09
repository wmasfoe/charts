<template>
  <div ref="refStatisticCardContainer" class="statistic-card-container">
    <div 
      v-if="showArrow" 
      class="statistic-card-icon left"
      :class="{
        loading: leftLoading,
        disabled: pageIndex === 1
      }"
      @click="handleLeftIconClick"
    >
      <svg v-if="leftLoading" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="padding: 4px">
        <path 
          d="M7.99998 4.26665C5.93812 4.26665 4.26665 5.93812 4.26665 7.99998C4.26665 10.0618 5.93812 11.7333 7.99998 11.7333C10.0618 11.7333 11.7333 10.0618 11.7333 7.99998C11.7333 7.66861 12.0019 7.39998 12.3333 7.39998C12.6647 7.39998 12.9333 7.66861 12.9333 7.99998C12.9333 10.7246 10.7246 12.9333 7.99998 12.9333C5.27538 12.9333 3.06665 10.7246 3.06665 7.99998C3.06665 5.27538 5.27538 3.06665 7.99998 3.06665C8.33135 3.06665 8.59998 3.33528 8.59998 3.66665C8.59998 3.99802 8.33135 4.26665 7.99998 4.26665Z" 
          fill="black" 
          fill-opacity="0.67"
        />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill="white"/>
          <path 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M14.8047 7.52861C15.065 7.78896 15.065 8.21107 14.8047 8.47141L11.2761 12L14.8047 15.5286C15.065 15.789 15.065 16.2111 14.8047 16.4714C14.5443 16.7318 14.1222 16.7318 13.8619 16.4714L9.86189 12.4714C9.60154 12.2111 9.60154 11.789 9.86189 11.5286L13.8619 7.52861C14.1222 7.26826 14.5443 7.26826 14.8047 7.52861Z" 
            fill="black" 
            :fill-opacity="pageIndex === 1 ? 0.28 : 0.67"
          />
      </svg>
    </div>
    <div class="statistic-card-list">
      <StatisticCardItem 
        v-for="chartItem in showData" 
        :key="chartItem.__index"
        :style="{
          width: chartConfig.width ? (+chartConfig.width + 12) + 'px' : 'auto',
          ...chartConfig?.customStyle,
        }"
        :class="{
          selected: selectedIndexList?.includes(chartItem.__index),
          'statistic-card-item': true,
          'could-selected': config.couldSelected
        }"
        :selected="selectedIndexList?.includes(chartItem.__index)"
        :mainColor="chartItem.__color"
        :data="chartItem"
        :config="config"
        @click="() => handleClickItem(chartItem.__index)"
      >
        <template #headRight="{ data: itemData }">
          <slot name="headRight" :data="itemData"/>
        </template>
        <template #moreDetail="{ data: itemData }">
          <slot name="moreDetail" :data="itemData"/>
        </template>
        <template #footer="{ data: itemData }">
          <slot name="footer" :data="itemData" />
        </template>
      </StatisticCardItem>
    </div>
    <div 
      v-if="showArrow" 
      class="statistic-card-icon right"
      :class="{
        loading: rightLoading,
        disabled: isEnd
      }"
      @click="handleRightIconClick"
    >
      <svg v-if="rightLoading" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="padding: 4px">
        <path 
          d="M7.99998 4.26665C5.93812 4.26665 4.26665 5.93812 4.26665 7.99998C4.26665 10.0618 5.93812 11.7333 7.99998 11.7333C10.0618 11.7333 11.7333 10.0618 11.7333 7.99998C11.7333 7.66861 12.0019 7.39998 12.3333 7.39998C12.6647 7.39998 12.9333 7.66861 12.9333 7.99998C12.9333 10.7246 10.7246 12.9333 7.99998 12.9333C5.27538 12.9333 3.06665 10.7246 3.06665 7.99998C3.06665 5.27538 5.27538 3.06665 7.99998 3.06665C8.33135 3.06665 8.59998 3.33528 8.59998 3.66665C8.59998 3.99802 8.33135 4.26665 7.99998 4.26665Z" 
          fill="black" 
          fill-opacity="0.67"
        />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="12" fill="white"/>
          <path 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M14.8047 7.52861C15.065 7.78896 15.065 8.21107 14.8047 8.47141L11.2761 12L14.8047 15.5286C15.065 15.789 15.065 16.2111 14.8047 16.4714C14.5443 16.7318 14.1222 16.7318 13.8619 16.4714L9.86189 12.4714C9.60154 12.2111 9.60154 11.789 9.86189 11.5286L13.8619 7.52861C14.1222 7.26826 14.5443 7.26826 14.8047 7.52861Z" 
            fill="black" 
            :fill-opacity="isEnd ? 0.28 : 0.67"
          />
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, defineProps, computed, defineEmits, onMounted, nextTick, watch } from 'vue'
  import StatisticCardItem from './components/StatisticCardItem.vue'
  import { StatisticCardConfig, StatisticCardData } from '../../const/interface/statistic-card'
  import debounce from 'lodash/debounce'
  
  const props = defineProps({
    chartData: {
      type: Array as () => StatisticCardData[],
      default: () => [],
      required: true,
    },
    chartConfig: {
      type: Object as () => StatisticCardConfig,
      default: () => ({}),
    },
  })
  type SelectedStatisticCardData = StatisticCardData & { __index?: number, __color?: string }
  const emits = defineEmits<{
    (
      e: 'selected', 
      selectedItemList: SelectedStatisticCardData | SelectedStatisticCardData[] | null,
      lastSelectedItemList: SelectedStatisticCardData | SelectedStatisticCardData[] | null
    ): void,
    (
      e: 'update:defaultValues', 
      defaultValues: number | number[]
    ): void
  }>()
  
  const defaultMultipleColorList = [
      // 默认标准十色, 多选默认颜色序列
      'rgba(74, 124, 255, 1)',
      'rgba(255, 139, 31, 1)',
      'rgba(0, 184, 245, 1)',
      'rgba(246, 193, 34, 1)',
      'rgba(88, 103, 157, 1)',
      'rgba(70, 207, 117, 1)',
      'rgba(144, 96, 240, 1)',
      'rgba(255, 102, 122, 1)',
      'rgba(15, 179, 157, 1)',
      'rgba(231, 126, 231, 1)'
    ]
  const defaultChartConfig = {
    multiple: false,
    emptyText: '--',
    upColor: 'rgb(240, 56, 96)',
    upIdentify: '+',
    downColor: 'rgb(0, 168, 48)',
    downIdentify: '-',
    couldSelected: true,
    showPagination: true,
    shouldShowMultipleColor: false,
    multipleColorList: defaultMultipleColorList,
    hideHoverStyle: false
  }
  const refStatisticCardContainer = ref()

  // 选中的项
  const selectedIndexList = computed<number[]>({
    get() {
      if (Array.isArray(props.chartConfig.defaultValues)) {
        return props.chartConfig.defaultValues as number[]
      }
      return [props.chartConfig.defaultValues as number].filter(i => (!!i || i === 0))
    },
    set(value) {
      const result = props.chartConfig.multiple ? value : value[0]
      props.chartConfig.defaultValues = result
      emits('update:defaultValues', result)
    }
  })
  // 第x项的颜色
  const chartColorMap = ref({})
  defineExpose({
    chartColorMap: chartColorMap.value
  })
  // 实际使用的chartData
  const chartData = computed(() => {
    const dataList = props.chartData || []
    return dataList.slice(0).map((item, index) => ({
      ...item,
      __index: index,
      __color: chartColorMap.value[index]
    }))
  })
  
  // 实际使用的chartConfig
  const config = computed(() => {
    return {
      ...defaultChartConfig,
      ...(props.chartConfig || {}),
      defaultValues: selectedIndexList.value
    }
  })
  
  // 实际使用的多种颜色
  const multipleColorList = computed(() => {
    const { shouldShowMultipleColor, multiple } = config.value
    if (!shouldShowMultipleColor || !multiple) {
      // 如果不使用多选下的多色值，或者非多选，则只使用默认蓝色
      return [
        defaultMultipleColorList[0]
      ]
    }
    if (config.value.multipleColorList?.length > 0) {
      return config.value.multipleColorList
    }
    return defaultMultipleColorList
  })

  // 对于defaultValues传入的情况，配入颜色
  watch(() => selectedIndexList.value, (newValue: number[], oldValue: number[]) => {
    if (newValue.join() === oldValue.join()) {
      // 相同不处理
      return
    }

    if (oldValue.length === 0) {
      // 如果原来为空
      newValue.forEach((itemIndex, index) => {
        chartColorMap.value[itemIndex] = multipleColorList.value[index % multipleColorList.value?.length]
      })
      return
    }
    updateChangeColor()
  })

  const updateChangeColor = debounce(() => {
    // 用新传入的值与chartColorMap中已有的值进行计算删除项与增加项
    const existsList = Object.keys(chartColorMap.value).map(i => +i)
    const deleteList = existsList.filter(i => !selectedIndexList.value?.includes(+i))
    const addList = selectedIndexList.value?.filter(i => !existsList.includes(+i))

    deleteList.forEach(i => {
      delete chartColorMap.value[i]
    })

    addList.forEach(i => {
      changeColor(i)
    })    
  })

  function changeColor(index: number) {
    // 处理色值问题，如果有，则取消其色值，如果没有，则计算当前应该什么颜色并添加
    const curUsingColorList = Object.values(chartColorMap.value)
    if (curUsingColorList?.length > 0 && multipleColorList.value?.length > 1) {
      // 如果当前有选中，且备选色值大于1个，则进行计算，选取首个比【multipleColorList中出现次数最大值】小的那个
      // 如果没有则还用第0个（兼容选中特别多的情况
      const colorCountList = multipleColorList.value.map(color => curUsingColorList.filter(i => i === color)?.length)
      const minCount = Math.min.apply(null, colorCountList)

      let resultColor = multipleColorList.value[0]
      multipleColorList.value.some((curColor) => {
        const curColorCount = curUsingColorList.filter(i => i === curColor)?.length || 0
        if (curColorCount === minCount) {
          // 选出第一个为最少出现的色值即可
          resultColor = curColor
          return true
        }
        return false
      })

      chartColorMap.value[index] = resultColor
    } else {
      // 无值则赋值第0个颜色
      chartColorMap.value[index] = multipleColorList.value[0]
    }
  }

  // click选中之后的触发函数
  function handleClickItem(index: number) {
    if (!config.value.couldSelected) {
      return
    }

    const matchedIndex = selectedIndexList.value.indexOf(index)
    const lastSelectedList = selectedIndexList.value.slice(0)
    let curSelectedIndexList: number[] = []
    if (matchedIndex > -1) {
      // 已有则删除
      curSelectedIndexList = selectedIndexList.value.filter((i, index) => index !== matchedIndex)
    } else {
      if (config.value.multiple) {
        // 如果是多选的话，则去除已有的，重新push进去
        curSelectedIndexList = [...(selectedIndexList.value || []), index]
      } else {
        // 如果是单选，则只选中一个
        curSelectedIndexList = [index]
      }
    }
    selectedIndexList.value = curSelectedIndexList

    nextTick(() => {
      const matchedItemList = curSelectedIndexList.map(i => {
        const item = chartData.value.find(data => data.__index === i)
        if (!item) {
          return null
        }
        
        const {
          __color,
          ...chartDataItem
        } = item
        return chartDataItem
      }) as SelectedStatisticCardData[]
      const selectedItemList = config.value.multiple ? matchedItemList : (matchedItemList[0] || null)
  
      const lastMatchedItemList = lastSelectedList.map(i => {
        const item = chartData.value.find(data => data.__index === i)
        if (!item) {
          return null
        }
        const {
          __color,
          ...chartDataItem
        } = item
        return chartDataItem
      }) as SelectedStatisticCardData[]
      const lastSelectedItemList = config.value.multiple ? lastMatchedItemList : (lastMatchedItemList[0] || null)
      emits('selected', selectedItemList, lastSelectedItemList)
    })
  }

  function getDefaultShowCount() {
    const containerWidth = refStatisticCardContainer.value?.getClientRects?.()?.[0]?.width
    if (containerWidth > 1600) {
      return 5
    }
    if (containerWidth > 1280) {
      return 4
    }
    return Math.floor(containerWidth / 238)
  }
  const pageIndex = ref(1)
  const pageSize = ref(0)
  const showArrow = computed(() => {
    return (config.value.showPagination) && (chartData.value?.length > pageSize.value)
  })
  const isEnd = computed(() => pageIndex.value * pageSize.value >= chartData.value?.length)
  // 展示的当屏数据
  const showData = computed(() => {
    if (!config.value.showPagination) {
      return chartData.value.slice(0)
    }
    if (isEnd.value) {
      pageIndex.value = Math.ceil(chartData.value?.length / pageSize.value)
      return chartData.value.slice(-pageSize.value, chartData.value.length)
    }
    if (pageIndex.value < 1) {
      pageIndex.value = 1
    }
    return chartData.value.slice((pageIndex.value - 1) * pageSize.value, pageIndex.value * pageSize.value)
  })

  const leftLoading = ref(false)
  const rightLoading = ref(false)
  function handleLeftIconClick() {
    if (leftLoading.value || pageIndex.value === 1) {
      return
    }
    leftLoading.value = true
    setTimeout(() => {
      leftLoading.value = false
      pageIndex.value -= 1
    }, 200)
  }
  function handleRightIconClick() {
    if (rightLoading.value || isEnd.value) {
      return
    }
    rightLoading.value = true
    setTimeout(() => {
      rightLoading.value = false
      pageIndex.value += 1
    }, 200)
  }

  onMounted(() => {
    pageSize.value = (+config.value.showCount) || getDefaultShowCount();
  })
  
</script>
<style scoped>
.statistic-card-container {
  width: 100%;
  display: flex;
  align-items: center;
}
.statistic-card-container .statistic-card-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}
.statistic-card-container .statistic-card-icon.left {
  margin-right: 12px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.20);
}
.statistic-card-container .statistic-card-icon.right {
  margin-left: 12px;
  transform: rotate(180deg);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.20);
}
.statistic-card-container .statistic-card-icon.disabled {
  cursor: not-allowed;
}
.statistic-card-container .statistic-card-list {
  flex: 1;
  display: flex;
  gap: 0 12px;
}

</style>
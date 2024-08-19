<template>
  <div 
    class="statistic-card-wrapper" 
    :class="[
      chartConfig.type === 'arealy' ? 'arealy' : '',
      chartConfig.width ? '' : 'min-width',
      chartConfig.hideHoverStyle ? 'hide-hover' : ''
    ]"
  >
    <div class="header-wrapper">
      <img v-if="data.headImg" class="statistic-card-headerimg" :src="data.headImg" :style="data.headImgStyle || {}"/>
      <div class="statistic-card-headerwrapper">
        <div class="statistic-card-header">
          <div v-if="tagList.length && titlePosition === 'right'" class="header-tag-wrapper">
            <Tags v-for="tag in tagList" :key="tag.value" class="header-tag-item" :name="tag.value" :style="(tag.style || {})" />
          </div>
          <Tooltip 
            v-if="chartConfig.tipsType === 'line'" 
            :placement="chartConfig.tipsPlacement || 'top'" 
            :content="data.tips"
          >
            <div class="statistic-card-title">
              <span
                :style="{ maxWidth: titleMaxSize, ...(titleStyle || {}) }"
                class="dotted"
              >{{ data.title }}</span>
            </div>
          </Tooltip>
          <div v-else class="statistic-card-title">
            <span :style="(titleStyle || {})">{{ data.title }}</span>
            <Tooltip 
              v-if="data.tips" 
              :placement="chartConfig.tipsPlacement || 'top'" 
              :content="data.tips"
            >
              <img
                src="../../../assets/Help.png"
                style="width: 14px; height: 14px;"
              />
            </Tooltip>
          </div>
          <div v-if="tagList.length && titlePosition !== 'right'" class="header-tag-wrapper">
            <Tags v-for="tag in tagList" :key="tag.value" class="header-tag-item" :name="tag.value" :style="(tag.style || {})" />
          </div>
          <slot name="headRight" :data="data" />
        </div>
        <div class="statistic-card-row">
          <div>
            <span class="prefix-unit" v-if="data.prefixUnit">{{
              data.prefixUnit
            }}</span>
            <!-- 金额部分保留两位小数 -->
            <span class="card-row-amount">{{ isBlank(amount) || Number.isNaN(+amount) ? chartConfig.emptyText : (data.amountFormat ? data.amountFormat(amount) : (+amount).toLocaleString())  }}</span>
            <span v-if="!isBlank(amount) && +amount !== 0" class="card-row-unit">{{ data.unit || data.suffixUnit || '元' }}</span>
          </div>
          <img v-if="data.thumbUrl" class="card-row-thumb" :src="data.thumbUrl" >
        </div>
      </div>
    </div>
    <div class="statistic-card-main">
      
      <div class="detail-list" :style="detailListStyle">
        <div 
          v-for="item in detailList" 
          :key="item.label"
          class="detail-item"
        >
          <span class="name">{{ item.label }}</span>
          <Tooltip 
            v-if="item.tips"
            :content="item.tips"
          >
            <img
              src="../../../assets/Help.png"
              style="width: 12px; height: 12px;margin-left: 2px;"
            />
          </Tooltip>
          <span 
            v-if="!isBlank(item.value)"
            class="value"
            :class="getClassName(item)"
          >{{ formatValue(item) }}{{ item.unit }}</span>
          <span v-else class="value">{{ chartConfig.emptyText }}</span>
        </div>
        <slot name="moreDetail" :data="data" />
      </div>
      <div v-if="data.progressList?.length" class="statistic-card-row progress-list">
        <div v-for="progressInfo in data.progressList" :key="progressInfo.label" class="progress-item">
          <div class="progress-item-row">
            <div class="name">{{ progressInfo.label }}</div>
            <div v-if="isBlank(progressInfo.progress)" class="value">{{ chartConfig.emptyText }}</div>
            <div v-else class="value">{{ progressInfo.progress }}%</div>
          </div>
          <div class="progress-base-bar">
            <div class="progress-progress-bar" :style="{ width: getProgressValue(progressInfo.progress) }"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.judgeInfo" class="statistic-card-tail">
      <span v-if="data.judgeInfo.tag" class="tag" :style="data.judgeInfo.tagInfo">{{ data.judgeInfo.tag }}</span>
      <span v-if="data.judgeInfo.description" class="description">{{ data.judgeInfo.description }}</span>
    </div>
    <slot name="footer" :data="data" />
    <svg v-if="isMultiple && isSelected" class="selected-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <g clip-path="url(#clip0_1780_1925)">
        <path d="M26 0V22C26 24.2091 24.2091 26 22 26H0L26 0Z" :fill="mainColor"/>
        <path d="M14 18L16.2987 20.2987C16.4054 20.4054 16.5816 20.3939 16.6736 20.2743L21.5 14" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1780_1925">
          <rect width="26" height="26" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, computed, toRefs } from 'vue'
  // import Tooltip from "@dx/delight/components/Popover/Tooltip";
  import Tags from './Tags.vue'
  import { StatisticCardRate, StatisticCardConfig, StatisticCardData } from '../../../const/interface/statistic-card'
  import "./popover.css";

  const props = defineProps({
    data: {
      type: Object as () => StatisticCardData,
      required: true,
    },
    config: {
      type: Object as () => StatisticCardConfig,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false
    },
    mainColor: {
      type: String,
      default: 'rgba(74, 124, 255, 1)'
    },
  })

  function changeRfbaAlpha(rgbaDesc: string, alpha = 1) {
    const rgbaNumList = rgbaDesc.match(/\d+/g)
    return `rgba(${rgbaNumList?.slice(0, 3).join(',')},${alpha})`
  }
  const { data } = toRefs(props)
  // 实际使用的chartConfig
  const chartConfig = computed<StatisticCardConfig>(() => {
    return props.config
  })
  const isMultiple = computed<Boolean>(() => chartConfig.value.multiple)
  const isSelected = computed<Boolean>(() => props.selected)

  const mainColor = computed(() => props.mainColor)
  const mainBgColor = computed(() => {
    if (!isMultiple.value) {
      return '#F8FAFF'
    }
    return changeRfbaAlpha(props.mainColor, 0.05)
  })
  const mainBgActiveColor = computed(() => {
    if (!isMultiple.value) {
      return '#D4DFFF'
    }
    return changeRfbaAlpha(props.mainColor, 0.1)
  })

  const titleMaxSize = computed<string>(() => {
    if (
      chartConfig.value.type !== 'linear' 
      || !chartConfig.value.titleMaxSize 
      || Number.isNaN(chartConfig.value.titleMaxSize)
    ) {
      return 'auto'
    }
    return `${+chartConfig.value.titleMaxSize + 1}em`
  })
  const titleStyle = computed(() => {
    return chartConfig.value?.titleStyle || {}
  })
  const titlePosition = computed<string>(() => {
    return chartConfig.value?.titlePosition || 'left'
  })
  const detailListStyle = computed<Record<string, string | number>>(() => {
    return chartConfig.value?.detailListStyle || {}
  })
  const tagList = computed(() => data.value?.tagList?.length ? data.value.tagList.map(item => {
    if (typeof item === 'string') {
      return {
        value: item,
      }
    }
    return item
  }) : [])
  const amount = computed(() => data.value.value || data.value.amount)
  const upColor = computed(() => chartConfig.value.upColor)
  const downColor = computed(() => chartConfig.value.downColor)

  const detailList = computed(() => {
    const { detailList: dataDetaiList } = data.value
    if (dataDetaiList && dataDetaiList?.length > 0) {
      return dataDetaiList
    }
    // 与indicatorcard做数据兼容
    const { 
      rate, rateLabel, rateSymbol, rateShowTrendIcon,
      subRate, subRateLabel, subRateSymbol, subRateShowTrendIcon
    } = data.value as any

    const rateDetailItem = {
        label: rateLabel,
        value: rate,
        unit: rateSymbol || '%',
        type: rateShowTrendIcon || typeof rateShowTrendIcon === 'undefined' ? '' : 'none'
      }
    const subRateDetailItem = {
        label: subRateLabel,
        value: subRate,
        unit: subRateSymbol || '%',
        type: subRateShowTrendIcon || typeof subRateShowTrendIcon === 'undefined' ? '' : 'none'
      }
    
    const rateDetailList = [rateDetailItem, subRateDetailItem].filter(i => !!i.label)
    if (rateDetailList.length > 0) {
      return rateDetailList
    }
    
    return []
  })

  function isBlank(param: number | string | undefined): boolean {
    return !param && param !== 0
  }
  function getClassName(param: StatisticCardRate): string {
    const { value, type } = param
    if ((!value && value !== 0 ) || (type && ['none', 'text'].includes(type))) {
      return ''
    }
    if (+value > 0) {
      return 'up'
    }
    if (+value < 0) {
      return 'down'
    }
    return ''
  }
  function formatValue(item: {value: number | string, type: string}) {
    const { value, type } = item
    if (type === 'text') {
      return value
    }
    if (isBlank(value)) {
      return chartConfig.value?.emptyText
    }
    const { upIdentify, downIdentify } = chartConfig.value
    if (+value > 0) {
      return `${value}`.startsWith(upIdentify)  ? `${value}` : `${upIdentify}${value}`
    }
    if (+value < 0) {
      return `${value}`.startsWith(downIdentify)  ? `${value}` : `${downIdentify}${value}`
    }
    return value
  }
  
  function getProgressValue(progress: number | string) {
    if (!progress || Number.isNaN(+progress) || +progress < 0) {
      return '0%'
    }
    if (+progress > 100) {
      return '100%'
    }
    return `${+progress}%`
  }

</script>
<style scoped>
.statistic-card-wrapper.min-width {
  min-width: 238px;
}
.statistic-card-wrapper {
  display: inline-block;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  font-family: 'PingFang SC';
  font-size: 12px;
  background-color: #FFFFFF;
  flex: 1;
}
.statistic-card-wrapper.could-selected {
  cursor: pointer;
}
.statistic-card-wrapper:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 16px 0px rgba(0, 0, 0, 0.06), 0px 0px 1px 0px rgba(0, 0, 0, 0.20);
}
.statistic-card-wrapper.hide-hover:hover {
  box-shadow: none;
}
.statistic-card-wrapper.could-selected:active {
  background: rgba(0, 0, 0, 0.02);
}
.statistic-card-wrapper.selected {
  position: relative;
  background-color: v-bind(mainBgColor);
  border-color: v-bind(mainColor);
}
.statistic-card-wrapper.selected:hover {
  box-shadow: 0px 4px 8px 0px rgba(27, 46, 115, 0.06), 0px 4px 16px 0px rgba(27, 46, 115, 0.12);
}
.statistic-card-wrapper.selected:active {
  background-color: v-bind(mainBgActiveColor);
}

.statistic-card-wrapper.arealy {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid transparent;
}
.statistic-card-wrapper.arealy:hover {
  background-color: rgba(0,0,0,.05);
  box-shadow: none;
}
.statistic-card-wrapper .statistic-card-headerwrapper {
  flex: 1;
  overflow: hidden;
}
.statistic-card-wrapper .statistic-card-header {
  display: flex;
  gap: 8px;
}
.statistic-card-wrapper .header-wrapper {
  display: flex;
  align-items: center;
}
.statistic-card-wrapper .header-wrapper .statistic-card-headerimg {
  margin-right: 12px;
}
.statistic-card-wrapper .statistic-card-header .statistic-card-title {
  display: flex;
  gap: 2px;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  line-height: 16px;
  white-space: nowrap;
  font-weight: 500;
}
.statistic-card-wrapper .statistic-card-header .dotted {
  border-bottom: 1px dotted rgba(0, 0, 0, 0.45);
  cursor: pointer;
}
.statistic-card-wrapper .statistic-card-header .header-tag-wrapper {
  display: flex;
  gap: 4px;
  overflow: scroll;
}
.statistic-card-wrapper .header-tag-wrapper .header-tag-item {
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.statistic-card-wrapper .statistic-card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.statistic-card-wrapper .statistic-card-row .prefix-unit {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-right: 2px;
  line-height: 22px;
  font-feature-settings: "tnum" on, "lnum" on;
  color: rgba(0, 0, 0, 0.85);
}
.statistic-card-wrapper .statistic-card-row .card-row-amount {
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  font-family: 'RED Number', 'Inter', 'PingFang SC', 'sans-serif';
  font-weight: 700;
  line-height: 32px;
}
.statistic-card-wrapper .statistic-card-row .card-row-unit {
  padding-left: 2px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 12px;
  font-family: 'PingFang SC';
  font-weight: 500;
  line-height: 20px;
}
.statistic-card-wrapper .statistic-card-row .card-row-thumb {
  width: 56px;
  height: 32px;
}

.statistic-card-wrapper .statistic-card-main .detail-list {
  display: flex;
  gap: 4px 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2px;
}
.statistic-card-wrapper .detail-list .detail-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  font-family: 'PingFang SC';
}

.statistic-card-wrapper .detail-item .name {
  color: #888888;
  white-space: nowrap;
}
.statistic-card-wrapper .detail-item .value {
  padding-left: 4px;
  color: rgba(0, 0, 0, 0.85);
  font-family: 'Inter';
}
.statistic-card-wrapper .detail-item .value.up {
  color: v-bind(upColor);
}
.statistic-card-wrapper .detail-item .value.down {
  color: v-bind(downColor);
}

/* 进度条部分 */
.statistic-card-wrapper .statistic-card-row.progress-list {
  flex-direction: column;
  align-items: flex-start;
  line-height: 16px;
  margin-top: 6px;
}

.statistic-card-wrapper .progress-list .progress-item {
  width: 100%;
}
.statistic-card-wrapper .progress-list .progress-item:not(:last-child) {
  margin-bottom: 4px;
}
.statistic-card-wrapper .progress-list .progress-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-family: 'PingFang SC';
  line-height: 16px;
}

.statistic-card-wrapper .progress-item-row .name {
  color: #888888;
}
.statistic-card-wrapper .progress-item-row .value {
  color: rgba(0, 0, 0, 0.85);
  font-family: 'Inter';
}
.statistic-card-wrapper .progress-list .progress-base-bar {
  width: 100%;
  margin-top: 4px;
  background-color: rgba(0, 0, 0, 0.05);
  height: 4px;
  border-radius: 2px;
}
.statistic-card-wrapper .progress-list .progress-progress-bar {
  background-color: #3C66FF;
  height: 4px;
  border-radius: 2px;
}
.statistic-card-wrapper .statistic-card-tail {
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px dashed rgba(0, 0, 0, 0.08);
  font-size: 12px;
  line-height: 16px;
  font-family: 'PingFang SC';
}
.statistic-card-wrapper .selected-icon {
  position: absolute;
  right: 0;
  bottom: 0;
}

.statistic-card-wrapper .statistic-card-tail .tag {
  padding: 0px 4px;
  margin-right: 4px;
  border-radius: 2px;
  font-weight: 500;
  color: #008F29;
  background-color: #888888;
}
.statistic-card-wrapper .statistic-card-tail .description {
  color: #888888;
}

::-webkit-scrollbar {
  display: none;
}

</style>
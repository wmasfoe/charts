<script lang="ts" setup>
import { ref, computed, watch, CSSProperties } from 'vue'
import { colors, typography } from '@dx/reds-h5-style/src'
import { StatisticCardRate, DataType, ChartConfig } from '../../interface/indicatorCard'
import Tag from './components/Tag.vue'
import Tooltip from "./components/Tooltip.vue";
import Alert from './components/Alert.vue';
import Text from './components/Text.vue';

const props = withDefaults(
  defineProps<{
    chartData: DataType;
    chartConfig?: ChartConfig;
    focus: boolean;
    focusColor: (focus: boolean, color?: string) => string;
    column: number;
  }>(),
  {
    chartConfig: () => ({}),
    focus: false,
    // focusColor:
  }
);
const emit = defineEmits(['touchend']);

const borderWidth = computed(() => {
  if(props.column < 4) {
    return props.chartConfig?.border ? '1px' : '0'
  }
  return '0'
})

const notFocus = computed(() => borderWidth.value === '0')
// 辅助指标排列方向
const detailIndicatorDirection = computed(() => props.chartConfig.detailDirection || 'column')
const detailItemWidth = computed(() => detailIndicatorDirection.value === 'row' ? 'auto' : props.chartConfig?.align === 'center' ? 'auto' : '100%')
const contentRowGap = computed(() => +props.column === 1 ? '4px 8px' : '4px')
const simple = computed(() => {
  if(props.column > 2 && props.chartConfig.simple === undefined) {
    return true
  }
  if(props.chartConfig.simple === 'default') {
    return false
  }
  return props.chartConfig.simple
})

function isBlank(param: number | string | undefined): boolean {
  return !param && param !== 0
}
function formatValue(item: {value: number | string, type: string}) {
  const { value, type } = item
  if (type === 'text') {
    return value
  }
  if (isBlank(value)) {
    return props.chartConfig?.emptyText
  }
  const { upIdentify, downIdentify } = props.chartConfig
  if (+value > 0) {
    return `${value}`.startsWith(upIdentify as string)  ? `<span style="font-family: Inter;">${upIdentify}</span>${Math.abs(+value)}` : `<span style="font-family: Inter;">${upIdentify}</span>${value}`
  }
  if (+value < 0) {
    return `${value}`.startsWith(downIdentify as string)  ? `<span style="font-family: Inter;">${downIdentify}</span>${Math.abs(+value)}` : `<span style="font-family: Inter;">${downIdentify}</span>${value}`
  }
  return value
}

function getClassName(param: StatisticCardRate): string {
  const { value = '', type = '' } = param
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

const defaultPressingBgColor = computed(() => colors['ThemeSeparator'])
// const focusBorderColor = computed(() => props.focusColor?.())
// const focusBgColor = computed(() => props.focusColor?.())
const getProgressBarColor = (c) => {
  return colors?.[c] || c || colors.ThemePrimary
}

// reds token 计算
const titleStyle: CSSProperties = {
  fontSize: typography.FontSize.T3,
  fontWeight: typography.FontWeight.Regular,
}
const amountStyle: CSSProperties = {
  fontSize: typography.FontSize.Label,
  fontWeight: typography.FontWeight.Bold,
}

const focusBorderColor = ref()
const focusBgColor = ref()
const handleTouchend = (focus) => {
  const c = props.focusColor?.(!focus, focusBgColor.value)
  focusBorderColor.value = c
  focusBgColor.value = c
  emit('touchend', props.chartData.title)
}
</script>

<template>
  <div
    :class="['container', !notFocus ? 'border-container' : '', props.focus && !notFocus ? 'focus' : '']"
    @touchend="handleTouchend(props.focus)"
  >
    <div class="header">
      <div class="title-wrap">
        <Text type="T3" line-height="T3Label" class="title ellipsis" :style="titleStyle">{{ chartData.title }}</Text>
        <Tooltip
          v-if="chartData.tips && chartConfig.tooltipType === 'tooltip'"
          :placement="chartConfig.tipsPlacement"
          :tooltip="chartData.tips"
        />
        <Alert
          v-if="chartData.tips && chartConfig.tooltipType === 'modal'"
          :tips="chartData.tips"
        />
        <div class="tags">
          <template v-if="!simple">
            <Tag v-for="tag in chartData.tagList" :key="tag.value" :name="tag.value" v-bind="tag" />
          </template>
        </div>
      </div>
      <p class="amount" :style="amountStyle">
        <Text type="T1" weight="Bold" line-height="T1Label">{{ chartData.amount || props.chartConfig.emptyText }}</Text>
        <Text type="T3" weight="Bold" line-height="T3Label" class="unit-symbol">{{ chartData.unit }}</Text>
      </p>
    </div>
    <div v-if="props.chartData?.detailList?.length > 0 && !simple" class="content">
      <div v-for="rate in chartData.detailList" :key="rate.label" class="detail-item">
        <Text
          type="Micro"
          line-height="MicroLabel"
          class="detail-label ellipsis"
        >{{ rate.label }}</Text>
        <Text 
          v-if="!isBlank(rate.value)"
          type="Micro"
          weight="Medium"
          line-height="MicroLabel"
          class="detail-value"
          :class="getClassName(rate)"
          v-html="formatValue(rate) + rate.unit"
        >
        </Text>
        <Text
          v-else
          type="Micro"
          weight="Medium"
          line-height="MicroLabel"
          class="detail-value"
        >{{ chartConfig.emptyText }}</Text>
      </div>
    </div>
    <template v-if="!simple">
      <div class="progress-container" v-for="progressItem in props.chartData?.progressInfo" :key="progressItem.label">
        <div class="progress-label">
          <span>{{ progressItem.label }}</span>
          <Text
            type="Micro"
            weight="Medium"
            line-height="MicroLabel"
            color="AlwaysDarkParagraph"
          >{{ progressItem.progress }}</Text>
        </div>
        <div class="progress">
          <div class="progress-bar" :style="{width: progressItem.progress, backgroundColor: getProgressBarColor(progressItem.color)}"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="stylus">
.container {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  
  padding: 10px 12px;
  border-radius: 6px;
  border: 0.5px solid var(--border-color);
  border-width: v-bind(borderWidth);

  height: fit-content;

  transition:
    background-color var(--transition-delay),
    color var(--transition-delay),
    border var(--transition-delay);
  box-sizing: border-box;

  &:active {
    --bg-color: var(--active-bg-color);
    --border-color: var(--active-border-color);
  }
  &.focus {
    --bg-color: var(--focus-bg-color);
    --border-color: v-bind(focusBorderColor);
    .title {
      color: var(--active-title-color) !important;
      font-weight: 500 !important;
    }
  }
  &.focus:active {
    --bg-color: var(--focus-active-bg-color);
  }

  .header {
    display: flex;
    flex-flow: column nowrap;
    align-items: var(--align);
    gap: 6px;
    .title-wrap {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 2px;
      height: 16px;
      .tags {
        margin-left: 2px;
        display: flex;
        gap: 2px;
      }
    }
    .title {
      margin: 0;
      font-family: PingFang SC;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      color: var(--default-title-color);
      transition: color var(--transition-delay);
      height: 16px;
    }

    .amount {
      margin: 0;
      color: var(--light-labels-title, rgba(0, 0, 0, 0.80));
      font-family: REDNumber, -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;
      gap: 2px;

      letter-spacing: normal;

      & .unit-symbol {
        font-size: 12px;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: v-bind(detailIndicatorDirection);
    flex-wrap: wrap;
    align-items: var(--align);
    gap: v-bind(contentRowGap);
    p {
      margin: 0;
    }
    .detail-item {
      width: v-bind(detailItemWidth);
      display: flex;
      flex-flow: row nowrap;
      gap: 4px;
      font-size: 10px;
      font-style: normal;
    }
  }
}

.progress-container {
  display: flex;
  justify-content: var(--align);
  flex-flow: column nowrap;
  align-items: flex-start;
  gap: 3px;
  .progress-label {
    color: var(--light-labels-description, rgba(0, 0, 0, 0.45));
    font-family: PingFang SC;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;

    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .progress {
    width: 100%;
    height: var(--border-radius-default, 4px);
    background-color: var(--bar-bg-color);
    border-radius: 4px;
    .progress-bar {
      height: var(--border-radius-default, 4px);
      background-color: var(--bar-color);
      border-radius: 4px; 
    }
  }
}

.detail-label {
  color: var(--light-labels-description, rgba(0, 0, 0, 0.45));
  font-family: PingFang SC;
  font-weight: 400;
}
.detail-value {
  color: var(--light-labels-paragraph, rgba(0, 0, 0, 0.62));
  font-family: REDNumber;
  font-weight: 500;
  white-space: nowrap;

  &.up {
    color: var(--value-up-color);
  }
  &.down {
    color: var(--value-down-color);
  }
}

.border-container::after {
  content: " ";
  background-color: transparent;
  width: 50px;
  height: 50px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0.3;
  opacity: 0;
  transition:
    background-color var(--transition-delay),
    color var(--transition-delay),
    opacity var(--transition-delay),
    border var(--transition-delay);
}
.border-container:active::after {
  background-color: v-bind(defaultPressingBgColor);
  opacity: 0.3;
}
.container.focus::after {
  background-color: v-bind(focusBgColor);
  opacity: 0.03;
}
.container.focus:active::after {
  opacity: 0.06;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<template>
  <div class="indicator-card-content">
    <div
      v-for="(item, idx) in dataList"
      :key="idx"
      :style="{
        width: chartConfig.width ? chartConfig.width + 'px' : 'auto',
        ...chartConfig?.customStyle,
      }"
      @click.stop="handleActive(idx)"
      class="indicator-card"
      :class="{
        active: item.active,
        lastActive: item.lastActive,
        linear: chartConfig.type !== 'arealy',
        arealy: chartConfig.type === 'arealy',
      }"
    >
      <div class="title">
        <div class="flex">
          <span
            :style="{
              maxWidth:
                chartConfig.titleMaxSize && isNumber(chartConfig.titleMaxSize)
                  ? +chartConfig.titleMaxSize + 1 + 'em'
                  : 'auto',
            }"
            v-if="chartConfig.tipsType !== 'line'"
            >{{ item.title }}
          </span>
          <Tooltip
            v-if="chartConfig.tipsType !== 'line'"
            :placement="chartConfig.tipsPlacement || 'top'"
            :content="item.tips"
          >
            <img
              :src="Help"
              style="width: 14px; height: 14px; margin-left: 5px"
            />
          </Tooltip>
          <Tooltip
            v-if="chartConfig.tipsType === 'line'"
            :placement="chartConfig.tipsPlacement || 'top'"
            :content="item.tips"
          >
            <span
              :style="{
                maxWidth:
                  chartConfig.titleMaxSize && isNumber(chartConfig.titleMaxSize)
                    ? +chartConfig.titleMaxSize + 1 + 'em'
                    : 'auto',
              }"
              class="dotted"
            >
              {{ item.title }}
            </span>
          </Tooltip>
        </div>
        <slot name="top-right"></slot>
      </div>
      <p v-if="item.value" class="indicator-card-value">
        <span class="prefix-unit" v-if="item.prefixUnit">{{
          item.prefixUnit
        }}</span>
        <span>{{ Number(item.value).toLocaleString() }}</span>
        <span class="suffix-unit" v-if="item.suffixUnit">{{
          item.suffixUnit
        }}</span>
      </p>
      <p v-if="item.rateLabel" class="rate">
        <span class="rate-label">{{ item.rateLabel }}</span>
        <span class="rate-value" :class="item.class">
          {{ item.rate }}{{ item.rateSymbol ?? "%" }}</span
        >
      </p>
      <p v-if="item.subRateLabel && item.subRate" class="rate">
        <span class="rate-label">{{ item.subRateLabel }}</span>
        <span class="rate-value" :class="item.subClass">
          {{ item.subRate }}{{ item.subRateSymbol ?? "%" }}</span
        >
      </p>
      <img class="img" :src="MainIcon" v-if="item.active" />
      <img class="img" :src="SecondaryIcon" v-if="item.lastActive" />
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch, computed } from "vue";
import "./popover.css";
// import Tooltip from "@dx/delight/components/Popover/Tooltip";
import MainIcon from "../../assets/MainIcon.png";
import SecondaryIcon from "../../assets/SecondaryIcon.png";
import Help from "../../assets/Help.png";
// import dataEmpty from '../assets/data-empty.png';

import { isNull, isNil, isUndefined, isNumber, isEmpty } from "lodash";
const emit = defineEmits(["event"]);
const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
    required: true,
  },
  chartConfig: {
    type: Object,
    default: () => {},
  },
});
const { chartConfig } = toRefs(props);
const isMultiple = computed(() => chartConfig.value.multiple ?? true);
const clickIndex = ref<number>(isMultiple.value ? 2 : 1);
const dataList = ref<Record<string, any>[]>([]);

const handleClass = (r: number) => {
  return r > 0 ? "positive" : r < 0 ? "negative" : "";
};

const getData = () => {
  let defaultValues = isUndefined(chartConfig.value.defaultValues)
    ? [0]
    : chartConfig.value.defaultValues;
  dataList.value = props.chartData.map((o: any, index: number) => {
    let IRate: number | undefined | string = o.rate; //主 占比
    let IsubRate: number | undefined | string = o.subRate; // 次占比
    if (isNil(IRate)) IRate = 0;
    if (isNil(IsubRate)) IsubRate = 0;
    const rate = isNumber(IRate) ? IRate : IRate.replace(/%/g, "");
    const subRate = isNumber(IsubRate) ? IsubRate : IsubRate.replace(/%/g, "");
    return {
      active: index === defaultValues[0],
      lastActive: isMultiple.value
        ? index === (defaultValues?.[1] || 1)
        : false,
      index: index,
      ...o,
      rate:
        +rate > 0
          ? `${
              (o?.rateShowPlus || o?.rateShowTrendIcon) ?? true ? "+" : ""
            }${rate.toLocaleString()}`
          : +rate < 0
          ? `${o?.rateShowTrendIcon ?? true ? "-" : ""}${Math.abs(
              +rate
            ).toLocaleString()}`
          : "0",
      subRate:
        +subRate > 0
          ? `${
              (o?.subRateShowPlus || o?.subRateShowTrendIcon) ?? true ? "+" : ""
            }${subRate.toLocaleString()}`
          : +subRate < 0
          ? `${o?.subRateShowTrendIcon ?? true ? "-" : ""}${Math.abs(
              +subRate
            ).toLocaleString()}`
          : "0",
      class: handleClass(+IRate),
      subClass: handleClass(+IsubRate),
    };
  });
};
const handleActive = (idx: number) => {
  if (dataList.value[idx].active) {
    clickIndex.value = 1;
  }
  if (dataList.value[idx].lastActive) {
    clickIndex.value = 2;
  }

  // 多选模式下  禁止全部取消
  if (isMultiple.value) {
    if (
      clickIndex.value === 1 &&
      dataList.value[idx].active &&
      !dataList.value.filter((o) => o.lastActive).length
    ) {
      clickIndex.value = 2;
      return;
    }
    if (
      clickIndex.value === 2 &&
      dataList.value[idx].lastActive &&
      !dataList.value.filter((o) => o.active).length
    ) {
      clickIndex.value = 1;
      return;
    }
  }
  if (clickIndex.value === 2) {
    dataList.value = dataList.value.map((item, index) => {
      if (idx === index) {
        item.lastActive = !dataList.value[idx].lastActive;
      } else {
        item.lastActive = false;
      }
      return item;
    });
  } else {
    dataList.value = dataList.value.map((item, index) => {
      // 如果是多选，则有取消功能。单选的话   不可以全部取消选中状态
      if (isMultiple.value) {
        if (idx === index) {
          item.active = !dataList.value[idx].active;
        } else {
          item.active = false;
        }
      } else {
        if (idx === index) {
          if (!dataList.value[idx].active) {
            item.active = !dataList.value[idx].active;
          }
        } else {
          item.active = false;
        }
      }
      return item;
    });
  }
  const result = isMultiple.value
    ? {
        firstIndex:
          dataList.value.filter((o) => o.active)?.[0]?.index ?? undefined,
        lastIndex:
          dataList.value.filter((o) => o.lastActive)?.[0]?.index ?? undefined,
      }
    : { index: idx };
  emit("event", result);
};

defineExpose({
  getData,
});

watch(
  () => props.chartData,
  () => {
    getData();
  },
  { immediate: true, deep: true }
);
</script>
<style scoped>
.indicator-card-content {
  display: flex;
  flex-wrap: wrap;
}
.indicator-card {
  min-width: 160px;
  padding: 12px 16px;
  margin: 0 16px 16px 0;
  box-sizing: border-box;
  min-height: 102px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}
.arealy {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid transparent;
}
.linear {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.title {
  margin: 0 0 4px 0;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title .flex > span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.indicator-card-value {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
}
.rate {
  margin-bottom: 0;
  margin-top: 4px;
}
.rate-label {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  margin-right: 6px;
  color: rgba(0, 0, 0, 0.45);
}
.rate-value {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  line-height: 20px;
  font-feature-settings: "tnum" on, "lnum" on;
}
.positive {
  color: #f03860;
}
.negative {
  color: #00a830;
}
.prefix-unit {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-right: 2px;
  line-height: 22px;
  font-feature-settings: "tnum" on, "lnum" on;
  color: rgba(0, 0, 0, 0.85);
}
.suffix-unit {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  margin-left: 2px;
  color: rgba(0, 0, 0, 0.85);
}
.dotted {
  border-bottom: 1px dotted rgba(0, 0, 0, 0.45);
  cursor: pointer;
}
.active {
  background: #ecf0ff;
  border: 1px solid #3c66ff;
}
.lastActive {
  background: #e6f5fb;
  border: 1px solid #0098d4;
}
.indicator-card:hover {
  background: rgba(0, 0, 0, 0.05);
}
.indicator-card:active {
  background: rgba(0, 0, 0, 0.08);
}

.active:hover {
  background: #d0daff;
}
.active:active {
  background: #abbdff;
}
.flex {
  display: flex;
  align-items: center;
}
.lastActive:hover {
  background: #c2e6f5;
}
.lastActive:active {
  background: #91d3ed;
}
.img {
  width: 26px;
  height: 26px;
  right: -1px;
  bottom: -1px;
  position: absolute;
  border-radius: 4px;
}
</style>
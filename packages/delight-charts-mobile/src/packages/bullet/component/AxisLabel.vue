<template>
  <div
    class="bullet-axis"
    ref="axisRef"
    :style="{ top: legendPosition === 'bottom' ? '-20px' : '' }"
  >
    <span
      v-for="(item, index) in ranges"
      :key="index"
      class="axis-label"
      :style="{ left: getLeft(leftList[index], index) }"
      >{{ valueFormat(average * index, "label", 0, true) }}</span
    >
    <span class="axis-label" :style="{ left: getMaxLeft(maxValueLeft) }">{{
      valueFormat(maxValue, "label", 0, true)
    }}</span>
  </div>
</template>
    <script lang="ts" setup>
import { computed, watch } from "vue";
import { defineProps, ref } from "vue";
import { valueFormat, docLeftValue } from "../../../utils/utils";
const props = withDefaults(
  defineProps<{
    left?: number;
    average: number;
    maxValue: number;
    ranges?: any;
    legendPosition?: string;
    container?: any;
    bulletRangesRef?: any;
  }>(),
  {
    left: 0,
    legendPosition: "top",
  }
);
const leftList = ref<number[]>([]);
const docLeft = computed(() => docLeftValue());
// 最大刻度
const maxValueLeft = ref(0);
const axisRef = ref();
const getLeft = (position: number, index: number) => {
  // if (index === 0) {
  //   return `${position - docLeft.value}px`;
  // }
  const widthMiddle = axisRef.value?.children?.[index]?.offsetWidth / 2;
  return `${position - widthMiddle - docLeft.value}px`;
};
// 最大刻度位置
const getMaxLeft = (position: number) => {
  const len = axisRef.value?.children?.length - 1;
  const widthMiddle = axisRef.value?.children?.[len]?.offsetWidth / 2;
  return `${position - widthMiddle - docLeft.value}px`;
};
const container = computed(() => props?.container);

const setAxisLabel = () => {
  const len = props?.bulletRangesRef?.children?.length;
  const children = props?.bulletRangesRef?.children;
  if (props?.bulletRangesRef && len > 0) {
    const { right } = container.value?.getBoundingClientRect();
    const axisLeft: number = axisRef.value?.offsetLeft;
    maxValueLeft.value = right - axisLeft;
    for (let i = 0; i < len; i++) {
      let currentLeft: number = children?.[i]?.getBoundingClientRect()?.left;
      leftList.value.push(currentLeft - axisLeft);
    }
  }
};
watch(
  () => props?.container,
  () => {
    setAxisLabel();
  }
);
</script>
<style scoped>
.bullet-axis {
  position: relative;
  margin-top: 8px;
}
.axis-label {
  position: absolute;
  color: rgba(0, 0, 0, 0.45);
  font-family: system-ui, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}
</style>
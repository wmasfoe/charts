<template>
  <div class="bullet-legend">
    <div
      class="bullet-legend-target"
      v-for="(item, index) in targets"
      :style="{ ...positionStyle, marginRight: showTooltipValue ? 0 : '' }"
      :key="index"
    >
      <div
        v-if="item.label"
        class="bullet-legend-icon"
        :style="{ background: item.color }"
      ></div>
      <div v-if="showTooltipValue && item?.label" class="bullet-legend-tooltip">
        <div class="bullet-legend-label" :style="{ marginRight: '16px' }">
          {{ item?.label }}
        </div>
        <div class="bullet-legend-label">{{ valueFormat(item.value) }}</div>
      </div>
      <div
        v-else
        class="bullet-legend-label"
        :style="{ marginRight: item?.label ? '16px' : '' }"
      >
        {{ item?.label }}
      </div>
    </div>
    <div
      class="bullet-legend-progress"
      v-for="(item, index) in measures"
      :style="{ ...positionStyle, marginRight: showTooltipValue ? 0 : '' }"
      :key="index"
    >
      <div
        v-if="item?.label"
        class="bullet-legend-icon"
        :style="{ background: item.color, width: '9px', height: '9px' }"
      ></div>
      <div v-if="showTooltipValue" class="bullet-legend-tooltip">
        <div
          class="bullet-legend-label"
          :style="{ marginRight: item?.label ? '16px' : '' }"
        >
          {{ item?.label }}
        </div>
        <div class="bullet-legend-label">{{ valueFormat(item.value) }}</div>
      </div>
      <div
        v-else-if="item?.label"
        class="bullet-legend-label"
        :style="{ marginRight: '16px' }"
      >
        {{ item?.label }}
      </div>
    </div>
    <div
      v-if="gap && ranges?.some((v) => v?.label)"
      :style="{ marginTop: legendPosition !== 'top' ? '7px' : 'unset' }"
      class="bullet-legend-gap"
    ></div>
    <template v-if="!showTooltipValue">
      <div
        class="bullet-legend-ranges"
        v-for="(item, index) in ranges"
        :style="positionStyle"
        :key="index"
      >
        <div
          v-if="item?.label"
          class="bullet-legend-icon"
          :style="{ background: item.color, width: '9px', height: '9px' }"
        ></div>
        <div
          v-if="item?.label"
          class="bullet-legend-label"
          :style="{ marginRight: '16px' }"
        >
          {{ item?.label }}
        </div>
      </div>
    </template>
  </div>
</template>
  <script lang="ts" setup>
import { defineProps, computed } from "vue";
import { valueFormat } from "../../../utils/utils";

const props = withDefaults(
  defineProps<{
    targets: any;
    ranges: any;
    measures: any;
    legendPosition?: string;
    gap?: boolean;
    // tooltips适配样式
    showTooltipValue?: boolean;
  }>(),
  {
    legendPosition: "top",
    gap: true,
    showTooltipValue: false,
  }
);
const positionStyle = computed(() => {
  if (props?.legendPosition === "top") {
    return { marginBottom: "8px" };
  }
  return { marginTop: "8px" };
});
</script>
  <style scoped>
.bullet-legend {
  color: rgba(0, 0, 0, 0.85);
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  min-height: 16px;
  flex-wrap: wrap;
  margin: 0 16px;
}

.bullet-legend .bullet-legend-target {
  display: flex;
}
.bullet-legend .bullet-legend-progress {
  display: flex;
}
.bullet-legend .bullet-legend-ranges {
  display: flex;
}
.bullet-legend-icon {
  width: 2px;
  height: 12px;
  border-radius: 1px;
  margin-right: 8px;
  margin-top: 2px;
}
.bullet-legend-label {
  color: rgba(0, 0, 0, 0.85);
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
}
.bullet-legend-gap {
  width: 1px;
  height: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-right: 16px;
}
.bullet-legend-tooltip {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
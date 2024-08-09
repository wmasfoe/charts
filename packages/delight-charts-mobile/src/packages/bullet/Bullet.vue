<template>
  <Loading v-if="props.isLoading" />
  <template v-else>
    <div v-if="chartData?.length > 0" :style="getContainer()">
      <AxisLabel
        v-if="axisVisiable && legendPosition === 'bottom'"
        :left="containerLeft"
        :average="axisAverage"
        :maxValue="maxValue"
        :ranges="ranges"
        :legendPosition="legendPosition"
        :container="container"
        :bulletRangesRef="bulletRangesRef"
      />
      <Legend
        v-if="legendVisible && legendPosition === 'top'"
        :targets="targets"
        :ranges="ranges"
        :measures="measures"
        :legendPosition="legendPosition"
      />
      <div class="bullet-container">
        <span class="bullet-title">{{ title }}</span>
        <div
          class="bullet-content"
          :style="{ width, backgroundColor }"
          ref="container"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <div class="bullet-ranges" ref="bulletRangesRef">
            <div
              class="bullet-background"
              v-for="(item, index) in ranges"
              :style="{
                width: item.value,
                backgroundColor: item.color,
                borderLeft: axisVisiable
                  ? index === 0
                    ? '1px #E2E2E2 solid'
                    : '0.5px #E2E2E2 dashed'
                  : 'unset',

                borderRight: axisVisiable ? '0.5px #e2e2e2 dashed' : 'unset',
              }"
              :key="index"
            ></div>
          </div>
          <div
            v-for="(item, index) in measures"
            :key="index"
            class="bullet-progress"
            :style="{
              width: setLeft(item.value),
              backgroundColor: item.color,
              borderRadius: measures.length === index + 1 ? barRadius : 'unset',
            }"
          >
            <template v-if="showValueConfig.show">{{
              valueFormat(
                item.value,
                showValueConfig.valueType,
                showValueConfig.digit,
                showValueConfig.unit
              )
            }}</template>
          </div>
          <div
            v-for="(item, index) in targets"
            :key="index"
            :style="{
              left: setLeftGap(item.value),
              backgroundColor: item?.color || '#4a7cff',
            }"
            class="bullet-target"
          ></div>
        </div>
      </div>
      <AxisLabel
        v-if="axisVisiable && legendPosition === 'top'"
        :left="containerLeft"
        :average="axisAverage"
        :maxValue="maxValue"
        :ranges="ranges"
        :container="container"
        :bulletRangesRef="bulletRangesRef"
      />
      <Legend
        v-if="legendVisible && legendPosition === 'bottom'"
        :targets="targets"
        :ranges="ranges"
        :measures="measures"
        :legendPosition="legendPosition"
      />
      <Tooltip
        v-show="tooltipVisible === false ? false : true && openTooltip"
        ref="tooltipRef"
        :targets="targets"
        :ranges="ranges"
        :measures="measures"
        :tooltipConfig="tooltipConfig"
        :class="[triggerOnClick && 'tooltip-click']"
        :style="tooltipHoverStyle"
      />
    </div>
    <defaultEmpty v-else v-bind="{ ...dataEmptyConfig }" />
  </template>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, h } from "vue";
import { valueFormat, ceilNum, docLeftValue } from "../../utils/utils";
import { defaultEmpty } from "../../const/handleEmpty";
import Legend from "./component/Legend.vue";
import Tooltip from "./component/Tooltip.vue";
import AxisLabel from "./component/AxisLabel.vue";
import { dataLoading } from "../../const/dataLoading";

const props = withDefaults(
  defineProps<{
    chartData: any;
    chartConfig: any;
    width?: number;
    style?: any;
    dataEmptyConfig?: Object;
    dimensions?: string[];
    metrics?: string[];
    isLoading?: boolean;
    theme?: string;
    loadingConfig?: Object;
  }>(),
  {
    width: typeof window !== "undefined" ? window.innerWidth : 375,
    innerHeight: typeof window !== "undefined" ? window.innerHeight : 750,
  }
);
const bulletClickConfig = ["bullet-progress", "bullet-background"];

const tooltipRef = ref();
const container = ref();
const bulletRangesRef = ref();
const tooltipHoverStyle = ref({});
const openTooltip = ref(false);

const containerLeft = computed(() => container.value?.offsetLeft);
const legendPosition = computed(
  () => props.chartConfig?.legend?.legendPosition || "top"
);
const dimensions = computed(() => props?.dimensions?.[0] || "");
const metrics = computed(() => props?.metrics?.[0] || "");

// 图例在下面的gap距离
const tooltipGapStyle = computed(() =>
  legendPosition.value === "bottom" ? 20 : 0
);
// 刻度是否展示
const axisVisiable = computed(
  () => props.chartConfig?.xAxis?.show || props.chartConfig?.axisVisiable
);
// 图例是否展示
const legendVisible = computed(
  () => props.chartConfig?.legend?.show || props.chartConfig?.legendVisible
);
const Loading = () => {
  let height = '32px' 
  if(legendVisible.value) {
    height = '100px'
  }
  return h(dataLoading, { height, theme: props?.theme, loadingConfig: props?.loadingConfig});
};
// tooltip是否展示
const tooltipVisible = computed(() => props.chartConfig?.tooltip?.show);
// 数字格式展示配置
const showValueConfig = computed(() => ({
  unit: false,
  digit: 0,
  show: false,
  valueType: "value",
  ...props.chartConfig?.label,
}));
// 标题展示
const title = computed(() => props.chartData?.[0]?.[metrics.value] || "");
// 背景色
const backgroundColor = computed(() => props.chartConfig?.backgroundColor);
// 右边圆角大小配置
const barRadius = computed(
  () => props.chartConfig?.barRadius || "0px 2px 2px 0px"
);
const xAxis = computed(() => props.chartConfig?.xAxis);

const tooltipConfig = computed(() => ({
  triggerOn: "mousemove",
  ...props.chartConfig?.tooltip,
}));
const triggerOnClick = computed(
  () => tooltipConfig.value?.triggerOn === "click"
);

const measures = computed(() => {
  const value = props.chartData?.[0]?.[dimensions.value];
  return props.chartConfig?.measures.map((v: any, index: string | number) => ({
    ...v,
    value: value[index],
  }));
});
const targets = computed(() => props.chartConfig?.targets || []);

const ranges = computed(() => {
  const splitNumber = xAxis.value?.splitNumber || 5;
  return (
    props.chartConfig?.ranges ||
    new Array(splitNumber).fill({ value: `${100 / splitNumber}%` })
  );
});
// 当前最大值
const currentValue = computed(() => {
  const measuresMax = measures.value?.reduce(
    (sum: any, obj: { value: any }) => sum + obj.value,
    0
  );
  const targetsMax = targets.value?.reduce(
    (max: number, obj: { value: number }) => Math.max(max, obj.value),
    0
  );
  return Math.max(measuresMax, targetsMax);
});
const docLeft = computed(() => docLeftValue());
// 当前刻度向上取整最大值
const maxValue = computed(() => ceilNum(currentValue.value));
const axisAverage = computed(() => {
  if (props.chartData?.[0]?.ranges) {
    const len = ranges.value?.length || 1;
    return maxValue.value / len;
  }
  const splitNumber = xAxis.value?.splitNumber || 5;

  return maxValue.value / splitNumber;
});
const getContainer = () => {
  return {
    marginBottom:
      axisVisiable.value && legendPosition.value === "top" ? "24px" : "unset",
    marginTop:
      axisVisiable.value && legendPosition.value === "bottom"
        ? "24px"
        : "unset",
    ...props?.style,
  };
};

const setLeftGap = (v: number) => {
  const value = (v * 100) / maxValue.value;
  return `${value?.toFixed(2)}%`;
};
// 兼容最小值value展示问题
const setLeft = (v: number) => {
  const value = (v * 100) / maxValue.value;
  if (showValueConfig.value?.show && value < 5) {
    const str = valueFormat(
      v,
      showValueConfig.value?.valueType,
      showValueConfig.value?.digit,
      showValueConfig.value?.unit
    );
    const len = str.length;
    const gap = showValueConfig.value?.unit ? 2 : 1;
    if (len <= 7) {
      return `${len * 2 + gap}%`;
    }
    return `${len * 2}%`;
  }
  return value < 2 ? "1%" : `${value?.toFixed(2)}%`;
};

// tooltip触发类型
const tooltipTriggerType = () => {
  if (tooltipConfig.value?.triggerOn === "mousemove") return;
  container.value?.addEventListener(
    "click",
    (el: { target: { className: string } }) => {
      openTooltip.value = bulletClickConfig.includes(el?.target?.className);
    }
  );
  document.body.addEventListener("click", (el: any) => {
    if (!bulletClickConfig.includes(el?.target?.className)) {
      openTooltip.value = false;
    }
  });
};
const touchend = () => {
  if (tooltipConfig.value?.triggerOn === "click") return;
  openTooltip.value = false;
};
// mousemove的边界处理
const touchmove = async (e: {
  targetTouches: { clientX: any; clientY: any }[];
}) => {
  if (triggerOnClick.value) return;
  openTooltip.value = true;
  await nextTick();
  const { clientX, clientY } = e?.targetTouches[0];
  const { width, height } = tooltipRef.value?.getDom()?.getBoundingClientRect();
  const { left, right, top, bottom } = container.value?.getBoundingClientRect();

  if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
    openTooltip.value = false;
  }

  if (clientY + height > props?.innerHeight) {
    // 底部边界处理
    tooltipHoverStyle.value = {
      transform: `translate(${left - docLeft.value}px,${
        -height - 20 - tooltipGapStyle.value
      }px)`,
    };
  } else if (clientX < left) {
    // 右边边界处理
    tooltipHoverStyle.value = {
      transform: `translate(${left - docLeft.value}px,${
        0 - tooltipGapStyle.value
      }px)`,
    };
  } else if (clientX + width > props?.width) {
    // 左边边界处理
    const left = props?.width - width - 10 - docLeft.value;
    tooltipHoverStyle.value = {
      transform: `translate(${left}px,${0 - tooltipGapStyle.value}px)`,
    };
  } else {
    tooltipHoverStyle.value = {
      transform: `translate(${clientX - docLeft.value}px,${
        0 - tooltipGapStyle.value
      }px)`,
    };
  }
};
onMounted(() => {
  tooltipTriggerType();
});
</script>
<style scoped>
.bullet-content {
  display: flex;
  position: relative;
  padding: 10px 0;
  width: 100%;
}

.bullet-progress {
  height: 12px;
  color: #fff;
  text-align: center;
  z-index: 1;
  font-family: system-ui, sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
}
.bullet-target {
  top: 4px;
  width: 2px;
  height: 24px;
  position: absolute;
  border-radius: 1px;
  z-index: 2;
}
.bullet-title {
  color: #000;
  text-align: right;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  white-space: nowrap;
  margin-right: 4px;
}
.bullet-container {
  display: flex;
  flex-wrap: nowrap;
  margin: 0 16px;
}
.bullet-ranges {
  display: flex;
  position: absolute;
  top: 0;
  height: 32px;
  width: 100%;
}
.tooltip-click {
  left: 50%;
  transform: translate(-50%, -20%);
}
</style>
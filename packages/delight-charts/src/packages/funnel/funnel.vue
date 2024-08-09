<template>
  <div :key="height" class="funnel" :class="{ reverse: chartConfig.isReverse }">
    <div
      class="funnel-content"
      :style="{
        height: height + 'px',
        width: width === 'auto' ? 'auto' : Number(width) - 65 + 'px',
      }"
    >
      <div v-for="(item, index) in data" :key="index">
        <div class="line" :style="{ height: lineHeight + 'px' }">
          <slot
            v-if="$slots.name"
            name="name"
            v-bind="{ $index: index, item: item, data: data }"
          />
          <label
            v-else
            :style="{
              width: lineWidth + 'px',
              textAlign: chartConfig.isReverse ? 'left' : 'right',
            }"
            :class="{ reverse: chartConfig.isReverse }"
          >
            {{ item?.name || "-" }}
          </label>
          <div class="bar out">
            <div
              :style="{
                width: (+item.rate >= 100 ? 100 : item.rate) + '%',
                background: chartConfig.barBackground,
              }"
              class="bar in"
              :class="chartConfig.barClass"
            >
              <slot
                v-if="$slots.value"
                name="value"
                v-bind="{ $index: index, item: item, data: data }"
              />
              <span
                v-else
                :class="[
                  { reverse: chartConfig.isReverse },
                  chartConfig.fontClass,
                ]"
                :style="{ color: chartConfig.fontColor }"
              >
                {{ item?.value?.toLocaleString() || "-" }}
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center">
          <span
            :style="{
              width: lineWidth + 'px',
              height: '1px',
              borderBottom: '1px dashed #E2E2E2',
            }"
            v-if="chartConfig.showLine && data.length - 1 !== index"
          >
          </span>
          <RateComp
            :index="index"
            v-if="data.length - 1 !== index"
            :style="{
              marginLeft: chartConfig.showLine ? '12px' : lineWidth + 12 + 'px',
              marginTop: rateGap + 'px',
              marginBottom: rateGap + 'px',
            }"
          >
            <div :class="{ reverse: chartConfig.isReverse }">
              {{ data[index + 1]?.rate + "%" || "" }}
            </div>
          </RateComp>
          <div :class="{ reverse: chartConfig.isReverse }">
            <slot name="rate" v-bind="{ $index: index, length: data.length }" />
          </div>
        </div>
      </div>
      <div
        class="fixed"
        :style="{
          height: 'calc(' + fixedHeight + 'px - ' + lineHeight + 'px)',
          top: lineHeight / 2 + 'px',
        }"
      >
        <RateComp class="fixed-rate">
          <slot
            v-if="$slots.allRate"
            name="allRate"
            v-bind="{ data: totalRate }"
          />
          <div v-else :class="{ reverse: chartConfig.isReverse }">
            {{ totalRate || "" }}
          </div>
        </RateComp>
        <img class="icon" :src="Arrow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, watch } from "vue";
import RateComp from "./components/rateComp.vue";
import Arrow from "../../assets/Arrow.svg";

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
  width: {
    default: "auto",
  },
  height: {
    type: Number,
    default: 400,
  },
  digit: {
    type: Number,
    default: 1,
  },
  type: {
    default: "level",
  },
});
const { chartConfig } = toRefs(props);
const barHeight = computed(() => chartConfig.value?.barHeight || 0);
const rateGap = computed(() => chartConfig.value?.rateGap || 8);

const LongestName = ref<number>(0); // 最长的name长度 计算width
const lineWidth = ref(chartConfig.value.lineWidth || 0);

const data = ref<any[]>([]);
const totalRate = ref<string>(""); // 总变化率
const lineHeight = ref<number>(0); //计算出来的 每个柱状图 height
const fixedHeight = ref<number>(0); // 计算出来的 右侧总变化率的高度

const handleRate = (arr: { name: string; value: number }[]) => {
  return arr.map((item, idx) => {
    const index =
      chartConfig.value.type === "all" || props.type === "all"
        ? 0
        : idx === 0
        ? 0
        : idx - 1;
    return {
      ...item,
      rate:
        +arr[idx === 0 ? 0 : idx - 1].value === 0
          ? 0
          : ((+item.value / +arr[index].value) * 100).toFixed(
              chartConfig.value.digit ?? props.digit
            ),
    };
  });
};

watch(
  () => props.chartData,
  (v: any[]) => {
    if (!v.length) {
      return;
    }
    data.value = handleRate((v as any[]) || []);
    LongestName.value = Math.max(
      ...(props.chartData || []).map((i: any) => i.name.length)
    );
    if (!chartConfig.value.lineWidth) {
      lineWidth.value =
        LongestName.value * 12 > 96 ? 96 : LongestName.value * 12;
    }
    totalRate.value =
      +v[0].value === 0
        ? "0%"
        : ((v[v.length - 1].value / v[0].value) * 100).toFixed(
            chartConfig.value.digit ?? props.digit
          ) + "%";
    if (!!barHeight.value) {
      lineHeight.value =
        barHeight.value > 52 ? 52 : barHeight.value < 24 ? 24 : barHeight.value;
      fixedHeight.value =
        (props.chartData.length - 1) * (34 + rateGap.value * 2) +
        props.chartData.length * lineHeight.value;
    } else {
      lineHeight.value =
        (props.height -
          (props.chartData.length - 1) * (34 + rateGap.value * 2)) /
        props.chartData.length;
      //设置最小高度是24px
      lineHeight.value = lineHeight.value < 24 ? 24 : lineHeight.value;
      fixedHeight.value =
        (props.chartData.length - 1) * (34 + rateGap.value * 2) +
        props.chartData.length * 24;
      //先计算出来 正常的总变化率的高度。如果传过来的height大于 则展示height。如果小于则展示计算的总变化率高度
      // 因为height小的话 会出现滚动条
      fixedHeight.value =
        fixedHeight.value > props.height ? fixedHeight.value : props.height;
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.reverse {
  transform: rotateY(180deg);
}
.line {
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
}
.bar {
  flex: 1;
  border-radius: 2px;
}
.out {
  height: 100%;
  background: #f3f3f3;
}
.in {
  background: #3c66ff;
  height: 100%;
  display: flex;
  align-items: center;
}
.in span {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-left: 13px;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #ffffff;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
}
label {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  margin-right: 12px;
  /* max-width: 96px; */
  text-align: right;
  color: rgba(0, 0, 0, 0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.funnel {
  display: inline-block;
}
.funnel-content {
  overflow-y: auto;
  padding-right: 65px;
  position: relative;
}
.fixed {
  position: absolute;
  top: 0;
  right: 28px;
  align-items: center;
  display: flex;
  width: 36px;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 0;
  border-radius: 0 4px 4px 0;
  box-sizing: border-box;
}
.fixed-rate {
  position: absolute;
  right: -29px;
}
.icon {
  position: absolute;
  bottom: -4px;
  background: #ffffff;
  z-index: 111;
  left: 0;
  width: 6px;
  height: 8px;
}
</style>
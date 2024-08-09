<template>
  <div class="title flex">
    <div class="flex label" v-for="(item, index) in labelArr" :key="item">
      <template v-if="$props?.columnTitle?.title?.[index]">
        <span class="text">
          {{ $props?.columnTitle?.title?.[index] }}
        </span>
        <div v-if="$props?.columnTitle?.title?.[index + 1]" class="text center">
          <div class="text center absolute flex align-center link">
            <div class="img align-center">
              <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 1L1 4L4 7" stroke="#E2E2E2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 4H2" stroke="#E2E2E2" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
              <span class="bar left"></span>
            </div>
            <span v-if="$props?.columnTitle?.link?.[index]" class="link-text">
              {{ $props?.columnTitle?.link?.[index] }}
            </span>
            <div class="img align-center">
              <span class="bar right"></span>
              <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L4 4L1 7" stroke="#E2E2E2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 4H3" stroke="#E2E2E2" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <SankeyChart v-bind="$props" :chartData="chartData" :chartConfig="chartConfig" />
</template>
<script lang="ts">
import { PropType, defineComponent, computed, h } from 'vue'
import { generateChart } from '../../chart.core';
import { sankey } from './getOptions';
import getSankeyLevel from '../../utils/getSankeyLevel'
import ArrowLeft from '../../assets/SankeyArrowLeft.svg'
import ArrowRight from '../../assets/SankeyArrowRight.svg'

const SankeyChart = /* #__PURE__ */ generateChart('SankeyChart', sankey, {
  plugins: async () => {
    const { SankeyChart } = await import("echarts/charts");
    return {
      usePlugins: [SankeyChart],
    };
  },
});

export default defineComponent({
  extends: SankeyChart,
  components: {
    SankeyChart,
  },
  props: {
    ...SankeyChart.props,
    columnTitle: {
      type: Object as PropType<{
        title: string[];
        link: string[];
      }>,
      required: false,
      default: {
        title: [],
        link: []
      }
    },
  },
  setup(props) {
    // 从 data 提取桑基图节点
    const chartData = computed(() => {
      const usingData = []
      props.chartData?.forEach(v => {
        props.dimensions?.forEach(item => {
          const value = v?.[item]
          if(!usingData?.includes?.(value)) {
            usingData.push(value)
          }
        })
      });
      return usingData.map(v => ({name: v}))
    })

    // 传入的 chartLink 可能不规范，根据 dimensions 格式化; dimensions[0] 是source; dimensions[1] 是target。从 metrics[0] 取 value
    const chartLink = computed(() => props?.chartData?.map((v: any) => ({
      ...(v || {}),
      source: v?.[props?.dimensions?.[0]],
      target: v?.[props?.dimensions?.[1]],
      value: v?.[props?.metrics?.[0]],
    })))

    const level = computed(() => getSankeyLevel(chartLink.value))
    const itemWidth = computed(() => 100 / (level.value - 1) + '%')
    const labelArr = computed(() => (new Array(level.value)).fill(0))

    const chartConfig = computed(() => ({...(props?.chartConfig || {}), chartLinks: chartLink.value}))

    return {
      level,
      itemWidth,
      labelArr,
      ArrowLeft,
      ArrowRight,
      chartData,
      chartConfig
    }
  }
})
</script>
<style scoped>
.title {
  padding-left: 5%;
  padding-right: 5%;
  justify-content: space-between;
  transform: translateY(16px);
}
.flex {
  display: flex;
  flex-flow: row nowrap;
}
.absolute {
  position: absolute !important;
  height: 20px;
  top: 0;
  z-index: -1;

  width: 100%;
}
.label {
  width: v-bind(itemWidth);
}
.label:last-of-type {
  width: auto;
  flex-shrink: 0;
}
.text {
  color: var(--text-description, rgba(0, 0, 0, 0.45));
  /* CN/Small Text */
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  user-select: none;

  flex-shrink: 0;
  position: relative;
}
.center {
  text-align: center;
  flex: 1;
  flex-shrink: 1;
}
.img {
  width: 48%;
  display: inline-flex;
}
.img .bar {
  width: 100%;
  height: 1px;
  background-color: #E2E2E2;
}
.img .bar.left {
  margin-left: -1px;
}
.img .bar.right {
  margin-right: -1px;
}
.link-text {
  flex-shrink: 0;
  background-color: #fff;
  padding-inline: 8px;
}
.align-center {
  align-items: center;
}
.link {
  padding-inline: 10px;
  box-sizing: border-box;
}
</style>

import { defineComponent, h, computed } from "vue";
import CommonInterval from "../../components/CommonInterval";
import { getNativeConfig } from "../../utils/utils";

export default defineComponent({
  name: "Bar",
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    dataEmptyConfig: {
      type: Object,
      default: () => ({}),
    },
    dimensions: {
      type: Array,
      default: () => [],
    },
    metrics: {
      type: Array,
      default: () => [],
    },
    chartConfig: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: typeof window !== "undefined" ? window.innerWidth : 375,
    },
    height: {
      type: Number,
      default: 260,
    },
    pixelRatio: {
      type: Number,
      default: typeof window !== "undefined" ? window?.devicePixelRatio : 1,
    },
  },
  setup(props, { slots, emit }) {
    const data = computed(() => getNativeConfig(props));
    const chartData = computed(() =>
      props?.chartData?.length > 0 ? props?.chartData : data.value?.chartData
    );
    const metrics = computed(() =>
      props?.metrics?.length > 0 ? props?.metrics : data.value?.metrics
    );
    const dimensions = computed(() =>
      props?.dimensions?.length > 0 ? props?.dimensions : data.value?.dimensions
    );
    return () =>
      h(CommonInterval, {
        ...props,
        chartData: chartData.value,
        metrics: metrics.value,
        dimensions: dimensions.value,
        chartType: "Bar",
      });
  },
});

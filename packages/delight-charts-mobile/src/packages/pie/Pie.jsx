import {
  defineComponent,
  ref,
  onMounted,
  nextTick,
  computed,
  watch,
  toRefs,
  h,
} from "vue";
import { Canvas, Chart, Interval, PieLabel } from "@antv/f2";
import { isShowLegend, legendConfig } from "../../const/getLegend";
import { debounceFun, getContainerHeight } from "../../utils/utils";
import { getColor } from "../../const/getColor";
import { defaultEmpty } from "../../const/handleEmpty";
import { formatChatData } from "../../utils/utils";
import { dataLoading } from "../../const/dataLoading";
import SelectLegend from "../../const/Legend";

export default defineComponent({
  name: "Pie",
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    dimensions: {
      type: Array,
      default: () => [],
    },
    dataEmptyConfig: {
      type: Object,
      default: () => ({}),
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
    colors: {
      type: Array,
      default: [],
    },
    pixelRatio: {
      type: Number,
      default: typeof window !== "undefined" ? window?.devicePixelRatio : 1,
    },
    event: {
      type: Object,
      default: () => {},
    },
    theme: {
      type: String,
      default: "",
    },
    loadingConfig: {
      type: Object,
      default: () => ({}),
    },
    style: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots, emit }) {
    const {
      colors,
      pixelRatio,
      height,
      width,
      chartData,
      chartConfig,
      metrics,
    } = toRefs(props);
    const legendRef = ref()
    const y = ref("value");
    const lineRef = ref();
    const firstRender = ref(true);
    const context = computed(() => lineRef.value?.getContext("2d"));
    const labelMap = computed(() => chartConfig.value?.labelMap);

    // 获取原生配置
    const getNativeConfig = () => {
      let chartData = [];
      let metrics = [];
      let dimensions = [];
      const { series } = props?.chartConfig;
      if (series?.data) {
        metrics = ["value"];
        dimensions = ["data"];
        chartData = series?.data;
      }
      return {
        chartData,
        metrics,
        dimensions,
      };
    };
    const data = computed(() => {
      const {
        chartData = [],
        metrics = [],
        dimensions = [],
      } = getNativeConfig();
      return formatChatData({
        chartData: props?.chartData?.length > 0 ? props?.chartData : chartData,
        metrics: props?.metrics?.length > 0 ? props?.metrics : metrics,
        dimensions:
          props?.dimensions?.length > 0 ? props?.dimensions : dimensions,
        labelMap: labelMap.value,
        chartConfig: props.chartConfig,
      }).map((i, index) => ({
        ...i,
        pieSymbol: "1",
        color: allColor.value[index],
      }));
    });
    // 遍历metrics
    const metricsMap = computed(() => {
      let arr = [];
      props.chartData.forEach((v) => {
        let name = v[props.dimensions[0]];
        if (labelMap.value && isObject(labelMap.value)) {
          name = labelMap.value[v[props.dimensions[0]]];
        }
        arr.push(name);
      });
      return arr;
    });
    const defaultLegend = () => {
      const obj = {};
      metricsMap.value.forEach((v) => {
        obj[v] =
          chartConfig.value?.legend?.selected?.[v] === false ? false : true;
      });
      return obj;
    };

    // 是否展示legend
    const isShowLegendFlag = computed(() => isShowLegend(chartConfig.value));
    const currentLegend = computed(() => defaultLegend());

    // 下钻回调
    const onClick = debounceFun((data) => {
      const keys = Object.keys(props?.event || {});
      if (keys.length > 0) {
        keys.forEach((v) => {
          props.event[v]?.callback && props.event[v]?.callback(data);
        });
      }
    }, 0);
    const allColor = computed(() => getColor(colors.value)?.[1]);
    const initChart = async () => {
      await nextTick();
      if (!context.value) {
        return;
      }

      // 过滤数据
      const currentData = isShowLegendFlag.value
        ? data.value.filter((v) => currentLegend.value[v.date])
        : data.value;
      // 过滤颜色
      const color = currentData.map((v) => v.color);

      const heightDom = getContainerHeight(height.value, legendRef.value, 0)

      const { props } = (
        <Canvas
          context={context.value}
          pixelRatio={pixelRatio.value}
          width={width.value}
          height={heightDom}
        >
          <Chart
            data={currentData}
            coord={{
              transposed: true,
              type: "polar",
            }}
          >
            <Interval
              x="pieSymbol"
              y={y.value}
              adjust="stack"
              color={{
                field: "date",
                range: color,
              }}
              selection={{
                selectedStyle: (record) => {
                  onClick(record);
                  const { yMax, yMin } = record;
                  return {
                    // 半径放大 1.1 倍
                    r: (yMax - yMin) * 1.1,
                  };
                },
                unSelectedStyle: {
                  fillOpacity: chartConfig.value?.canClick ? 0.4 : 1,
                },
              }}
            />
            {chartConfig.value?.label?.show && (
              <PieLabel
                label1={(data) => {
                  return {
                    text: data.date,
                    fill: "#808080",
                  };
                }}
                label2={(data) => {
                  return {
                    fill: "#000000",
                    text: data.value,
                    fontWeight: 500,
                    fontSize: 10,
                  };
                }}
              />
            )}
          </Chart>
        </Canvas>
      );
      if (context.value) {
        const chart = new Canvas(props);
        chart.render();
      }
    };

    watch(
      [() => lineRef.value, () => context.value],
      () => {
        if (context.value) {
          initChart();
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    onMounted(() => {
      nextTick(() => {
        initChart();
      });
    });
    watch(
      () => props,
      () => {
        // 第一次watch禁止初始化
        if (firstRender.value) {
          firstRender.value = false;
          return;
        }
        initChart();
      },
      {
        deep: true,
      }
    );
    const getCurrentLegend = (obj) => {
      currentLegend.value = obj;
      initChart();
      emit("legendSelectChanged", currentLegend.value);
    };
    return () =>
      props.isLoading
        ? h(dataLoading, {
            theme: props.theme,
            loadingConfig: props.loadingConfig,
          })
        : data.value.length
        ? h(
            "div",
            {
              style: {
                width: `${width.value}px`,
                ...props?.style,
              },
            },
            [
              isShowLegendFlag.value
                ? h(SelectLegend, {
                    ref: legendRef,
                    onLegendSelectChanged: getCurrentLegend,
                    chartConfig: chartConfig.value,
                    legendConfig: legendConfig(chartConfig.value),
                    metricsMap: metricsMap.value,
                    color: getColor(colors.value),
                    style: {
                      marginBottom: props.chartConfig?.label ? "4px" : "-6px",
                      flexWrap: "wrap",
                      height: "auto",
                    },
                  })
                : null,
              h("canvas", {
                attrs: {
                  id: "pie",
                },
                style: {
                  backgroundColor: props?.style?.backgroundColor,
                },
                ref: lineRef,
                id: "pie",
              }),
            ]
          )
        : defaultEmpty(props.dataEmptyConfig);
  },
});

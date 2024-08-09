/** @jsxImportSource @antv/f2 */
// 问题报错见https://f2.antv.antgroup.com/tutorial/question/with-react-typescript
// 移动端事件支持
import {
  defineComponent,
  ref,
  onMounted,
  nextTick,
  computed,
  watch,
  h,
} from "vue";
import {
  jsx,
  Canvas,
  Chart,
  Legend,
  Axis,
  Line,
  Tooltip,
  Interval,
  TextGuide,
  ScrollBar,
} from "@antv/f2";
import { getColor } from "../const/getColor";
import { tooltipCss, toolTipConfig } from "../const/getToolTip";
import { getAxisProp } from "../const/getAxis";
import {
  formatChatData,
  isObject,
  baseArraySum,
  getContainerHeight
} from "../utils/utils";
import { guideConfig } from "../const/getGuide";
import { isShowLegend, legendConfig } from "../const/getLegend";
import SelectLegend from "../const/Legend";
import { dataLoading } from "../const/dataLoading";
import { defaultEmpty } from "../const/handleEmpty";
import YaxisTitle from "../const/YaxisTitle";

export default defineComponent({
  name: "CommonInterval",
  props: {
    chartType: {
      type: String, // Histogram、Bar,
      default: "Bar",
    },
    chartData: {
      type: Array,
      default: () => [],
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
    colors: {
      type: Array,
      default: [],
    },
    pixelRatio: {
      type: Number,
      default: typeof window !== "undefined" ? window?.devicePixelRatio : 1,
    },
    event: {
      type: Array,
      default: () => [],
    },
    dataEmptyConfig: {
      type: Object,
      default: () => ({}),
    },
    seriesField: {
      type: String,
      default: "",
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
    }
  },
  setup(props, { slots, emit }) {
    const tooltipRef = ref();
    const legendRef = ref();
    const titleRef = ref();
    const lineRef = ref();
    const chartConfig = computed(() => {
      return {
        connectNulls: true,
        canClick: false,
        ...props.chartConfig,
        tooltip: toolTipConfig(
          props.chartConfig?.tooltip || {},
          tooltipRef.value,
          lineRef.value,
          {
            chartType: props?.chartType,
            metrics: props?.metrics,
            legend: legendConfig(chartConfig.value),
            yAxis: chartConfig.value?.yAxis,
          }
        ),
      };
    });
    // toolTip
    const tooltip = computed(() => chartConfig.value?.tooltip || {});
    const x = ref("date");
    const y = ref("value");
    const width = ref(props.width);
    const height = ref(props.height);
    const pixelRatio = ref(props.pixelRatio);
    const colors = computed(() => props.colors);
    const firstRender = ref(true);
    const firstCanvasRender = ref(true);
    const metrics = computed(() => props.metrics);
    const heightDom = ref(0)
    // 类型判断
    const isHistogram = computed(() => props.chartType === "Histogram");
    // 是否是多个柱
    const isMultiBar = computed(
      () => new Set(data.value.map((i) => i.type)).size > 1
    );
    // 存在层叠情况，TODO: 尚未知是否支持部分柱状堆叠，待查
    const isStack = computed(() => chartConfig.value?.stack);
    const labelMap = computed(() => chartConfig.value?.labelMap);
    const data = computed(() =>
      formatChatData({
        chartData: props.chartData,
        metrics: props.metrics,
        dimensions: props.dimensions,
        labelMap: labelMap.value,
        chartConfig: props.chartConfig,
        isHistogram: isHistogram.value,
        seriesField: props.seriesField,
        colors: getColor(colors.value),
      })
    );
    const guideData = computed(() => baseArraySum(data.value, "value", "date"));
    const context = computed(() => lineRef.value?.getContext("2d"));
    const dataZoom = computed(() => chartConfig.value?.dataZoom);

    // point遍历metrics
    const pointKey = computed(() => {
      let arr = [];
      if (labelMap.value && isObject(labelMap.value)) {
        props.metrics.forEach((v) => {
          arr.push(labelMap.value[v]);
        });
      } else {
        arr = props.metrics;
      }

      return arr;
    });
    const getAdjust = () => {
      if (isMultiBar.value) {
        return isStack.value
          ? "stack"
          : {
              type: "dodge",
              marginRatio: 0.05, // 设置分组间柱子的间距
            };
      }
      return "";
    };

    const xAxisPropsList = computed(() =>
      getAxisProp(props, "x", isHistogram.value)
    ); // 返回obj
    const yAxisPropsList = computed(() =>
      getAxisProp(props, "y", isHistogram.value)
    ); // 返回数组

    // 下钻回调
    const onClick = (data) => {
      const keys = Object.keys(props?.event || {});
      if (keys.length > 0) {
        keys.forEach((v) => {
          data.origin[`${props.dimensions[0]}`] = data?.origin?.date;
          data.origin[data?.origin?.type] = data?.origin?.value;
          props.event[v]?.callback && props.event[v]?.callback(data);
        });
      }
    };

    const defaultLegend = () => {
      const obj = {};
      pointKey.value.forEach((v) => {
        obj[v] =
          chartConfig.value?.legend?.selected?.[v] === false ? false : true;
      });
      return obj;
    };

    // 是否展示legend
    const isShowLegendFlag = computed(() => isShowLegend(chartConfig.value));
    const currentLegend = ref(defaultLegend());
    const initChart = async () => {
      await nextTick();
      if (!context.value) {
        return;
      }
      const currentData = isShowLegendFlag.value
        ? data.value.filter((v) => currentLegend.value[v.type])
        : data.value;
      let yAxis = yAxisPropsList.value;
      let colorRight = [];
      // 双轴配置过滤数据
      if (yAxisPropsList.value?.length > 1) {
        if (currentData?.every((v) => !v.value)) {
          yAxis = yAxisPropsList.value.filter((v) => v.field === "valueRight");
        }
        if (currentData?.every((v) => !v.valueRight)) {
          yAxis = yAxisPropsList.value.filter((v) => v.field === "value");
        }
        currentData.forEach((v) => {
          if (v.valueRight && !colorRight.includes(v.color)) {
            colorRight.push(v.color);
          }
        });
      }
      const color = [...new Set(currentData.map((v) => v.color))];
      // 展示以右边轴为基准的line
      const showLineRight = yAxis.filter((v) => v.field === "valueRight");
      heightDom.value = getContainerHeight(height.value, legendRef.value, titleRef.value)
      const { props: initChartProps } = (
        <Canvas
          context={context.value}
          pixelRatio={pixelRatio.value}
          width={width.value}
          height={heightDom.value}
        >
          <Chart
            data={currentData}
            coord={
              isHistogram.value && {
                transposed: true,
              }
            }
          >
            {/* x轴, 直方图x/y是反着的，因此x/y均为属性数组控制数量 */}
            {xAxisPropsList.value?.map((info) => <Axis {...info} />) || null}
            {/* x轴方向的横线颜色 */}
            <Axis
              field={isHistogram.value ? "value" : "date"}
              style={{
                label: {
                  fill: "transparent",
                },
                grid: {
                  stroke: "transparent",
                },
                line: {
                  stroke: "#CCCCCC",
                },
              }}
            />
            {/* y轴，可能存在多条，数量根据计算的属性值决定 */}
            {yAxis?.map((info) => <Axis {...info} />) || null}
            {(chartConfig.value.showLine || showLineRight?.length > 0) && (
              <Line
                x={x.value}
                y="valueRight"
                color={["type", colorRight]}
                connectNulls={chartConfig.value?.connectNulls}
                shape={chartConfig.value?.smooth}
              />
            )}

            <Interval
              x={x.value}
              y={y.value}
              adjust={getAdjust()}
              color={["type", color]}
              style={{
                radius: (v) => {
                  const arr = props.metrics.slice(-1);
                  let type = arr[0];
                  if (isObject(labelMap.value)) {
                    type = labelMap.value[arr[0]];
                  }

                  if (isStack.value) {
                    if (type === v.type) {
                      return isHistogram.value ? [0, 4, 4, 0] : [4, 4, 0, 0];
                    }
                  } else {
                    if (isMultiBar.value) {
                      let radius = 2;
                      if (props.metrics?.length > 2) {
                        radius = props.metrics?.length - 1;
                      }
                      return isHistogram.value
                        ? [0, radius, radius, 0]
                        : [radius, radius, 0, 0];
                    }
                    return isHistogram.value ? [0, 4, 4, 0] : [4, 4, 0, 0];
                  }
                  return [0, 0, 0, 0];
                },
              }}
              selection={{
                selectedStyle: (record) => {
                  onClick(record);
                  const { xMin, xMax } = record;
                  const width = xMax - xMin;
                  return {
                    x: xMin,
                    width: width,
                    fillOpacity: 1,
                  };
                },
                unSelectedStyle: {
                  fillOpacity: chartConfig.value.canClick ? 0.4 : 1,
                },
              }}
            />
            {tooltip.value.show && <Tooltip {...tooltip.value} />}
            {props.chartConfig.showGuide &&
              guideData.value.map((item) => {
                return (
                  <TextGuide {...guideConfig(item, props.chartConfig.guide)} />
                );
              })}
            {dataZoom.value?.[0] && (
              <ScrollBar
                mode="x"
                range={[
                  dataZoom.value?.[0]?.start / 100,
                  dataZoom.value?.[0]?.end / 100,
                ]}
              />
            )}
            {dataZoom.value?.[1] && (
              <ScrollBar
                mode="y"
                range={[
                  dataZoom.value?.[1]?.start / 100,
                  dataZoom.value?.[1]?.end / 100,
                ]}
              />
            )}
          </Chart>
        </Canvas>
      );
      if (context.value) {
        const chart = new Canvas(initChartProps);
        chart.render();
      }
    };

    const hideTooltip = () => {
      if (tooltip.value.alwaysShowContent) return;
      tooltipRef.value.style.opacity = 0;
      tooltipRef.value.style.display = "none";
    };
    onMounted(() => {
      nextTick(() => {
        initChart();
      });
    });
    // 重新渲染
    const reRender = () => {
      firstCanvasRender.value = false;
      setTimeout(() => {
        firstCanvasRender.value = true;
        initChart();
      }, 0);
    };
    watch(
      () => props,
      () => {
        // 第一次watch禁止初始化
        if (firstRender.value) {
          firstRender.value = false;
          return;
        }
        currentLegend.value = defaultLegend()
        reRender();
      },
      {
        deep: true,
        immediate: true,
      }
    );
    const getCurrentLegend = (obj) => {
      currentLegend.value = obj;
      reRender();
      emit("legendSelectChanged", currentLegend.value);
    };
    return () =>
      props.isLoading
        ? h(dataLoading, {
            theme: props.theme,
            loadingConfig: props.loadingConfig,
          })
        : data.value.length > 0
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
                    metricsMap: pointKey.value,
                    color: getColor(colors.value),
                    style: {
                      marginBottom: isHistogram.value ? "-20px" : "-6px",
                      width: "100%;",
                    },
                  })
                : null,
              h(YaxisTitle, {
                ref: titleRef,
                style: {
                  width: "100%;",
                },
                chartConfig: chartConfig.value,
                chartType: props.chartType,
              }),
              h(
                "div",
                {
                  style: {
                    position: "relative",
                    height: `${heightDom?.value}px`
                  },
                  onTouchend: hideTooltip,
                },
                firstCanvasRender.value
                  ? [
                      h("div", {
                        ref: tooltipRef,
                        style: tooltipCss,
                      }),
                      h("canvas", {
                        attrs: {
                          id: "line",
                        },
                        style: {
                          backgroundColor: props?.style?.backgroundColor,
                          touchAction: "none"
                        },
                        ref: lineRef,
                        id: "line",
                      }),
                    ]
                  : null
              ),
            ]
          )
        : defaultEmpty(props.dataEmptyConfig);
  },
});

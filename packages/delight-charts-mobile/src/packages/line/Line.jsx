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
  Area,
  Canvas,
  Chart,
  Line,
  Point,
  Axis,
  Tooltip,
  ImageGuide,
  ScrollBar,
  TextGuide,
} from "@antv/f2";
import { getColor, defaultColors } from "../../const/getColor";
import { tooltipCss, toolTipConfig } from "../../const/getToolTip";
import {
  formatChatData,
  isObject,
  calcGridRect,
  getNativeConfig,
  getContainerHeight,
} from "../../utils/utils";
import { isShowLegend, legendConfig } from "../../const/getLegend";
import { getAxisProp } from "../../const/getAxis";
import { defaultEmpty } from "../../const/handleEmpty";
import { dataLoading } from "../../const/dataLoading";
import SelectLegend from "../../const/Legend";
import YaxisTitle from "../../const/YaxisTitle";

export default defineComponent({
  name: "Line",
  props: {
    chartType: {
      type: String, // Histogram、Bar,
      default: "line",
    },
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
    colors: {
      type: Array,
      default: [],
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
    theme: {
      type: String, // Histogram、Bar,
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
  setup(props, { emit }) {
    const lineRef = ref();
    const tooltipRef = ref();
    const legendRef = ref();
    const titleRef = ref();
    const chart = ref();
    const firstRender = ref(true);
    const firstCanvasRender = ref(true);
    const heightDom = ref(0);

    const chartConfig = computed(() => {
      return {
        connectNulls: true,
        smooth: false,
        ...props.chartConfig,
        tooltip: toolTipConfig(
          props.chartConfig?.tooltip || {},
          tooltipRef.value,
          lineRef.value,
          {
            legend: legendConfig(chartConfig.value),
            chartType: props?.chartType,
            metrics: props?.metrics || getNativeConfig(props)?.metrics,
            yAxis: chartConfig.value?.yAxis,
            chartData:
              props?.chartData?.length > 0
                ? props?.chartData
                : getNativeConfig(props)?.chartData,
          }
        ),
      };
    });

    const symbolData = ref(["image", "data", "//"]);
    const colors = computed(() => props.colors);
    const context = computed(() => lineRef.value?.getContext("2d"));
    const pixelRatio = computed(() => props.pixelRatio);
    const width = computed(() => props?.width);
    const height = computed(() => props?.height);
    const metrics = computed(
      () => props?.metrics || getNativeConfig()?.metrics
    );
    const x = ref("date");
    const y = ref("value");
    const labelMap = computed(() => chartConfig.value?.labelMap);

    const data = computed(() => {
      const {
        chartData = [],
        metrics = [],
        dimensions = [],
      } = getNativeConfig(props);
      return formatChatData({
        chartData: props?.chartData?.length > 0 ? props?.chartData : chartData,
        metrics: props?.metrics?.length > 0 ? props?.metrics : metrics,
        dimensions:
          props?.dimensions?.length > 0 ? props?.dimensions : dimensions,
        labelMap: labelMap.value,
        chartConfig: props.chartConfig,
        colors: getColor(colors.value),
        areaColors: chartConfig.value.area ? areaColorList.value : [],
      });
    });

    const isSymbolConfig = computed(() =>
      isObject(chartConfig.value?.symbolConfig)
    );
    const symbolConfig = computed(() => chartConfig.value?.symbolConfig);
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
    // toolTip
    const tooltip = computed(() => chartConfig.value?.tooltip || {});

    const xAxisPropsList = computed(() => getAxisProp(props, "x")); // 返回obj
    const yAxisPropsList = computed(() => getAxisProp(props, "y")); // 返回数组
    // 是否圆滑曲线
    const isSmooth = computed(() =>
      chartConfig.value?.smooth === true ? "smooth" : ""
    );
    // 双轴一个数据
    const showDoubleDataPoint = computed(() => {
      if (yAxisPropsList.value?.length === 2 && data.value?.length === 2) {
        return true;
      }
      return false;
    });
    // 单轴一个数据或者双轴单个数据
    const showSingleDataPoint = computed(() => {
      if (yAxisPropsList.value?.length === 1 && data.value?.length === 1) {
        return true;
      }
      if (showDoubleDataPoint.value) {
        return true;
      }
      return false;
    });

    const areaColorList = computed(() => {
      const colorsList = getColor(colors.value);
      let color = [];
      if (props?.metrics.length === 1) {
        color[0] = "l(90) 0.3:color 0.9:#f7f7f7".replace(
          "color",
          colorsList[1][0]
        );
      } else {
        colorsList[1].forEach((v, index) => {
          color.push("l(90) 0.3:color 0.9:#f7f7f7".replace("color", v));
        });
      }
      return color;
    });

    const initChart = async () => {
      await nextTick();
      if (!context.value) {
        return;
      }

      const { left, right, top, bottom } = calcGridRect(
        chartConfig.value?.grid,
        width.value,
        height.value
      );

      const currentData = isShowLegendFlag.value
        ? data.value.filter((v) => currentLegend.value[v.type])
        : data.value;
      console.log(currentData, currentLegend.value);
      let yAxis = yAxisPropsList.value;
      let colorRight = [];
      let areaColorRight = [];
      // 双轴配置，过滤数据及颜色
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
          if (v.valueRight && !areaColorRight.includes(v.areaColor)) {
            areaColorRight.push(v.areaColor);
          }
        });
      }
      const color = [...new Set(currentData.map((v) => v.color))];
      const areaColor = [...new Set(currentData.map((v) => v.areaColor))];
      // 展示以左边轴为基准的line
      const showLineLeft = yAxis.filter((v) => v.field === "value");
      // 展示以右边轴为基准的line
      const showLineRight = yAxis.filter((v) => v.field === "valueRight");

      heightDom.value = getContainerHeight(
        height.value,
        legendRef.value,
        titleRef.value
      );
      const { props } = (
        <Canvas
          context={context.value}
          pixelRatio={pixelRatio.value}
          width={width.value}
          height={heightDom.value}
          style={{
            left,
            right,
            top,
            bottom,
          }}
        >
          <Chart data={currentData}>
            {/* x轴, 直方图x/y是反着的，因此x/y均为属性数组控制数量 */}
            {xAxisPropsList.value?.map((info) => <Axis {...info} />) || null}
            {/* y轴，可能存在多条，数量根据计算的属性值决定 */}
            {yAxis?.map((info) => <Axis {...info} />) || null}
            {/* x轴方向的横线颜色 */}
            <Axis
              field="date"
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
            {(chartConfig.value.showLine || showLineRight?.length > 0) && (
              <Line
                x={x.value}
                y={"valueRight"}
                color={["type", colorRight]}
                connectNulls={chartConfig.value?.connectNulls}
                shape={isSmooth.value}
              />
            )}
            {showLineLeft?.length > 0 && (
              <Line
                x={x.value}
                y={y.value}
                color={["type", color]}
                connectNulls={chartConfig.value?.connectNulls}
                shape={isSmooth.value}
              />
            )}

            {chartConfig.value.area && (
              <Area
                x={x.value}
                y={y.value}
                shape={isSmooth.value}
                color={["type", areaColor]}
              />
            )}
            {chartConfig.value.area && (
              <Area
                x={x.value}
                y="valueRight"
                shape={isSmooth.value}
                color={["type", areaColorRight]}
              />
            )}
            {/* 标注图片 */}
            {isSymbolConfig.value &&
              symbolData.value?.some(
                (v) => symbolConfig.value?.symbol?.indexOf(v) > -1
              ) &&
              data.value.map((item) => {
                return (
                  <ImageGuide
                    records={[item]}
                    src={symbolConfig.value?.symbol}
                    attrs={{
                      height: 24,
                      width: 24,
                    }}
                  />
                );
              })}
            {/* 双轴一个数据 */}
            {showDoubleDataPoint.value && (
              <Point
                x={x.value}
                y={"valueRight"}
                style={{
                  field: "type",
                  fill: "#fff",
                  lineWidth: 1,
                  stroke: (val) => {
                    const index = pointKey.value.indexOf(val);
                    return defaultColors[index];
                  },
                }}
              />
            )}

            {/* 标注空态圈 */}
            {((isSymbolConfig.value &&
              symbolConfig.value.symbol === "emptyCircle") ||
              showSingleDataPoint.value) && (
              <Point
                x={x.value}
                y={y.value}
                style={{
                  field: "type",
                  fill: "#fff",
                  lineWidth: 1,
                  stroke: (val) => {
                    const index = pointKey.value.indexOf(val);
                    return defaultColors[index];
                  },
                }}
              />
            )}
            {/* toolTip */}
            {tooltip.value.show && <Tooltip {...tooltip.value} />}
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
            <TextGuide
              content={`13`}
              style={{
                fill: "#000",
                fontSize: "24px",
              }}
              offsetY={-20}
              offsetX={-15}
            />
          </Chart>
        </Canvas>
      );
      if (context.value) {
        chart.value = new Canvas(props);
        chart.value.render();
      }
    };

    const hideTooltip = () => {
      if (tooltip.value.alwaysShowContent) return;
      document.body.addEventListener(
        "touchend",
        function (e) {
          window.requestAnimationFrame(() => {
            tooltipRef.value.style.opacity = 0;
            tooltipRef.value.style.display = "none";
          });
        },
        { passive: false }
      );
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
      emit("legendSelectChanged", obj);
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
                    style: { marginBottom: "-6px", width: "100%;" },
                  })
                : null,
              h(YaxisTitle, {
                ref: titleRef,
                style: {
                  width: "100%;",
                },
                chartConfig: chartConfig.value,
              }),
              h(
                "div",
                {
                  style: {
                    position: "relative",
                    height: `${heightDom?.value}px`,
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
                          touchAction: "none",
                        },
                        onTouchend: hideTooltip,
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

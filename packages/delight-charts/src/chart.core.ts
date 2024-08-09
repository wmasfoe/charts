import { use, registerMap, registerTheme, init } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useResizeObserver } from '@vueuse/core'
import * as EchartsComponents from 'echarts/components';
import deepmerge from 'deepmerge'
import DataLoading from './components/DataLoading.vue'
import DataEmpty from './components/DataEmpty.vue'
import { isNil, isEmpty, debounce, isEqual, cloneDeep, omit } from 'lodash'
import DrillBreadcrumb from './components/DrillBreadcrumb.vue'
import { DEFAULT_COLORS, DEFAULT_COLORS_RGBA } from './const/chart'
import DEFAULT_THEME from './const/theme.json'
import { sankeyHighlight } from './utils/sankeyHighLight'
import { createBubbleHighlight } from './utils/bubbleHighLight'
import { DEFAULT_SANKEY_COLOR, defaultSankeyEmphasis, defaultSankeyBlur } from './const/defaultSankeyConfig'

import {
  defineComponent,
  ref,
  shallowRef,
  h,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
  PropType,
  defineEmits,
} from "vue";

import type { EchartsOpts } from './const/interface/common'
import type {
  EventsConfig,
  GetChartOptions,
  DrillBreadcrumb as DrillBreadcrumbType
} from './const/interface/core'
import type { OriginDataType, DataEmptyConfig, OptionsSetting } from './const/interface/option'
import type { ChartEvents } from './const/interface/events'

const DELIGHT_THEME = JSON.parse(JSON.stringify(DEFAULT_THEME));
const delightThemeName = 'delight-charts';
const echarts = {
  use,
  init,
  registerMap,
  registerTheme,
}
const extraEchartsComponents = []
for (const key in EchartsComponents) {
  extraEchartsComponents.push(EchartsComponents[key])
}
echarts.registerTheme(delightThemeName, DELIGHT_THEME);

echarts.use([
  CanvasRenderer,
  ...extraEchartsComponents
])

export function generateChart(name: string, getChartOptions: GetChartOptions, opts: {
  // 加载异步插件
  plugins?: () => Promise<{ charts?: any; usePlugins: any; mapJson?: any } | void> | void

} = {}): any {
  return defineComponent({
    name,
    props: {
      chartData: {
        type: Object as PropType<OriginDataType>,
        // required: true,
        default: () => ([]),
      },
      type: {
        type: String,
      },
      opts: {
        type: Object as PropType<EchartsOpts>,
        default: () => ({
          notMerge: true,
          replaceMerge: [],
          lazyUpdate: false,
          silent: false
        })
      },
      drillBreadcrumbConfig: {
        type: Object as PropType<DrillBreadcrumbType>,
        default: () => ({
          isShowDrillBreadcrumb: false,
          breadcrumbData: [],
          breadcrumbDataText: '当前层级',
          showOverflowTooltip: true
        }),
      },
      geoJson: {
        type: Array as PropType<String[]>,
        default: () => [],
      },
      mapType: {
        type: String,
        default: ''
      },
      seriesField: {
        type: String,
        default: ''
      },
      // 维度
      dimensions: {
        type: Array as PropType<String[]>,
        // required: true,
        default: () => ([]),
      },
      events: {
        type: Array as PropType<ChartEvents[]>,
        default: () => ([]),
      },
      // 指标
      metrics: {
        type: Array as PropType<String[]>,
        // required: true,
        default: () => ([]),
      },
      renderType: {
        type: String as PropType<'svg' | 'canvas'>,
        validator(value: unknown) {
          return typeof value === 'string' && ['svg', 'canvas'].includes(value)
        },
        default: 'canvas',
      },
      changeDelay: { type: Number, default: 300 },
      isLoading: {
        type: Boolean,
        default: false,
      },
      dataEmptyConfig: {
        type: Object as PropType<DataEmptyConfig>,
        default: () => ({}),
      },
      cssClass: {
        type: String,
        default: '',
      },
      chartConfig: {
        type: Object as PropType<OptionsSetting>,
        validator(value) {
          // TODO: 校验配置项
          return true;
        },
        default: () => ({
          tooltipVisible: true,
          legendVisible: true,
          titleVisible: true,
          gridVisible: true,
        }),
      },
      // todo data empty支持用户自定义传入empty image text
      theme: {
        type: String,
        // validator(value) {
        //   return (
        //     typeof value === 'string' &&
        //     ['dark', 'light', 'e'].includes(value)
        //   )
        // },
        default: delightThemeName,
      },
      colors: {
        type: Array as PropType<string[]>,
        default: [],
      },
      resizeable: {
        type: Boolean,
        default: true,
      },
      width: {
        type: [Number, String] as PropType<string | number>,
        default: 'auto',
      },
      height: {
        type: [Number, String] as PropType<string | number>,
        default: 400,
      },
      maxWidth: {
        type: [Number, String] as PropType<string | number>,
        default: '',
      },
      maxHeight: {
        type: [Number, String] as PropType<string | number>,
        default: '',
      },
      minWidth: {
        type: [Number, String] as PropType<string | number>,
        default: 0,
      },
      minHeight: {
        type: [Number, String] as PropType<string | number>,
        default: 0,
      },
      // 生命勾子函数
      beforeConfig: { type: Function },
      afterConfig: { type: Function },
      afterSetOption: { type: Function },
      afterSetOptionOnce: { type: Function },
      toolTipsText: {
        type: Array as PropType<any> | Object as PropType<any>,
        default: () => [],
      },
    },
    setup(props, { emit, expose, slots, attrs }) {
      const hasBreadcrumb = computed(() => (props?.drillBreadcrumbConfig?.isShowDrillBreadcrumb && props?.drillBreadcrumbConfig?.breadcrumbData?.length))
      const canvasStyle = computed(() => ({
        width: isNaN(+props.width) ? props.width : `${+props.width}px`,
        height: hasBreadcrumb.value ? `${+props.height - 28}px` : `${+props.height}px`,
        position: 'relative',
      }));
      const clickIndex = ref<number>(-1);
      const onOff = ref<boolean>(true);
      const chartColor = computed(
        () => {
          if (name === 'SankeyChart') {
            return DEFAULT_SANKEY_COLOR
          }
          return props.colors?.length > 0 ? props.colors :
            (name === 'Circle' ? DEFAULT_COLORS_RGBA : name === 'WordCloud' ? [] : DEFAULT_COLORS)
        }
      )
      const mounted = ref<boolean>(false);
      const _chart = shallowRef<echarts.EChartsType | undefined>();
      const isFirstRender = ref(true);
      const emits = defineEmits(['ready', 'ready-first', 'legendSelectChanged', 'selectMenu']);
      const isDataEmpty = computed<boolean>(
        () => !isDefaultDataEmptyChart.value && !props?.chartData?.length && !props.chartConfig?.series?.length
      );
      const bubbleLabelMap = new Map();
      const isDefaultDataEmptyChart = computed(() => (['Radar', 'Map', 'Sankey'].includes(name) || name === 'Chart' && ['radar', 'map', 'sankey'].includes(props?.chartConfig?.type)))
      const isDefaultDataEmptyChartEmpty = computed(() => isDefaultDataEmptyChart.value && !props?.chartData?.length && !props.chartConfig?.series?.length)

      // 将数组中的两个数进行交换
      function swap(itemArr: any, indexA: any, indexB: any) {
        const temp = itemArr[indexA];
        itemArr[indexA] = itemArr[indexB];
        itemArr[indexB] = temp;
      }

      // 以查找排序方式，对arr进行排序，同时以相同交换方式对otherArr中数据进行排序
      function multiArraySort(
        arr: any = [],
        sortOrder: string = 'asc',
        otherArr: any[] = []
      ) {
        for (let i = 0; i < arr.length; i++) {
          let swapIndex = i;
          for (let j = i; j < arr.length; j++) {
            if (sortOrder === 'desc') {
              if (arr[j] > arr[swapIndex]) {
                swapIndex = j;
              }
            } else if (arr[j] < arr[swapIndex]) {
              swapIndex = j;
            }
          }

          if (swapIndex !== i) {
            swap(arr, swapIndex, i);
            otherArr.forEach((itemArr) => {
              swap(itemArr, swapIndex, i);
            });
          }
        }
      }

      function getUsingFieldData(arr: any[] = [], seriesField: string, metricList: string[]) {
        return arr.map((item: any) => {
          const seriesName = item[seriesField]
          const metricMap = metricList.reduce((total, metricName: string) => {
            total[seriesName] = item[metricName]
            return total
          }, {})

          return {
            ...item,
            ...metricMap
          }
        })
      }

      // 通过charData的数据，处理处维度与指标的集合字段
      const setOption = async (chartData: any, setExtraConfig?: any) => {
        // tooltip lengend title 空对象默认显示，只要show没声明成false就默认显示，
        const {
          legend = {},
          title = {},
          tooltip = {},
          grid = {},
          dataOrder = {},
        } = props.chartConfig || {}

        const { links, bubbleSymbolInfo } = setExtraConfig || {}

        // 使用的chartData.data、echarts.series数据
        let usingData = chartData?.slice?.(0) || []

        let usingDimensions = props.dimensions || []
        let usingMetrics = props.metrics || []

        let series = (props.chartConfig.series || []).slice(0)
        if (
          isEmpty(series) &&
          isEmpty(usingDimensions) &&
          isEmpty(usingMetrics) && !['WordCloud', 'Map', 'Radar', 'Gauge', 'Bullet'].includes(name)
        ) {
          // 如果三个都为空，则报错
          console.warn(
            'dimensions、metrics、chartConfig.series 同时为空'
          );
        }

        if ((isEmpty(usingDimensions) || isEmpty(usingMetrics)) && !['WordCloud', 'Map', 'Radar','Gauge', 'Bullet'].includes(name)) {
          console.warn("dimensions 与 metrics 需要同时存在");
          // 如果维度或指标没有的话，则使用chartConfig.series
          usingData.length = 0;
        } else {
          series = [];
        }

        // 如果有分组现象,则优先处理
        if (props.seriesField && name !== 'BubbleChart') {
          const { seriesField = '' } = props

          const dimList: string[] = Array.from(new Set(usingData.map((item: any) => item[seriesField])))
          // 求出分组-指标的组合
          const newUsingData = getUsingFieldData(usingData, seriesField, usingMetrics)

          usingData = newUsingData

          usingMetrics = dimList
        }

        // 如果设置了排序属性，则对usingData与series都进行排序；sortOrder为desc下为倒序，其他情况均为正序
        if (dataOrder.sortfield || dataOrder.sortField) {
          // 这里对sortfield与sortField做兼容，避免大小写问题驼峰问题
          if (!dataOrder.sortfield) {
            dataOrder.sortfield = dataOrder.sortField
          }

          let usingSortOrder = dataOrder.sortOrder || 'asc'
          if (name === 'Histogram') {
            // 直方图与其他的排序是反着的，需要从上到下看，而不是按照Y轴方向
            usingSortOrder = usingSortOrder === 'desc' ? 'asc' : 'desc'
          }

          usingData.sort((data1: any, data2: any) => {
            let ascResult = usingSortOrder === 'desc' ? -1 : 1

            // 适配对于设置柱子颜色情况下，使用value值的情况
            const value1 = data1[dataOrder.sortfield]?.value ?? data1[dataOrder.sortfield]
            const value2 = data2[dataOrder.sortfield]?.value ?? data2[dataOrder.sortfield]

            // 排序需要是稳定的，因此如果值相同情况下，不交换顺序
            if (value1 === value2) {
              return 0;
            }
            return Number(value1) > Number(value2)
              ? ascResult
              : -ascResult;
          });

          if (series.length > 0) {
            const sortInfo = series.find(
              (info: any) => info.name === dataOrder.sortfield
            );
            const otherInfoArr = series.filter(
              (info: any) => info.name !== dataOrder.sortfield
            );
            multiArraySort(
              sortInfo?.data || [],
              usingSortOrder,
              otherInfoArr.map((info: any) => info.data)
            );
          }
        }

        const usingChartConfig = {
          ...props.chartConfig,
          mapType: props.mapType,
          series,
          seriesField: props.seriesField,
        };

        if(name === 'SankeyChart') {
          usingChartConfig.chartLinks = isEmpty(links) ? props.chartConfig?.chartLinks : links
        }

        const extra = {
          tooltipVisible:
            props.chartConfig?.tooltipVisible ||
            ((isNil(props.chartConfig?.tooltipVisible) ||
              !isEmpty(tooltip)) && tooltip?.show !== false),
          legendVisible:
            props.chartConfig?.legendVisible ||
            ((isNil(props.chartConfig?.legendVisible) ||
              !isEmpty(legend)) && legend?.show !== false),
          titleVisible: props.chartConfig?.titleVisible || (!isEmpty(title) && title?.show !== false),
          // bubble默认显示grid
          gridVisible: !isEmpty(grid) || (name === 'BubbleChart' && props.chartConfig?.gridVisible !== false),
          chartConfig: usingChartConfig,
          echarts: _chart.value,
          color: chartColor.value,
          tooltipFormatter: null,
          dimensions: usingDimensions,
          metrics: usingMetrics,
          toolTipsText: props.toolTipsText,
          quadrantList: props.quadrantList,
        };
        // 通过数据行列以及其他属性信息，获取echart所需要的option值
        const chartOptions = getChartOptions(
          usingData,
          usingChartConfig,
          extra
        );
        if(props.theme === delightThemeName){
          chartOptions.color = chartColor.value
        }
        _chart.value?.setOption(chartOptions, props.opts);
        emit('ready', _chart.value, chartOptions);
        if (isFirstRender.value) {
          isFirstRender.value = false;
          emit('ready-first', _chart.value, chartOptions);
        }
      };

      const isFirstUnSelect = (selected: Record<string, boolean>) => {
        if (Object.values(selected).every((i) => !i)) {
          // 选中selected对象里的所有图例
          triggerAction('legendSelect', selected)
          const toggledSelected = {}
          Object.keys(selected).forEach(item => {
            toggledSelected[item] = true
          })
          onOff.value = true;
          emit('legendSelectChanged', toggledSelected)
          return
        }
        let unSelectedCount = 0;
        for (const name in selected) {
          if (!selected.hasOwnProperty(name)) {
            continue;
          }
          if (!selected[name]) unSelectedCount++;
        }
        if (!unSelectedCount) {
          onOff.value = true;
        }
        return unSelectedCount === 1;
      };

      const triggerAction = (action: string, selected: Record<string, boolean>) => {
        const legend: Record<string, string>[] = [];
        for (const name in selected) {
          if (selected.hasOwnProperty(name)) {
            legend.push({
              name: name,
            });
          }
        }

        _chart.value?.dispatchAction({
          type: action,
          batch: legend,
        });
      };

      const canvasEl = ref<HTMLElement>();
      const initMap = async (geoJSON: any) => {
        if (!props.mapType || !props.geoJson.length) {
          echarts.registerMap('china', { geoJSON } as any);
          return
        }
        echarts.registerMap(props.mapType, { geoJSON: props.geoJson } as any);
      }

      // 选中的 legend
      const circleSelectLegend = ref({})
      // circle 更改中心文案
      const changeMainTitle = (selected = []) => {
        // 仅circle支持，需要 canClick、type 配置项
        if (!props.chartConfig.canClick || props.type !== 'circle') return;
        const dimensions = props.dimensions[0];
        // Circle只支持分析一个指标，多个指标以最后一个为准
        const metrics = props.metrics[props.metrics.length - 1];
        const data = cloneDeep(props.chartData);
        // 激活的 name
        const selectNames = Object.keys(selected).filter(i => selected[i])
        const type = selectNames;
        const value: any[] = [];
        // 点击之后 value 变成 {value:x, itemStyle:{}}，格式化
        data.forEach(item => {
          if (selectNames.includes(item[dimensions])) {
            const v = item[metrics];
            value.push(typeof v === 'object' ? v.value : v);
          }
        })

        let datum: any = {
          type,
          value,
        }
        // 保存当前选中的图例，给「点击变淡交互使用」
        circleSelectLegend.value = selected;
        // 全为 false 按全选处理；全选时，清空 type 和 value，清空 circleSelectLegend
        if (Object.values(selected).every(i => !i) || selectNames.length >= data.length) {
          datum = {};
          circleSelectLegend.value = {};
        }

        // 格式化抛出的 chartData
        const computedData = data.map(item => ({
          ...item,
          // 处理选中后变淡效果
          [metrics]: typeof item?.[metrics] === 'object' ? item?.[metrics]?.value : item?.[metrics]
        }))
        props.chartConfig.circleCenter.selectedInfo = { datum, data: computedData };
        // setOptions(computedData) 之后，circle点击变淡有bug。所以重置 clickIndex
        clickIndex.value = -1;
        setOption(computedData);
      }
      const legendBind = ref(false)
      const init = async () => {
        if (!mounted.value) return
        // 异步chart有些情况canvasEl.value是undefined,待排查
        if (_chart.value || isDataEmpty.value || !canvasEl.value) return;
        const el = canvasEl.value as HTMLElement;
        const { charts, usePlugins = [], mapJson } = await opts.plugins?.() || {};
        usePlugins.forEach((item: any) => {
          echarts.use(item)
        });
        if (name === 'Map' && mapJson) {
          await initMap(mapJson)
        }
        _chart.value = (charts || echarts).init(el, props.theme, {
          devicePixelRatio: 2,
        });
        setOption(props.chartData);
        createEventProxy();
        if(legendBind.value) {
          return;
        }
        _chart.value?.on('legendselectchanged', function (obj: any) {
          var selected = obj?.selected;

          const toggledSelected = { ...obj?.selected }

          // 点击图例熄灭
          if(props.chartConfig?.legend?.legendMode) {
            changeMainTitle(toggledSelected)
            emit('legendSelectChanged', toggledSelected)
          } else {
            // 点击图例变亮
            if (!isNil(selected) && isFirstUnSelect(selected) && onOff.value) {
              //  切换selected所有图例状态
              triggerAction('legendToggleSelect', selected)
              Object.keys(selected).forEach(item => {
                toggledSelected[item] = !selected[item]
              })
              onOff.value = false;
              emit('legendSelectChanged', toggledSelected)
              changeMainTitle(toggledSelected)
              return;
            }
            if (!selected || selected && Object.values(selected).every((i) => !i)) {
              changeMainTitle(selected)
              return;
            }
            emit('legendSelectChanged', selected)
            changeMainTitle(selected)
          }
        });
        legendBind.value = true;
      };
      // 处理resize
      useResizeObserver(canvasEl, (entries) => {
        setTimeout(() => {
          props.resizeable && _chart.value && _chart.value?.resize();
          emit('resize');
        }, props.changeDelay);
      });
      const registeredEvents = ref<any>([]);
      // echart事件示例 https://echarts.apache.org/zh/api.html#echartsInstance.on
      const createEventProxy = () => {
        // 为什么会进来两次
        // 只要用户使用 on 方法绑定的事件都做一层代理，
        // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
        // 实现 events 的动态响应
        if (!_chart.value) return;

        if (props.chartConfig.canClick) {
          // 先解绑,不然会绑定很多遍，导致出问题
          (_chart.value as any).off('click');
          registeredEvents.value = registeredEvents.value.filter(
            (i: string) => i !== 'click'
          );

          const reactiveChartData = computed(() => props.chartData)

          const sankeyClickHighlight = sankeyHighlight();
          const bubbleClickHighlight = createBubbleHighlight(_chart, { originChartData: reactiveChartData, dimensions: props.dimensions, revertable: props.chartConfig.revertable });
          ;(_chart.value as any).on('click', (e: any) => {
            let data: any = []
            let str: string = ''
            switch (e.seriesType) {
              case 'wordCloud':
                const wordSorts = props.chartData.sort((a: any, b: any) => b.value - a.value);
                data = wordSorts.map((i: any, index: number) => ({
                    ...i,
                    textStyle: {
                      ...(i?.textStyle || {}),
                      opacity:
                        clickIndex.value === e.dataIndex
                          ? 1
                          : index === e.dataIndex
                          ? 1
                          : 0.3,
                    },
                }))
                break
              case 'bar':
                str = props.metrics?.[0] as string
                data = props.chartData.map((i, index) => {
                  const obj = i
                  obj[str] = {
                    value: i[str]?.value || i[str],
                    itemStyle: {
                      ...(i[str]?.itemStyle || {}),
                      opacity:
                        clickIndex.value === e.dataIndex
                          ? 1
                          : index === e.dataIndex
                            ? 1
                            : 0.3,
                    },
                  }
                  return obj
                })

                break
              case 'pie':
                str = props.metrics?.[0] as string
                const dimensions = props.dimensions[0];
                data = props.chartData.map((i, index) => {
                  const obj = i
                  const otherColor = props.chartData[index][str]?.itemStyle?.color
                  obj[str] = {
                    value: i[str]?.value || i[str],
                    itemStyle: {
                      ...(i[str]?.itemStyle || {}),
                      color:
                        clickIndex.value === e.dataIndex
                          ? i[str]?.itemStyle?.color.replace(
                            /,0.3\)/g,
                            ',1)'
                          ) || chartColor.value[index]
                          : index === e.dataIndex
                            ? i[str]?.itemStyle?.color.replace(
                              /,0.3\)/g,
                              ',1)'
                            ) || chartColor.value[index]
                            : (otherColor || chartColor.value[index]).replace(
                              /,1\)/g,
                              ',0.3)'
                            ),
                    },
                  }
                  return obj
                })

                // 图例选中优先级 > 点击环形图
                const datum = {
                  type: [e.data.name],
                  value: [e.data.value],
                }
                const customHtmlData = {
                  datum,
                  data: cloneDeep(props.chartData)
                }

                // 点击之后 data.value 变成了对象，处理 data
                const computedData = data.map((item: any) => ({
                  ...item,
                  [str]: item?.[str]?.value
                }))

                // 二次点击，恢复变淡时传的data
                const doubleClickData = {
                  data: computedData,
                  datum: {}
                }

                // 图例未全选
                if (!isEmpty(circleSelectLegend.value)) {
                  // circle 没有全部显示，datum 应该是有值的，和 legend 保持一致   map来处理data，点击之后 data.value 变成了对象，
                  doubleClickData.datum.value = computedData.filter(item => circleSelectLegend.value?.[item[dimensions]]).map((item: any) => typeof item?.[str] === 'object' ? item?.[str]?.value : item?.[str])
                  doubleClickData.datum.type = Object.keys(circleSelectLegend.value).filter(item => circleSelectLegend.value?.[item])
                }

                props.chartConfig.circleCenter.selectedInfo = clickIndex.value === e.dataIndex ? doubleClickData : customHtmlData
                break
              case 'scatter': // 气泡/散点图
                const { chartData } = bubbleClickHighlight(e);
                setOption(chartData);
                return
              case 'sankey':
                const emphasis = deepmerge({
                  ...defaultSankeyEmphasis,
                  itemStyle: omit(defaultSankeyEmphasis.itemStyle, ['borderWidth', 'borderColor'])
                }, props?.chartConfig?.emphasis || {})
                const blur = deepmerge(defaultSankeyBlur, props?.chartConfig?.blur || {})
                const highlight = {
                  nodes: {
                    itemStyle: emphasis.itemStyle
                  },
                  links: {
                    lineStyle: emphasis.lineStyle
                  },
                  activeNode: {
                    itemStyle: deepmerge({
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.85)'
                    }, emphasis.itemStyle)
                  }
                }
                const lowlight = {
                  nodes: {
                    itemStyle: blur.itemStyle,
                    label: blur.label
                  },
                  links: {
                    lineStyle: blur.lineStyle
                  },
                }

                const newOptions = sankeyClickHighlight(e, {
                  nodes: props.chartData,
                  links: props.chartConfig?.chartLinks
                }, {
                  highlightOpacityConfig: highlight,
                  lowlightOpacityConfig: lowlight,
                })
                setOption(newOptions.nodes, {links: newOptions.links})
                return newOptions
              default:
                break
            }
            clickIndex.value = clickIndex.value === e.dataIndex ? -1 : e.dataIndex
            setOption(data)
          })
        }

        const keys = Object.keys(props.events || {});
        keys.length &&
          keys.forEach((ev) => {
            if (registeredEvents.value.indexOf(ev) === -1) {
              registeredEvents.value.push(ev);
              const event = props.events[ev] as EventsConfig;
              event?.query
                ? (_chart.value as any).on(
                  ev,
                  event?.query,
                  (function (ev) {
                    return function (...args: any) {
                      if (ev in props.events && event.callback) {
                        event.callback.apply(null, args);
                      }
                    };
                  })(ev)
                )
                : (_chart.value as any).on(
                  ev,
                  (function (ev) {
                    return function (...args: any) {
                      if (ev in props.events && event.callback) {
                        event.callback.apply(null, args);
                      }
                    };
                  })(ev)
                );
            }
          });
      };

      const chartOptionsHandler = debounce(async (val: any) => {
        if (!_chart.value) {
          await init()
        } else {
          setOption(val);
        }
      }, props.changeDelay, { leading: true, trailing: true });

      watch(() => [isDataEmpty.value, isDefaultDataEmptyChartEmpty.value], (empty) => {
        if (empty.filter(item => item)?.length) {
          _chart.value = undefined
        }
      }, { immediate: true })

      watch(() => canvasEl.value, (newVal, oldVal) => {
        init()
      }, { deep: true })
      watch(
        () => [props.dimensions, props.chartData, props.chartLinks, props.metrics, props.dimensions, props.chartConfig],
        (newValue, oldValue) => {
          // chart异步数据props变化了监听不到
          if (!isEqual(newValue, oldValue) || name === 'Chart') {
            chartOptionsHandler(props.chartData);
          }
        },
        { deep: true }
      );

      watch(
        () => props.colors,
        (newValue, oldValue) => {
          if (!isEqual(newValue, oldValue)) {
            if (props.type === 'circle') {
              props.chartData.forEach(item => {
                delete item.value.itemStyle
                item.value = item.value.value || item.value
              })
              clickIndex.value = -1
            }
            chartOptionsHandler(props.chartData)
          }
        }
      )
      const chartDestroy = () => {
        if (!_chart.value) return;
        _chart.value.dispose();
        _chart.value = undefined;
      };

      onMounted(async () => {
        if (typeof window !== 'undefined') mounted.value = true;
        if(props.renderType === 'svg') {
          const  { SVGRenderer }  = await import('echarts/renderers')
          echarts.use(SVGRenderer)
        }
        await init();
      });

      // 暴露chart实例
      expose({
        _chart,
        isFirstRender,
        canvasEl,
        setOption,
        echarts
      });
      onBeforeUnmount(() => {
        if (_chart.value) {
          chartDestroy();
        }
      });
      const containerStyle = computed(() => {
        let style = {
          ...canvasStyle.value,
          height: props.height + 'px',
          'max-height': props.maxHeight + 'px',
          'max-width': props.maxWidth + 'px',
          'min-height': props.minHeight + 'px',
          'min-width': props.minWidth + 'px',
          padding: '0px',
        }
        if (+props.maxHeight && (+props.height > +props.maxHeight)) {
          style =  {
            ...style,
            'overflow-y': 'scroll'
          }
        }
        if (+props.maxWidth && (+props.width > +props.maxWidth)) {
          style = {
            ...style,
            'overflow-x': 'scroll'
          }
        }
        return style
      })

      return () =>
        h(
          'div',
          {
            style: containerStyle.value,
            class: props.cssClass,
          },
          [
            h(DrillBreadcrumb, {
              style: { display: props?.drillBreadcrumbConfig?.isShowDrillBreadcrumb ? '' : 'none' },
              drillBreadcrumbConfig: props?.drillBreadcrumbConfig,
              onSelectBreadcrumb: (breadItem = { title: '', id: '' }) => { emit('selectBreadcrumb', breadItem) }
            }),
            isDataEmpty.value
              ? h(DataEmpty, {
                style: { ...canvasStyle.value },
                emptyImgUrl: props.dataEmptyConfig?.emptyImgUrl,
                emptyTitle: props.dataEmptyConfig?.emptyTitle,
                emptySubTitle: props.dataEmptyConfig?.emptySubTitle,
              })
              : h('div', {
                ref: canvasEl,
                devicePixelRatio: 2,
                style: { ...canvasStyle.value },
              }),
            h(DataLoading, {
              style: { display: props.isLoading ? '' : 'none' },
            }),
          ]
        );
    },
  });
}
import { Ref, ShallowRef, ComputedRef, nextTick } from "vue";
import { EChartsType } from "echarts";
import { cloneDeep, isNil } from "lodash";
import { NormalObject } from "../const/interface/common";

type Args = {
  originChartData: Ref<any[]> | ComputedRef<any[]>;
  dimensions: any;
  revertable: boolean;
};

export function createBubbleHighlight(
  chartRef: ShallowRef<EChartsType | undefined>,
  args?: Args
) {
  const { originChartData, dimensions, revertable } = args || {};

  const bubbleItemKey =
    typeof dimensions === "string" ? dimensions : dimensions?.[0];
  const defaultBubbleSelected =
    originChartData?.value?.filter((v) => v.active)?.[0]?.[bubbleItemKey] ?? "";
  let bubblePrevSelected = defaultBubbleSelected;

  return function (eventParams: Record<string, any>) {
    let isLight = true;
    let actionType = "select";

    if (bubblePrevSelected === eventParams.name && revertable) {
      isLight = false;
      bubblePrevSelected = "";
      actionType = "unselect";
    } else {
      isLight = true;
      bubblePrevSelected = eventParams.name;
      actionType = "select";
    }

    const chartData = originChartData?.value?.map((item: any) => {
      let currentActive = isLight && item[bubbleItemKey] === eventParams.name;
      return {
        ...item,
        active: currentActive,
      };
    });

    const dispatchInfo = {
      type: actionType,
      seriesIndex: eventParams?.seriesIndex,
      seriesId: eventParams?.seriesId,
      seriesName: eventParams?.seriesName,
      dataIndex: eventParams?.dataIndex,
    };

    nextTick(() => {
      chartRef.value?.dispatchAction(dispatchInfo);
    });

    return {
      chartData,
      dispatchInfo,
    };
  };
}

type StyleArgs = {
  symbolZoomConfig: NormalObject;
  defaultBubbleSizeConfig: NormalObject;
  config: NormalObject;
  selectStyle: NormalObject;
};

export function getActiveDataStyle(args: StyleArgs) {
  const { symbolZoomConfig, defaultBubbleSizeConfig, config, selectStyle } =
    args || {};

  const usingConfig = cloneDeep(config);

  const symbolZoomMax = symbolZoomConfig?.symbolZoomMax * 0.9;
  const symbolMax: number =
    (!isNil(symbolZoomConfig?.symbolMax)
      ? symbolZoomConfig?.symbolMax
      : defaultBubbleSizeConfig.symbolMax) * 1.1;
  const symbolMin: number =
    (!isNil(symbolZoomConfig?.symbolMin)
      ? symbolZoomConfig?.symbolMin
      : defaultBubbleSizeConfig.symbolMin) * 1.3;

  const size = usingConfig.value?.[2];
  // 以100为基准，按最大值缩放比例
  let usingSize = (size / symbolZoomMax) * symbolMax;
  // 保证下限最小值为5
  if (usingSize <= symbolMin || isNaN(usingSize)) {
    usingSize = symbolMin;
  }
  usingConfig.symbol = typeof selectStyle?.symbol === 'function' ? selectStyle.symbol(size, { seriesItem: usingConfig }) : selectStyle?.symbol;
  usingConfig.symbolSize = typeof selectStyle?.symbolSize === 'function' ? selectStyle?.symbolSize(size, { zoom: symbolZoomMax, max: symbolMax, min: symbolMin, seriesItem: usingConfig }) : selectStyle?.symbolSize ?? usingSize;

  // 气泡大小&label样式
  usingConfig.itemStyle = selectStyle?.itemStyle || {};
  usingConfig.label = selectStyle?.label || {};

  return usingConfig;
}

export default createBubbleHighlight;

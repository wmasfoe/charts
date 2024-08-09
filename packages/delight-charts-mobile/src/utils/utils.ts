import useLabelFormat from "./useLabelFormat/index";

export const valueFormat = (
  val: any,
  type?: any,
  digit?: any,
  unit?: boolean | undefined
) => useLabelFormat(val, type, digit, unit);

export const formatChatData = ({
  chartData,
  metrics,
  dimensions,
  labelMap,
  chartConfig,
  isHistogram,
  seriesField,
  colors,
  areaColors,
}: any) => {
  let usingData = (chartData || []).slice(0);
  const { yAxis, showLine, dataOrder, seriesConfig } = chartConfig || {};
  // 做排序逻辑
  const { sortfield, sortField, sortOrder } = dataOrder || {};
  const usingSortField = sortfield ?? sortField ?? "";
  let usingSortOrder = sortOrder ?? "asc";
  if (isHistogram) {
    // 直方图与其他的排序是反着的，需要从上到下看，而不是按照Y轴方向
    usingSortOrder = usingSortOrder === "asc" ? "desc" : "asc";
  }

  if (usingSortField) {
    usingData.sort((data1: any, data2: any) => {
      let ascResult = usingSortOrder === "desc" ? -1 : 1;
      const value1 = data1[usingSortField];
      const value2 = data2[usingSortField];
      // 排序需要是稳定的，因此如果值相同情况下，不交换顺序
      if (value1 === value2) {
        return 0;
      }
      return Number(value1) > Number(value2) ? ascResult : -ascResult;
    });
  }
  const arr: any = [];
  usingData.forEach((v: { [x: string]: any; date: any; name: any }) => {
    metrics.forEach((t: string | number, index: number) => {
      const useRightAxis =
        (showLine || []).includes(t) ||
        (yAxis?.length > 1 && seriesConfig?.[index]?.yAxisIndex === 1) ||
        (yAxis?.length > 1 && !seriesConfig && index === metrics?.length - 1);
      const isVtNumber = !Number.isNaN(+v[t]);
      arr.push({
        date: v[dimensions[0]] || v.date || v.name,
        type: labelMap ? labelMap[t] : seriesField ? v[seriesField] : t,
        value: useRightAxis ? undefined : isVtNumber ? +v[t] : v[t],
        valueRight: useRightAxis ? (isVtNumber ? +v[t] : v[t]) : undefined,
        color: colors?.[1]?.[index] || "",
        areaColor: areaColors?.[index] || "",
      });
    });
  });
  return arr;
};

export const isObject = (obj: any) =>
  Object.prototype.toString.call(obj) === "[object Object]";

type DebounceFn<T extends (...args: any[]) => any> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void;

export function debounceFun<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebounceFn<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function calcPx(desc: string, width: number): number {
  if (Number.isNaN(+desc)) {
    return 0;
  }
  if (typeof +desc === "number") {
    // 传入的是数值
    return +desc;
  }
  if (typeof desc === "string" && desc.endsWith("px")) {
    // 传入的是px
    return parseInt(desc);
  }
  if (typeof desc === "string" && desc.endsWith("%") && width) {
    // 传入的是百分比，就需要计算
    const percent = parseInt(desc, 10);
    return (width * percent) / 100;
  }
  return 0;
}

export function calcGridRect(
  grid: any,
  width: number,
  height: number
): {
  left: number;
  top: number;
  right: number;
  bottom: number;
} {
  const {
    left: gridLeft,
    right: gridRight,
    top: gridTop,
    bottom: gridBottom,
  } = grid || {};
  const left = calcPx(gridLeft, width);
  const right = calcPx(gridRight, width);
  const top = calcPx(gridTop, height);
  const bottom = calcPx(gridBottom, height);

  return {
    left,
    right,
    top,
    bottom,
  };
}

// 获取原生配置line，bar
export const getNativeConfig = (props: {
  chartConfig: { series: any; xAxis: any; yAxis: any };
}) => {
  let chartData: { date: any }[] = [];
  let metrics = [];
  let dimensions: string[] = [];
  const { series, xAxis, yAxis } = props?.chartConfig;
  if (series?.length > 0) {
    metrics = series?.map((v: { name: any }) => v?.name || "value");
    dimensions = ["date"];
    (xAxis?.data || yAxis?.data).forEach((v: any, index: string | number) => {
      const obj = {};
      series.forEach((t: { name: any; data: { [x: string]: any } }) => {
        obj[`${t?.name || "value"}`] = t.data[index];
      });
      chartData.push({
        date: v,
        ...obj,
      });
    });
  }
  return {
    chartData,
    metrics,
    dimensions,
  };
};

// 按sumKey求和，按field分组
export const baseArraySum = (arr: any[], sumKey: string, field: string) => {
  const objValue = arr.reduce((obj, item) => {
    if (!obj[item[field]]) {
      obj[item[field]] = 0;
    }
    obj[item[field]] += Number(item[sumKey]);
    return obj;
  }, {});
  const newArray = Object.keys(objValue).map((key) => ({
    [field]: key,
    [sumKey]: objValue[key],
  }));
  return newArray;
};

// 对整数向上取整到最大一位
export const ceilNum = (v: { toString: () => string }) => {
  const str = v?.toString()?.split(".")?.[0];
  const len = str.length - 1;
  const first = parseFloat(str[0]);
  if (first + 1 >= 10) {
    return 100 ** len;
  }
  return (first + 1) * 10 ** len;
};
export const isDoc = () => {
  if (typeof window !== "undefined") {
    return (
      window.location.host.indexOf("delight-charts-mobile") > -1 ||
      window.location.host.indexOf("localhost") > -1
    );
  }
  return false;
};

export const docLeftValue = () => {
  // 文档里需要减去这个左边距离不然会样式问题
  if (isDoc()) {
    return document
      .getElementsByClassName("view-wrap")?.[0]
      ?.getBoundingClientRect()?.left;
  }
  return 0;
};

export const getContainerHeight = (
  height: number,
  legend: {
    $el: {
      getBoundingClientRect: () => { (): any; new (): any; height: number };
    };
  },
  title: {
    $el: {
      getBoundingClientRect: () => { (): any; new (): any; height: number };
    };
  }
) => {
  const titleHeight = title?.$el?.getBoundingClientRect()?.height;
  const legendHeight = legend?.$el?.getBoundingClientRect()?.height;

  if (titleHeight) {
    height = height - 12 - titleHeight;
  }
  if (legendHeight) {
    height = height - legendHeight;
  }
  return height;
};

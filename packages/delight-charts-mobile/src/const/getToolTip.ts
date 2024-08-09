import { CSSProperties } from "vue";
import { ToolTipType } from "../interface/common";
import { valueFormat } from "../utils/utils";

export const tooltipCss: CSSProperties = {
  position: "absolute",
  padding: "12px",
  borderRadius: "4px",
  fontSize: "12px",
  lineHeight: "18px",
  color: "#000000d9",
  background: "#FFFFFF",
  zIndex: 99,
  opacity: 0,
  boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.2)",
  minWidth: "130px",
  boxSizing: "border-box",
  display: "flex",
  flexFlow: "column nowrap",
  gap: "4px",
};

// 指示线类型
const lineDashType = {
  solid: 1,
  dashed: [8, 8, 8],
  dotted: [2, 2, 2],
};

export const crosshairsStyle = (data: {
  type: string;
  width: any;
}) => {
  // 映射echarts：axisPointer?.lineStyle?.type
  let lineDash = lineDashType[data?.type || "dotted"];

  if (Array.isArray(data?.type)) {
    lineDash = data?.type;
  }

  return {
    lineCap: "butt",
    lineWidth: data?.width || 0.7,
    lineDash,
    stroke: '#CCCCCC',
    ...data,
  };
};

const setTransform = (x: any, y: any) => `translate(${x}px,${y}px)`;

// 右侧溢出重置，边界处理
export const toolTipRightReSet = (
  tooltipDom: HTMLElement,
  canvas: HTMLElement,
  x: number,
  y: number,
  extra: Record<string | number, any>
) => {
  if (typeof window === "undefined") {
    return;
  }
  const { chartType = "", yAxis } = extra;
  const { height, width } = tooltipDom?.getBoundingClientRect();
  const canvasDom = canvas?.getBoundingClientRect();
  const canvasHeight = canvasDom.height;
  const canvasWidth = canvasDom.width;

  const yValue = canvasHeight * 0.1;
  const xValue = canvasWidth - width - 20;
  if (chartType === "Histogram") {
    // 边界处理
    if (y + height + 20 > canvasHeight) {
      return setTransform(xValue, canvasHeight - height - 40);
    }
    return setTransform(xValue, y);
  } else {
    // 边界处理
    const gap = yAxis?.length >= 2 ? 50 : 20
    if (x + width + gap > canvasWidth) {
      return setTransform(canvasWidth - width - gap, yValue - 2);
    }
    return setTransform(x + 8, yValue - 2);
  }
};

const iconLegendType = (type = "square") => {
  if (type === "circle") {
    return "border-radius:50%;width:9px;height:9px";
  } else if (type === "square") {
    return "border-radius: 1px;width:9px;height:9px";
  } else {
    return "border-radius: 1px;width:10px;height:2px";
  }
};

export const toolTipConfig = (
  data: ToolTipType,
  tooltipDom: any,
  canvas: HTMLElement,
  extra: any
) => {
  const {
    valueType = "value",
    digit,
    unit,
    show = true,
    alwaysShowContent,
    axisPointer,
    formatter,
    valueFormatter,
  } = data;

  const { chartType = "", metrics = [], chartData = [], legend } = extra;
  const icon = legend?.icon || "square"
  const legendIcon = iconLegendType(icon);

  const config = {
    custom: true,
    show: show,
    showXTip: axisPointer?.axis === "xy",
    showYTip: axisPointer?.axis === "xy",
    alwaysShow: alwaysShowContent,
    showCrosshairs: axisPointer?.type || true,
    crosshairsType:
      axisPointer?.axis || (chartType === "Histogram" ? "x" : "y"),
    crosshairsStyle: crosshairsStyle(axisPointer?.lineStyle),
    onChange: (ev: any[]) => {
      let x = 0;
      let y = 0;
      let str = "";
      if (ev?.length > 0) {
        x = ev[0]?.x;
        y = ev[0]?.y;
      }
      if (formatter) {
        const arr = chartData.filter((t: any) => t.date === ev[0].date);
        const res: any = [];
        ev.forEach((v) => {
          const obj = {
            ...v,
            seriesType: chartType,
            seriesName: v?.name,
            marker: `<span style="display:inline-block;margin-right:4px;${legendIcon};background-color:${v?.origin?.color};"></span>`,
            data: {
              extra: arr?.[0] || {},
            },
          };
          res.push(obj);
        });
        str = formatter(res);
      } else {
        str = `<div class="mToolTip-tips-xlabel">${ev[0]?.origin?.date}</div>`;
        ev.forEach((v) => {
          const value = v?.origin?.value || v?.origin?.valueRight || 0;
          let valueFormatterItem = {};
          if (Array.isArray(valueFormatter)) {
            const index = metrics.findIndex((t: any) => t === v.type);
            valueFormatterItem = valueFormatter[index];
          }

          str += `<div class="mToolTip-tips-xlabel-content">
                      <div style="display:flex;align-items: ${icon === 'line' ? 'center' : 'flex-start'};">
                          <div style="${legendIcon};transform: translateY(50%);background:${
            v?.origin?.color
          }"></div>
                          <div class="mToolTip-tips-xlabel-marker">${
                            v?.origin?.type
                          }</div> 
                        </div>
                         <div class="mToolTip-tips-xlabel-value">
                         ${valueFormat(
                           value,
                           valueFormatterItem?.valueType || valueType,
                           valueFormatterItem?.digit || digit,
                           valueFormatterItem?.unit || unit
                         )}</div>
                        </div>
                        `;
        });
      }

      tooltipDom.innerHTML = str;
      tooltipDom.style.transform = toolTipRightReSet(
        tooltipDom,
        canvas,
        x,
        y,
        extra
      );
      tooltipDom.style.opacity = 1;
      tooltipDom.style.display = "block";
    },
    ...data,
  };
  return config;
};

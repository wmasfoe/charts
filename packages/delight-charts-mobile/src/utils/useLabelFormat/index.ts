// @ts-ignore
import numerify from 'numerify'

export type labelFormatType = 'KMB' | 'normal' | 'percent' | 'currency' | 'value' | 'label' | undefined | Function

export function checkDot(num: number) {
  return /[\.]/.test(String(num))
}
export default function (val: any, type?: labelFormatType, digit?: any, unit?: boolean | string) {
  if (isNaN(val)) return val || 0;
  if (typeof type === "function") return type(val, numerify);
  // digit++，需要join 0
  digit = isNaN(digit) ? 0 : ++digit;

  // 小数位数
  const digitStr = `.${new Array(digit).join("0")}`;
  // 千分位
  const thousand = "0,";
  // 单位
  const stringUnit = typeof unit === 'string' ? unit : ''
  const boolUnit = typeof unit === 'boolean' ? unit : false

  let formatter = `${thousand}0`;
  switch (type) {
    case "normal":
      formatter = digit ? `${thousand}0${digitStr}` : `${thousand}0`;
      break;
    // 百分比
    case "percent":
      // numerify百分比会直接乘100
      val = val / 100;
      formatter = digit ? `0${digitStr}%` : "0.00%";
      break;
    // 货币
    case "currency":
      formatter = digit ? `0${digitStr}` : "0.00";
      break;
    // 数字
    case "value":
      // 需要单位配置项
      if (boolUnit) {
        const absVal = Math.abs(val);
        if (absVal >= 0 && absVal < 10000) {
          formatter = digit
            ? `${thousand}0${digitStr}`
            : checkDot(val)
            ? `${thousand}0.00`
            : `${thousand}0`;
        } else if (absVal >= 10000 && absVal <= 99999999) {
          return numerify(val / 10000, `${thousand}0${digitStr}`) + "万";
        } else {
          return numerify(val / 100000000, `${thousand}0${digitStr}`) + "亿";
        }
      } else {
        formatter = digit
          ? `${thousand}0${digitStr}`
          : checkDot(val)
          ? `${thousand}0.00`
          : `${thousand}0`;
      }
      break;
    case "label":
      // 需要单位配置项
      if (boolUnit) {
        const absVal = Math.abs(val);
        if (absVal >= 0 && absVal < 10000) {
          formatter = digit ? `0` : checkDot(val) ? "0.0" : "0";
        } else if (absVal >= 10000 && absVal <= 99999999) {
          return numerify(val / 10000, `0${digitStr}`) + "万";
        } else {
          return numerify(val / 100000000, `0${digitStr}`) + "亿";
        }
      } else {
        formatter = digit
          ? `${thousand}0${digitStr}`
          : checkDot(val)
          ? "0.00"
          : "0";
      }
      break;
    default:
      break;
  }
  const result = numerify(val, formatter);
  const showStringUnit = (type === "currency" && boolUnit) || stringUnit
  const usingStringUnit = type === 'currency' ? stringUnit || '元' : stringUnit
  return `${result}${showStringUnit ? usingStringUnit : ""}`;
}

export function isArray(arr: any): boolean {
  return Array.isArray(arr)
}

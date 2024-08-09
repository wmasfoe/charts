export interface ToolTipType {
  unit?: boolean;
  digit?: number;
  valueType?:
    | "KMB"
    | "normal"
    | "percent"
    | "currency"
    | "value"
    | "label"
    | undefined
    | Function;
  show?: boolean;
  alwaysShowContent?: boolean;
  axisPointer?: Record<string | number, any>;
  formatter?: undefined | Function;
  valueFormatter?: [Record<string | number, any>]
}

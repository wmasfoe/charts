export interface FunnelData {
  name: string;
  value: number;
}

export interface FunnelConfig {
  barHeight: number;
}

export interface FunnelType {
  chartData: FunnelData[];
  chartConfig: FunnelConfig;
  width: string | number;
  height: string | number;
  digit: number;
  type: string;
}

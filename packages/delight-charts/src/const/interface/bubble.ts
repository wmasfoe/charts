import type { CommonType, CommonChartConfig, NormalObject } from './common';

interface markLineType {
  markLineValueX: number | string;
  markLineValueY: number | string;
  titleX: string;
  titleY: string;
  startX: string;
  endX: string;
  startY: string;
  endY: string;
}
interface SymbolZoomType {
  symbolZoomMax: string;
  symbolMax: string;
  symbolMin: string;
}

interface PseudoElement {
  text?: string;
  image?: string | HTMLImageElement | HTMLCanvasElement;
  show?: (params: Record<string,any>) => boolean;
  backgroundColor?: string | Record<string,any>;
}

export interface BubbleConfig extends CommonChartConfig {
  canClick?: boolean;
  markLineConfig?: markLineType;
  symbolZoomConfig?: SymbolZoomType;
  label?: {
    mainTextStyle?: Record<string, any>;
    before?: PseudoElement;
    after?: PseudoElement;
  };
  revertable?: boolean;
  [key: string]: any;
}

interface QuadrantType {
  dimensions: string[];
  metrics: string[];
  text: string;
  tooltip?: string;
  position?: {
    top: string;
    left: string;
    bottom: string;
    right: string;
  }
}
export interface BubbleType extends CommonType<BubbleConfig> {
  quadrantList?: QuadrantType;
  chartType?: string;
}

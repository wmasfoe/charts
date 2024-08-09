interface EventParams {
  componentType?: 'series' | 'markLine' | 'markPoint' | 'timeLine' | string;
  seriesType?: 'line' | 'bar' | 'pie' | string;
  seriesIndex?: number;
  seriesName?: string;
  name?: string;
  dataIndex?: number;
  data?: Object;
  dataType?: string;
  value?: number | Array<any>;
  color?: string;
};

export interface EventsValueType {
  callback?: Function,
  query?: string | EventParams
}

export type MouseEventName = 'click' | 'dblclick' | 'contextmenu' | 'mousedown' | 'mousemove' | 'mouseup' | 'mouseover' | 'mouseout' | 'globalout'
export type ChartEvents = Partial<Record<MouseEventName, EventsValueType> & Record<string, EventsValueType>>

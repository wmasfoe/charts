import  { merge } from "../../utils/merge";
import { cloneDeep } from "lodash";

import type { GetChartOptions } from '../../const/interface/core'
import { getOptions } from "../../utils/getOptions";
import { getTitle } from "../../utils/getTitle";
import { getToolTip } from "../../utils/getTooltip";
import { defaultRadarItemConfig, defaultRadarSeriesItemConfig } from '../../const/defaultRadarConfig';

export const radar: GetChartOptions = (data, settings = {}, extra = {}) => {
  const {
    tooltip = {},
    title = {},
    tooltipVisible = true,
    titleVisible = true,
    radar,
    seriesConfig,
    ...rest
  } = settings;

  const options = getOptions(
    cloneDeep(data),
    cloneDeep({
      ...settings,
      chartType: "radar",
    }),
    cloneDeep(extra)
  );
  const { chartConfig, metrics } = extra;
  const chartSeries = seriesConfig || chartConfig.series

  const { legend, tooltip: defaultTooltip } = options;
  // const indicators = chartConfig?.radar?.indicator || [];
  const isMultiRadar = [chartConfig?.radar || {}].flat().length > 1;
  const radarItems = [chartConfig?.radar || {}].flat().map((radarItem: any) => ({
    ...defaultRadarItemConfig,
    ...radarItem,
    indicator: radarItem.indicator?.map?.((item: any) => ({
      // 文字颜色
      nameTextStyle: { color: 'rgba(0, 0, 0, 0.9)' },
      ...item
    })),
  }));
  let series = radarItems.map((radarItem: any, idx: number) => {
    const { indicator } = radarItem;

    let seriesItem = {
      type: "radar",
      radarIndex: idx,
      ...defaultRadarSeriesItemConfig,
      data: (isMultiRadar ? data[idx] : data).map((item: any) => ({
        ...item,
        name: item.name,
        value: cloneDeep(item.value),
        indicator,
      })),
    }
    if (Array.isArray(chartSeries) && chartSeries[idx]) {
      seriesItem = merge((chartSeries[idx] || {}), seriesItem)
    } else if (chartSeries) {
      seriesItem = merge((chartSeries || {}), seriesItem)
    }
    return seriesItem
  });

  const radarOption: any = merge(chartConfig, {
    title: {
      ...title,
      ...getTitle(chartConfig.title),
      show: titleVisible,
    },
    tooltip: {
      ...defaultTooltip,
      ...tooltip,
      show: tooltipVisible,
    },
    axiosPointer: [{
      label: {
        margin: 12,
      },
    }],
    radar: radarItems,
    legend,
    series,
  });
  return radarOption;
};

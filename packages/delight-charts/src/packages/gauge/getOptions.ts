import {
  GAUGE_CONFIG_DEFAULT,
  SERIES_CONFIG_DEFAULT,
} from '../../const/defautGaugeConfig'
import { isEmpty, compact, isNumber, isObject } from 'lodash'

export const gauge = (data: any[], settings: Record<string, any>): any => {
  const value = data?.[0] || 0
  const {
    showAxisTick = false,
    progressBg = 'rgba(243, 244, 245, 1)',
    progressColor = 'rgba(60, 102, 255, 1)',
    axisTickNumber = 2,
    labelMap = {},
    gaugeCenter = {},
    seriesConfig = [],
    min = 0,
    max = 100,
  } = settings
  const {
    mainTitle = '',
    unit = '',
    mainValue = '',
    fullValue = '',
    tagColor = 'rgba(43, 72, 181, 1)',
    tagBackground = 'rgba(236, 240, 255, 1)',
    tagValue = '',
  } = gaugeCenter
  const offsetCenter: number[] = [0, -10]
  const isConfig = !isEmpty(seriesConfig)

  let resultOption = [
    {
      ...GAUGE_CONFIG_DEFAULT,
      min,
      max,
      splitNumber: axisTickNumber - 1 > 1 ? axisTickNumber - 1 : 1,
      axisTick: isConfig
        ? {
            show: true,
          }
        : {
            show: showAxisTick,
            splitNumber: 1,
            length: 4,
            lineStyle: {
              color: 'rgba(0,0,0,0.28)',
            },
            distance: -24,
          },
      axisLine: isConfig
        ? undefined
        : {
            show: true,
            roundCap: true,
            lineStyle: {
              width: 16,
              color: [[1, progressBg]],
            },
          },
      progress: isConfig
        ? undefined
        : {
            show: true,
            width: 16,
            roundCap: true,
            itemStyle: {
              color: progressColor,
            },
          },
      axisLabel: {
        show: true,
        distance: -50,
        fontFamily: 'PingFang SC',
        fontWeight: 500,
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 12,
        lineHeight: 20,
        formatter: function (v: number) {
          return labelMap[v] || ''
        },
      },
      radius: '80%',
      data: [
        {
          value,
          detail: {
            offsetCenter,
            formatter: compact([
              mainTitle.length ? `{t|${mainTitle}}` : undefined,
              fullValue.length ||
              (isNumber(mainValue) ? mainValue > 0 : mainValue.length)
                ? isEmpty(fullValue)
                  ? `{a|${mainValue === '' ? value : mainValue}}{c| ${unit}}` //如  50分
                  : `{a|${
                      mainValue === '' ? value : mainValue
                    }}{b| / ${fullValue}}{c|${unit}}` // 如  20 / 50分  格式
                : undefined,
              tagValue.length ? `{tag|${tagValue}}` : undefined,
            ]).join('\n'),
            rich: {
              t: {
                lineHeight: 30,
                color: 'rgba(0, 0, 0, 0.45)',
                fontFamily: 'PingFang SC',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: 14,
              },
              a: {
                padding: [-3, 0, 0, 0],
                fontSize: 24,
                fontWeight: 'bolder',
                fontStyle: 'normal',
                color: 'rgba(0, 0, 0, 0.85)',
                fontFamily: 'Inter',
              },
              b: {
                color: 'rgba(0, 0, 0, 0.85)',
                fontStyle: 'normal',
                fontFamily: 'Inter',
                fontSize: 14,
              },
              c: {
                color: 'rgba(0, 0, 0, 0.85)',
                fontStyle: 'normal',
                fontSize: 14,
                fontFamily: 'PingFang SC',
              },
              tag: {
                padding: [8, 12, 8, 12],
                borderRadius: 4,
                backgroundColor: tagBackground || 'rgba(236, 240, 255, 1)',
                color: tagColor || 'rgba(43, 72, 181, 1)',
                fontFamily: 'PingFang SC',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: 14,
              },
            },
          },
        },
      ],
    },
  ]
  if (isConfig) {
    if (Array.isArray(seriesConfig)) {
      resultOption = seriesConfig.map((item: any, index: number) => {
        return {
          ...resultOption[index],
          ...SERIES_CONFIG_DEFAULT,
          ...item,
        }
      })
    } else if (isObject(seriesConfig))
      resultOption = resultOption.map((item: any, index: number) => {
        return {
          ...item,
          ...SERIES_CONFIG_DEFAULT,
          ...seriesConfig,
        }
      })
  }

  return {
    series: resultOption,
  }
}

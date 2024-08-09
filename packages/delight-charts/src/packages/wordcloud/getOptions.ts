import { merge } from '../../utils/merge'
import type { GetWordCloudOptions } from '../../const/interface/core'
import { DEFAULT_WORDCLOUD, DEFAULT_WORDCOLUD_LEVEL } from '../../const/chart'
import { cloneDeep } from 'lodash'

const handleStyle = (
  list: Record<string, any>[],
  index: number,
  colors: string[]
) =>
  list.map((item) => ({
    ...item,
    textStyle: {
      color: colors[index] || colors[colors.length - 1],
      opacity: item?.textStyle?.opacity ?? 1,
    },
  }))

const handleSumArr = (arr: number[]) => {
  const len = arr.length
  if (len === 0) return []
  if (len === 1) return arr
  const sumArr = [arr[0]]
  for (let i = 0; i < len - 1; i++) {
    const sum = sumArr[i] + arr[i + 1]
    sumArr.push(sum)
  }
  return sumArr
}

export const wordcloud: GetWordCloudOptions = (data, settings, extra) => {
  const { color } = extra
  let arr: Record<string, any>[] = []
  const list = data.sort((a, b) => b.value - a.value)
  let config: any = {}
  const { length } = data
  if (length > 0 && length <= 30) {
    config = {
      sizeRange: [12, 46],
    }
  } else if (length > 30 && length <= 50) {
    config = {
      sizeRange: [12, 36],
    }
  } else {
    config = {
      sizeRange: [12, 28],
      gridSize: 12,
    }
  }
  const {
    shape = 'circle',
    tooltip = {},
    drawOutOfBound = false,
    title = {},
    tooltipVisible = true,
    titleVisible = true,
    nameMaxSize = 0,
    wordCloudType = 'all',
    levelTotal = DEFAULT_WORDCOLUD_LEVEL.levelTotal,
    levelWordNums = DEFAULT_WORDCOLUD_LEVEL.levelWordNums,
    levelWordColors = DEFAULT_WORDCOLUD_LEVEL.levelWordColors,
    ...rest
  } = settings
  if (!!nameMaxSize) {
    data = data.map((o) => ({
      ...o,
      name:
        o.name.length > nameMaxSize
          ? o.name.slice(0, nameMaxSize) + '...'
          : o.name,
      fullName: o.name,
    }))
  }

  if (wordCloudType === 'level') {
    let nums: number[] = [] // 累加之后的数组
    // 大于说明传的数组length大于分层数，按照分层数截取
    if (levelWordNums.length > levelTotal - 1) {
      nums = levelWordNums.slice(0, levelTotal - 1)
    } else {
      nums = levelWordNums
    }
    nums = handleSumArr(nums)
    nums.forEach((item, index) => {
      arr.push(
        ...handleStyle(
          list.slice(nums?.[index - 1] || 0, item),
          index,
          levelWordColors
        )
      )
      // 如果是最后一个 需要把后面所有的都push进去
      if (index === nums.length - 1) {
        arr.push(...handleStyle(list.slice(item), index + 1, levelWordColors))
      }
    })
  } else {
    arr = cloneDeep(list)
  }

  const wordCloudOption = {
    title: {
      ...title,
      show: titleVisible,
    },
    tooltip: {
    extraCssText: 'border: none; border-radius: 4px',
      formatter: (params: Record<any, any>) =>
        params.data?.fullName || params.data?.name,
      ...tooltip,
      show: tooltipVisible,
    },
    series: [
      {
        ...merge(DEFAULT_WORDCLOUD, config, rest),
        shape:
          shape === 'square'
            ? (theta: number) =>
                Math.min(
                  1 / Math.abs(Math.cos(theta)),
                  1 / Math.abs(Math.sin(theta))
                )
            : shape,
        data: arr.map((o: any, index: number) => {
          return {
            ...o,
            textStyle: {
              ...DEFAULT_WORDCLOUD.textStyle,
              color:
                o?.textStyle?.color ||
                color?.[index % color.length] ||
                DEFAULT_WORDCLOUD.textStyle.color,
              opacity: o?.textStyle?.opacity || 1,
            },
          }
        }),
      },
    ],
  }
  return wordCloudOption
}

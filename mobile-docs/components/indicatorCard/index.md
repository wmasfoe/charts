# IndicatorCard 指标卡

### 基础指标卡

:::demo

```vue
<template>
  <IndicatorCard
    :title="'一行一个'"
    :chart-data="indicatorCardData"
  />
</template>

<script setup>
import { ref } from "vue";
const indicatorCardData = [
  {
    title: "明天",
    amount: 100,
    unit: '%',
    tips: 'adasdasads',
    tagList: [{value:'标签一'}],
    detailList: [
      {
        label: '辅助指标',
        value: 100,
        unit: '元'
      },
      {
        label: '辅助指标',
        value: 200,
        unit: '元',
        type: 'none'
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
    progressInfo: [
      {
        label: '目标进展',
        progress: '20%',
      }
    ]
  },
  {
    title: "后天",
    amount: 200,
    detailList: [
      {
        label: '辅助指标',
        value: '+100',
        unit: '%'
      },
      {
        label: '辅助指标',
        value: '-200',
        unit: '%',
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
  },
  {
    title: "大后天",
  },
]

</script>
```

:::

### 多列指标卡

`column` 可以控制列数，`column` > 2 时，默认仅展示指标名称、数值、单位（`simple`配置项为 `true` ）；`column` > 3 时，默认不展示边框（`border`配置项为 `'0'`）。
可以通过 `border` 和 `simple` 配置。

:::demo

```vue
<template>
  <IndicatorCard
    :title="'一行一个'"
    :column="1"
    :chart-data="indicatorCardData"
    :chart-config="indicatorChartConfig1"
  />
  <br>
  <IndicatorCard
    :title="'一行俩'"
    :column="2"
    :chart-data="indicatorCardData"
    :chart-config="indicatorChartConfig2"
  />
  <br>
  <IndicatorCard
    :title="'一行仨'"
    :column="3"
    :chart-data="indicatorCardData"
    :chart-config="indicatorChartConfig2"
  />
  <br>
  <IndicatorCard
    :title="'一行多个'"
    :column="4"
    :chart-data="indicatorCardData"
    :chart-config="indicatorChartConfig1"
  />
</template>
<script setup>
import { ref } from "vue";
const indicatorCardData = [
  {
    title: "明天",
    amount: 100,
    unit: '%',
    tips: 'adasdasads',
    tagList: [{value: '标签一'}],
    detailList: [
      {
        label: '辅助指标',
        value: 100,
        unit: '元'
      },
      {
        label: '辅助指标',
        value: 200,
        unit: '元',
        type: 'none'
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
    progressInfo: [
      {
        label: '目标进展',
        progress: '20%',
      }
    ]
  },
  {
    title: "后天",
    amount: 200,
    detailList: [
      {
        label: '辅助指标',
        value: '+100',
        unit: '%'
      },
      {
        label: '辅助指标',
        value: '-200',
        unit: '%',
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
  },
  {
    title: "大后天",
  },
  {
    title: "大大后天",
    amount: 200,
    detailList: [
      {
        label: '辅助指标',
        value: '+100',
        unit: '%'
      },
      {
        label: '辅助指标',
        value: '-200',
        unit: '%',
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
  },
]

const indicatorChartConfig1 = {
  align: 'left',
}

const indicatorChartConfig2 = {
  align: 'left',
  simple: false
}
</script>
```

:::

### tooltip 弹窗

配置 `chartConfig.tooltipType: 'modal'` 就可以啦

:::demo

```vue
<template>
  <IndicatorCard
    :title="'一行一个'"
    :chart-data="indicatorCardData"
    :chart-config="chartConfig"
  />
</template>

<script setup>
import { ref } from "vue";

const chartConfig = {
  // 弹窗
  tooltipType: 'tooltip'
}

const indicatorCardData = [
  {
    title: "明天",
    amount: 100,
    unit: '%',
    tips: `这是一段很长很长很长很长很长很长很长很长很长很长的 tips`,
    tagList: [
      {
        // 配置标签颜色
        value: '标签一',
        color: 'ThemeSuccess',
        bgColor: 'ThemeSuccess2'
      }
    ],
    detailList: [
      {
        label: '辅助指标',
        value: 100,
        unit: '元'
      },
      {
        label: '辅助指标',
        value: 200,
        unit: '元',
        type: 'none'
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
    progressInfo: [
      {
        label: '目标进展',
        progress: '20%',
      }
    ]
  },
  {
    title: "后天",
    amount: 200,
    detailList: [
      {
        label: '辅助指标',
        value: '+100',
        unit: '%'
      },
      {
        label: '辅助指标',
        value: '-200',
        unit: '%',
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
  },
  {
    title: "大后天",
  },
]
</script>
```

:::

### 配置颜色

目前支持 ReDS 的 [token 色](https://fe-docs.devops.justdev.com/reds-component/reds-h5/token)

:::demo

```vue
<template>
  <IndicatorCard
    :title="'一行一个'"
    :chart-data="indicatorCardData"
    :chart-config="chartConfig"
  />
</template>

<script setup>
import { ref } from "vue";

const chartConfig = {
  // 多选
  multiple: true,
  // 高亮色
  focusColors: ['ThemeSuccess', 'ThemeBlue']
}

const indicatorCardData = [
  {
    tagList: [
      {
        // 配置标签颜色
        value: '标签一',
        color: 'ThemeSuccess',
        bgColor: 'ThemeSuccess2'
      }
    ],
    progressInfo: [
      {
        label: '目标进展',
        progress: '20%',
        // 进度条颜色
        color: 'ThemeSuccess'
      }
    ],
    title: "明天",
    amount: 100,
    unit: '%',
    tips: '这是一段很长很长很长很长很长很长很长很长很长很长的 tips',
    detailList: [
      {
        label: '辅助指标',
        value: 100,
        unit: '元'
      },
      {
        label: '辅助指标',
        value: 200,
        unit: '元',
        type: 'none'
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
  },
  {
    title: "后天",
    amount: 200,
    detailList: [
      {
        label: '辅助指标',
        value: '+100',
        unit: '%'
      },
      {
        label: '辅助指标',
        value: '-200',
        unit: '%',
      },
      {
        label: '辅助指标',
        value: 100,
        unit: '元',
        type: 'text'
      }
    ],
  },
  {
    title: "大后天",
  },
]
</script>
```

:::

### Props API

| 属性     | 类型    | 说明                     | 默认值 |
| -------- | :------ | :----------------------- | :----- |
| title | string | 标题 | ''  |
| column | number | 列个数 | 1  |
| columnWidth | \{ index: number \| string, width: number \| string \}\[\] | 列宽度 | 1fr  |
| chartData | [ChartData](#chartdata) | 数据源 | \[\]  |
| chartConfig | [ChartConfig](#chartconfig) | 配置项 | \{\}  |

### ChartData

```ts
type TagList = {
  value: string;
  color?: string; // tag文本颜色
  bgColor?: string; // tag背景色
}
```

| 属性     | 类型    | 说明                     | 默认值 |
| -------- | :------ | :----------------------- | :----- |
| title | string | 指标卡左上角标题 | ''  |
| tips | string | 标题提示 | ''  |
| tagList | TagList[] | 头部标签 | \[\]  |
| amount | string \| number | 金额展示 | ''  |
| unit | string | 金额单位 | ''  |
| detailList | [DetailList\[\]](#detaillist) | 标签/涨幅部分信息 | \[\]  |
| progressInfo | [ProgressInfo\[\]](#progressinfo) | 进度条相关信息 | \[\]  |

### chartConfig

| 属性     | 类型    | 说明                     | 默认值 |
| -------- | :------ | :----------------------- | :----- |
| border | boolean | 是否展示边框 | true  |
| align | 'center' \| 'left' | 对齐方式 | 'left'  |
| tipsPlacement | 'top' \| 'bottom' \| 'left' \| 'right' | - | -  |
| emptyText | string | 空时展示文本 | '--'  |
| upColor | string | 上涨颜色 | rgb(0, 168, 48)  |
| downColor | string | 下跌颜色 | rgb(240, 56, 96)  |
| upIdentify | string | 上涨标识 | '+'  |
| downIdentify | string | 下跌标识 | '-'  |
| simple | boolean \| 'default' | 是否展示简单版 | 'default' |
| tooltipType | 'tooltip' \| 'modal' | tooltip 提示类型 | 'tooltip' |
| multiple | boolean \| number | 多选，多选个数 | false |
| detailDirection | 'row' \| 'column' | 辅助指标排列方向 | 'column' |

### DetailList

| 属性     | 类型    | 说明                     | 默认值 |
| -------- | :------ | :----------------------- | :----- |
| label | string | 名称 | ''  |
| value | string \| number | 数值 | ''  |
| unit | string | 单位 | ''  |
| type | undefined \| 'none' \| 'text' | 展示类型，默认展示符号与颜色，'none'与'text'均为直接展示数值，但'none'附带上下符号，'text'不附带上升下降色； | undefined |

### ProgressInfo

| 属性     | 类型    | 说明                     | 默认值 |
| -------- | :------ | :----------------------- | :----- |
| label | string | 进度条名称 | ''  |
| progress | \`$\{string\}%\` | 进度数值 | ''  |

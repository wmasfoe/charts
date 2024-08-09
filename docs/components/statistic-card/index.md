# StatisticCard 复杂指标卡

### 单选指标卡

:::demo

```vue
<template>
  <StatisticCard
    :chartData="cardData"
    :chartConfig="chartConfig"
    @selected="handleCardSelect"
  >
    <template #moreDetail="{ data }">
      <a v-if="data.__index === 0" href="#">查看更多-{{ data.title }} ></a>
    </template>
    <template #headRight="{ data }">
      <span v-if="data.__index === 0" class="desc">自定义</span>
    </template>
  </StatisticCard>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const chartConfig = ref({
  multiple: false,
  titleStyle: {
    fontSize: '14px'
  },
  titlePosition: 'right'
})

const cardData: StatisticCardData[] = Array.from({ length: 3 }).map((i, index) => ({
  title: `销售额${index + 1}`,
  tips: '测试提示条',
  tagList: ['一级指标', '成交'],

  amount: '123456',
	unit: '元',
	thumbUrl: '//picasso-static.justdev.com/fe-platform/6daa2abcd411e6eca4bdab395c71e86cddbaa93b.png',
  
	detailList: [{
    label: '环比',
    value: '+122.98',
    unit: '%'
  }, {
    label: '上月同期',
    tips: '上月同期提示~~',
    value: '-122.98',
    unit: '%'
  }, {
    label: '成交大盘',
    value: '122.98',
    unit: '%',
    type: 'none'
  }],
	progressList: [{
    label: '目标进展',
    progress: '48.8'
  }, {
    label: '目标进展',
    progress: '48.8'
  }],
	judgeInfo: {
    tag: '优秀',
    tagInfo: {
      color: '#008F29',
      backgroundColor: 'rgba(0, 168, 48, 0.10)',
    },
    description: '超过了10%的人'
  }
}))

function handleCardSelect(selected: StatisticCardData, lastSelected: StatisticCardData) {
  console.log('selected:', selected, lastSelected);
}
</script>
<style>
  .desc {
    color: rgba(0, 0, 0, 0.45);
    flex: 1;
    text-align: right;
  }
</style>

```
:::
### 多选指标卡

:::demo

```vue
<template>
  <StatisticCard
    :chartData="cardData"
    :chartConfig="chartConfig"
    @selected="handleCardSelect"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const chartConfig = ref({
  multiple: true,
})

const cardData: StatisticCardData[] = Array.from({ length: 2 }).map((i, index) => ({
  title: `销售额${index + 1}`,
  tips: '测试提示条',
  tagList: ['一级指标', '成交'],

  amount: '123456',
	unit: '元',
	thumbUrl: '//picasso-static.justdev.com/fe-platform/6daa2abcd411e6eca4bdab395c71e86cddbaa93b.png',
  
	detailList: [{
    label: '环比',
    value: '+122.98',
    unit: '%'
  }, {
    label: '上月同期',
    value: '-122.98',
    unit: '%'
  }, {
    label: '成交大盘',
    value: '122.98',
    unit: '%',
    type: 'none'
  }],
	progressList: [{
    label: '目标进展',
    progress: '48.8'
  }, {
    label: '目标进展',
    progress: '48.8'
  }],
	judgeInfo: {
    tag: '优秀',
    tagInfo: {
      color: '#008F29',
      backgroundColor: 'rgba(0, 168, 48, 0.10)',
    },
    description: '超过了10%的人'
  }
}))

function handleCardSelect(selected: StatisticCardData, lastSelected: StatisticCardData) {
  console.log('selected:', selected, lastSelected);
}
</script>
```
:::
### 翻页功能

:::demo

```vue
<template>
  <StatisticCard
    :chartData="cardData"
    :chartConfig="chartConfig"
    @selected="handleCardSelect"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const chartConfig = ref({
  multiple: true,
  showCount: 2, // 不设置默认屏幕宽度1600以上为5,1280以上为4
})

const cardItem = {
  title: '销售额1',
  tips: '测试提示条',
  tagList: ['一级指标', '成交'],

  amount: '123456',
	unit: '元',
	thumbUrl: '//picasso-static.justdev.com/fe-platform/6daa2abcd411e6eca4bdab395c71e86cddbaa93b.png',
  
	detailList: [{
    label: '环比',
    value: '+122.98',
    unit: '%'
  }, {
    label: '上月同期',
    value: '-122.98',
    unit: '%'
  }, {
    label: '成交大盘',
    value: '122.98',
    unit: '%',
    type: 'none'
  }],
	progressList: [{
    label: '目标进展',
    progress: '48.8'
  }, {
    label: '目标进展',
    progress: '48.8'
  }],
	judgeInfo: {
    tag: '优秀',
    tagInfo: {
      color: '#008F29',
      backgroundColor: 'rgba(0, 168, 48, 0.10)',
    },
    description: '超过了10%的人'
  }
}
const cardData: StatisticCardData[] = Array.from({ length: 10 }).map((i, index) => ({
  ...cardItem,
  title: `卡片-${index + 1}`
}))

function handleCardSelect(selected: StatisticCardData, lastSelected: StatisticCardData) {
  console.log('selected:', selected, lastSelected);
}
</script>
```
:::

### 简单指标展示

:::demo

```vue
<template>
  <StatisticCard
    :chartData="cardData"
    :chartConfig="chartConfig"
    @selected="handleCardSelect"
  />
  <div style="margin: 12px 0">
    <StatisticCard
      :chartData="cardDataOnlyTitle"
      :chartConfig="chartConfig2"
      @selected="handleCardSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const chartConfig = ref({
  multiple: true,
  showPagination: false,
  couldSelected: false,
  width: 200 // 卡片宽度
})
const chartConfig2 = ref({
  multiple: false,
  showPagination: false,
  couldSelected: true,
  defaultValues: 1,
  width: 200 // 卡片宽度
})

const cardData: StatisticCardData[] = [{
  title: '渲染成功数量',

  amount: '123456',
	unit: ' ',
	progressList: [{
    label: '渲染成功比例',
    progress: '48.8'
  }]
}, {
  title: '渲染成功数量',

  amount: '123456',
	unit: ' ',
	progressList: [{
    label: '渲染成功比例',
    progress: '48.8'
  }]
}, {
  title: '渲染成功数量',

  amount: '123456',
	unit: ' ',
	progressList: [{
    label: '渲染成功比例',
    progress: '48.8'
  }]
}]

const cardDataOnlyTitle = [{
  title: '渲染成功数量',
  amount: '123456',
	unit: ' ',
  headImg: '//picasso-static.justdev.com/fe-platform/6daa2abcd411e6eca4bdab395c71e86cddbaa93b.png',
  headImgStyle: {
    width: '30px',
    height: '20px'
  }
}, {
  title: '渲染成功数量',
  amount: '123456',
	unit: ' ',
  headImg: '//picasso-static.justdev.com/fe-platform/6daa2abcd411e6eca4bdab395c71e86cddbaa93b.png',
  headImgStyle: {
    width: '30px',
    height: '20px'
  }
}]

function handleCardSelect(selected: StatisticCardData, lastSelected: StatisticCardData) {
  console.log('selected:', selected, lastSelected);
}
</script>
```
:::


## StatisticCardData API

| 属性        | 类型   | 说明           | 默认值 |
| ----------- | :----- | :------------- | :----- |
| chartData   | StatisticCardData[]  | 指标卡数据     |  []    |
| chartConfig | StatisticCardConfig | 指标卡整体设置 | {}     |
* 由于存在chartConfig中存在对defaultValues的赋值，因此尽量使用ref来定义；必须用computed定义的话，需要在回调事件中对`defaultValues`进行手动更新
:::

## StatisticCardData
| 属性        | 类型   | 说明           | 默认值 |
| ----------- | :----- | :------------- | :----- |
| title   | string  | 指标卡左上角标题     |      |
| tips   | string  | 标题提示     |   ''   |
| tagList   | string[] \| { value: string, style: any }[]  | 头部标签     |    []  |
| amount   | string \| number  | 金额展示     |      |
| unit   | string  | 金额单位     |   元   |
| thumbUrl   |  string | 缩略图图片地址     |   元   |
| amountFormat   |  (p: string) => string | 金额展示格式化函数     |   默认传空下, 使用toLocaleString增加千分位 |
| headImg   |  string | 左侧图图片地址     |   ''   |
| headImgStyle   |  string | 左侧图图片样式     |   {}   |
| detailList   |  StatisticCardRate[] | 标签/涨幅部分信息     |  []   |
| progressList   |  StatisticCardProgress[] | 进度条相关信息     |  []   |
| judgeInfo   |  StatisticCardJudgeInfo | 底部诊断结果部分信息     |   null   |

## StatisticCardConfig
| 属性        | 类型   | 说明           | 默认值 |
| ----------- | :----- | :------------- | :----- |
| type   | 'detail' \| 'simple'  | 展示详情版还是简单版     |   'detail'   |
| titleStyle   | any  | title部分的样式     |   null   |
| titlePosition   | 'left' \| 'right'  | title与tag的相对位置，默认在tag左侧     |   'left'   |
| multiple   | boolean  | 是否多选     |   false   |
| emptyText   | string  | 空时展示文本     |   '--'   |
| upColor   | string  | 上涨颜色     |   'rgb(240, 56, 96)'   |
| downColor   | string  | 下跌颜色     |   'rgb(0, 168, 48)'   |
| upIdentify   | string  | 上涨标识     |   '+'   |
| downIdentify   | string  | 下跌标识     |   '-'   |
| showCount   | string  | 一次展示多少个     |   默认组件宽度大于1600展示5个，大于1280展示4个，小于1280展示Math.floor(元素宽 / 238)个   |
| couldSelected   | boolean  | 是否可以进行选择操作     |   true   |
| defaultValues   | number \| number[]  | 默认选中的值     |   无   |
| showPagination   | boolean  | 是否需要展示翻页     |   true   |
| shouldShowMultipleColor   | boolean  | 多选下是否开启多选颜色，只有在multiple下才生效，不开启默认均为标准蓝色; 可以通过`refStatisticCard.value.chartColorMap`来获取当前选中项的颜色     |   false   |
| multipleColorList   | string[]  | 多选下使用的多选颜色，只有在multiple、shouldShowMultipleColor均为true下才生效，需要传入`rgb或者rgba`色值     |   标准十色rgba数组   |

:::
## StatisticCardRate
| 属性        | 类型   | 说明           | 默认值 |
| ----------- | :----- | :------------- | :----- |
| label   | string  | 名称     |      |
| tips   | string  | 提示     |      |
| value   | string  | 数值      |      |
| unit   | string  | 单位     |    '%'  |
| type   | undefined \| 'none' \| 'text'  | 展示类型，默认展示符号与颜色，'none'与'text'均为直接展示数值，但'none'附带上下符号，'text'不附带上升下降色；     |   ''  |
:::
## StatisticCardProgress
| 属性        | 类型   | 说明           | 默认值 |
| ----------- | :----- | :------------- | :----- |
| label   | string  | 进度条名称     |      |
| progress   | string \| number  | 进度数值     |      |

:::
## StatisticCardJudgeInfo
| 属性        | 类型   | 说明           | 默认值 |
| ----------- | :----- | :------------- | :----- |
| tag   | string  | 标签     |      |
| tagInfo   | \{ color\: string, backgroundColor\: string \}  | 标签样式     | \{ color\: \'#008F29\', backgroundColor\: \'#888888\' \} |
| description   | string  | 诊断文案     |      |

## 事件
| 事件名        | 参数   | 说明           |
| ----------- | :----- | :------------- |
| selected   | (selectedItemList, lastSelectedItemList) => void  | selectedItemList: 本次选中项， lastSelectedItemList： 上次选中项 |
| update:defaultValues   | (curDefaultValues: number \| number[]) => void  | curDefaultValues: 当前选中项的索引值 |

## 插槽
| 插槽名        | 参数   | 说明           |
| ----------- | :----- | :------------- |
| moreDetail | StatisticCardData | detailList后面的区域 |
| headRight | StatisticCardData | title右侧的区域 | 
| footer | StatisticCardData | 卡片底部区域 |
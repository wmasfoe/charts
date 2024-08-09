# WordCloud 词云图

### 基础词云图

:::demo

```vue
<template>
  <WordCloud
    :chartData="wordCloudData"
    :height="500"
    :chartConfig="WordCloudConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const wordCloudData = ref([
  {
    name: '个人护理电器',
    value: 22,
  },
  {
    name: '服饰鞋包',
    value: 1047,
  },
  {
    name: '服装',
    value: 566,
  },
  {
    name: '饰品',
    value: 289,
  },
  {
    name: '鞋',
    value: 184,
  },
  {
    name: '箱包',
    value: 168,
  },
  {
    name: '奢侈品',
    value: 137,
  },
  {
    name: '母婴亲子',
    value: 1041,
  },
  {
    name: '孕婴保健',
    value: 505,
  },
  {
    name: '母婴社区',
    value: 299,
  },
  {
    name: '早教',
    value: 103,
  },
  {
    name: '奶粉辅食',
    value: 66,
  },
  {
    name: '童车童床',
    value: 41,
  },
  {
    name: '关注品牌',
    value: 271,
  },
  {
    name: '宝宝玩乐',
    value: 30,
  },
  {
    name: '母婴护理服务',
    value: 25,
  },
  {
    name: '纸尿裤湿巾',
    value: 16,
  },
  {
    name: '妈妈用品',
    value: 15,
  },
  {
    name: '宝宝起名',
    value: 12,
  },
  {
    name: '童装童鞋',
    value: 9,
  },
  {
    name: '胎教',
    value: 8,
  },
  {
    name: '宝宝洗护用品',
    value: 1,
  },
  {
    name: '软件应用',
    value: 1018,
  },
  {
    name: '系统工具',
    value: 896,
  },
  {
    name: '理财购物',
    value: 440,
  },
  {
    name: '生活实用',
    value: 365,
  },
  {
    name: '影音图像',
    value: 256,
  },
  {
    name: '社交通讯',
    value: 214,
  },
  {
    name: '手机美化',
    value: 39,
  },
  {
    name: '办公学习',
    value: 28,
  },
  {
    name: '应用市场',
    value: 23,
  },
  {
    name: '母婴育儿',
    value: 14,
  },
  {
    name: '游戏',
    value: 946,
  },
  {
    name: '手机游戏',
    value: 565,
  },
])
const WordCloudConfig = {
  shape: 'circle',
  sizeRange: [12, 60],
  gridSize: 50,
}
</script>
```

:::
### 不同形状的词云图
设置shape来实现不同形状的词云图
:::demo

```vue
<template>
  <WordCloud
    :chartData="wordCloudData"
    :chartConfig="WordCloudConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const wordCloudData = ref([
  {
    name: '个人护理电器',
    value: 212,
  },
  {
    name: '服装',
    value: 566,
  },
  {
    name: '服装1',
    value: 10,
  },
  {
    name: '服装122',
    value: 130,
  },
  {
    name: '关注品牌',
    value: 271,
  },
  {
    name: '宝宝玩乐',
    value: 130,
  },
  {
    name: '母婴护理服务1',
    value: 325,
  },
  {
    name: '纸尿裤湿巾3',
    value: 316,
  },
  {
    name: '妈妈用品',
    value: 315,
  },
  {
    name: '母婴护理服务2',
    value: 325,
  },
  {
    name: '随便办法',
    value: 40,
  },
  {
    name: '随便嗷嗷',
    value: 159,
  },
  {
    name: '随便',
    value: 234,
  },
  {
    name: '妈妈用品5',
    value: 115,
  },
])
const WordCloudConfig = {
  shape: 'diamond',
}
</script>
```

:::
### 限定字号的词云图
设置sizeRange来实现限定词在一个字号范围，避免出现词过大或者过小，造成图表可读性较差
:::demo

```vue
<template>
  <WordCloud
    :chartData="wordCloudData"
    :chartConfig="WordCloudConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const wordCloudData = ref([
  {
    name: '个人护理电器',
    value: 212,
  },
  {
    name: '服装',
    value: 566,
  },
  {
    name: '服装1',
    value: 10,
  },
  {
    name: '服装122',
    value: 130,
  },
  {
    name: '关注品牌',
    value: 271,
  },
  {
    name: '宝宝玩乐',
    value: 130,
  },
  {
    name: '母婴护理服务1',
    value: 325,
  },
  {
    name: '纸尿裤湿巾3',
    value: 316,
  },
  {
    name: '妈妈用品',
    value: 315,
  },
  {
    name: '母婴护理服务2',
    value: 325,
  },
  {
    name: '随便办法',
    value: 40,
  },
  {
    name: '随便嗷嗷',
    value: 159,
  },
  {
    name: '随便',
    value: 234,
  },
  {
    name: '妈妈用品5',
    value: 115,
  },
])
const WordCloudConfig = {
  sizeRange: [10, 30],
}
</script>
```

:::
### 限定词间距的词云图
设置gridSize来实现词之间的间距，避免出现词间距过大或者过小，造成图表可读性较差
:::demo

```vue
<template>
  <WordCloud
    :chartData="wordCloudData"
    :chartConfig="WordCloudConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const wordCloudData = ref([
  {
    name: '个人护理电器',
    value: 212,
  },
  {
    name: '服装',
    value: 566,
  },
  {
    name: '服装1',
    value: 10,
  },
  {
    name: '服装122',
    value: 130,
  },
  {
    name: '关注品牌',
    value: 271,
  },
  {
    name: '宝宝玩乐',
    value: 130,
  },
  {
    name: '母婴护理服务1',
    value: 325,
  },
  {
    name: '纸尿裤湿巾3',
    value: 316,
  },
  {
    name: '妈妈用品',
    value: 315,
  },
  {
    name: '母婴护理服务2',
    value: 325,
  },
  {
    name: '随便办法',
    value: 40,
  },
  {
    name: '随便嗷嗷',
    value: 159,
  },
  {
    name: '随便',
    value: 234,
  },
  {
    name: '妈妈用品5',
    value: 115,
  },
])
const WordCloudConfig = {
  gridSize: 50,
}
</script>
```

:::
### 分层词云图
设置wordCloudType来实现分层词云图；levelTotal表示层级总数，层级总数是多少页面就有多少个颜色；levelWordNums表示每个层级的词个数；
:::demo

```vue
<template>
  <WordCloud
    :chartData="wordCloudData"
    :chartConfig="WordCloudConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const wordCloudData = ref([
  {
    name: '个人护理电器',
    value: 212,
  },
  {
    name: '服装',
    value: 566,
  },
  {
    name: '关注品牌',
    value: 271,
  },
  {
    name: '宝宝玩乐',
    value: 130,
  },
  {
    name: '母婴护理服务1',
    value: 325,
  },
  {
    name: '纸尿裤湿巾3',
    value: 316,
  },
  {
    name: '妈妈用品',
    value: 315,
  },
  {
    name: '母婴护理服务2',
    value: 325,
  },
  {
    name: '纸尿裤湿巾4',
    value: 116,
  },
  {
    name: '妈妈用品5',
    value: 115,
  },
])
const WordCloudConfig = {
  wordCloudType: 'level',
  levelTotal: 4,
  levelWordNums: [1, 2, 3],
  canClick: true,
  shape: 'circle',
  sizeRange: [12, 60],
  gridSize: 50,
}
</script>
```

:::


### 分层词云图(自定义层数&颜色)
使用levelWordColors配置不同层级的词颜色

:::demo

```vue
<template>
  <WordCloud
    :chartData="wordCloudData"
    :chartConfig="WordCloudConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const wordCloudData = ref([
  {
    name: '个人护理电器',
    value: 212,
  },
  {
    name: '服装',
    value: 566,
  },
  {
    name: '关注品牌',
    value: 271,
  },
  {
    name: '宝宝玩乐',
    value: 130,
  },
  {
    name: '母婴护理服务1',
    value: 325,
  },
  {
    name: '纸尿裤湿巾3',
    value: 316,
  },
  {
    name: '妈妈用品',
    value: 315,
  },
  {
    name: '母婴护理服务2',
    value: 325,
  },
  {
    name: '纸尿裤湿巾4',
    value: 116,
  },
  {
    name: '妈妈用品5',
    value: 115,
  },
])
const WordCloudConfig = {
  wordCloudType: 'level',
  levelTotal: 3,
  levelWordNums: [3, 4, 4],
  levelWordColors: ['red', 'pink', 'green'],
  canClick: true,
  shape: 'circle',
  sizeRange: [12, 60],
  gridSize: 50,
}
</script>
```

:::

### 可点击词云图
配置canClick: true让词云支持点击下钻效果
:::demo

```vue
<template>
  <WordCloud
    :chartData="wordCloudData"
    :chartConfig="WordCloudConfig"
    :isLoading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1000)
const wordCloudData = ref([
  {
    name: '个人护理电器',
    value: 212,
  },

  {
    name: '服装',
    value: 566,
  },
  {
    name: '关注品牌',
    value: 271,
  },
  {
    name: '宝宝玩乐',
    value: 130,
  },
  {
    name: '母婴护理服务母婴护理服务母婴护理服务母婴护理服务',
    value: 125,
  },
  {
    name: '纸尿裤湿巾',
    value: 116,
  },
  {
    name: '妈妈用品',
    value: 115,
  },
])
const WordCloudConfig = {
  nameMaxSize: 8,
  canClick: true,
  shape: 'circle',
  sizeRange: [12, 60],
  gridSize: 50,
}
</script>
```

:::

## chartConfig API

| 属性            | 类型     | 说明                                                                                            | 默认值                                       |
| --------------- | :------- | :---------------------------------------------------------------------------------------------- | :------------------------------------------- |
| canClick        | boolean  | 是否支持下钻（点击之后其他变暗）                                                                | false                                        |
| nameMaxSize     | number   | 词的最大长度，超出部分省略号                                                                    | auto                                         |
| drawOutOfBound  | boolean  | 设置为 true 以允许在画布外绘制部分单词                                                          | false                                        |
| shape           | string   | 绘制形状，默认 circle，可以设置 circle、cardioid、diamond、triangle-forward、triangle、square、 | false                                        |
| sizeRange       | number[] | 字号的范围                                                                                      | []                                           |
| gridSize        | number   | 词与词之间的间距                                                                                | auto                                         |
| wordCloudType   | string   | 词云展示类型，'all' or 'level'                                                                  | 'all'                                        |
| levelTotal      | number   | 层级数量                                                                                        | 4                                            |
| levelWordNums   | number[]   | 每个层级词量                                                                                    | [3, 12, 15]                                  |
| levelWordColors | string[]   | 每个层级词的颜色                                                                                | ['#FF7B61', '#295EFF', '#5283FF', '#8792BD'] |

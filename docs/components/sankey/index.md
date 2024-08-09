# 桑基图

### 基本桑基图

通过配置 `dimensions` 和 `metrics` 来生成桑基图。`dimensions` 代表桑基图的数据流向，`dimensions[0]` 是起始位置 同[series.links.source](https://echarts.apache.org/zh/option.html#series-sankey.links.source)，`dimensions[1]` 是目标位置 同[series.links.target](https://echarts.apache.org/zh/option.html#series-sankey.links.target)；`metrics` 代表桑基图 item 的值 同[series.links.value](https://echarts.apache.org/zh/option.html#series-sankey.links.value)。

:::demo
```vue
<template>
  <Sankey
    height="600"
    :dimensions="['source', 'target']"
    :metrics="['value']"
    :chart-data="data"
    :chartConfig="chartConfig"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const chartConfig = ref({
  width: '90%',
  canClick: true
})

const data =  [
  {
    source: 'a',
    target: 'a1',
    value: 5
  },
  {
    source: 'b',
    target: 'c',
    value: 2
  },
  {
    source: 'a',
    target: 'a2',
    value: 3
  },
  {
    source: 'b',
    target: 'b1',
    value: 8
  },
  {
    source: 'a',
    target: 'b1',
    value: 3
  },
  {
    source: 'a',
    target: 'c',
    value: 3
  },
]
</script>
```
:::

### 高亮色配置

hover、active桑基图时，默认只是把失焦的透明度降低，可以通过 `emphasis`、`blur` 配置聚焦([emphasis](https://echarts.apache.org/zh/option.html#series-sankey.emphasis))、失焦([blur](https://echarts.apache.org/zh/option.html#series-sankey.blur)) 状态下的样式。

:::demo
```vue
<template>
  <Sankey
    height="600"
    :dimensions="['source', 'target']"
    :metrics="['value']"
    :chart-data="data"
    :chartConfig="chartConfig"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const chartConfig = ref({
  width: '90%',
  canClick: true,
  emphasis: {
    itemStyle: {
      color: 'darkgreen'
    },
    lineStyle: {
      color: 'green'
    }
  },
  blur: {
    itemStyle: {
      color: 'blue'
    },
    lineStyle: {
      color: 'yellow'
    },
  }
})

const data = [
  {
      "source": "Total",
      "target": "Environment",
      "value": 0.342284047256003
  },
  {
      "source": "Environment",
      "target": "Land use",
      "value": 0.32322870366987
  },
  {
      "source": "Land use",
      "target": "Cocoa butter (Organic)",
      "value": 0.177682517071359
  },
  {
      "source": "Land use",
      "target": "Cocoa mass (Organic)",
      "value": 0.137241325342711
  },
  {
      "source": "Land use",
      "target": "Hazelnuts (Organic)",
      "value": 0.00433076373512774
  },
  {
      "source": "Land use",
      "target": "Cane sugar (Organic)",
      "value": 0.00296956039863467
  },
  {
      "source": "Land use",
      "target": "Vegetables (Organic)",
      "value": 0.00100453712203756
  },
  {
      "source": "Environment",
      "target": "Climate change",
      "value": 0.0112886157414413
  },
  {
      "source": "Climate change",
      "target": "Cocoa butter (Organic)",
      "value": 0.00676852971933996
  },
  {
      "source": "Climate change",
      "target": "Cocoa mass (Organic)",
      "value": 0.00394686874786743
  },
  {
      "source": "Climate change",
      "target": "Cane sugar (Organic)",
      "value": 0.000315972058711838
  },
  {
      "source": "Climate change",
      "target": "Hazelnuts (Organic)",
      "value": 0.000218969462265292
  },
  {
      "source": "Climate change",
      "target": "Vegetables (Organic)",
      "value": 0.0000382757532567656
  },
  {
      "source": "Environment",
      "target": "Harmful substances",
      "value": 0.00604275542495656
  },
  {
      "source": "Harmful substances",
      "target": "Cocoa mass (Organic)",
      "value": 0.0055125989240741
  },
  {
      "source": "Harmful substances",
      "target": "Cocoa butter (Organic)",
      "value": 0.000330017607892127
  },
  {
      "source": "Harmful substances",
      "target": "Cane sugar (Organic)",
      "value": 0.000200138892990337
  },
  {
      "source": "Harmful substances",
      "target": "Hazelnuts (Organic)",
      "value": 0
  },
  {
      "source": "Harmful substances",
      "target": "Vegetables (Organic)",
      "value": 0
  },
  {
      "source": "Environment",
      "target": "Water use",
      "value": 0.00148345269044703
  },
  {
      "source": "Water use",
      "target": "Cocoa butter (Organic)",
      "value": 0.00135309891304186
  },
  {
      "source": "Water use",
      "target": "Cocoa mass (Organic)",
      "value": 0.000105714137908639
  },
  {
      "source": "Water use",
      "target": "Hazelnuts (Organic)",
      "value": 0.0000133452642581887
  },
  {
      "source": "Water use",
      "target": "Cane sugar (Organic)",
      "value": 0.00000878074837009238
  },
  {
      "source": "Water use",
      "target": "Vegetables (Organic)",
      "value": 0.0000025136268682477
  },
  {
      "source": "Environment",
      "target": "Resource depletion",
      "value": 0.000240519729288764
  },
  {
      "source": "Resource depletion",
      "target": "Cane sugar (Organic)",
      "value": 0.000226237279345084
  },
  {
      "source": "Resource depletion",
      "target": "Vegetables (Organic)",
      "value": 0.0000142824499436793
  },
  {
      "source": "Resource depletion",
      "target": "Hazelnuts (Organic)",
      "value": 0
  },
  {
      "source": "Resource depletion",
      "target": "Cocoa mass (Organic)",
      "value": 0
  },
  {
      "source": "Resource depletion",
      "target": "Cocoa butter (Organic)",
      "value": 0
  },
  {
      "source": "Environment",
      "target": "Refrigeration",
      "value": 0
  },
  {
      "source": "Environment",
      "target": "Packaging",
      "value": 0
  },
  {
      "source": "Total",
      "target": "Human rights",
      "value": 0.307574096993239
  },
  {
      "source": "Human rights",
      "target": "Child labour",
      "value": 0.0410641202645833
  },
  {
      "source": "Child labour",
      "target": "Hazelnuts (Organic)",
      "value": 0.0105339381639722
  },
  {
      "source": "Child labour",
      "target": "Cocoa mass (Organic)",
      "value": 0.0105
  },
  {
      "source": "Child labour",
      "target": "Cocoa butter (Organic)",
      "value": 0.0087294420777
  },
  {
      "source": "Child labour",
      "target": "Coconut oil (Organic)",
      "value": 0.00474399974233333
  },
  {
      "source": "Child labour",
      "target": "Cane sugar (Organic)",
      "value": 0.00388226450884445
  },
  {
      "source": "Child labour",
      "target": "Vegetables (Organic)",
      "value": 0.00267447577173333
  },
  {
      "source": "Human rights",
      "target": "Forced labour",
      "value": 0.0365458590642445
  },
  {
      "source": "Forced labour",
      "target": "Hazelnuts (Organic)",
      "value": 0.0114913076376389
  },
  {
      "source": "Forced labour",
      "target": "Cocoa butter (Organic)",
      "value": 0.0081134807347
  },
  {
      "source": "Forced labour",
      "target": "Cocoa mass (Organic)",
      "value": 0.00765230236575
  },
  {
      "source": "Forced labour",
      "target": "Cane sugar (Organic)",
      "value": 0.004
  },
  {
      "source": "Forced labour",
      "target": "Vegetables (Organic)",
      "value": 0.00296668823626667
  },
  {
      "source": "Forced labour",
      "target": "Coconut oil (Organic)",
      "value": 0.00232208008988889
  },
  {
      "source": "Human rights",
      "target": "Health safety",
      "value": 0.0345435327843611
  },
  {
      "source": "Health safety",
      "target": "Hazelnuts (Organic)",
      "value": 0.0121419536385
  },
  {
      "source": "Health safety",
      "target": "Cocoa mass (Organic)",
      "value": 0.00766772850678333
  },
  {
      "source": "Health safety",
      "target": "Cocoa butter (Organic)",
      "value": 0.0056245892061
  },
  {
      "source": "Health safety",
      "target": "Coconut oil (Organic)",
      "value": 0.00361616847688889
  },
  {
      "source": "Health safety",
      "target": "Cane sugar (Organic)",
      "value": 0.00277374682533333
  },
  {
      "source": "Health safety",
      "target": "Vegetables (Organic)",
      "value": 0.00271934613075556
  },
  {
      "source": "Human rights",
      "target": "Access to water",
      "value": 0.0340206659360667
  },
  {
      "source": "Access to water",
      "target": "Cocoa mass (Organic)",
      "value": 0.0105
  },
  {
      "source": "Access to water",
      "target": "Cocoa butter (Organic)",
      "value": 0.0089274160792
  },
  {
      "source": "Access to water",
      "target": "Hazelnuts (Organic)",
      "value": 0.0054148022845
  },
  {
      "source": "Access to water",
      "target": "Cane sugar (Organic)",
      "value": 0.00333938149786667
  },
  {
      "source": "Access to water",
      "target": "Vegetables (Organic)",
      "value": 0.00314663377488889
  },
  {
      "source": "Access to water",
      "target": "Coconut oil (Organic)",
      "value": 0.00269243229961111
  },
  {
      "source": "Human rights",
      "target": "Freedom of association",
      "value": 0.0320571523941667
  },
  {
      "source": "Freedom of association",
      "target": "Hazelnuts (Organic)",
      "value": 0.0132312483463611
  },
  {
      "source": "Freedom of association",
      "target": "Cocoa butter (Organic)",
      "value": 0.0077695200707
  },
  {
      "source": "Freedom of association",
      "target": "Cocoa mass (Organic)",
      "value": 0.00510606573995
  },
  {
      "source": "Freedom of association",
      "target": "Vegetables (Organic)",
      "value": 0.00354321156324444
  },
  {
      "source": "Freedom of association",
      "target": "Cane sugar (Organic)",
      "value": 0.00240710667391111
  },
  {
      "source": "Freedom of association",
      "target": "Coconut oil (Organic)",
      "value": 0
  },
  {
      "source": "Human rights",
      "target": "Access to land",
      "value": 0.0315022209894056
  },
  {
      "source": "Access to land",
      "target": "Hazelnuts (Organic)",
      "value": 0.00964970063322223
  },
  {
      "source": "Access to land",
      "target": "Cocoa mass (Organic)",
      "value": 0.00938530207965
  },
  {
      "source": "Access to land",
      "target": "Cocoa butter (Organic)",
      "value": 0.0060110791848
  },
  {
      "source": "Access to land",
      "target": "Cane sugar (Organic)",
      "value": 0.00380818314608889
  },
  {
      "source": "Access to land",
      "target": "Vegetables (Organic)",
      "value": 0.00264795594564445
  },
  {
      "source": "Access to land",
      "target": "Coconut oil (Organic)",
      "value": 0
  },
  {
      "source": "Human rights",
      "target": "Sufficient wage",
      "value": 0.0287776757227333
  },
  {
      "source": "Sufficient wage",
      "target": "Cocoa mass (Organic)",
      "value": 0.00883512456493333
  },
  {
      "source": "Sufficient wage",
      "target": "Cocoa butter (Organic)",
      "value": 0.0078343367268
  },
  {
      "source": "Sufficient wage",
      "target": "Coconut oil (Organic)",
      "value": 0.00347879026511111
  },
  {
      "source": "Sufficient wage",
      "target": "Hazelnuts (Organic)",
      "value": 0.00316254211388889
  },
  {
      "source": "Sufficient wage",
      "target": "Vegetables (Organic)",
      "value": 0.00281013722808889
  },
  {
      "source": "Sufficient wage",
      "target": "Cane sugar (Organic)",
      "value": 0.00265674482391111
  },
  {
      "source": "Human rights",
      "target": "Equal rights migrants",
      "value": 0.0271146645119444
  },
  {
      "source": "Equal rights migrants",
      "target": "Cocoa butter (Organic)",
      "value": 0.0071042315061
  },
  {
      "source": "Equal rights migrants",
      "target": "Cocoa mass (Organic)",
      "value": 0.00636673210005
  },
  {
      "source": "Equal rights migrants",
      "target": "Hazelnuts (Organic)",
      "value": 0.00601459775836111
  },
  {
      "source": "Equal rights migrants",
      "target": "Coconut oil (Organic)",
      "value": 0.00429185583138889
  },
  {
      "source": "Equal rights migrants",
      "target": "Cane sugar (Organic)",
      "value": 0.00182647471915556
  },
  {
      "source": "Equal rights migrants",
      "target": "Vegetables (Organic)",
      "value": 0.00151077259688889
  },
  {
      "source": "Human rights",
      "target": "Discrimination",
      "value": 0.0211217763359833
  },
  {
      "source": "Discrimination",
      "target": "Cocoa mass (Organic)",
      "value": 0.00609671700306667
  },
  {
      "source": "Discrimination",
      "target": "Cocoa butter (Organic)",
      "value": 0.0047738806325
  },
  {
      "source": "Discrimination",
      "target": "Coconut oil (Organic)",
      "value": 0.00368119084494444
  },
  {
      "source": "Discrimination",
      "target": "Vegetables (Organic)",
      "value": 0.00286009813604444
  },
  {
      "source": "Discrimination",
      "target": "Cane sugar (Organic)",
      "value": 0.00283706180951111
  },
  {
      "source": "Discrimination",
      "target": "Hazelnuts (Organic)",
      "value": 0.000872827909916666
  },
  {
      "source": "Human rights",
      "target": "Working hours",
      "value": 0.02082642898975
  },
  {
      "source": "Working hours",
      "target": "Hazelnuts (Organic)",
      "value": 0.0107216773848333
  },
  {
      "source": "Working hours",
      "target": "Coconut oil (Organic)",
      "value": 0.00359009052944444
  },
  {
      "source": "Working hours",
      "target": "Vegetables (Organic)",
      "value": 0.00212300379075556
  },
  {
      "source": "Working hours",
      "target": "Cocoa butter (Organic)",
      "value": 0.0018518584356
  },
  {
      "source": "Working hours",
      "target": "Cocoa mass (Organic)",
      "value": 0.00158227069058333
  },
  {
      "source": "Working hours",
      "target": "Cane sugar (Organic)",
      "value": 0.000957528158533333
  }
]
</script>
```
:::

### 列标题和列关联关系

`columnTitle` 可以配置列标题，类型定义：

```ts
type ColumnTitleType = { title: string[]; link: string[]; }
```

:::demo

```vue
<template>
  <Sankey
    :dimensions="['source', 'target']"
    :metrics="['value']"
    :column-title="columnTitle"
    :chart-data="data"
    :chartConfig="chartConfig"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const chartConfig = ref({
  width: '90%',
  canClick: true,
  labelMap: {
    a: '总数1',
    b: '总数2'
  }
})

const columnTitle = {
  title: ['一级', '二22222级'],
  link: ['资产关系', '资产关系']
}

const data = [
  {
    source: 'a',
    target: 'a1',
    value: 5
  },
  {
    source: 'b',
    target: 'c',
    value: 2
  },
  {
    source: 'a',
    target: 'a2',
    value: 3
  },
  {
    source: 'b',
    target: 'b1',
    value: 8
  },
  {
    source: 'a',
    target: 'b1',
    value: 3
  },
  {
    source: 'a',
    target: 'c',
    value: 3
  },
]
</script>
```

:::

### Sankey API

| 属性      | 类型   | 说明                                            | 默认值               |
| --------- | :----- | :---------------------------------------------- | :----------------- |
| chartData | Record<'source' \| 'target' \| 'value', string \| number>[] | 必传，同 [echarts series.links](https://echarts.apache.org/zh/option.html#series-sankey.links) | [] |
| columnTitle | Record<'title' \| 'link', string[]> | 列标题 | [] |
### chartConfig API

type ConfigType = {
  lineStyle?: Record\<string\, any\>;
  itemStyle?: Record\<string\, any\>;
  label?: Record\<string\, any\>;
}

| 属性      | 类型   | 说明                                            | 默认值               |
| --------- | :----- | :---------------------------------------------- | :----------------- |
| canClick | boolean | 是否开启点击高亮 | false |
| emphasis | ConfigType & \{ focus: string \} | 高亮配置 | - |
| blur | ConfigType & \{ active: ConfigType \} | 变淡配置 | - |

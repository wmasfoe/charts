# Change Log
Delight Charts 发版严格遵循 <a href="https://semver.org/lang/zh-CN/">Semantic Versioning 2.0.0</a>语义化版本规范。

<h3>发版原则</h3>
版本格式：主版本号.次版本号.修订号，版本号递增规则如下：<br>
主版本号：当你做了不兼容的 API 修改<br>
次版本号：当你做了向下兼容的功能性新增<br>
修订号：当你做了向下兼容的问题修正<br>
先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

## [0.1.97] (2024-01-23)
* 🐞 修改peerDependencies中@dx/delight>=>=0.1.37 [26dc64bb](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/26dc64bb00ba55011bf0fdd171fcb536c6d8e818)

## [0.1.96] (2024-01-17)
* 🌟 复杂指标卡新增`headRight`插槽和detailList下的`tips`属性 [15e1f6f2](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/15e1f6f2e53950722849f87f9f56a75d25135411)

## [0.1.95] (2024-01-06)

* 🐞 修复 `useLabelFormat` 当 `type = 'percent'` 并且 `value = 负数` 时结果带括号的 bug [1bfe11a1](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/1bfe11a1ca2f778d7f411abfca445d85cb620daa)
* 🐞 修复`useLabelFormat` digit 默认保留 2 位小数，改为 digit 默认小数位数不变 [111aa4ca](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/111aa4ca1ed264d7a68f24f61282cea3922a9527)
* 🌟 子弹图增加seriesConfig配置、漏斗图增加新字段barClass、barBackground、fontColor、fontClass [7c5c0c2a](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/7c5c0c2aa323720f8cf8c3ca7551f7a53693825b)

## [0.1.94] (2023-12-20)

* 🐞 修复配置 labelMap 之后 tooltip 格式化会失效问题 [0d84807e](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/0d84807ee0ba500be82d29825c91e4fc1aaa10a0)

## [0.1.93] (2023-12-19)

* 🌟 气泡图 symbol 回调函数传入 seriesConfig 参数 [a497cda3](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/a497cda357362bf476338c722c702ba8f0e1ecfa)

## [0.1.92] (2023-12-18)

* 🐞 修复复杂指标卡传入defaultValues为不存在的索引的情况 [a388b45a](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/28c8ced8db63a56605f9a5967066237da388b45a)

## [0.1.91] (2023-12-16)

* 🌟 支持气泡图点击禁用反选，配置参数：revertable [0508b72c](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/0508b72c741318bc2ca371e54dd98842a256549e)

* 🌟 气泡图支持点击高亮，配置参数：select [1893d774](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/1893d774c7ff1130218279fc23ba84ae91249a01)

## [0.1.90] (2023-12-04)
- 🌟 [复杂指标卡](https://delight-charts.devops.justdev.com/components/statistic-card/index.html) 支持多选下的多色值展示[b9922371](https://code.devops.justdev.com/fe/infra/delight-charts/-/merge_requests/291/diffs)

## [0.1.89] (2023-11-27)
### Bug Fixes

* 🐞 漏斗图插槽修改支持传参数 ([c82320f0](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/c82320f02b6217234711e75f5da7bd678946785f))

## [0.1.88] (2023-11-24)
### Features

* 🌟 漏斗图支持插槽 ([0eabdeae](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/0eabdeaec2ac8cf8aeb9a688579cb8cf8c09e482))

## [0.1.87] (2023-11-18)
### Features

* 🌟 支持子弹图分组，可配置多条子弹图
https://delight-charts.devops.justdev.com/components/bullet/index.html#%E5%A4%8D%E6%9D%82%E5%AD%90%E5%BC%B9%E5%9B%BE ([30ac773b](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/30ac773beb9ac7d9077e478d3c09d66f925b60a2))

* 🌟 增加子弹图示意demo ([30ac773b](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/30ac773beb9ac7d9077e478d3c09d66f925b60a2))

## [0.1.86] (2023-11-10)
### Features

* 🌟 支持基础子弹图 ([a8b44d90](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/a8b44d90b8fa617fcc500ac30734e20088daa6bf))

## [0.1.85] (2023-11-07)
### Features

* 🌟 补充气泡图、雷达图、chartApi 文档 ([0c28d6d4](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/0c28d6d4d0099aa12e97085896514166c11c6a36))

## [0.1.84] (2023-11-07)
### Features

* 🌟 复杂指标卡支持footer slot ([5b192a2](https://code.devops.justdev.com/fe/infra/delight-charts/commits/5b192a246f4e51a2a0989c30ad125906cdcce398))

## [0.1.83] (2023-10-26)
### Features

* 🌟 图表库支持半环图 ([2548667d](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/2548667db07fbb74ba57045f306703bcb7a476a7))

## [0.1.82] (2023-10-23)
### Features

* 🌟 支持StatisticCard 选择事件参数回调：支持记录当前选中值和上次选中值 ([0073b57](https://code.devops.justdev.com/fe/infra/delight-charts/commits/0073b572e80b8c51eaa021592827ec249406ebfc))

## [0.1.81] (2023-10-08)
### Features

* 🌟 图表库支持桑基图 ([ee9f28b2](https://code.devops.justdev.com/fe/infra/delight-charts/-/commit/ee9f28b23ccea7a6e3fcd527607495e40dc239cc))

## [0.1.80] (2023-09-19)
### Features

* 🌟 更新指标卡组件样式 ([216bf3c](https://code.devops.justdev.com/fe/infra/delight-charts/commits/216bf3c8019773ac4589323a6056f4890f2e5d3b))

## [0.1.79] (2023-09-18)
### Bug Fixes

* 🐞 修复只有一条数据的时候 不展示的问题 ([f2aef74](https://code.devops.justdev.com/fe/infra/delight-charts/commits/f2aef74554297448276b6a590585c0c4d65f3742))

## [0.1.78] (2023-09-13)
### Bug Fixes

* 🌟 复杂指标卡支持格式化Amount属性 ([1a2fc3f](https://code.devops.justdev.com/fe/infra/delight-charts/commits/1a2fc3f701830f648537f54845a75b915422b007))


## [0.1.77] (2023-09-12)
### Bug Fixes

* 🐞 修复 & 按规范展示折线图交互 ([25a9fad](https://code.devops.justdev.com/fe/infra/delight-charts/commits/25a9fad07a4ffa73bff6c0b8325799ade7af7b85))

## [0.1.1] (2022-10-27)
### Bug Fixes

* 修复legend事件重复监听导致重复执行 ([389bc17](https://code.devops.justdev.com/fe/infra/delight-charts/commits/389bc176ac6ad194de0d8dbab6b6042273e1df38))
## [0.1.0] (2022-10-26)
### Bug Fixes

* 修复条形图和柱状图的排序问题 ([cc9d447](https://code.devops.justdev.com/fe/infra/delight-charts/commits/cc9d447a1d3ec182a5dafd0970711fd4bb1456a9))
* bubble & chart ([3c5bcf8](https://code.devops.justdev.com/fe/infra/delight-charts/commits/3c5bcf806c02e4ab4d7f943be94327c9e6f4b327))
* docs ([9ca29c8](https://code.devops.justdev.com/fe/infra/delight-charts/commits/9ca29c8c9228eadab462a3228f62b148456e9f87))

### Features

* 更新Bubble的组件名 ([88e3578](https://code.devops.justdev.com/fe/infra/delight-charts/commits/88e357853c35a71b4031e80383f96565d05d0960))
* 提升同样charts ([452bfea](https://code.devops.justdev.com/fe/infra/delight-charts/commits/452bfeac4ca2a27bf050a1ca5e5a9ff086be67ea))
* update init  ([6ef6cf2](https://code.devops.justdev.com/fe/infra/delight-charts/commits/6ef6cf22b78d22085fa8af035844e44cf96ad61d))
## [0.0.2-alpha.32] (2022-10-24)


### Features

* 图表去掉overflow:scroll 默认值，修复window上自动出滚动条 ([c3a101b](https://code.devops.justdev.com/fe/infra/delight-charts/commits/c3a101bd77e72e8d373ee03bfd3cd4f1910e3751))
## [0.0.2-alpha.31] (2022-10-22)


### Features
* 增加x双轴配置 ([eda8086](https://code.devops.justdev.com/fe/infra/delight-charts/commits/eda8086561854885283822342e99e06b3669a27b))
## [0.0.2-alpha.30] (2022-10-21)


### Features

* 图表排序转换成按number类型数值排序 ([57048fb](https://code.devops.justdev.com/fe/infra/delight-charts/commits/57048fb1807815144e30142180feae49f83b4422))
## [0.0.2-alpha.29] (2022-10-20)


### Features

* delight-charts文档支持气泡图 & 支持散点图 ([ca6bd8d](https://code.devops.justdev.com/fe/infra/delight-charts/commits/ca6bd8d994dda220029f6012be8a2886ce06989c))
## [0.0.2-alpha.28] (2022-10-20)
### Bug Fixes

* 修复legend没有设置top会报错 ([4b0282e](https://code.devops.justdev.com/fe/infra/delight-charts/commits/4b0282ec08bec3b084edb02366c917ca7c7cda4c))

### Features

* 图形容器默认padding设置为0 ([7503885](https://code.devops.justdev.com/fe/infra/delight-charts/commits/750388566e776c1862d18430db115153295f130a))
## [0.0.2-alpha.27] (2022-10-18)
### Features

* 封装图例点击事件 ([0231317](https://code.devops.justdev.com/fe/infra/delight-charts/commits/02313178708f06992220be7f6b91c7db8d1d6e7b))
### Bugfix
* 修复legend top失效 ([44ff493](https://code.devops.justdev.com/fe/infra/delight-charts/commits/44ff493e57522c6bff548c4f24e083c2f2b1d1d8))
## [0.0.2-alpha.25] (2022-10-12)
### Bug Fixes

* 调整气泡大小基准 ([10b9314](https://code.devops.justdev.com/fe/infra/delight-charts/commits/10b93145ffc5aa8ba5ea4e28fcb181664accb4c9))
* 修复气泡大小计算 ([f35b54b](https://code.devops.justdev.com/fe/infra/delight-charts/commits/f35b54be258ff390a980c63d4f598dc3861f5ba4))
* 气泡默认为5 ([4095438](https://code.devops.justdev.com/fe/infra/delight-charts/commits/40954384a75c5f4c074eab37f258107dbc0bc1d2))
## [0.0.2-alpha.24] (2022-10-11)
### Bug Fixes
* 修复气泡图y轴label字重([4b10a06](https://code.devops.justdev.com/fe/infra/delight-charts/commits/4b10a0654b51f276f38d0b634427f93b90b22f72))
## [0.0.2-alpha.23] (2022-10-10)
### Features

* 增加seriesConfig配置以支持echart series原生配置项 ([8b66ea3](https://code.devops.justdev.com/fe/infra/delight-charts/commits/8b66ea3688f6846003a8136b7311ddc9d2fb85de))

## [0.0.2] （2022-09-20）
### Features
🌟 新增气泡图

🌟 新增词云图

🌟 新增矩形树图

🌟 新增通用图表
## [0.0.1] （2022-08-25）
### Features
🌟 新增折线图

🌟 新增柱状图

🌟 新增条形图

🌟 新增饼图、环形图
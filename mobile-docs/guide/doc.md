# 文档部署

## 文档开发
文档`config`文件配置左侧导航栏和相应md文件
```
// config.ts
[{
    text: '开始',
    collapsible: true,
    items: [
        {text: '简介', link: '/guide/introduction'},
        {text: '快速上手', link: '/guide/getting-started'},
        {text: '常见问题', link: '/guide/faq'},
        // { text: '联系我们', link: '/guide/deploying' },
    ]
},
{
    text: '组件',
    collapsible: true,
    items: [
        {text: '折线图 Line', link: '/components/line/index'},
        {text: '柱状图 Bar', link: '/components/bar/index'},
}]
```
文档`components`目录存放组件的demo和组件文档

```
componets
└─ bar
   ├─ index.md // 文档文件
   └─ index.vue // 文档demo文件
```
## 文档环境部署
使用ones部署文档
<a href="https://ones.devops.justdev.com/app-next/fedelightcharts">环境部署地址</a>

## doc地址

<a href="http://delight-charts.devops.sit.justdev.com/guide/introduction.html">sit环境</a>

<a href="http://delight-charts.devops.beta.justdev.com/guide/introduction.html">beta环境</a>

<a href="http://delight-charts.devops.justdev.com/guide/introduction.html">线上环境</a>
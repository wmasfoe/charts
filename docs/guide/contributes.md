# 贡献代码

## 启动 `DelightCharts`

**环境准备/安装`pnpm`**

```bash
推荐node14.19.3, 其他版本对vitepress 3.0的兼容性略差
推荐7.3.0, 其他版本对node 14的兼容性略差
$ nvm use v14.19.3
$ npm i -g pnpm@7.3.0
```

**安装依赖**
```bash
pnpm i
```


**运行pnpm run dev**
```bash
pnpm run dev
```
此命令用于图表库的开发

**运行pnpm run docs:dev**
```bash
pnpm docs:dev
```
此命令用于日常的文档编写和文档组件开发

## 发布
**测试版本**
```bash
发布非正式版本，将个人开发分支推送到远程repo，手动触发发布即可
```

**预发版本**
```bash
发布预发版本 在`master`分支执行下面的命令
$ lerna version prerelease
```

**正式版本**
```bash
发布正式版本 在`master`分支执行下面的命令
$ lerna version patch
```
ci将会自动执行发布流程

## 文档

文档`components`目录存放组件的demo和组件文档

```
componets
└─ bar
   ├─ index.md // 文档文件
   └─ index.vue // 文档demo文件
```

## 更多
详细共建指南见<a href="https://doc.weixin.qq.com/doc/w3_AQsA9AY_AGMmUnhxkB5TpGh1Zdtqq?scode=ANAAyQcbAAgpWBpHq1AZUAZwZrAO4">Delight charts共建指南</a>


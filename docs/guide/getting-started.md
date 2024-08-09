# 快速上手

## 安装 `@{symbol}/delight-charts`

```bash
# 使用npm
$ npm i @{symbol}/delight-charts

# 使用yarn
$ yarn add @{symbol}/delight-charts

# 使用pnpm
$ pnpm add @{symbol}/delight-charts
```

## 引入`@{symbol}/delight-charts`

如果使用 Vue 默认的模板语法，需要注册组件后方可使用，有如下三种方式注册组件：

**全量引入**

```javascript
import { createApp } from 'vue'
import DelightCharts from '@{symbol}/delight-charts'
import '@{symbol}/delight-charts/dist/style.css';
import App from './App.vue'

const app = createApp(App)  

app.use(DelightCharts).mount('#app')
```
以上代码便完成了 `@{symbol}/delight-charts` 的全局注册。需要注意的是，样式文件需要单独引入。

**按需引入**

```javascript
import { createApp } from 'vue';
import { Bar, Line } from '@{symbol}/delight-charts'
import '@{symbol}/delight-charts/dist/style.css';
import App from './App';

const app = createApp(App);

/* 会自动注册 Bar 下的子组件 */
app.use(Bar).use(Line).mount('#app');
```

**局部注册组件**

此种方式需要分别注册组件子组件，如 Bar，并且注册后仅在当前组件中有效。所以我们推荐使用上述两种方式。

```vue
<template>
  <Bar />
</template>

<script>
  import { Bar } from '@{symbol}/delight-charts'

  export default {
    components: {
      Bar: Bar,
    },
  };
</script>
```



## Delight Charts设计指南
如果对图表设计规范有建议或者要求的，请在<a href="https://doc.weixin.qq.com/sheet/e3_AQsA9AY_AGMDv7PY90xRuOtueE5Sd?scode=ANAAyQcbAAgvdkOv3zAQsA9AY_AGM">Delight Charts需求反馈</a>填写具体诉求，并艾特周知相关设计和开发同学

<a href="https://www.figma.com/file/9jsuOxbvAFgIrWx5t1WtSw/%5BDDS%5D-Data-Viz?node-id=9%3A72">Figma 设计稿使用指南</a>


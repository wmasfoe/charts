# Delight Charts
delight-charts是基于echarts和vue-demi封装的开箱即用、易于配置、符合小红书图表视觉和交互体验的通用图表库；同时支持vue2和vue3的前端项目；预置了常用业务下的图表基本配置和更符合前后端交互规范的数据格式，仅需要传入数据就能完成图表的绘制，解决了使用echarts生成图表时，经常需要做繁琐的数据类型转化、修改复杂的配置项、和繁琐的交互配色修改等问题。
# Dev Develop

安装依赖
npm i -g pnpm
pnpm i

开发环境准备


推荐node14.19.3
推荐7.3.0, 其他版本对node 14的兼容性略差
nvm use v14.19.3
npm i -g pnpm@7.3.0


启动服务
pnpm run dev

# 使用
安装 @{symbol}/delight-charts#
bash
# 使用npm
$ npm i @{symbol}/delight-charts

# 使用yarn
$ yarn add @{symbol}/delight-charts

# 使用pnpm
$ pnpm add @{symbol}/delight-charts
引入@{symbol}/delight-charts#
如果使用 Vue 默认的模板语法，需要注册组件后方可使用，有如下三种方式注册组件：

**全量引入**

javascript
import { createApp } from 'vue'
import DelightCharts from '@{symbol}/delight-charts'
import '@{symbol}/delight-charts/dist/style.css';
import App from './App.vue'

const app = createApp(App)  

app.use(DelightCharts).mount('#app')
以上代码便完成了 @{symbol}/delight-charts 的全局注册。需要注意的是，样式文件需要单独引入。

**按需引入**

javascript
import { createApp } from 'vue';
import { Bar, Line } from '@{symbol}/delight-charts'
import '@{symbol}/delight-charts/dist/style.css';
import App from './App';

const app = createApp(App);

/* 会自动注册 Bar 下的子组件 */
app.use(Bar).use(Line).mount('#app');

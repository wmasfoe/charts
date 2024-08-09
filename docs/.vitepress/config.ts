import { Plugin } from 'vue';
import {defineConfig} from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx' // 添加这一句

// @ts-ignore
import type {Alias} from 'vite'
import path from 'path'
import markdownPlugin from './theme/plugins/markdownPlugin'

const deps = ['@vueuse/core', 'body-scroll-lock']
export const projRoot = path.resolve(__dirname, '..', '..')
const alias: Alias[] = []
const head: any[] = [
    [
        'link',
        {
            rel: 'icon',
            href: '/logo.svg'
        }
    ],
]
if (process.env.NODE_ENV !== 'production') {
    alias.push(
        {
            find: /^@{symbol}\/delight-charts\/dist\/style.css$/,
            replacement: path.resolve(projRoot, 'packages/delight-charts/src/style.css'),
        },
        {
            find: /^@{symbol}\/delight-charts$/,
            replacement: path.resolve(projRoot, 'packages/delight-charts/src/index.ts'),
        },
    )
} else {
    head.push(
        [
            'link',
            {
                rel: 'preload',
                href: '/assets/inter-latin.7b37fe23.woff2',
                as: 'font',
                type: 'font/woff2',
                crossorigin: 'anonymous'
            }
        ]
    )
}

export default defineConfig({
    lang: 'en-US',
    title: 'DelightCharts',
    description: 'DelightCharts',
    outDir: '../dist',
    lastUpdated: false,
    mpa: false,
    themeConfig: {
        // nav: nav(),
        sidebar: {
            '/guide/': sidebarGuide(),
            '/components/': sidebarGuide(),
        },
        editLink: {
            pattern: 'https://code.devops.justdev.com/fe/infra/delight-charts/-/tree/master/docs/:path',
            text: 'Edit this page on GitLab'
        },
        // socialLinks: [
        //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        // ],
        footer: {
            message: '',
            copyright: ''
        },
    },
    vite: {
        define: {
            __VUE_OPTIONS_API__: false,
            "process.env.BABEL_TYPES_8_BREAKING": "false",
            "process.platform": '"darwin"',
            "Buffer.isBuffer": "undefined",
        },
        resolve: {
            alias: alias,
        },
        server: {
            host: true,
            fs: {
                // for when developing with locally linked theme
                allow: ['../..'],
            }
        },
        build: {
            minify: 'esbuild',
            // chunkSizeWarningLimit: Infinity
        },
        ssr: {
            noExternal: ['echarts', '@{symbol}/delight-charts'],
        },
        plugins: [
            vueJsx()
        ]
    },
    head,
    // Markdown mdx plugin
    markdown: {
        config: (md) => {
            md.use(markdownPlugin);
        },
    },
})

function sidebarGuide() {
    return [
        {
            text: '开始',
            collapsible: true,
            items: [
                {text: '简介', link: '/guide/introduction'},
                {text: '快速上手', link: '/guide/getting-started'},
                { text: '图表API', link: '/guide/chartApi' },

                {text: '常见问题', link: '/guide/faq'},
                { text: '联系我们', link: '/guide/contact' },
                { text: 'ChangeLog', link: '/guide/changeLog' },
            ]
        },
        {
            text: '主题工具',
            collapsible: true,
            items: [
                {text: '主题构建工具', link: '/guide/theme'},
            ]
        },
        {
            text: '组件',
            collapsible: true,
            items: [
                {text: '折线图 Line', link: '/components/line/index'},
                {text: '柱状图 Bar', link: '/components/bar/index'},
                {text: '条形图 Histogram', link: '/components/histogram/index'},
                {text: '饼图 Pie', link: '/components/pie/index'},
                {text: '环形图 Circle', link: '/components/circle/index'},
                { text: '词云图 WordCloud', link: '/components/wordcloud/index' },
                { text: '矩形树图 Treemap', link: '/components/treemap/index' },
                { text: '气泡图 Bubble', link: '/components/bubble/index' },
                { text: '图谱图 Atlas', link: '/components/atlas/index' },
                { text: '漏斗图 Funnel', link: '/components/funnel/index' },
                { text: '地图 Map', link: '/components/map/index' },
                { text: '仪表盘 Gauge', link: '/components/gauge/index' },
                { text: '雷达图 Radar', link: '/components/radar/index' },
                { text: '通用图表 Chart', link: '/components/chart/index' },
                { text: '复杂指标卡 StatisticCard', link: '/components/statistic-card/index' },
                { text: '桑基图 Sankey', link: '/components/sankey/index' },
                { text: '子弹图 Bullet', link: '/components/bullet/index' },
            ]
        },
        {
            text: '开发',
            collapsible: true,
            items: [
                {text: '贡献代码', link: '/guide/contributes'},
                { text: '文档部署', link: '/guide/doc' },
            ]
        },
    ]
}

import {defineConfig} from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx' // 添加这一句
import { join } from "path";
import { PATHS } from "../../scripts/internal/constants";

// @ts-ignore
import type {Alias} from 'vite'
import path from 'path'
import markdownPlugin from './theme/plugins/markdownPlugin'
import { babel } from '@rollup/plugin-babel';

export const projRoot = path.resolve(__dirname, '..', '..',)
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
    // 注释1, 调试本地文档请放开
    // alias.push(
    //     {
    //         find: /^@dx\/delight-charts-mobile\/dist\/style.css$/,
    //         replacement: path.resolve(projRoot, 'packages/delight-charts-mobile/src/style.css'),
    //     },
    //     {
    //         find: /^@dx\/delight-charts-mobile$/,
    //         replacement: path.resolve(projRoot, 'packages/delight-charts-mobile/src/index.ts'),
    //     },
    // )
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
    title: 'DelightChartsMobile',
    description: 'DelightChartsMobile',
    outDir: join(PATHS.DELIGHT_CHART_MOBILE_DOC, "dist"),
    lastUpdated: false,
    mpa: false,
    themeConfig: {
        // nav: nav(),
        sidebar: {
            '/guide/': sidebarGuide(),
            '/components/': sidebarGuide(),
        },
        editLink: {
            pattern: 'https://code.devops.justdev.com/fe/infra/delight-charts-mobile/-/tree/master/docs/:path',
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
            noExternal: ['@antv/f2', '@dx/delight-charts-mobile'],
        },
        plugins: [
            // 注释2, 调试本地文档请放开
            // babel({
            //     plugins: [
            //       [
            //         '@babel/plugin-transform-react-jsx',
            //         {
            //           runtime: 'automatic',
            //           importSource: '@antv/f2',
            //         },
            //       ],
            //     ],
            //     // exclude: "/node_modules/**"
            //     // exclude: ['../../node_modules/**', '../node_modules/**']
            // }), // babel node 端不支持global return, ci报错
            vueJsx()
            // vue(), // 不能删，删掉ci报错，不删doc渲染不出来
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
        // {
        //     text: '主题工具',
        //     collapsible: true,
        //     items: [
        //         {text: '主题构建工具', link: '/guide/theme'},
        //     ]
        // },
        {
            text: '组件',
            collapsible: true,
            items: [
              { text: '折线图 Line', link: '/components/line/index' },
              { text: '柱状图 Bar', link: '/components/bar/index' },
              { text: '条形图 Histogram', link: '/components/histogram/index' },
              { text: '饼图 Pie', link: '/components/pie/index' },
              { text: '环形图 Circle', link: '/components/circle/index' },
              { text: '指标卡 IndicatorCard', link: '/components/indicatorCard/index' },
              { text: '子弹图 Bullet', link: '/components/bullet/index' },
            ],
        },
        // {
        //     text: '开发',
        //     collapsible: true,
        //     items: [
        //         {text: '贡献代码', link: '/guide/contributes'},
        //         { text: '文档部署', link: '/guide/doc' },
        //     ]
        // },
    ]
}

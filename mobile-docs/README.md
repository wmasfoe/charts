# Delight Charts Mobile doc
Delight Charts Mobile doc因为需要识别jsx语法，需用使用@babel/plugin-transform-react-jsx插件，babel插件在node端不支持top level returns, 导致doc build ci报错，详见https://github.com/babel/babel/issues/1298，故在doc里面引入打包好的@{symbol}/delight-charts-mobile来避免源代码jsx语法导致的问题


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

本地调试doc
1. 先执行一遍pnpm run mdocs:build，生成样式文件，不然会报错找不到dist下的样式文件
2. 在mobile-docs的项目里的mobile-docs/.vitepress/config.ts文件里放开注释1
    if (process.env.NODE_ENV !== 'production') {
        alias.push(
            {
                find: /^@{symbol}\/delight-charts-mobile\/dist\/style.css$/,
                replacement: path.resolve(projRoot, 'packages/delight-charts-mobile/src/style.css'),
            },
            {
                find: /^@{symbol}\/delight-charts-mobile$/,
                replacement: path.resolve(projRoot, 'packages/delight-charts-mobile/src/index.ts'),
            },
        )
    }
1. 在mobile-docs的vite.config.ts文件里放开注释2
        babel({
                plugins: [
                  [
                    '@babel/plugin-transform-react-jsx',
                    {
                      runtime: 'automatic',
                      importSource: '@antv/f2',
                    },
                  ],
                ],
                // exclude: "/node_modules/**"
                // exclude: ['../../node_modules/**', '../node_modules/**']
            })






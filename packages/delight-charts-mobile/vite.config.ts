import { join } from "path";
import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { PATHS } from "../../scripts/internal/constants";
import deepmerge from 'deepmerge'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { babel } from '@rollup/plugin-babel';

import dts from "vite-plugin-dts";

export const getConfig = (opts: { base?: string; config?: UserConfig; entryName?: string } = {}): UserConfig => {
  const base = opts.base ?? process.cwd();
  const config = opts.config ?? {};
  const baseConfig: UserConfig = {
    plugins: [
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
      }),
      vue(),
      vueJsx(),
      dts({
        root: PATHS.DELIGHT_CHART_MOBILE,
        entryRoot: join(PATHS.DELIGHT_CHART_MOBILE, "src")
      }),
    ],
    define: {
      __VUE_PROD_DEVTOOLS__: true,
    },
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
        "~": join(PATHS.DELIGHT_CHART_MOBILE, "src"),
      },
      extensions: ['vue', '.js', '.ts', '.json', '.tsx', '.jsx'],
    },
    build: {
      outDir: join(PATHS.DELIGHT_CHART_MOBILE, "dist", opts.entryName ?? ""),
      emptyOutDir: true, // don't clean the ouput when build the mini version
      lib: {
        entry: join(PATHS.DELIGHT_CHART_MOBILE, "src/index.ts"),
        name: "@{symbol}/delight-charts-mobile",
        fileName: (format) => `delight-charts-mobile.${format}.js`,
      },
      rollupOptions: {
        output: {
          exports: "named",
          assetFileNames: "[name].[ext]",
          globals: {
            vue: "Vue",
            '@antv/f2': "@antv/f2",
          },
        },
        external: [
          // 确保外部化处理那些你不想打包进库的依赖
          "vue",
          "@antv/f2",
        ],
      },
      minify: false, //"terser", // boolean | 'terser' | 'esbuild'
      sourcemap: false, // 输出单独 source文件
      brotliSize: true, // 生成压缩大小报告
      // cssCodeSplit: true, // 追加
      cssCodeSplit: false, // 追加
      target: "modules",
    },
  }
  return deepmerge(baseConfig, config);
};

// https://vitejs.dev/config/
export default defineConfig(getConfig());

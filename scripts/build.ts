import "zx/globals";
import { getConfig } from "../vite.config";
import {
  build,
  InlineConfig,
  defineConfig,
  UserConfig,
} from "vite";
import { join } from "path";
import { upperFirst, camelCase } from 'lodash'
import { PATHS } from "./internal/constants";
import { getComponents } from "./internal/utils";

const pkgDir = join(PATHS.DELIGHT_CHART, "src/packages");

function getViteConfig(opts: {
  base: string;
  entryName?: string;
  config: UserConfig;
  dts?: boolean
}): InlineConfig {
  return {
    ...defineConfig(
      getConfig({
        base: opts.base,
        entryName: opts.entryName,
        dts: !!opts.dts,
        config: opts.config,
      })
    ),
    configFile: false,
    root: PATHS.DELIGHT_CHART,
  };
}

(async () => {
  // 全量打包
  await build(getViteConfig({ base: join(PATHS.DELIGHT_CHART, "src"), config: {} }));

  // 按需打包
  const pkgs = getComponents({ base: pkgDir });

  // 循序构建，防止内存占用过大造成按需加载的构建失败
  for (const name of pkgs) {
    const entryName = join(pkgDir, name);
    const config = getViteConfig({
      base: join(pkgDir, name),
      entryName: name,
      config: {
        build: {
          lib: {
            entry: entryName,
            name: upperFirst(camelCase(name)), // 导出模块名
            fileName: (format) => `index.${format}.js`,
            formats: [`es`, `umd`],
          },
        },
      },
    });
    await build(config);

    fs.outputFile(
      join(config.build!.outDir!, `package.json`),
      JSON.stringify({
        name: `@{symbol}/delight-charts/${name}`,
        main: "index.umd.js",
        module: "index.es.js",
        types: `packages/${name}/index.d.ts`,
        peerDependencies: {
          "@vueuse/core": "^9.0.0",
          "echarts": "^5.4.0",
          "lodash": "^4.17.21",
          "vue": "^3.2.25"
        }
      }),
      `utf-8`
    );
  }
})();

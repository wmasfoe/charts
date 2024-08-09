module.exports = {
  pkgTypeList: [
    { type: "cjs", min: false, suffix: ".common.js" },
    { type: "cjs", min: true, suffix: ".common.min.js" },
    { type: "umd", min: false, suffix: ".js" },
    { type: "umd", min: true, suffix: ".min.js" },
  ],
  addons: [
    {
      min: false,
      type: "es",
      suffix: ".esm.js",
      globalName: "",
      src: "src/index.ts",
      dist: "lib/index",
    },
    {
      min: false,
      type: "cjs",
      suffix: ".ts",
      globalName: "",
      src: "src/chart.core.ts",
      dist: "lib/chart.core.ts",
    },
  ],
};

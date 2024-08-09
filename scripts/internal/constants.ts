import { join } from "path";

const ROOT = join(__dirname, "../../");

export const PATHS = {
  ROOT,
  DELIGHT_CHART: join(ROOT, "./packages/delight-charts"),
  DELIGHT_CHART_MOBILE: join(ROOT, "./packages/delight-charts-mobile"),
  DELIGHT_CHART_MOBILE_DOC: join(ROOT, "./mobile-docs"),
  PACKAGES: join(ROOT, "./packages"),
  EXAMPLES: join(ROOT, "./examples"),
  LERNA_CONFIG: join(ROOT, "./lerna.json"),
} as const;

import { join } from "path";
import { PATHS } from "./constants";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";

export function getPkgs(opts?: { base?: string }): string[] {
  const base = opts?.base || PATHS.PACKAGES;
  return readdirSync(base).filter((dir) => {
    return !dir.startsWith(".") && existsSync(join(base, dir, "package.json"));
  });
}

export function getComponents(opts?: { base?: string }): string[] {
    const base = join(opts?.base ?? PATHS.DELIGHT_CHART);
    return readdirSync(base).filter((dir) => {
      return !dir.startsWith(".") && existsSync(join(base, dir, "index.ts"));
    });
  }
  
  
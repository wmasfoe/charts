import deepmerge from "deepmerge";

export function merge<T>(...objs: T[]): T {
  return deepmerge.all<T>(objs, {
    arrayMerge(target, source, options) {
      return source.length ? source : target;
    },
  });
}

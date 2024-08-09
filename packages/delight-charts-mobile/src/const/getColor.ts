import { isObject } from '../utils/utils'
// 默认主题色对齐delight-charts
export const defaultColors = [
  "#FF667A",
  "#3D8AF5",
  "#0FB39D",
  "#F6C122",
  "#58679D",
  "#9060F0",
  "#FF667A",
  "#0FB39D",
  "#E77EE7",
  "#8AABFF",
  "#FFBF70",
  "#4CD2F0",
  "#FFDD6B",
  "#98A3C2",
  "#80E297",
  "#BC95F6",
  "#4FDEC1",
  "#F1A6EC",
];

export const getColor = (data: any) => {
  // f2透传color属性
  if (isObject(data)) {
    return data;
  }
  // delight-chats的color属性
  if (Array.isArray(data) && data.length > 0) {
    return ["type", data];
  }
  // 默认
  return ["type", defaultColors];
};

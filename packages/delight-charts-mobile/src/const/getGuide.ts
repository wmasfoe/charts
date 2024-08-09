import { valueFormat } from "../utils/utils";

export const guideConfig = (item: any, obj: any) => {
  return {
    records: [item],
    content: valueFormat(item.value, 'label', 1,true),
    style: {
      fill: "#000",
      fontSize: "24px",
    },
    offsetY: obj.x || -15,
    offsetX: obj.y || -15,
  };
};

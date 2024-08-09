import { defineComponent, h, ref, computed } from "vue";

export default defineComponent({
  name: "Legend",
  props: {
    chartConfig: {
      type: Object,
      default: () => ({}),
    },
    legendConfig: {
      type: Object,
      default: () => ({}),
    },
    metricsMap: {
      type: Array,
      default: () => [],
    },
    color: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots, emit }) {
    const getLegend = () => {
      const res = {};
      props.metricsMap?.forEach((v: any) => {
        res[v] = props.legendConfig?.selected?.[v] === false ? false : true;
      });
      return res;
    };
    const icon = computed(() => props.legendConfig?.icon || "square");

    const selected = ref(getLegend());

    const onClick = (v: string | number) => {
      if(props.metricsMap?.length === 1) return
      selected.value[v] = !selected.value[v];
      let res = {};
      if (Object.values(selected.value).every((v) => !v)) {
        // 若图例全部点灭，则全部点亮，防止都点灭
        for (let key in selected.value) {
          res[key] = true;
        }
        selected.value = res;
        emit("legendSelectChanged", selected.value);
      } else {
        emit("legendSelectChanged", selected.value);
      }
    };

    const iconStyle = computed(() => {
      if (icon.value === "circle") {
        return {
          width: "9px",
          height: "9px",
          borderRadius: "50%",
        };
      } else if (icon.value === "square") {
        return {
          width: "9px",
          height: "9px",
          borderRadius: "1px",
        };
      } else {
        return {
          borderRadius: "1px",
          width: "10px",
          height: "2px",
        };
      }
    });
    const itemStyle = computed(() => {
      if (icon.value === "line") {
        return {
          alignItems: "center",
        };
      }
      return {
        alignItems: "baseline",
      };
    });

    const legendList = computed(() => {
      return props?.metricsMap?.map((v: any, index) => {
        const iconColor =
          selected.value?.[v] === false ? "#bfbfbf" : props.color?.[1]?.[index];
        const labelColor =
          selected.value?.[v] === false ? "#bfbfbf" : "#000000d9";
        const label = v;
        return h(
          "div",
          {
            style: {
              ...itemStyle.value,
              display: "flex",
              marginRight: "16px",
            },
            onClick: () => onClick(v),
          },
          [
            h("div", {
              style: {
                ...iconStyle.value,
                background: iconColor,
                marginRight: "4px",
              },
            }),
            h("div", { style: { fontSize: "12px", fontWeight: 400, color: labelColor} }, label),
          ]
        );
      });
    });

    return () => {
      return h(
        "div",
        {
          className: 'mlegend-wrap',
          style: {
            display: "flex",
            padding: "0 16px",
            minHeight: "20px",
            alignItems: "center",
            zIndex: 1,
            position: 'relative',
            width: '100%',
          },
        },
        legendList.value
      );
    };
  },
});

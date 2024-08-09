import { defineComponent, h, ref, computed } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    chartConfig: {
      type: Object,
      default: () => ({}),
    },
    chartType: {
      type: String,
      default: "",
    },
  },
  setup(props, { slots, emit }) {
    const { yAxis } = props?.chartConfig;
    const yAxisList = computed(() => (Array.isArray(yAxis) ? yAxis : [yAxis]));

    const isBarStyle = computed(() => {
      if (props.chartType === "Histogram") {
        return {
          paddingTop: "10px",
        };
      }
      return {};
    });
    const title = computed(() => {
      if (!yAxis) return null;
      const list: any = [];
      yAxisList.value?.forEach((v) => {
        if(!v?.name) return 
        list.push(
          h(
            "div",
            {
              style: {
                padding: v?.nameTextStyle?.padding
                  ?.map((v: any) => `${v}px`)
                  ?.join(" "),
                color: v?.nameTextStyle?.color || "rgba(0, 0, 0, 0.45)",
              },
            },
            v?.name
          )
        );
      });
      return list;
    });
    const isShowTitle = computed(()=> title.value?.length > 0)
    return () => {
      return isShowTitle?.value ? h(
        "div",
        {
          className: 'mTitle-wrap',
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px",
            fontFamily: "PingFang SC",
            fontWeight: 400,
            fontStyle: "normal",
            marginTop: "12px",
            padding: "0 16px",
            height: "20px",
            ...isBarStyle.value,
          },
        },
        title.value
      ): h('div')
    };
  },
});

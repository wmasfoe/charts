import { h } from "vue";
export const dataLoading = (config: any = {}) => {
  const { height, loadingConfig } = config;
  const fill = loadingConfig?.loadingIcon || "#30303480";

  return h(
    "div",
    {
      class: "delight-charts-mobile-component-loading",
      style: {
        height,
      },
    },
    [
      h(
        "div",
        {
          class: "loader",
        },
        [
          h("div", { class: "loading-spinner" }, [
            h(
              "svg",
              {
                class: "circular",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              [
                h("path", {
                  fill: fill,
                  d: "M12 3.9C12 3.40294 11.596 2.99534 11.1015 3.04496C9.63891 3.1917 8.22963 3.69507 6.99987 4.51677C5.51983 5.50571 4.36627 6.91131 3.68508 8.55585C3.0039 10.2004 2.82567 12.01 3.17293 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89471 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.3049 15.7704 20.8083 14.3611 20.955 12.8985C21.0047 12.404 20.5971 12 20.1 12C19.6029 12 19.2058 12.4045 19.1438 12.8977C19.0049 14.0036 18.6104 15.0665 17.9866 16.0001C17.1954 17.1841 16.0709 18.107 14.7553 18.6519C13.4397 19.1969 11.992 19.3395 10.5953 19.0617C9.19869 18.7838 7.91577 18.0981 6.90883 17.0912C5.90189 16.0842 5.21616 14.8013 4.93835 13.4047C4.66053 12.008 4.80312 10.5603 5.34807 9.24468C5.89302 7.92905 6.81586 6.80456 7.99989 6.01342C8.93348 5.38962 9.99638 4.99514 11.1023 4.85617C11.5955 4.7942 12 4.39706 12 3.9Z",
                }),
              ]
            ),
          ]),
        ]
      ),
    ]
  );
};

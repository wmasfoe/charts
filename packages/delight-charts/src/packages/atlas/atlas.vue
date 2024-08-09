<template>
  <div
    :style="{
      width: width === 'auto' ? '100%' : width + 'px',
      height: height + 'px',
    }"
    style="overflow: hidden"
  >
    <div
      class="atlas"
      :style="{
        marginTop: `calc((${height}px - ${
          width === 'auto' ? '100%' : width + 'px'
        })/2)`,
      }"
    >
      <div
        class="atlas-box"
        :style="{
          width: width === 'auto' ? '100%' : width + 'px',
          height: width === 'auto' ? '100%' : width + 'px',
        }"
      >
        <div
          :style="{
            width: levelList[0]?.levelRange,
            height: levelList[0]?.levelRange,
            background: levelList[0]?.bg,
          }"
          class="first-pie flex"
        >
          <div
            :style="{
              width: levelList[1]?.levelRange,
              height: levelList[1]?.levelRange,
              background: levelList[1]?.bg,
            }"
            class="second-pie flex"
          >
            <div
              :style="{
                width: levelList[2]?.levelRange,
                height: levelList[2]?.levelRange,
                background: levelList[2]?.bg,
              }"
              class="third-pie flex"
            >
              <div class="center">
                <div class="border">
                  <div class="content" :class="levelCenterClass">
                    <span>{{ content }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <slot name="level-title"></slot>
        <div
          v-if="levelPosition"
          :style="{
            width: width + 'px',
            top: levelPosition === 'bottom' ? 'calc(70% + 40px)' : '',
            bottom: levelPosition === 'top' ? `calc(70%)` : '',
          }"
          class="title-box"
        >
          <div class="atlas-title" :class="levelTitleClass">
            <template v-for="(item, index) in titleList" :key="index">
              <div
                class="atlas-title-border"
                v-if="
                  index !== 0 &&
                  item.index <= max(indexList) &&
                  item.index === index
                "
              >
                <img :src="AtlasLeft" alt="" />
                <div class="dash-line"></div>
              </div>
              <div class="atlas-title-content">
                <p>{{ item.label }}</p>
                <p>{{ item.value }}</p>
              </div>
              <div
                class="atlas-title-border"
                v-if="index !== titleList.length - 1 && max(indexList) <= index"
              >
                <div class="dash-line"></div>
                <img :src="AtlasRight" alt="" />
              </div>
            </template>
          </div>
        </div>
        <div v-if="showRelevance" class="title-box-center">
          <div>
            <span>{{ AtlasType[3] }}</span>
            <div class="atlas-title-border">
              <img :src="AtlasLeft" alt="" />
              <div class="dash-line"></div>
            </div>
            <span>{{ AtlasType[2] }}</span>
            <div class="atlas-title-border">
              <div class="dash-line"></div>
              <img :src="AtlasRight" alt="" />
            </div>
            <span>{{ AtlasType[1] }}</span>
          </div>
          <div>
            <span>{{ AtlasType[1] }}</span>
            <div class="atlas-title-border">
              <img :src="AtlasLeft" alt="" />
              <div class="dash-line"></div>
            </div>
            <span>{{ AtlasType[2] }}</span>
            <div class="atlas-title-border">
              <div class="dash-line"></div>
              <img :src="AtlasRight" alt="" />
            </div>
            <span>{{ AtlasType[3] }}</span>
          </div>
        </div>
      </div>
      <Bubble
        class="bubble-box"
        :style="{
          width: width === 'auto' ? 'auto' : width + 'px',
          height: height + 'px',
        }"
        :chartData="chartData"
        :metrics="metrics"
        :dimensions="dimensions"
        :height="height"
        :events="props.events"
        :series-field="props.seriesField"
        :chart-config="{
          ...defaultConfig,
          ...chartConfig,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, withDefaults, defineProps, computed } from "vue";
import Bubble from "../bubble/Bubble.vue";
import { OptionsSetting, OriginDataType } from "../../const/interface/option";
import type { LevelItem } from "../../const/interface/atlas";
import { cloneDeep, max, reverse } from "lodash";
import AtlasLeft from "../../assets/AtlasLeft.svg";
import AtlasRight from "../../assets/AtlasRight.svg";
import { AtlasType } from "../../const/atlas";
const props = withDefaults(
  defineProps<{
    content: string;
    height: number;
    width: number | "auto";
    chartData: PropType<OriginDataType>;
    levelCenterClass?: string;
    levelTitleClass?: string;
    showRelevance?: boolean;
    levelPosition: "bottom" | "top" | "";
    levelList: LevelItem[];
    dimensions: PropType<String[]>;
    metrics: PropType<String[]>;
    chartConfig: PropType<OptionsSetting>;
    seriesField: PropType<String>;
    events: any;
  }>(),
  {
    props: () => {},
    content: "",
    levelList: () => [
      {
        levelRange: "100%",
      },
      {
        levelRange: "70%",
      },
      {
        levelRange: "40%",
      },
    ],
    height: 600,
    width: "auto",
    showRelevance: false,
  }
);
const indexList = computed(() => props.levelList.map((i: any) => i.index));

const titleList = computed<any[]>(() => {
  const arr = cloneDeep(props.levelList);
  return [
    ...props.levelList,
    ...reverse(arr.filter((i: any) => i.index !== max(indexList.value))),
  ];
});

const defaultConfig = {
  seriesConfig: {
    itemStyle: {
      borderColor: "#ffffff",
    },
  },
  grid: {
    show: false,
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  },
  xAxis: {
    show: false,
    min: -100,
    max: 100,
  },
  yAxis: {
    show: false,
    min: -100,
    max: 100,
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.atlas {
  margin: 0 auto;
  position: relative;
}
.atlas-box {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
}
.first-pie {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: rgba(60, 102, 255, 0.07);
}
.second-pie {
  background: #e4eaff;
}
.third-pie {
  background: #d8e0ff;
}
.border {
  width: 128px;
  border-radius: 50%;
  height: 128px;
  box-sizing: border-box;
  border: 1px solid #3c66ff;
}
.content {
  width: 126px;
  margin: auto;
  box-sizing: border-box;
  height: 126px;
  border-radius: 50%;
  border: 3px solid #dde6ff;
  background: #3c66ff;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 0px 0px #789bff;
}
.content > span {
  color: #fff;
  text-align: center;
  padding: 0 10px;
  font-family: PingFang SC;
  font-size: 16px;
  display: block;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}

.atlas-title-border {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 8px;
}
.bubble-box {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.atlas-title {
  width: 100%;
  display: flex;
  align-items: center;
}
.title-box-center {
  position: absolute;
  width: 100%;
  justify-content: space-between;
  left: 50%;
  top: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.title-box-center > div {
  width: calc(50% - 124px);
  margin: 0 40px;
  display: flex;
  align-items: center;
}
.title-box-center > div > span {
  color: #345dd9;
  text-align: center;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}
.atlas-title .atlas-title-content {
  text-align: center;
  margin: 0 auto;
  color: #345dd9;
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
}
.atlas-title-content > p {
  margin: 0;
}
.atlas-title-content > p:first-child {
  margin: 0 0 2px 0;
}
.title-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
.dash-line {
  border-bottom: 1px dashed #345dd9;
  width: 100%;
  height: 1px;
}
</style>
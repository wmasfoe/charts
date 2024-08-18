<template>
  <div class="bubble-wrapper" ref="wrapperRef">
    <template v-if="!isDataEmpty && props.quadrantList?.length > 0 && asyncQuadrantList">
      <Tooltip
        v-for="(item, index) in props.quadrantList"
        :key="item.text"
        class="item"
        :style="{ ...computedPosition(item.position, index), ...item.style } || ''"
        :index="index"
        :tooltip="item.tooltip"
        :text="item.text"
        :parent-ref="wrapperRef"
        :color="item.color"
        :background-color="item.backgroundColor"
      />
    </template>
    <BubbleChart v-bind="props" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, PropType, computed, nextTick, onMounted } from 'vue';
import { isNil } from 'lodash'
import {defaultBubbleGridConfig} from '../../const/defaultBubbleConfig'
import Tooltip from './Tooltip.vue'
import { generateChart } from '../../chart.core.tsx';
import { bubble } from './getOptions';

const BubbleChart = /* #__PURE__ */ generateChart('BubbleChart', bubble, {
  plugins: async () => {
    const { ScatterChart } = await import("echarts/charts");
    return {
      usePlugins: [ScatterChart],
    };
  },
});
type positionType = {
  top?: string | Function;
  right?: string | Function;
  bottom?: string | Function;
  left?: string | Function;
};
export default defineComponent({
  extends: BubbleChart,
  name: 'Bubble',
  components: {
    BubbleChart,
    Tooltip
  },
  props: {
    ...BubbleChart.props,
    quadrantList: {
        type: Array as PropType<{
          text: string;
          tooltip?: string;
          position?: {
            top?: string | Function;
            right?: string | Function;
            bottom?: string | Function;
            left?: string | Function;
          };
          style?: CSSStyleDeclaration;
          color?: string;
          backgroundColor?: string;
        }[]>,
        required: false
      }
  },
  // setup 不能省
  setup(props, context) {
    const isDataEmpty = computed(() => !props.chartData?.length)
    const wrapperRef = ref<HTMLElement>();
    const positionList = ref<any>([]);
    const asyncQuadrantList = ref<any[]>();
    const getPosition = (gridPosition: string|number, position:string|number, gap?: number) => {
      const defaultOffset = 4 + (gap || 0)
      if(isNil(gridPosition)) {
        return String(position)?.indexOf('%') !== -1 ? `calc(${position} + ${defaultOffset}px)` : ((+position || 0) + defaultOffset) +'px'
      }
      if(isNil(position)) {
        return String(gridPosition)?.indexOf('%') !== -1 ? `calc(${gridPosition} + ${defaultOffset}px)` : ((+gridPosition || 0) + defaultOffset) +'px'
        // gridPosition + (8+gap) + 'px' || (8+gap) +'px'
      }
      if(String(position)?.indexOf('%') !== -1) {
        if(String(gridPosition)?.indexOf('%') !== -1) {
          return `calc(${gridPosition} + ${position})`
        }
        return `calc(${gridPosition}px + ${position})`
      } else {
        const offset = +position + (gap || 0)
        if(String(gridPosition)?.indexOf('%') !== -1) {
          return `calc(${gridPosition} + ${offset}px)`
        }
        return `calc(${gridPosition}px + ${offset}px)`
      }
    }
    const computedPosition = (originPosition: positionType, index: number) => {
      const res = {};
      const grid = props?.chartConfig?.grid

      let left: string|number = 0, right:string|number = 0, top:string|number = 0, bottom:string|number = 0;
      let position = {}
      // grid默认left/right 10%
      switch(index) {
        case 0:
          left = getPosition((isNil(grid?.left) ? defaultBubbleGridConfig.left : grid?.left), originPosition?.left)
          top = getPosition((isNil(grid?.top) ? defaultBubbleGridConfig.top : grid?.top), originPosition?.top)
          position = {
            left,
            top
          }
          break
          // const 
        case 1:
          right = getPosition((isNil(grid?.right) ? defaultBubbleGridConfig.right : grid?.right), originPosition?.right)
          top = getPosition((isNil(grid?.top) ? defaultBubbleGridConfig.top : grid?.top), originPosition?.top)
          position = {
            right,
            top
          }
          break
        case 2:
          right = getPosition((isNil(grid?.right) ? defaultBubbleGridConfig.right : grid?.right), originPosition?.right)
          bottom = getPosition((isNil(grid?.bottom) ? defaultBubbleGridConfig.bottom : grid?.bottom), originPosition?.bottom)
          position = {
            right,
            bottom
          }
          break
        case 3:
          left = getPosition((isNil(grid?.left) ? defaultBubbleGridConfig.left : grid?.left), originPosition?.left)
          bottom = getPosition((isNil(grid?.bottom) ? defaultBubbleGridConfig.bottom : grid?.bottom), originPosition?.bottom)
          position = {
            left,
            bottom
          }
          break
      }
      return position
    }

    // 等气泡图加载完成，再渲染标签
    onMounted(async () => {
      await nextTick();
      asyncQuadrantList.value = props.quadrantList
    });
    return {
      // 如何自定义属性 区分 BubbleChart Bubble
      // ...BubbleChart.setup(props, context),
      isDataEmpty,
      positionList,
      props,
      computedPosition,
      asyncQuadrantList
    }
  }
})

</script>

<style scoped>
.bubble-wrapper {
  position: relative;
}
.bubble-wrapper .item {
  position: absolute;
  display: flex;
  flex-flow: column-reverse nowrap;
  width: fit-content;
  height: fit-content;
  z-index: 98;
}
.bubble-wrapper .label {
  padding: 6px 12px;
  background: rgba(60, 102, 255, 0.1);
  color: #2b48b5;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
}
.bubble-wrapper .tooltip {
  position: relative;
  margin-bottom: 10px;
  display: none;
  padding: 8px 12px;
  box-sizing: border-box;
  position: absolute;
  bottom: 32px;
  width: 267px;
  text-align: left;
  border-radius: 4px;
  background-color: #3d3d3d;
  color: #fff;
}
.bubble-wrapper .tooltip p {
  margin: 0;
}

.bubble-wrapper .label:hover ~ .tooltip {
  display: block;
}
.bubble-wrapper .tooltip .triangle {
  position: absolute;
  height: 0;
  width: 0;
  bottom: -12px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #3d3d3d;
  border-bottom: 6px solid transparent;
}
</style>

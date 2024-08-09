<template>
<div style="position: relative;">
    <div :style="{...props.style, 'max-width': width+'px'} || ''" class="overflow-tooltip" >
        <span ref="tooltipText" class="overflow-tooltip-title" @mouseenter="onMouseEnter" @mouseout="isShowTooltip=false">{{props.title}}</span>
    </div>
    <div v-if="content&&isShowTooltip&&!disabled" class="overflow-tooltip-content" ref="tooltipRef">
        <slot>
            {{props.content}}
        </slot>
        <div class="triangle" ref="triangleRef"></div>
    </div>
</div>

</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, CSSProperties, onMounted, nextTick, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
  style: CSSProperties,
  content?: string,
  title?: string,
  width?: string,
  disabled?: boolean,
  parentRef: HTMLElement | undefined,
  tips: boolean
}>(), {
    disabled: false
})
const isShowTooltip = ref(false);
const onMouseEnter = (panelText: Event) => {
  isShowTooltip.value = false;
  const contentWidth = panelText?.target?.offsetWidth;
  // 判断是否开启tooltip功能
  if (+contentWidth > props.width) {
    isShowTooltip.value = true;
  } else {
    isShowTooltip.value = false;
  }
};
</script>
<style scoped>
.overflow-tooltip {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
}
.overflow-tooltip-content {
  padding: 8px 12px;
  box-sizing: border-box;
  position: absolute;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  /* tooltip 默认居中 */
  left: 50%;
  transform: translateX(-50%);

  bottom: 32px;
  max-width: 300px;
  min-width: 150px;
  text-align: left;
  border-radius: 4px;
  background-color: #3D3D3D;
  color: #fff;
}

.overflow-tooltip-content .triangle {
  position: absolute;
  height: 0;
  width: 0;
  bottom: -12px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #3D3D3D;
  border-bottom: 6px solid transparent;
  /* tooltip 三角默认居中 */
  left: 50%;
  /* right: 14px; */
  transform: translateX(-50%);
}
</style>
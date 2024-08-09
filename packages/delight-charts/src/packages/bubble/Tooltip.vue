<template>
  <div v-if="props.text" :class="['label-item', `label-item${props.index}`]" :style="style">
    <div class="label" ref="labelRef">
      <span name="label">
        {{props.text}}
      </span>
      <template v-if="tooltip">
        <svg class="hover" ref="hoverRef" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M7.07111 3C6.25793 3 5.62056 3.23077 5.15902 3.7033C4.81412 4.04821 4.59808 4.48517 4.51092 5.01877C4.45956 5.33323 4.72501 5.59341 5.04364 5.59341C5.36227 5.59341 5.60797 5.33137 5.67767 5.02047C5.72638 4.8032 5.80625 4.62056 5.91727 4.47253C6.13705 4.15385 6.49968 4 6.99419 4C7.38979 4 7.70847 4.10989 7.92825 4.32967C8.13705 4.54945 8.24694 4.84615 8.24694 5.23077C8.24694 5.51648 8.13705 5.78022 7.93924 6.03297L7.75243 6.24176C7.07111 6.84615 6.65353 7.2967 6.51067 7.6044C6.35683 7.89011 6.29089 8.24176 6.29089 8.64835C6.29089 8.75153 6.37453 8.83517 6.47771 8.83517H7.2799C7.38308 8.83517 7.46672 8.75153 7.46672 8.64835C7.46672 8.38462 7.52166 8.14286 7.64254 7.92308C7.74144 7.72528 7.89529 7.52747 8.10408 7.35165C8.62056 6.9011 8.92825 6.61539 9.02716 6.49451C9.30188 6.14286 9.44474 5.69231 9.44474 5.15385C9.44474 4.49451 9.22496 3.96703 8.7854 3.58242C8.34584 3.18681 7.77441 3 7.07111 3Z"
              fill="black"
              fill-opacity="0.45"
          />
          <path
              d="M6.8731 9.42871C7.10387 9.42871 7.30167 9.49465 7.45551 9.64849C7.60936 9.79135 7.68628 9.97816 7.68628 10.2089C7.68628 10.4397 7.59837 10.6265 7.44453 10.7804C7.29068 10.9232 7.09288 11.0001 6.8731 11.0001C6.65332 11.0001 6.45551 10.9232 6.30167 10.7694C6.14782 10.6155 6.0709 10.4287 6.0709 10.2089C6.0709 9.97816 6.14782 9.79135 6.30167 9.64849C6.45551 9.49465 6.65332 9.42871 6.8731 9.42871Z"
              fill="black"
              fill-opacity="0.45"
          />
          <path
              d="M7.00008 13.6663C3.31818 13.6663 0.333416 10.6816 0.333416 6.99968C0.333416 3.31778 3.31818 0.333008 7.00008 0.333008C10.682 0.333008 13.6667 3.31778 13.6667 6.99968C13.6667 10.6816 10.682 13.6663 7.00008 13.6663ZM12.6667 6.99968C12.6667 3.87006 10.1297 1.33301 7.00008 1.33301C3.87047 1.33301 1.33342 3.87006 1.33342 6.99968C1.33342 10.1293 3.87047 12.6663 7.00008 12.6663C10.1297 12.6663 12.6667 10.1293 12.6667 6.99968Z"
              fill="black"
              fill-opacity="0.45"
          />
        </svg>
      </template>
      <div v-if="tooltip" class="tooltip" ref="tooltipRef">
        <slot>
          <p>
            {{props.tooltip}}
          </p>
        </slot>
        <div class="triangle" ref="triangleRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, CSSProperties, onMounted, nextTick, onUnmounted, computed } from 'vue';

const props = withDefaults(defineProps<{
  style: CSSProperties,
  tooltip?: string,
  index?: string | number,
  text?: string,
  parentRef: HTMLElement | undefined,
  tips?: boolean
  color?: string
  backgroundColor?: string
}>(), {
  index: 0,
})
const color = computed(() => props.style?.color || props.color)
const bgColor = computed(() => props.style?.background || props.style?.backgroundColor || props?.backgroundColor || `${props.color}1a`)

const style = computed<any>(() => ({
  ...(props.style || {}),
  color: color.value,
  backgroundColor: bgColor.value
}))

</script>
<style scoped>
.label-item {
  position: absolute;
  display: flex;
  flex-flow: column-reverse nowrap;
  width: fit-content;
  height: fit-content;
  z-index: 98;
  /* 防止遮挡气泡图，tag 不参与鼠标事件 */
  pointer-events: none;
  background: rgba(60, 102, 255, 0.1);
  color: #2B48B5;
  font-weight: 500;
  font-size: 12px;
  border-radius: 4px;
}


.label-item .label {
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  flex-flow: row;
  align-items: center;
}

.label-item .tooltip {
  margin-bottom: 10px;
  display: none;
  padding: 8px 12px;
  box-sizing: border-box;
  position: absolute;

  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  /* tooltip 默认居中 */
  left: 50%;
  transform: translateX(-50%);

  bottom: 32px;
  width: 267px;
  text-align: left;
  border-radius: 4px;
  background-color: #3D3D3D;
  color: #fff;
}

.label-item .tooltip p {
  margin: 0;
}

.label-item .hover {
  margin-left: 4px;
  /* hover svg 显示 tooltip */
  pointer-events: auto;
  width: 14px;
  height: 14px;
}
.label-item .hover:hover~.tooltip {
  display: block;
}

.label-item .tooltip .triangle {
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
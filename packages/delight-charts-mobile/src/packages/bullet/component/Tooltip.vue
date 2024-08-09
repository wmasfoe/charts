<template>
  <div class="bullet-tooltip" ref="tooltipRef">
    <div v-if="tooltip?.formatter" v-html="formatter"></div>
    <template v-else>
      <Legend
        :targets="targets"
        :ranges="ranges"
        :measures="measures"
        :gap="false"
        :showTooltipValue="true"
        :legendPosition="'top'"
        style="flex-direction: column; margin: 0 0 -8px 0"
      />
      <div v-if="tooltip?.formatterFootSlot" v-html="formatterFootSlot"></div>
    </template>
  </div>
</template>
    <script lang="ts" setup>
import { ref, defineProps, computed } from "vue";
import Legend from "./Legend.vue";

const props = withDefaults(
  defineProps<{
    targets: any;
    ranges: any;
    measures: any;
    tooltipConfig?: any;
  }>(),
  {}
);
const tooltip = computed(() => props?.tooltipConfig);
const formatter = computed(() => props?.tooltipConfig?.formatter(props));
const formatterFootSlot = computed(() =>
  props?.tooltipConfig?.formatterFootSlot(props)
);
const tooltipRef = ref();
const getDom = () => {
  return tooltipRef.value;
};
defineExpose({
  getDom,
});
</script>
<style scoped>
.bullet-tooltip {
  position: absolute;
  padding: 12px 12px 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 18px;
  color: #000000d9;
  background: #ffffff;
  z-index: 99;
  opacity: 1;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
}
</style>
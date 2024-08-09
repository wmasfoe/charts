<template>
  <div class="drill-breadcrumb" v-if="breadcrumbData.length" >
    <span v-if="drillBreadcrumbConfig?.breadcrumbDataText?.length" class="drill-breadcrum-text">{{drillBreadcrumbConfig?.breadcrumbDataText}}</span>
    <template v-for="(item,index) in breadcrumbData" 
        :key="index">
        <span v-if="index !== 0" class="drill-item-seperator">/</span>

    <div   
        :class="['drill-item', {'drill-item-active': activeIndex === index}]"
        @click="selectBreadcrumb(index, item)"
    >
      <!-- <span v-if="!drillBreadcrumbConfig?.showOverflowTooltip">{{item.title}}</span> -->
      <OverflowTooltip
        :disabled="!drillBreadcrumbConfig?.showOverflowTooltip"
        :width="drillBreadcrumbConfig?.drillBreadcrumbItemWidth"
        :style="item?.style || {}"
        :title="item.title"
        :index="index"
        :content="item.title"
    />
    </div>   
  </template>
  </div>
</template>
<style scoped>
.drill-breadcrumb {
  text-align: left;
  height: 28px;
  line-height: 28px;
  display: flex;
  align-items: center;
}
.drill-breadcrum-text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.drill-breadcrumb .drill-item {
  color:rgba(0, 0, 0, 0.45);
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
}
.drill-item-seperator {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin: 0 4px;
}
/* .drill-breadcrumb .drill-item-after::after {
  content: ' / ';
  font-weight: 400;
  color: #8c8c8c;
} */
.drill-breadcrumb .drill-item-active {
  color: rgba(0,0,0,.85);
  font-weight: 500;
}
</style>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import OverflowTooltip from './OverflowTooltip.vue'

const props = defineProps({
  drillBreadcrumbConfig: {
    type: Object,
    default: () => ({
      showOverflowTooltip: true,
      breadcrumbData:[],
      breadcrumbDataText: ''
    })
  },
})
const  breadcrumbData = computed(() =>  props.drillBreadcrumbConfig.breadcrumbData)
watch(() => breadcrumbData.value, (val) => {
    activeIndex.value = breadcrumbData.value?.length - 1;
}, {deep: true})
  const activeIndex = ref(0);
  const emits = defineEmits(['selectBreadcrumb'])
  const selectBreadcrumb = (index: number, item: any) => {
    activeIndex.value = index
    emits('selectBreadcrumb', item)
  }
</script>

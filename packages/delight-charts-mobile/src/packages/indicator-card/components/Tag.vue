<template>
  <span class="tag">{{ props.name }}</span>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'
  import { colors } from '@{symbol}/reds-h5-style/src'
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'ThemePrimary',
    },
    bgColor: {
      type: String,
      required: false,
      default: 'ThemePrimary2',
    }
  })

  const textColor = computed(() => colors?.[props?.color] || props?.color || '#FF2442')
  const bgColor = computed(() => colors?.[props?.bgColor] || props?.bgColor || '#FFEDF0')
</script>
<style scoped>
.tag {
  --text-color: v-bind(textColor);
  --bg-color: v-bind(bgColor);

  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;

  border-radius: 3px;

  background: var(--bg-color);
  color: var(--text-color);

  font-family: 'PingFang SC';
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
}
</style>
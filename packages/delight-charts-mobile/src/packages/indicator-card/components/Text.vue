<template>
  <span
    :class="className"
    :style="styles"
  >
    <slot />
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { colors, typography } from '@dx/reds-h5-style/src'

const props = defineProps({
  tag: {
    type: String,
    default: () => 'div',
  },
  color: {
    type: String,
  },
  lineHeight: {
    type: String,
    default: 'inherit',
  },
  type: {
    type: String,
    default: 'T3',
  },
  weight: {
    type: String,
    default: 'Regular',
  },
})

const className = computed(() => [
  { fs10: props.type === 'Micro' },
])

const styles = computed(() => {
  const totalStyles: {
    color?: string
    fontSize?: string
    lineHeight?: string
    fontWeight?: string
  } = {}

  totalStyles.color = colors[props.color] || props.color
  if (props.type !== 'Micro') {
    totalStyles.fontSize = typography.FontSize[props.type] || props.type
  }
  totalStyles.lineHeight = typography.LineHeight[props.lineHeight] || props.lineHeight
  totalStyles.fontWeight = typography.FontWeight[props.weight] || props.weight
  return totalStyles
})
</script>

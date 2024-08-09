<template>
  <span class="tag">{{ props.name }}</span>
</template>
<script lang="ts" setup>
  const props = defineProps({
    name: {
      type: String,
      required: true,
    }
  })

</script>
<style scoped>
.tag {
  padding: 0 4px;
  border-radius: 2px;
  background: rgba(60, 102, 255, 0.10);
  font-size: 12px;
  font-family: 'PingFang SC';
  font-weight: 500;
  line-height: 16px;
  color: rgb(43, 72, 181);
}
</style>
<template>
  loading...
</template>

<script setup>
import {useRouter} from 'vitepress'
import {onMounted} from 'vue'

const router = useRouter()

onMounted(() => {
  if(typeof window === 'undefined') {
    return
  }
  router.go('/guide/introduction.html')
  // 模拟移动端touch事件
})
</script>

<style scoped>

</style>

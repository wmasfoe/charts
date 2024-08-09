<template>
  loading...
</template>

<script setup>
import {useRouter} from 'vitepress'
import {onMounted} from 'vue'

const router = useRouter()

onMounted(() => {
  router.go('/guide/introduction.html')
})
</script>

<style scoped>

</style>

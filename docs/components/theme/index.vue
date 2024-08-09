<template>
    <iframe src="//fe.devops.beta.justdev.com/apps/delightchartstheme" class="theme"/>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted } from 'vue'
  
  onMounted(()=>{
    const aside = document.getElementsByClassName("aside")[0]
    const dom = document.getElementsByClassName("content")[0]
    dom.style.width = '100%'
    aside.style.display = 'none'
  })
  onUnmounted(()=>{
    const aside = document.getElementsByClassName("aside")[0]
    const dom = document.getElementsByClassName("content")[0]
    dom.style.width = ''
    aside.style.display = ''
  })
  </script>
  
  <style scoped>
  .theme{
    width: 100%;
    height: 800px;
    border: 1px #efefef solid;
  }
  </style>
  
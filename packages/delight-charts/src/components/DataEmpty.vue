<template>
  <div class="data-empty" :style="{ height: height }">
      <div class="empty-img" :style="{ background: `url(${emptyImgUrl})`, backgroundSize: 'cover' }" />
      <div class="main-title" v-if="emptyTitle">{{ emptyTitle }}</div>
      <div class="sub-title" v-if="emptySubTitle">{{ emptySubTitle }}</div>
  </div>
</template>
<script lang="ts" setup>
import dataEmpty from '../assets/data-empty.png';

const props = withDefaults(
  defineProps<{
    emptyTitle?: string;
    emptySubTitle?: string;
    emptyImgUrl?: string;
    height?: string;
  }>(),
  {
    emptyTitle: '没有符合条件的内容',
    emptySubTitle: '请修改查询条件后重试',
    emptyImgUrl: dataEmpty,
    height: '100%',
  }
);
</script>

<script lang="ts" setup>
import VPNavBarTitle from './VPNavBarTitle.vue'
// import VPNavBarMenu from './VPNavBarMenu.vue'

defineProps<{
  isScreenOpen: boolean
}>()
</script>

<template>
  <div class="VPNavBar">
    <div class="container">
      <VPNavBarTitle>
        <template #navbar-title>
          <slot name="navbar-title" />
        </template>
      </VPNavBarTitle>
      <!-- <div class="content">
        <VPNavBarMenu class="menu" />
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.VPNavBar {
  position: relative;
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 0 12px 0 24px;
  height: var(--vt-nav-height);
  background-color: var(--vt-c-bg);
  white-space: nowrap;
  transition: border-color 0.5s, background-color 0.5s;
}

@media (min-width: 768px) {
  .VPNavBar {
    padding: 0 12px 0 32px;
  }
}

@media (min-width: 1280px) {
  .VPNavBar {
    padding: 0 32px;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 100vw;
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.menu + .appearance {
  margin-left: 8px;
}
.menu + .social-links {
  margin-left: 12px;
}
.appearance + .social-links {
  margin-left: 12px;
}
.search {
  margin-left: 12px;
}
</style>

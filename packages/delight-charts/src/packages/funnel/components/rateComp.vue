<template>
<div class="comp">
  <div class="comp-content">
    <slot></slot>
  </div>
</div>
</template>
<style scoped>

.comp{
  display: flex;
  align-items: center;
}

.comp-content {
  width: 57px;
  height: 34px;
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  border-radius: 2px;
  font-size: 12px;
  line-height: 34px;
  text-align: center;
  border-bottom: 0;
  font-feature-settings: "tnum" on, "lnum" on;
  color: rgba(0, 0, 0, 0.85);
  background: url("../../../assets/Union.png") no-repeat center center;
  background-size: cover;
}
</style>
<script setup lang="ts">
import { ref, Teleport, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    tips: string;
    zIndex?: number;
  }>(),
  {
    zIndex: 3
  }
)

const showAlert = ref(false)
const closeAlert = () => {
  showAlert.value = false
}
watch(showAlert, (val) => {
  if(val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}, {
  immediate: true
})
</script>
<template>
  <Teleport v-if="showAlert" to="body">
    <div class="mask">
      <div class="modal">
        <div class="scroll-wrap">
          <div v-html="props.tips" class="scroll-content"></div>
        </div>
        <div class="line"></div>
        <div class="footer">
          <button class="confirm" @touchend="closeAlert">我知道了</button>
        </div>
      </div>
    </div>
  </Teleport>

  <span :style="{height: '20px', zIndex: props.zIndex}" @touchend.stop.prevent="showAlert = true">
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
      <path d="M6.55778 3.74994C5.89707 3.74994 5.37921 3.93744 5.00421 4.32137C4.72397 4.60161 4.54845 4.95664 4.47763 5.39019C4.4359 5.64569 4.65158 5.85708 4.91046 5.85708C5.16934 5.85708 5.36898 5.64418 5.42561 5.39157C5.46519 5.21504 5.53008 5.06664 5.62028 4.94637C5.79885 4.68744 6.0935 4.56244 6.49528 4.56244C6.81671 4.56244 7.07564 4.65172 7.25421 4.8303C7.42385 5.00887 7.51314 5.24994 7.51314 5.56244C7.51314 5.79458 7.42385 6.00887 7.26314 6.21422L7.11135 6.38387C6.55778 6.87494 6.2185 7.24101 6.10243 7.49101C5.97743 7.72315 5.92385 8.00887 5.92385 8.33922C5.92385 8.42305 5.99181 8.49101 6.07564 8.49101H6.72743C6.81125 8.49101 6.87921 8.42305 6.87921 8.33922C6.87921 8.12494 6.92385 7.92851 7.02207 7.74994C7.10243 7.58922 7.22743 7.42851 7.39707 7.28565C7.81671 6.91958 8.06671 6.68744 8.14707 6.58922C8.37028 6.30351 8.48635 5.93744 8.48635 5.49994C8.48635 4.96422 8.30778 4.53565 7.95064 4.22315C7.5935 3.90172 7.12921 3.74994 6.55778 3.74994Z" fill="black" fill-opacity="0.27"/>
      <path d="M6.3969 8.97327C6.5844 8.97327 6.74511 9.02684 6.87011 9.15184C6.99511 9.26791 7.05761 9.41969 7.05761 9.60719C7.05761 9.79469 6.98618 9.94648 6.86118 10.0715C6.73618 10.1876 6.57547 10.2501 6.3969 10.2501C6.21832 10.2501 6.05761 10.1876 5.93261 10.0626C5.80761 9.93755 5.74511 9.78577 5.74511 9.60719C5.74511 9.41969 5.80761 9.26791 5.93261 9.15184C6.05761 9.02684 6.21832 8.97327 6.3969 8.97327Z" fill="black" fill-opacity="0.27"/>
      <path d="M6.50007 12.4163C3.50853 12.4163 1.0834 9.99122 1.0834 6.99967C1.0834 4.00813 3.50853 1.58301 6.50007 1.58301C9.49161 1.58301 11.9167 4.00813 11.9167 6.99967C11.9167 9.99122 9.49161 12.4163 6.50007 12.4163ZM11.1042 6.99967C11.1042 4.45686 9.04288 2.39551 6.50007 2.39551C3.95726 2.39551 1.8959 4.45686 1.8959 6.99967C1.8959 9.54249 3.95726 11.6038 6.50007 11.6038C9.04288 11.6038 11.1042 9.54249 11.1042 6.99967Z" fill="black" fill-opacity="0.27"/>
    </svg>
  </span>
</template>

<style scoped>
.mask {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2001;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.modal {
  border-radius: 12px;
  background: var(--light-backgrounds-bg-2, #FFF);
  width: 270px;
  margin-inline: auto;
  margin-top: 50%;
  transform: translateY(25%);
}
.scroll-wrap {
  display: inline-block;
  overflow-y: auto;
  width: 222px;
  margin: 20px 14px;
  padding-inline: 10px;
  max-height: 100px;
}
.scroll-content {
  height: fit-content;
  color: var(--light-labels-paragraph, rgba(0, 0, 0, 0.62));
  font-family: PingFang SC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.line {
  border-top: 1px solid var(--ThemeSeparator,rgba(0,0,0,.08));
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}
.confirm {
  padding-inline: 24px;
  height: 30px;
  line-height: 30px;
  border: none;
  background-color: transparent;
  color: var(--light-primary-primary, #FF2442);
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}
</style>

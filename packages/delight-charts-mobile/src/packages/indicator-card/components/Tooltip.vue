<script setup lang="ts">
import { createPopper, Instance } from '@popperjs/core'
import { onMounted, onUnmounted, ref, watch, Teleport } from 'vue';

const props = withDefaults(
  defineProps<{
    placement: 'top' | 'bottom' | 'left' | 'right';
    tooltip?: string | boolean;
    zIndex?: number;
  }>(), {
    placement: 'top',
    zIndex: 3
  }
)

const templateRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)

const visiable = ref(false)
const popperInstance = ref<Instance | null>(null)

const touchEndHandler = () => {
  visiable.value = false
}

onMounted(() => {
  if(!templateRef.value || !popoverRef.value) return
  popperInstance.value = createPopper(templateRef?.value, popoverRef?.value, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: () => {
            return [0, 8]
          },
        },
      },
    ],
    strategy: 'fixed'
  });

  document.addEventListener('touchend', touchEndHandler)
})

onUnmounted(() => {
  popperInstance.value?.destroy()
  document.removeEventListener('touchend', touchEndHandler)
})

function popperShow() {
    popoverRef.value?.setAttribute('data-show', '');

    popperInstance.value?.setOptions((options = {}) => ({
      ...options,
      modifiers: [
        ...(options?.modifiers || {}),
        { name: 'eventListeners', enabled: true },
      ],
    }));

    popperInstance.value?.update();
  }

  function popperHide() {
    popoverRef.value?.removeAttribute('data-show');

    popperInstance.value?.setOptions((options = {}) => ({
      ...options,
      modifiers: [
        ...(options?.modifiers || {}),
        { name: 'eventListeners', enabled: false },
      ],
    }));
  }

watch(visiable, () => {
  if(!templateRef.value || !popoverRef.value || !popperInstance.value) return
  if(visiable.value) {
    popperShow()
  } else {
    popperHide()
  }
})
</script>

<template>
  <div class="tooltip-container" :style="{zIndex: props.zIndex}">
    <div ref="templateRef" class="tooltip-icon" @touchend.stop.prevent="visiable = !visiable">
      <slot>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
          <path d="M6.55778 3.74994C5.89707 3.74994 5.37921 3.93744 5.00421 4.32137C4.72397 4.60161 4.54845 4.95664 4.47763 5.39019C4.4359 5.64569 4.65158 5.85708 4.91046 5.85708C5.16934 5.85708 5.36898 5.64418 5.42561 5.39157C5.46519 5.21504 5.53008 5.06664 5.62028 4.94637C5.79885 4.68744 6.0935 4.56244 6.49528 4.56244C6.81671 4.56244 7.07564 4.65172 7.25421 4.8303C7.42385 5.00887 7.51314 5.24994 7.51314 5.56244C7.51314 5.79458 7.42385 6.00887 7.26314 6.21422L7.11135 6.38387C6.55778 6.87494 6.2185 7.24101 6.10243 7.49101C5.97743 7.72315 5.92385 8.00887 5.92385 8.33922C5.92385 8.42305 5.99181 8.49101 6.07564 8.49101H6.72743C6.81125 8.49101 6.87921 8.42305 6.87921 8.33922C6.87921 8.12494 6.92385 7.92851 7.02207 7.74994C7.10243 7.58922 7.22743 7.42851 7.39707 7.28565C7.81671 6.91958 8.06671 6.68744 8.14707 6.58922C8.37028 6.30351 8.48635 5.93744 8.48635 5.49994C8.48635 4.96422 8.30778 4.53565 7.95064 4.22315C7.5935 3.90172 7.12921 3.74994 6.55778 3.74994Z" fill="black" fill-opacity="0.27"/>
          <path d="M6.3969 8.97327C6.5844 8.97327 6.74511 9.02684 6.87011 9.15184C6.99511 9.26791 7.05761 9.41969 7.05761 9.60719C7.05761 9.79469 6.98618 9.94648 6.86118 10.0715C6.73618 10.1876 6.57547 10.2501 6.3969 10.2501C6.21832 10.2501 6.05761 10.1876 5.93261 10.0626C5.80761 9.93755 5.74511 9.78577 5.74511 9.60719C5.74511 9.41969 5.80761 9.26791 5.93261 9.15184C6.05761 9.02684 6.21832 8.97327 6.3969 8.97327Z" fill="black" fill-opacity="0.27"/>
          <path d="M6.50007 12.4163C3.50853 12.4163 1.0834 9.99122 1.0834 6.99967C1.0834 4.00813 3.50853 1.58301 6.50007 1.58301C9.49161 1.58301 11.9167 4.00813 11.9167 6.99967C11.9167 9.99122 9.49161 12.4163 6.50007 12.4163ZM11.1042 6.99967C11.1042 4.45686 9.04288 2.39551 6.50007 2.39551C3.95726 2.39551 1.8959 4.45686 1.8959 6.99967C1.8959 9.54249 3.95726 11.6038 6.50007 11.6038C9.04288 11.6038 11.1042 9.54249 11.1042 6.99967Z" fill="black" fill-opacity="0.27"/>
        </svg>
      </slot>
    </div>
    <div ref="popoverRef" :class="['tooltip', visiable ? '' : 'tooltip-hidden']">
        <slot name="tooltip">
          {{ props.tooltip }}
        </slot>
        <div class="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-container {
  height: 100%;
}
.tooltip-icon {
  display: flex;
  align-items: center;
  height: 100%;
}
.tooltip-icon svg {
  vertical-align: text-top;
}
.tooltip {
  height: fit-content;
  background-color: #333;
  color: white;
  max-width: 240px;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 13px;
}
.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.arrow {
  visibility: hidden;
}

.arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}
.tooltip[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}
.tooltip[data-popper-placement^='top'] > .arrow::before {
  border-bottom-right-radius: 3px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}
.tooltip[data-popper-placement^='bottom'] > .arrow::before {
  border-top-left-radius: 3px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
  right: -4px;
}
.tooltip[data-popper-placement^='left'] > .arrow::before {
  border-top-right-radius: 3px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
  left: -4px;
}
.tooltip[data-popper-placement^='right'] > .arrow::before {
  border-bottom-left-radius: 3px;
}

.tooltip.tooltip-hidden {
  visibility: hidden;
  pointer-events: none;
}
.tooltip.tooltip-hidden .arrow::before {
  visibility: hidden;
  pointer-events: none;
}
</style>

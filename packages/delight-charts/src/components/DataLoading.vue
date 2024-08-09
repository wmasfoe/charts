<template>
  <div class="delight-charts-component-loading">
    <div class="loader">
      <div class="loading-spinner">
        <svg
          class="circular"
          width="100%"
          height="100%"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 18.75C10 19.4404 9.4382 20.008 8.75323 19.922C7.47815 19.7618 6.24185 19.3567 5.11379 18.725C3.62095 17.8889 2.36759 16.6838 1.4736 15.225C0.579605 13.7661 0.074883 12.1023 0.00770964 10.3926C-0.0594638 8.68292 0.313159 6.9846 1.08993 5.4601C1.86671 3.93559 3.02166 2.63588 4.4443 1.6853C5.86694 0.734726 7.50969 0.16507 9.21541 0.0308267C10.9211 -0.103417 12.6328 0.202243 14.1866 0.918568C15.3607 1.45986 16.4151 2.22196 17.2942 3.15935C17.7665 3.66291 17.6374 4.4511 17.0789 4.85688V4.85688C16.5204 5.26266 15.745 5.12954 15.2522 4.64609C14.6393 4.04479 13.9253 3.55099 13.1399 3.18893C11.9746 2.65168 10.6908 2.42244 9.41156 2.52312C8.13227 2.6238 6.9002 3.05104 5.83322 3.76398C4.76624 4.47691 3.90003 5.45169 3.31745 6.59507C2.73487 7.73845 2.4554 9.01219 2.50578 10.2944C2.55616 11.5767 2.9347 12.8246 3.6052 13.9187C4.27569 15.0129 5.21571 15.9167 6.33534 16.5437C7.0899 16.9663 7.90902 17.2536 8.75576 17.3961C9.43655 17.5106 10 18.0596 10 18.75V18.75Z"
            fill="#3c66ff"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
.delight-charts-component-loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 99;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
}

.delight-charts-mask-status {
  filter: blur(1px);
}

.delight-charts-component-loading .circular {
  width: 22px;
  height: 22px;
  animation: loading-rotate 1s linear infinite;
}

.delight-charts-component-loading .path {
  animation: loading-dash 1s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #3C66FF;
  stroke-linecap: round;
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>

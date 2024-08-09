<template>
  <Bubble
    :chartData="chartData"
    :isLoading="isLoading"
    :metrics="['rate', 'tgi', 'brandNum']"
    :dimensions="['preferenceType']"
    :chart-config="bubbleChartConfig"
  />
</template>

<script setup lang="ts">
import Bubble from '../../src/packages/bubble/Bubble.vue';
import { ref, reactive, computed } from 'vue';

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 2000);

const chartData = ref([
  {
    preferenceType: "美食",
    rate: "54.33",
    tgi: "22.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "生活记录",
    rate: "98",
    tgi: "10",
    brandNum: 20,
  },
  {
   
    preferenceType: "旅游",
    rate: "42.49",
    tgi: "50",
    brandNum: 1000,  
  },
  {
    preferenceType: "潮流",
    rate: "42.47",
    tgi: "105.00",
    brandNum: 10,
  },
  {
   
    preferenceType: "情感",
    rate: "41.40",
    tgi: "20",
    brandNum: 300,
  },
  {
   
    preferenceType: "科技数码",
    rate: "90",
    tgi: "91.00",
    brandNum: 500,
  },
  {
   
    preferenceType: "教育",
    rate: "70",
    tgi: "58.00",
    brandNum: 80,
  },
  {
   
    preferenceType: "影视",
    rate: "10.62",
    tgi: "78.00",
    brandNum: 100,
  },
  {
   
    preferenceType: "职场",
    rate: "5.61",
    tgi: "83.00",
    brandNum: 480,
  },
  {
   
    preferenceType: "汽车",
    rate: "37.37",
    tgi: "110.00",
    brandNum: 810,
  },
  {
   
    preferenceType: "兴趣爱好",
    rate: "75.75",
    tgi: "73.00",
    brandNum: 330,
  },
  {
   
    preferenceType: "宠物",
    rate: "80.22",
    tgi: "83.00",
    brandNum: 600,
  },
  {
   
    preferenceType: "摄影",
    rate: "40.15",
    tgi: "75.00",
    brandNum: 420,
  },
  {
   
    preferenceType: "时尚",
    rate: "2.33",
    tgi: "101.00",
    brandNum: 40,
  },
  {
   
    preferenceType: "健身减肥",
    rate: "26.67",
    tgi: "74.00",
    brandNum: 400,
  },
  {
   
    preferenceType: "人文",
    rate: "6.74",
    tgi: "66.00",
    brandNum: 210,
  },
  {
   
    preferenceType: "母婴",
    rate: "24.59",
    tgi: "52.00",
    brandNum: 803,
  },
])

const metricsMaxVal = ref(1000)
const bubbleChartConfig = ref<any>({
  // 自定义缩放按钮
  dragZoom: {
    show: false,
  },
  revertable: false,
  labelMap: {
    rate: '占比',
    tgi: 'TGI',
  },
  legend: {
    show: false,
  },
  // tooltip: [
  //   // 格式化配置项，index 和传入的 metrics 对应
  //   {
  //     valueType: 'currency',
  //     digit: 2,
  //     unit: true,
  //   },
  //   {
  //     valueType: 'percent',
  //     digit: 1,
  //   },
  //   {
  //     valueType: 'normal',
  //     digit: 0,
  //     unit: '个',
  //   },
  // ],
  tooltipVisible: true,
  titleVisible: true,
  xAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  yAxis: {
    type: 'value',
    splitLine:{
      show:false
    },
  },
  canClick: true,
  symbolZoomConfig: {
    symbolZoomMax: 1000,
  },
  seriesConfig: {
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 1,
    },
    labelLayout: {
      hideOverlap: false,
    },
  },
  select: {
    symbol: 'image://data:application/octet-stream;base64,UklGRngEAABXRUJQVlA4TGsEAAAvbUAbEKehqG0jKcMfcDOvvReDmbZtMv50m72ZfwNp28S/2fcKprZtG8Y9W+4ARgcCgUDgwb55HlGnEBGF8CGUAT0GcNyXg4i0DPAhCiIOBZIEgG3bhtRoolFF8d7KsB3FrdyYwv8flxogCSD3iP5LlGy3bhtc3CEFgVCSlm98geHFrK2LhzRN7DeSNMuLejIzOrFoq8wGIq8mC2Uy/53bSOTNXE/7JrcsyFoVhmmRWD4Uc/FabpmRT+Vr7BUxh0Vhg7DcHLq30zfeut1mqSjMUxLg2/XDCB6MQ39YWS/SRqCv+VvtegfBuPU7f2Uua931I0TCXXzNE1bjovLVBmDB0FkaFaObZ2jsHLDBdSJes5T2uAErXMevMzLGegB20J9LZgzybCm8jiCA8dVSeI6nxyqEYcWnMzKmAzG4jSUQ93KeUG4giiNPgzn1oSOAsLJ8h+IFxPFBze6LUKlIKsAlejR7slg+AHRpExghoIWaBkmQT6qOAMT4ksfYNqAIW8IU/q210yRuhU3egMTaZwBVGIg1kq/0Dl0Kfaa05Ng2apNxFdRk6hlOlJqmIWUHCrHFRch7p1FuAUVBlCrR4SABpU5x3r7e0qXm1829ZL4BRW+Q3PO8BtBezP9Lo6SPj19f4dIjqelO7mTlcxkzkYzk4wKvJGV5RuNt7ON34wmSXgGt/RP72BpTIvmngfYU29VL4s1aBe1fCMUSLTKNsfeyl2V8331Bwxix4+hV0MUHnWHPQTVhwI41klELY3t6/YjOYNQw1rFALTfKCZt7+ZWhEUw54YC2dSnDnHrttm+OjdGh0uRe3mL/cGsnTHhDHT12rANw+BeRJZzsPeKlJ36VKGoS6peJoCYZyF8nmKzC4HIkf6EI8rkQgZg0gmyBUjzRcSkDI9co2QMeMdk0gjwjZk7MBnwaQZ7ZgJjp2HQZQ5aZriVmcS6VIVyRTPhWKEceMqxQTMK2sTpKEg5IiJ3VEhhUkLAitgQl4/bjKMcbtWpuOZeWR7Fzqh57UrudLfDp2oltHBfkTm5k0x0/Hb0prnlX6ePgBM9jG3oHvgW1WFE7cPJx4BWJASwzd9JoLzq8R0XXfIn2UyHPszGPP+TEK+Cg8qa/9DhvNZc5fQqrN8iFOGL+cSfMQcW7Nnn3vsdBlJquATcDuK8rvfUIv/xrrMaAm5jbsVyhz9niMu4m7qyGvpu4AJOyu49P8pYxDKXWG9QyOOUjsxifmpiy3HyfxVvw5GTMEi36bqkIXBkLG8mMhS2dsRCHVkM2xnVlCWmN4VP7LpNp8m5JcmfRXASs4Vk0LN+xtmMOeSNj2nRmDJPqyH7K5oYNpfVUrkxxtpZGyZo52iS+HfAl2n3st8FZa3xePmz7r4h/uX6rIMGxSQNOL/b91Z9teO27/wmOgVZu42NoJuUWZ1LugzMpxXJ95zJZotMfmwErFIZRkuKuJl5pMyb/Rk9u9rzJoy31XFvG+aQMfZVkZbswOjGb1EWe4Wz69KGoW+ZsegMA',
    symbolSize(val, { zoom, max, min }) {
      const res = Math.max(Math.min(val / metricsMaxVal.value * 100, 100) * 0.6, 15)
      // return Math.min(Math.max(val, min), max) * 1.1
      // 计算基于最大值的百分比，最大 80% 最小 1%
      return res * 1.2
    },
    itemStyle: {
      color: '#4A7CFF',
      borderWidth: 2,
      borderColor: 'white'
    },
    label: {
      color: '#4A7CFF',
      textBorderWidth: 2,
      textBorderColor: 'white',
      fontSize: 14,
      fontWeight: 500
    },
  },
});
</script>
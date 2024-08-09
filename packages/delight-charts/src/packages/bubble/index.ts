import { DefineComponent } from 'vue';
import { withInstall } from "../../utils/install";
import component from './Bubble.vue';

import type { BubbleType } from '../../const/interface/bubble'

// // 在组件上添加install方法，方便直接使用单个组件
// component.install = (Vue: any) => {
//     Vue.component('Bubble', Bubble)
// }
const Bubble = withInstall((component as unknown as DefineComponent<BubbleType>), 'Bubble');
export { Bubble, Bubble as default };

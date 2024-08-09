import type { DefineComponent } from 'vue'
import { withInstall } from '../../utils/install'
import funnel from './funnel.vue'
import type { FunnelType } from '../../const/interface/funnel'

const component = funnel

const Funnel = withInstall(component as DefineComponent<FunnelType>, 'Funnel')
export { Funnel, Funnel as default }

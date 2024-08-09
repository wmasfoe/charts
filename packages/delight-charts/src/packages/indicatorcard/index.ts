import { DefineComponent } from 'vue'
import { withInstall } from '../../utils/install'
import indicatorcard from './IndicatorCard.vue'

import type { IndicatorType } from '../../const/interface/indicatorcard'

const component = indicatorcard

const IndicatorCard = withInstall(component as DefineComponent<IndicatorType>, 'IndicatorCard')
export { IndicatorCard, IndicatorCard as default }

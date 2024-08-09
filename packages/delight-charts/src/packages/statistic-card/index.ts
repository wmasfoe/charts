import { DefineComponent } from 'vue'
import { withInstall } from '../../utils/install'
import StatisticCardPackages from './StatisticCard.vue'

import type { StatisticCardType } from '../../const/interface/statistic-card'

const component = StatisticCardPackages

const StatisticCard = withInstall(component as DefineComponent<StatisticCardType>, 'StatisticCard')
export { 
  StatisticCard, 
  StatisticCard as default 
}

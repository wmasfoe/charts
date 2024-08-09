import type { DefineComponent } from 'vue-demi'
import { withInstall } from '../../utils/install'
import component from './atlas.vue'
import type { AtlasType } from '../../const/interface/atlas'

const Atlas = withInstall(
  component as unknown as DefineComponent<AtlasType>,
  'Atlas'
)
export { Atlas, Atlas as default }

import { merge } from './merge'
import { DEFAULT_MAP_GEO_CONFIG, DEFAULT_VISUALMAP_CONFIG } from '../const/defaultMapConfig'

export const getGeo = (config = {}, mapType: string) => {
    return merge(DEFAULT_MAP_GEO_CONFIG, { map: mapType || 'china', ...config })
}
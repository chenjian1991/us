import {getApi} from './axios'

import {
   platform
} from './urls'

export const getPlatform = () => {
   return getApi(platform)
}

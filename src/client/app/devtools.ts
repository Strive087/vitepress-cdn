import { setupDevToolsPlugin } from '@vue/devtools-api'
import type { App } from 'vue'
import type { Router } from './router'
import type { VitePressData } from './data'

const COMPONENT_STATE_TYPE = 'vitepress-cdn'

export const setupDevtools = (
  app: App,
  router: Router,
  data: VitePressData
): void => {
  setupDevToolsPlugin(
    {
      // fix recursive reference
      app: app as any,
      id: 'org.vuejs.vitepress-cdn',
      label: 'vitepress-cdn',
      packageName: 'vitepress-cdn',
      homepage: 'https://vitepress.dev',
      componentStateTypes: [COMPONENT_STATE_TYPE]
    },
    (api) => {
      // TODO: remove any
      api.on.inspectComponent((payload: any) => {
        payload.instanceData.state.push({
          type: COMPONENT_STATE_TYPE,
          key: 'route',
          value: router.route,
          editable: false
        })

        payload.instanceData.state.push({
          type: COMPONENT_STATE_TYPE,
          key: 'data',
          value: data,
          editable: false
        })
      })
    }
  )
}

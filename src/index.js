// This is a hook to make webpack package the css for us
import './style.less'

import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import createCerebralMixin from 'cerebral-view-riot'
import riot from 'riot'
import './tags/app.tag'

// Modules
import devtools from 'cerebral-module-devtools'
import dashboard from './modules/dashboard'

// Signals
import goTo from './signals/goTo'

const stateRoot = {
  version: '1.0',
  content: 'overview'
}

const controller = Controller(Model(stateRoot))

controller.addSignals({
  goTo
})

controller.addModules({
  devtools: devtools(),
  dashboard: dashboard()
})

riot.mixin(createCerebralMixin(controller))
riot.mount('app')

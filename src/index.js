// This is a hook to make webpack package the css for us
import './style.less'

import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import createCerebralMixin from 'cerebral-view-riot'
import riot from 'riot'
import './tags/app.tag'

// Modules
import Devtools from 'cerebral-module-devtools'
import Dashboard from './modules/Dashboard'

const stateRoot = {
  version: '1.0'
}

const controller = Controller(Model(stateRoot))
controller.addModules({
  devtools: Devtools(),
  dashboard: Dashboard()
})

riot.mixin(createCerebralMixin(controller))
riot.mount('app')

// This is a hook to make webpack package the css for us
import './style.less'

import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import mixinFactory from 'cerebral-view-riot'
import riot from 'riot'
import './tags/app.tag'
import routes from './routes'

// Modules
import devtools from 'cerebral-module-devtools'
import http from 'cerebral-module-http'
import router from 'cerebral-module-router'
import navi from './modules/navi'
import dashboard from './modules/dashboard'
import dashboardList from './modules/dashboard-list'


const stateRoot = {
  version: '1.0',
  content: 'nothing'
}

const controller = Controller(Model(stateRoot))

controller.addModules({
  devtools: devtools(),
  http: http(),
  navi: navi(routes.config),
  router: router(routes.map),
  dashboardList: dashboardList(),
  dashboard: dashboard()
})

riot.mixin(mixinFactory(controller))
riot.mount('app')

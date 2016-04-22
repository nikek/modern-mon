import dashboardOpened from "./modules/dashboard/signals/dashboardOpened"

const routeConfig = [
  {
    label: 'Overview',
    name: 'overview',
    url: '/',
    signal: ()=>{}
  },{
    label: 'Dashboard',
    name: 'dashboard',
    url: '/dashboard',
    signal: dashboardOpened
  },{
    label: 'Settings',
    name: 'settings',
    url: '/settings',
    signal: ()=>{}
  }
]


/*
  Eg:
  {
    '/': 'default',
    '/things': 'things',
  }
*/
const routeMap = routeConfig.reduce((map, route) => {
  map[route.url] = 'navi.'+route.name
  return map
}, {})


export default {
  config: routeConfig,
  map: routeMap
}

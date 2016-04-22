
const routeConfig = [
  {
    label: 'Overview',
    name: 'overview',
    url: '/'
  },{
    label: 'Dashboard',
    name: 'dashboard',
    url: '/dashboard'
  },{
    label: 'Settings',
    name: 'settings',
    url: '/settings'
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

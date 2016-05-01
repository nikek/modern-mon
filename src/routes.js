import dashboardOpened from "./modules/dashboard/signals/dashboardOpened"

const routeConfig = [
  {
    label: 'Home',
    name: 'overview',
    icon: 'home',
    url: '/',
    signal: ()=>{}
  },{
    label: 'Dashboards',
    name: 'dashboard',
    icon: 'dashboard',
    url: '/dashboard',
    signal: dashboardOpened
  },{
    label: 'Alerts',
    name: 'alert',
    icon: 'bell',
    url: '/alert',
    signal: ()=>{}
  },{
    label: 'Hosts',
    name: 'hosts',
    icon: 'server',
    url: '/Hosts',
    signal: ()=>{}
  },{
    label: 'Oncall',
    name: 'oncall',
    icon: 'contact_phone',
    url: '/oncall',
    signal: ()=>{}
  },{
    label: 'Settings',
    name: 'settings',
    icon: 'settings',
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

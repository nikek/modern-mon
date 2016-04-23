import dashboardOpened from "./modules/dashboard/signals/dashboardOpened"

const routeConfig = [
  {
    label: 'Overview',
    name: 'overview',
    icon: '',
    url: '/',
    signal: ()=>{}
  },{
    label: 'Dashboards',
    name: 'dashboard',
    icon: '',
    url: '/dashboard',
    signal: dashboardOpened
  },{
    label: 'Alerts',
    name: 'alert',
    icon: '',
    url: '/alert',
    signal: ()=>{}
  },{
    label: 'Hosts',
    name: 'Hosts',
    icon: '',
    url: '/Hosts',
    signal: ()=>{}
  },{
    label: 'Oncall',
    name: 'oncall',
    icon: '',
    url: '/oncall',
    signal: ()=>{}
  },{
    label: 'Settings',
    name: 'settings',
    icon: '',
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

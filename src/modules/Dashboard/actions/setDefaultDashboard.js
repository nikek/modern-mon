const tmpConfig = {
  meta: {
    title: 'Awesomeness',
    user: 'nikek',
    createdAt: 'idag'
  },
  globalOptions: {
    range: {
      type: 'relative',
      value: 1,
      unit: 'weeks'
    }
  },
  components: [
    {
      title: 'Memory Usage',
      dataConfig: {

      },
      visOpt: {
        type: 'chart'

      }
    },
    {
      title: 'CPU Usage',
      dataConfig: {
        filter: [
          'and',
          ['=','role','riemann'],
          ['=','host','sto3-riemann-a1.sto3.spotify.net'],
          ['=','what','cpu-usage'],
          ['=','cpu_type','user']
        ],
        aggregators: [{
          type: 'average',
          sampling: { unit: 'hours', value: 1}
        }],
        range: { type: 'relative', unit: 'DAYS', value: 7 }
      },
      visOpt: {
        type: 'chart'

      }
    }
  ]
}

export default function setDefaultDashboard({state}) {
  state.set('dashboard.config', tmpConfig)
}

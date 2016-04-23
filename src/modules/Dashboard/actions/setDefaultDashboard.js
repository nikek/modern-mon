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
      options: { legendVisible: false, stacked: false, valueScale: 'linear', zeroBased: false },
      layout: {
        w: 6,
        h: 4
      }
    },
    {
      title: 'CPU Usage',
      options: {
        type: 'chart',
        axis: true,
        legendVisible: false,
        stacked: false,
        valueScale: 'linear',
        zeroBased: false
      },
      layout: {
        w: 6,
        h: 4
      },
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
      }
    }
  ]
}

export default function setDefaultDashboard({state}) {
  state.set('dashboard.config', tmpConfig)
}

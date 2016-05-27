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
      unit: 'DAYS'
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
          ['=','what','teleported-goats'],
        ],
        aggregation: {
          type: 'average'
        }
      }
    }
  ]
}

export default function setDefaultDashboard({state}) {
  state.set('dashboard.config', tmpConfig)
}

import '../inputs/range-picker.tag'
import rangeOptions from '../../data/input-options/range-options.js'

<global-options>
  <range-picker options="{rangeOptions}" current="{range}" on-pick="{onRangePick}"></range-picker>

  <button onclick="{queryMetrics}">Query</button>

  <script>
    this.rangeOptions = rangeOptions

    this.connectCerebral({
      range: ['dashboard', 'config', 'globalOptions', 'range']
    },{
      queryMetrics: ['dashboard', 'queryMetrics'],
      setRange: ['dashboard', 'setRange']
    })

    this.onRangePick = (range) => {
      this.setRange({range});
    }.bind(this)
  </script>
  <style scoped>
    :scope { display: block; }
  </style>
</global-options>

import '../inputs/range-picker.tag'
import rangeOptions from '../../data/input-options/range-options.js'

<global-options>
  <range-picker options="{rangeOptions}" current="{range}" on-pick="{onRangePick}"></range-picker>

  <script>
    this.rangeOptions = rangeOptions

    this.connectCerebral({
      range: ['dashboard', 'config', 'globalOptions', 'range']
    },{
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

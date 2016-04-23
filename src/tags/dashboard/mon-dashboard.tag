import '../chart/mon-chart.tag'

<mon-dashboard>
  <h2>{config.meta.title}</h2>
  <div class="component-wrapper">
    <article each={c, i in config.components} width="400" height="280">
      <h5>{c.title}</h5>
      <button type="button" name="button" onclick={removeComponent}>Remove</button>
      <mon-chart options={c.options} range={c.data.range} data={c.data.series}></mon-chart>
    </article>
  </div>

  <script>
    this.connectCerebral({
      config: ['dashboard', 'config']
    }, {
      removeComponent: ['dashboard', 'removeComponent']
    })
  </script>
</mon-dashboard>

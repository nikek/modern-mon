import '../chart/mon-chart.tag'

<mon-dashboard>
  <h2>{config.meta.title}</h2>
  <div class="component-wrapper">
    <article class="component" each={c, i in config.components}>
      <div class="title-wrapper">{c.title}</div>
      <div class="button-wrapper">
        <button type="button" name="button" onclick={removeComponent}>
          <svg-symbol link="icon-trash"></svg-symbol>
        </button>
      </div>
      <div class="graph-wrapper">
        <mon-chart options={c.options} range={c.data.range} data={c.data.series}></mon-chart>
      </div>
    </article>
  </div>

  <style scoped>
    :scope { display: block; }
  </style>
  
  <script>
    this.connectCerebral({
      config: ['dashboard', 'config']
    }, {
      removeComponent: ['dashboard', 'removeComponent']
    })
  </script>
</mon-dashboard>

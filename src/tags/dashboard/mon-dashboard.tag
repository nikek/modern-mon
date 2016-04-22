<mon-dashboard>
  <h2>{config.meta.title}</h2>
  <div class="component-wrapper">
    <article each={c, i in config.components}>
      <h5>{c.title}</h5>
      <button type="button" name="button" onclick={removeComponent}>Remove</button>
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

<mon-dashboard>
  <h2>{config.meta.title}</h2>
  <div class="component-wrapper">
    <article each={config.components}>
      {title}
    </article>
  </div>

  <script>
    this.connectCerebral({ config: ['dashboard', 'config'] })
  </script>
</mon-dashboard>

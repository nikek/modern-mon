<mon-overview>
  <h2>Home of nikek</h2>
  <div class="flex-container">
    <div class="flex1">
      <h3>Dashboards</h3>
      <ul>
        <li each={dash in dashboards}>
          <span class="reorder-handle">...</span>
          <span class="stats">&#9734;</span>
          <span class="title">{dash.title}</span>
        </li>
      </ul>
    </div>
    <div class="flex1">
      <h3>Alerts</h3>
      <ul>
        <li each="lert in alerts">
          <span class="reorder-handle">...</span>
          <span class="stats">&#9734;</span>
        </li>
      </ul>
    </div>
  </div>

  <style scoped>
    :scope { display: block; }
    .flex-container { display: flex; }
    .flex1 { flex: 1; }
  </style>

  <script>
    this.dashboards = [
      { title: 'Heroic Slowness' },
      { title: 'Heroic Slowness' },
      { title: 'Heroic Slowness' },
      { title: 'Heroic Slowness' },
      { title: 'Heroic Slowness' },
      { title: 'Heroic Slowness' },
      { title: 'Heroic Slowness' }
    ]
  </script>
</mon-overview>

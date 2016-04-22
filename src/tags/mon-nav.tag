<mon-nav>
  <h1 class="mon-logo">Mon</h1>
  <nav>
    <ul>
      <li each={routes} class={active: active === name}>
        <a href={url} onclick={navi[name]}>{label}</a>
      </li>
    </ul>
  </nav>

  <script>
    this.connectCerebral({
      active: ['content'],
      routes: ['navi', 'routes']
    }, {
      navi: ['navi']
    })
  </script>
</mon-nav>

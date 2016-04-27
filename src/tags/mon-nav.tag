import './svg-symbol.tag'

<mon-nav>
  <h1 class="mon-logo">Mon</h1>
  <ul class="nav-item-list">
    <li each={routes} class="{active: active === name}">
      <a href={url} onclick={navi[name]} class="nav-item">
        <svg-symbol link="icon-{icon}"></svg-symbol>
        <span class="nav-item-label">{label}</span>
      </a>
    </li>
  </ul>

  <style>

    .mon-logo {
      text-transform: lowercase;
      font-family: monospace;
      color: #26C17B;
      font-weight: 400;
      font-size: 10px;
      margin: 0 auto;
      text-align: center;
      width: 100%;

      background-color: currentColor;
    }

    .nav-item-list {
      display: block;
      width: 100%;
      padding: 0;
      list-style: none;
      text-align: center;
    }

    .nav-item-label {
      text-transform: uppercase;
      font-weight: 500;
      font-size: 11px;
      opacity: 0;
      transition: all 150ms;
      display: block;
      position: absolute;
      transform: translate(30px, -23px);
      pointer-events: none;
    }

    .icon {
      width: 24px;
      height: 24px;
      margin-bottom: 1px;
    }

    .nav-item {
      color: #888;
      text-decoration: none;
    }
    .nav-item:hover { color: #ddd; }

    .active .nav-item { color: #26C17B; }
    .active .nav-item:hover { color: #26C17B; }


    .nav-item-list li + li {
      margin: 13px 0 0 0;
    }

    .nav-item .nav-item-label {
      vertical-align: top;
    }
  </style>

  <script>
    this.connectCerebral({
      active: ['content'],
      routes: ['navi', 'routes']
    }, {
      navi: ['navi']
    })
  </script>
</mon-nav>

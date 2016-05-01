import './svg-symbol.tag'

<mon-nav class="vertical">
  <a each={routes}
    class="{active: active === name} nav-item"
    href={url}
    onclick={navi[name]}>
    <svg-symbol link="icon-{icon}"></svg-symbol>
    <span class="nav-item-label">{label}</span>
  </a>

  <style scoped type="less">
    @import './src/style';

    :scope {
      position: relative;
      width: 40px;
      height: 100vh;

      display: flex;
      flex-direction: column;
      text-align: center;

      background-color: @c-grayDarkest;
      z-index: 10;

      border-top: 3px solid @c-primary;
    }

    .nav-item {
      margin-top: 15px;
      color: #888;
      text-decoration: none;
      position: relative;
    }
    .nav-item:hover { color: #ddd; }

    .nav-item.active { color: @c-primary; }
    .nav-item.active:hover { color: @c-primary; }

    .nav-item-label {
      text-transform: uppercase;
      font-weight: 500;
      font-size: 11px;
      line-height: 11px;
      height: 11px;
      opacity: 0;
      transition: opacity 150ms, transform 150ms;
      display: block;
      position: absolute;
      top: 7px;
      transform: translateX(50px);
      transform-origin: center;
      pointer-events: none;
    }

    .global-info .nav-item:hover .nav-item-label {
      opacity: 1;
      transform: translateX(40px);
    }

    .icon {
      width: 24px;
      height: 24px;
      margin-bottom: 1px;
    }

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

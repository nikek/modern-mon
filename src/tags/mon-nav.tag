<mon-nav>
  <h1 class="mon-logo">Mon</h1>
  <nav>
    <ul>
      <li class={active: active === 'overview'}><a href="#" name="overview" onclick={navigate}>Overview</a></li>
      <li class={active: active === 'dashboard'}><a href="#" name="dashboard" onclick={navigate}>Dashboard</a></li>
      <li class={active: active === 'settings'}><a href="#" name="settings" onclick={navigate}>Settings</a></li>
    </ul>
  </nav>

  <script>
    this.connectCerebral({
      active: ['content']
    }, {
      goTo: ['goTo']
    })

    this.navigate = (e) => this.goTo({content: e.target.name})
  </script>
</mon-nav>

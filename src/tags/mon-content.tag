import './overview/mon-overview.tag'
import './dashboard/mon-dashboard.tag'
import './settings/mon-settings.tag'

<mon-content>
  <mon-overview if={content === 'overview'}></mon-overview>
  <mon-dashboard if={content === 'dashboard'}></mon-dashboard>
  <mon-settings if={content === 'settings'}></mon-settings>

  <script>
    this.connectCerebral({content: ['content']})
  </script>
</mon-content>

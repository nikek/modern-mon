import './overview/mon-overview.tag'
import './dashboard/mon-dashboard.tag'
//import './alerts/mon-alerts.tag'
//import './hosts/mon-hosts.tag'
import './oncall/mon-oncall.tag'
import './settings/mon-settings.tag'

<mon-content>
  <mon-overview if={content === 'overview'}></mon-overview>
  <mon-dashboard if={content === 'dashboard'}></mon-dashboard>
  <mon-alerts if={content === 'alerts'}></mon-alerts>
  <mon-hosts if={content === 'hosts'}></mon-hosts>
  <mon-oncall if={content === 'oncall'}></mon-oncall>
  <mon-settings if={content === 'settings'}></mon-settings>

  <script>
    this.connectCerebral({content: ['content']})
  </script>
</mon-content>

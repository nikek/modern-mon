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

  <style scoped type="less">
    @import './src/style';

    :scope {
      display: block;
      flex: 1;
      padding: 10px;
      transition: all 150ms;
    }
  </style>

  <script>
    this.connectCerebral({content: ['content']})
  </script>
</mon-content>

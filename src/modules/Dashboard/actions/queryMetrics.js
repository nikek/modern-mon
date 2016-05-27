export default function queryMetrics({state, input, output, services}) {
  const query = Object.assign({}, state.get('dashboard.config.components.1.dataConfig'))

  query.range = query.range || state.get('dashboard.config.globalOptions.range')

  services.http.post('/heroic/metrics', query)
    .then(output.success)
    .catch(output.error)
}

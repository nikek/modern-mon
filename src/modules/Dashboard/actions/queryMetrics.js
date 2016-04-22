export default function queryMetrics({state, input, output, services}) {
  const query = state.get('dashboard.config.components.1.dataConfig')

  services.http.post('/heroic/metrics', query)
    .then(output.success)
    .catch(output.error)
}

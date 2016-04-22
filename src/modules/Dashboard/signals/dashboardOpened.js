import setDefaultDashboard from '../actions/setDefaultDashboard'
import queryMetrics from '../actions/queryMetrics'
import mergeData from '../actions/mergeData'

export default [
  setDefaultDashboard,
  [queryMetrics, {
    success: [mergeData],
    error: [({input}) => {console.log('error', input)}]
  }]
]

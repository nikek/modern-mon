import sendQueryRequest from '../actions/sendQueryRequest'
import mergeData from '../actions/mergeData'

export default [sendQueryRequest, {
  success: [mergeData],
  error: [({input}) => {console.log('error', input)}]
}]

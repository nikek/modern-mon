import queryMetrics from './signals/queryMetrics'
import removeComponent from './signals/removeComponent'
import setRange from './signals/setRange'

export default (options = {}) => {
  return (module, controller) => {

    module.addState({
      config: {}
    })

    module.addSignals({
      queryMetrics: [queryMetrics],
      removeComponent,
      setRange
    })

  }
}

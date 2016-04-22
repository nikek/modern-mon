import removeComponent from './signals/removeComponent'

export default (options = {}) => {
  return (module, controller) => {

    module.addState({
      config: {}
    })

    module.addSignals({
      removeComponent
    })

  }
}

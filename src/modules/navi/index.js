function makeRouteSignals(routes) {
  return routes.reduce((signals, route) => {
    signals[route.name] = [function setContent({state}){state.set('content', route.name)}, ...route.signal]
    return signals
  }, {})
}

export default (options = {}) => {
  return (module, controller) => {

    module.addState({
      routes: options
    })

    module.addSignals(makeRouteSignals(options))
  }
}

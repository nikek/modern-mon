function makeRouteSignals(routes) {
  return routes.reduce((signals, route) => {
    signals[route.name] = [({state}) => state.set('content', route.name)]
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

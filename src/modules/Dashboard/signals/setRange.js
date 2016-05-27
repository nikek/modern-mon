export function setRange({input, state}) {

  // validate input
  if(!input.range) {
    // Error handling
  }

  // normalize
  input.range.unit = input.range.unit.toLowerCase()

  // update state
  state.set('dashboard.config.globalOptions.range', input.range);
}

export default [setRange]

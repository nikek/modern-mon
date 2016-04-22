function removeComponent({input, state}) {
  state.unset(`dashboard.config.components.${input.item.i}`)
}

export default [removeComponent]

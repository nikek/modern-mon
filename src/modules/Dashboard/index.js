export default (options = {}) => {
  return (module, controller) => {

    module.addState({
      content: 'CONTENT!'
    })

  }
}

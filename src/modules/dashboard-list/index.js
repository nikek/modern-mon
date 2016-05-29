export default (options = {}) => {
  return (module, controller) => {

    module.addState({
      list: [
        {id:'system-metrics',title:'System metrics'},
        {id:'awesome',title:'A more awesome dashboard'},
        {id:'43214321-234321432-43214321-43214',title:'The epic metrics'},
        {id:'bla_12',title:'My service overview'},
      ]
    })

  }
}

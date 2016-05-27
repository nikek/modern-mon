import expect from 'expect'
import {removeComponent} from './signals/removeComponent'
import {setRange} from './signals/setRange'

describe('dashboard', function(){
  it('#removeComponent should unset correct path', function(){
    const state = { unset: function() {} }
    const input = { item: { i: 5 } }
    const stateUnsetSpy = expect.spyOn(state, 'unset')

    removeComponent({state, input});

    expect(stateUnsetSpy)
      .toHaveBeenCalledWith('dashboard.config.components.5')
  })


  it('#setRange should set correct range', function(){
    const state = { set: function() {} }
    const input = { range: { type: 'relative', value: 1, unit: 'days' }}
    const stateSetSpy = expect.spyOn(state, 'set')

    setRange({state, input});

    expect(stateSetSpy)
      .toHaveBeenCalledWith('dashboard.config.globalOptions.range', { type: 'relative', value: 1, unit: 'days' })
  })

})

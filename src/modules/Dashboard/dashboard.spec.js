import expect from 'expect'
import {removeComponent} from './signals/removeComponent'

describe('dashboard', function(){
  it('#removeComponent should unset correct path', function(){
    const state = { unset: function() {} }
    const input = { item: { i: 5 } }
    const stateUnsetSpy = expect.spyOn(state, 'unset')

    removeComponent({state, input});

    expect(stateUnsetSpy).toHaveBeenCalledWith('dashboard.config.components.5')
  })
})

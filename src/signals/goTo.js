function goTo({state, input}) {
  state.merge({ content: input.content || 'overview' });
}

export default [goTo]

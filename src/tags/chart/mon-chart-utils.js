function checkIfEmpty(series) {
  for(let s of series) {
    if(!s.dataPoints.length) return false
  }
  return true
}

export default {
  checkIfEmpty
}

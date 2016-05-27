function checkIfEmpty(series) {
  for(var i=0, len=series.length; i<len; i++) {
    if(series[i].dataPoints.length) return false
  }
  return true
}

export default {
  checkIfEmpty
}

export default function setupDots(ctrl) {
  var config = {
    radius: 4
  };

  var group = ctrl.plane.append("g");

  var filter = function(series) {
    var length = series.dataPoints.length;

    return function(d, i){
      // no dot for null values
      if (d.y === null)
        return false;

      // if last or first datapoint -> dot
      if (i === 0 || i === length - 1)
        return true;

      // if before or after is null -> dot
      var prev = series.dataPoints[i-1].x;
      var curr = series.dataPoints[i].x;
      var next = series.dataPoints[i+1].x;

      if (curr - prev > series.cadence || next - curr > series.cadence)
        return true;

      return false;
    };
  };

  ctrl.addRenderer(function() {
    var dotGroups = group.selectAll('.dot-series');
    dotGroups.remove();

    ctrl.series.forEach(function(series, i){
      var dotGroup = group.append('g')
                      .attr('class', 'dot-series')
                      .attr('data-key', function(d, i){ return series.hash; });

      var f = filter(series);

      var dots = dotGroup.selectAll('.dot').data(series.dataPoints.filter(f));

      dots.enter()
        .append("circle");

      dots
        .attr("r", config.radius)
        .attr("cx", function(d) { return ctrl.xScale(d.x); })
        .attr("cy", function(d) { return ctrl.yScale(d.y+d.y0); })
        .attr('class', function() {
          if (!!ctrl.focusing)
            return "dot " + series.color + ' ' + (!!series.focus ? 'focus' : 'unfocus');

          return "dot " + series.color;
        });

      dots.exit().remove();
    });
  });
}

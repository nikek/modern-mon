import d3 from 'd3'

export default function setupThreshold(ctrl){
  var defaultDataPoints = [{x:0, y:0, y0: 0}, {x:0, y:0, y0: 0}];
  var thresholdDataPoints = defaultDataPoints;
  var thresholdVal = null;

  var line = d3.svg.line()
    .x(function(d, i) { return i ? 0 : ctrl.width; })
    .y(function(d) { return ctrl.yScale(d.y); });


  var area = d3.svg.area()
    .x(function(d, i) { return i ? 0 : ctrl.width; })
    .y0(function(d) { return ctrl.yScale(d.y0); })
    .y1(function(d) { return ctrl.yScale(d.y); });


  ctrl.removeThreshold = function(){
    ctrl.threshold = null;
    thresholdDataPoints = defaultDataPoints;
    thresholdVal = null;
  };

  ctrl.updateThreshold = function(threshold){
    ctrl.threshold = threshold;
    thresholdVal = threshold.threshold;
  };

  var drawThreshold = function(){
    if(ctrl.threshold === null) {
      ctrl.plane.selectAll('.threshold').remove();
      ctrl.plane.selectAll('.threshold-area').remove();
      return;
    }

    var newY0;

    if(ctrl.threshold.type === 'above'){
      newY0 = ctrl.yScale.domain()[1] > thresholdVal ? ctrl.yScale.domain()[1] : thresholdVal;
    } else {
      newY0 = ctrl.yScale.domain()[0] < thresholdVal ? ctrl.yScale.domain()[0] : thresholdVal;
    }

    thresholdDataPoints = [
      { x: 0, y: thresholdVal, y0: newY0},
      { x: ctrl.width, y: thresholdVal, y0: newY0}
    ];

    var path = ctrl.plane.selectAll('.threshold').data([thresholdDataPoints]);

    path.enter()
      .append('path')
      .attr('stroke-dasharray', '5, 5')
      .classed('threshold line white', true);

    path
      .attr('d', line);

    path.exit().remove();

    var path2 = ctrl.plane.selectAll('.threshold-area').data([thresholdDataPoints]);

    path2.enter()
      .append('path')
      .attr('fill-opacity', '0.25')
      .classed('threshold-area area white', true);

    path2
      .attr('d', area);

    path2.exit().remove();
  };

  ctrl.addRenderer( drawThreshold );
}

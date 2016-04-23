import d3 from 'd3'

export default function setupAxis(ctrl) {
  var axes = ctrl.plane.append('g').attr('class', 'graph-axes');

  var xAxisFn = d3.svg.axis();
  var yAxisFn = d3.svg.axis();
  var xAxisEl = axes.append('g');
  var yAxisEl = axes.append('g');

  axes.style("display", "none");

  ctrl.addRenderer(function() {
    if (ctrl.isEmpty) {
      axes.style("display", "none");
      return;
    }

    axes.classed('hidden', !ctrl.options.axis);

    var h = ctrl.yScale.range()[0];
    var w = ctrl.xScale.range()[1];

    xAxisFn
      .scale(ctrl.xScale)
      .ticks(Math.round(w / 100))
      .tickSize(h)
      // .tickFormat(function(d){ return ctrl.globalTime.format(d, ctrl.globalTime.timezone); })
      .orient('top');

    yAxisFn
      .scale(ctrl.yScale)
      .ticks(Math.round(h/70))
      .tickSize(w)
      .tickFormat(function(d){ return ctrl.formatValue(d); })
      .orient('left');

    xAxisEl
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxisFn);

    yAxisEl
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + w + ',0)')
      .call(yAxisFn);

    xAxisEl.attr('transform', 'translate(0,' + h + ')')
      .call(xAxisFn.scale(ctrl.xScale))
      .selectAll('text')
        .attr('fill', 'white')
        .attr('font-family',"sans-serif")
        .attr('font-size', '12px')
        .attr('y', function(){ return 17;});

    xAxisEl.selectAll('line')
      .attr('stroke', 'white')
      .attr('opacity', .12);

    yAxisEl.attr('transform', 'translate(' + w + ',0)')
      .call(yAxisFn.scale(ctrl.yScale))
      //.call(this.addUnitLabelToMaxTick.bind(this))
      .selectAll('text')
        .style('text-anchor', 'start')
        .attr('fill', 'white')
        .attr('font-family',"sans-serif")
        .attr('font-size', '12px')
        .attr('y', '-8px')
        .attr('x', function(){ return -w * 0.993;});

    yAxisEl.selectAll('line')
      .attr('stroke', 'white')
      .attr('opacity', .12);

    axes.style("display", null);
  });
}

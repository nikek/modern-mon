import d3 from 'd3'

export default function setupSelection(ctrl) {
  var rect = ctrl.plane.append('rect')
    .attr("class", "zoom-rectangle")
    .attr("width", 100)
    .attr("height", 100)
    .style("display", "none");

  var calculate = function(start, now) {
    var x = start[0] < now[0] ? start[0] : now[0];
    var y = start[1] < now[1] ? start[1] : now[1];
    var w = Math.abs(now[0] - start[0]);
    var h = Math.abs(now[1] - start[1]);
    return {x: x, y: y, w: w, h: h};
  };

  var updateVisiblePosition = function(now) {
    if (!start) {
      return;
    }

    var d = calculate(start, now);

    rect
      .attr("x", d.x)
      .attr("y", d.y)
      .attr("width", d.w)
      .attr("height", d.h);
  };

  var start = null;
  var panMode = null;

  var dragListener = d3.behavior.drag()
    .on("dragstart", function(d) {
      ctrl.disableHover();

      panMode = d3.event.sourceEvent.button === 1 || d3.event.sourceEvent.metaKey || d3.event.sourceEvent.ctrlKey;

      if (!!panMode) {
        return;
      }

      rect.style("display", null);
      start = d3.mouse(ctrl.plane[0][0]);
      updateVisiblePosition(start);
      ctrl.render();
    })
    .on("drag", function(d) {
      if (!!panMode) {
        var dx = d3.event.dx;
        var dy = d3.event.dy;
        var x = ctrl.xScale.range();
        var y = ctrl.yScale.range();
        ctrl.xScale.domain([ctrl.xScale.invert(x[0] - dx), ctrl.xScale.invert(x[1] - dx)]);
        ctrl.yScale.domain([ctrl.yScale.invert(y[0] - dy), ctrl.yScale.invert(y[1] - dy)]);
        ctrl.render();
        return;
      }

      updateVisiblePosition(d3.mouse(ctrl.plane[0][0]));
    })
    .on("dragend", function() {
      ctrl.enableHover();

      if (!!panMode) {
        ctrl.render();
        return;
      }

      rect.style("display", "none");

      var m = d3.mouse(ctrl.plane[0][0]);
      var d = calculate(start, m);

      // register a 'click'.
      if (d.w < 2) {
        var r = findClosest(ctrl.series, m[0], m[1], ctrl.xScale, ctrl.yScale);

        // clicked close to a point, focus that series.
        if (r.distance < 20) {
          if (!!ctrl.focusSeries) {
            ctrl.focusSeries(r.series);
          }

          return;
        }

        if (ctrl.domains.length > 0) {
          var domain = ctrl.domains.pop();
          ctrl.xScale.domain(domain.x);
          ctrl.yScale.domain(domain.y);
          ctrl.render();
        } else {
          ctrl.updateRange();
          ctrl.update(ctrl.series);
        }

        ctrl.drawInspect();
        return;
      }

      var x1 = ctrl.xScale.invert(d.x);
      var x2 = ctrl.xScale.invert(d.x + d.w);
      var y1 = ctrl.yScale.invert(d.y + d.h);
      var y2 = ctrl.yScale.invert(d.y);

      ctrl.domains.push({x: ctrl.xScale.domain(), y: ctrl.yScale.domain()});
      ctrl.xScale.domain([x1, x2]);
      ctrl.yScale.domain([y1, y2]);

      ctrl.render();
      ctrl.drawInspect();
    });

  return dragListener;
}

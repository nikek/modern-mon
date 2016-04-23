import d3 from 'd3'

function gapLine() {
  var x = function(d) { return d[0]; },
      y = function(d) { return d[1]; },
      gap = function(d1, d2) { return false; };

  function method(data, cadence) {
    var i = -1,
        n = data.length,
        points = [],
        d1,
        cadence = cadence || Infinity;

    var segments = [];

    function segment(d) {
      if (points.length) {
        segments.push("M", points.join("L"));
        points = [];
      }
    }

    while (++i < n) {
      d1 = data[i];

      points.push([+x.call(this, d1, i), +y.call(this, d1, i)]);

      if ((i + 1) < n && gap(d1, data[i + 1], cadence))
        segment();
    }

    segment();
    return segments.join("");
  }

  method.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return method;
  };

  method.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return method;
  };

  method.gap = function(_) {
    gap = _;
    return method;
  };

  return method;
}


export default function setupLines(ctrl) {
  var lines = ctrl.plane.append("g");

  var line = gapLine()
    .gap(function(a, b, cadence) { return (b.x - a.x) > cadence; })
    .x(function(d) { return Math.floor(ctrl.xScale(d.x)); })
    .y(function(d) { return Math.floor(ctrl.yScale(d.y + d.y0)); });

  var area = d3.svg.area()
    .x(function(d) { return Math.floor(ctrl.xScale(d.x)); })
    .y0(function(d) { return Math.floor(ctrl.yScale(d.min + d.y0)); })
    .y1(function(d) { return Math.floor(ctrl.yScale(d.max + d.y0)); });

  ctrl.addRenderer(function() {
    var series = lines.selectAll('.series').data(ctrl.series);

    series.enter().append('g')
      .attr('class', 'series')
      .attr('data-key', function(d) { return d.hash; });

    series.each(function(d) {
      var s = d3.select(this);

      var data;

      if (d.type === 'spreads') {
        data = [[area, 'fill'], [line, 'default']];
      } else {
        data = [[line, 'default']];
      }

      var paths = s.selectAll('path').data(data, function(c) { return c[1]; });

      paths.enter().append('path');

      paths
        .attr('class', function(c) {
          if (c[1] === 'default') {
            return 'line ' + c[1] + ' ' + d.color + (ctrl.focusing ? ' ' + (!!d.focus ? 'focus' : 'unfocus') : '');
          }

          return 'line ' + c[1] + ' ' + d.color;
        })
        .attr('d', function(c) { return c[0](d.dataPoints, d.cadence); });

      paths.exit().remove();
    });

    series.exit().remove();
  });
}

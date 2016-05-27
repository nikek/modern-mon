import d3 from 'd3'

function valuesForSpreads(series, cb) {
  series.dataPoints.forEach(function(d, i) {
    cb(d, d.y);
    cb(d, d.min, 'min');
    cb(d, d.max, 'max');
  });
}

function valuesForSeries(series, cb) {
  series.dataPoints.forEach(function(d, i) {
    cb(d, d.y);
  });
}

function valuesFor(series) {
  if (series.type === 'spreads') {
    return valuesForSpreads;
  }

  return valuesForSeries;
}

function findClosest(series, mX, mY, scaleX, scaleY) {
  var best = null;
  var bestDiff = null;
  var bestSeries = null;
  var bestKind = null;

  series.forEach(function(s, i) {
    valuesFor(s)(s, function(d, v, kind) {
      // there is no need to sqrt since we are only comparing differences.
      var diff = Math.pow(scaleX(d.x) - mX, 2) + Math.pow(scaleY(v + d.y0) - mY, 2);

      if (best === null || diff <= bestDiff) {
        best = {x: d.x, y: v, y0: d.y0};
        bestDiff = diff;
        bestSeries = s;
        bestKind = kind;
      }
    });
  });

  var shortName = bestSeries.shortName;

  if (!!bestKind) {
    shortName = shortName + " (" + bestKind + ")";
  }

  return {
    d: best,
    distance: Math.round(Math.sqrt(bestDiff)),
    series: {shortName: shortName, hash: bestSeries.hash, color: bestSeries.color}
  };
}

export default function setupHoverInspect(ctrl) {
  var valueDot = ctrl.plane.append('g')
    .attr('fill', 'none')
    .attr("class", "hover-inspect-focus")
    .style("display", "none");

  var nameInspect = ctrl.plane.append('g')
    .attr('fill', 'none')
    .attr("class", "hover-inspect-focus")
    .style("display", "none");

  var nameRect = nameInspect.append("rect")
    .attr("y", -11)
    .style("fill-opacity", ".7");

  var name = nameInspect.append("text")
    .attr("dy", ".35em");

  var circle = valueDot.append("circle")
    .attr("r", 3.5);

  var mouseState = null;

  var debouncedDrawInspect = function() {
    if (!ctrl.events || !mouseState)
      return;

    var m = mouseState;
    mouseState = null;

    var r = findClosest(ctrl.series, m[0], m[1], ctrl.xScale, ctrl.yScale);

    if (!!ctrl.highlightSeries && !!ctrl.hover)
      ctrl.highlightSeries(r.series);

    var d = r.d;
    var series = r.series;

    if(d === null || d.y === null)
      return;

    circle.attr("class", "dot " + series.color);

    nameRect.attr("class", "dot " + series.color);

    name.attr("class", "dot " + series.color);

    var sx = ctrl.xScale(d.x);
    var sy = ctrl.yScale(d.y + d.y0);

    var valLabel = ctrl.formatValue(d.y + d.y0);
    // Add the time series own value.
    if(d.y0 !== 0) valLabel = valLabel + " (" +ctrl.formatValue(d.y)+ ")";

    var nameBB = name.node().getBBox();

    var onRight = sx + nameBB.width + 20 < ctrl.width;
    var onTop = sy - nameBB.height - 20 >= 0;

    var nameX = 4;
    var nameRectX = 0;
    var nameInspectX = onRight ? sx + 10 : sx - nameBB.width - 20;
    var nameInspectY = onTop ? sy - nameBB.height - 10 : sy + nameBB.height + 10;

    valueDot.attr("transform", "translate(" + sx + "," + sy + ")");
    name.text(series.shortName + " " + Date(d.x) + " " + valLabel);  //ctrl.globalTime.format(new Date(d.x), ctrl.globalTime.timezone)

    name
      .attr("x", nameX);

    nameRect
      .attr("width", nameBB.width + 10)
      .attr("height", nameBB.height + 4)
      .attr("rx", 3)
      .attr("ry", 3);

    nameInspect
      .attr("transform", "translate(" + nameInspectX + ", " + nameInspectY + ")");
  };

  var drawInspect = ctrl.drawInspect = function() {
    if (!ctrl.plane)
      return;

    if (ctrl.isEmpty)
      return;

    mouseState = d3.mouse(ctrl.plane[0][0]);
    debouncedDrawInspect();
  };

  ctrl.addRenderer(function() {
    if (!ctrl.hover || ctrl.isEmpty) {
      nameInspect.style("display", "none");
      valueDot.style("display", "none");
      return;
    }

    nameInspect.style("display", null);
    valueDot.style("display", null);
  });

  ctrl.on('mouseover', function() {
    ctrl.enableHover();
  });

  ctrl.on("mouseout", function() {
    // ctrl.highlightSeries(null);
    ctrl.disableHover();
  });

  ctrl.on("mousemove", drawInspect);
}

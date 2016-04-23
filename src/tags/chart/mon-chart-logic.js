import d3 from 'd3'
import _ from 'lodash'
import setupNoData from './layers/noDataLayer'
import setupAxis from './layers/axisLayer'
import setupLines from './layers/lineLayer'
import setupSelection from './layers/selectionLayer'
import setupHoverInspect from './layers/hoverInspectLayer'
import setupDots from './layers/dotLayer'
import setupThreshold from './layers/thresholdLayer'
import setupCursor from './layers/cursorLayer'

function MonChart() {
  this.padding = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30
  };

  this.options = null;
  // group used for rendering things, will be at the bottom.
  this.rendering = null;
  this.overlay = null;

  this.width = null;
  this.height = null;

  this.xScale = d3.time.scale.utc();
  this.yScale = d3.scale.linear();

  // keep the original domain if zoomed in so it can be restored later.
  this.domains = [];

  // is hover checking enabled?
  this.hover = false;

  // should we handle events?
  this.events = true;

  // any registered callbacks.
  this.callbacks = {};

  // any registered renderers.
  this.renderers = [];

  this.series = [];

  this.threshold = null;

  // if a series is being focused.
  this.focusing = false;

  this.focusSeries = null;
  this.highlightSeries = null;

  this.isEmpty = true;
}

/**
 * Hook the controller up to an SVG context and populate it.
 */
MonChart.prototype.configure = function(elem) {

  this.svg = d3.select(elem).append('svg');
  this.plane = this.svg
    .append('g').attr('fill', 'none')
    .attr('transform', 'translate(' + this.padding.left + ',' + this.padding.top + ')');



  setupLines(this);
  setupDots(this);
  setupAxis(this);
  // setupThreshold(this);
  // setupHoverInspect(this);
  // setupCursor(this);
  setupNoData(this);

  // var listener = setupSelection(this);
  //
  // this.overlay = this.svg.append('g').append("rect").attr('fill', 'none')
  //   .attr("class", "overlay");
  //
  // this.overlay.on("mouseover",  this.trigger('mouseover'));
  // this.overlay.on("mouseout", this.trigger('mouseout'));
  // this.overlay.on("mousemove", this.trigger('mousemove'));
  // this.overlay.on("keydown", this.trigger('keydown'));
  //
  // this.overlay.call(listener);

  this.addRenderer(function() {
    // adapt the size of the overlay for every rendering.
    this.overlay
      .attr("width", this.width+this.padding.left+this.padding.right)
      .attr("height", this.height+this.padding.top+this.padding.bottom);
  });

  this.render();
};

MonChart.prototype.updateOptions = function(options) {
  this.options = options;
  this.yScale.domain(this.calculateYDomain()); // update zeroBased
  this.render();
};

MonChart.prototype.setupScaleRanges = function(){
  this.xScale.range([0, this.width]);
  this.yScale.range([this.height, 3]);
};

MonChart.prototype.setupValueScale = function(){

  switch (this.options && this.options.valueScale || 'linear') {
    case 'log':
      this.yScale = d3.scale.log();
      break;
    case 'powOneThird':
      this.yScale = d3.scale.pow().exponent(.33333);
      break;
    default:
      this.yScale = d3.scale.linear();
  }

  this.yScale.domain(this.calculateYDomain());
  this.setupScaleRanges();
};

// TODO: Make generic for ms and any other time unit.
MonChart.prototype.formatValue = function(val) {
  if (!this.options) {
    throw new Error("options has not been set");
  }

  if(this.options.unit === '%'){
    val *= 100;
    return (this.options.round ? d3.round(val, 2) : val) +' %';
  }

  if (this.options.unit === 'si') {
    var prefix = d3.formatPrefix(val);
    val = prefix.scale(val);
    val = this.options.round ? d3.round(val, 2) : val;
    val += prefix.symbol ? ' ' + prefix.symbol : '';
    return  val;
  }

  // if (this.options.unit === 's') {
  //   var hrs = Math.floor(val / 3600);
  //   var mins = Math.floor((val % 3600) / 60);
  //   var secs = this.options.round ? d3.round(val % 60, 2) : val % 60;

  //   val = secs + 's';

  //   if (mins > 0) {
  //     val = mins + 'm ' + val;
  //   }

  //   if (hrs > 0) {
  //     val = hrs + 'h ' + val;
  //   }

  //   return val;
  // }

  // if (this.options.unit === 'ns') {
  //   val = val / 1000000;
  //   val = val.toFixed(6) + 'ms'
  //   return val;
  // }

  if (['ns', 'µs', 'ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'].indexOf(this.options.unit) !== -1) {
    // return this.humanize(val, this.options.unit, this.options.round);
  }


  return this.options.round ? roundify(val) : val;
};

var roundify = function(val) {
  var r = val >= 10 ? d3.format('.4r')(val) : d3.format('.3r')(val);
  r = parseFloat(r).toString(); // trim ending zeros
  return r;
};

MonChart.prototype.updateRange = function() {
  if (this.range.start !== null && this.range.end !== null){
    this.xScale.domain([
      this.range.start,
      this.range.end
    ]);
  } else {
    this.xScale.domain([null, null]);
  }

  this.render();
};

// Add a render function that will be called every time the data source
// changes.
MonChart.prototype.addRenderer = function(r){ this.renderers.push(r.bind(this)); };

/**
 * Disable handling of events.
 */
MonChart.prototype.disableEvents = function() {
  this.events = false;
};

/**
 * Enable handling of events.
 */
MonChart.prototype.enableEvents = function() {
  this.events = true;
};

MonChart.prototype.disableHover = function() {
  this.hover = false;
  this.render();
};

MonChart.prototype.enableHover = function() {
  this.hover = true;
  this.render();
};

// Calculate y-axis domain.
MonChart.prototype.calculateYDomain = function(inputDomain){
  var yMin = d3.min(this.series, function(d) {
    return d3.min(d.dataPoints, function(d) {
      return (d.min || d.y) + d.y0;
    });
  });

  var yMax = d3.max(this.series, function(d) {
    return d3.max(d.dataPoints, function(d) {
      return (d.max || d.y) + d.y0;
    });
  });

  if (this.threshold && typeof this.threshold.threshold === 'number'){
    yMin = d3.min([yMin, this.threshold.threshold]);
    yMax = d3.max([yMax, this.threshold.threshold]);
  }

  if (yMin > 0 && this.options.zeroBased && this.options.valueScale !== 'log') {
    yMin = 0;
  }

  if (yMin < 0 && yMax < 0 && this.options.zeroBased && this.options.valueScale !== 'log') {
    yMax = 0;
  }

  return [yMin, yMax];
};

MonChart.prototype.updateDimensions = function(width, height) {
  this.width = Math.max(width - (this.padding.left + this.padding.right), 20);
  this.height = Math.max(height - (this.padding.top + this.padding.bottom), 20);
};

MonChart.prototype.on = function(name, cb) {
  var c = this.callbacks[name];

  if (!c) {
    c = [];
    this.callbacks[name] = c;
  }

  c.push(cb.bind(this));
};

MonChart.prototype.trigger = function(name) {
  var that = this;

  return function() {
    var c = that.callbacks[name];

    if (!c) {
      return false;
    }

    var owner = this;

    c.forEach(function(cb) { cb(owner); });
    return false;
  };
};

const utils = {}
utils.checkIfEmpty = function(series) {
  var s = series.filter((s) => s.dataPoints.length)
  return !s.length
};

MonChart.prototype.update = function(series) {
  this.series = series;

  // restore any zoomed in state.
  if (this.domains.length > 0) {
    this.xScale.domain(this.domains[0].x);
    this.yScale.domain(this.domains[0].y);
    this.domains = [];
  }

  this.yScale.domain(this.calculateYDomain());
  this.isEmpty = utils.checkIfEmpty(series);
  this.render();
};

MonChart.prototype.fireRenderers = function() {
  this.renderers.forEach(function(r, i) {
    try {
      r();
    } catch(e) {
      console.error('Failed to render canvas component #' + i, e);
    }
  });
};

MonChart.prototype.render = function() {
  if (this.width === null || this.height === null) {
    return;
  }

  if (!this.plane) {
    throw new Error("Attempted render without a plane");
  }

  this.setupScaleRanges();
  this.fireRenderers();
};

export default MonChart;

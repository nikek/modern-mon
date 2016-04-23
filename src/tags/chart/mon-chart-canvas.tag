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

<mon-chart-canvas>


  <script>








function StGraphCanvasCtrl() {
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
StGraphCanvasCtrl.prototype.configure = function(svg) {
  if (!!this.plane)
    throw new Error("Controller has already been configured");

  this.svg = svg;
  this.bg = this.svg.append('rect').attr('fill', '#282829')
    .attr("width", this.width+this.padding.left+this.padding.right)
    .attr("height", this.height+this.padding.top+this.padding.bottom);
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
    this.bg
      .attr("width", this.width+this.padding.left+this.padding.right)
      .attr("height", this.height+this.padding.top+this.padding.bottom);
  });

  this.render();
};

StGraphCanvasCtrl.prototype.updateOptions = function(options) {
  this.options = options;
  this.yScale.domain(this.calculateYDomain()); // update zeroBased
  this.render();
};

StGraphCanvasCtrl.prototype.setupScaleRanges = function(){
  this.xScale.range([0, this.width]);
  this.yScale.range([this.height, 3]);
};

StGraphCanvasCtrl.prototype.setupValueScale = function(){

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
StGraphCanvasCtrl.prototype.formatValue = function(val) {
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

StGraphCanvasCtrl.prototype.updateRange = function() {
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
StGraphCanvasCtrl.prototype.addRenderer = function(r){ this.renderers.push(r.bind(this)); };

/**
 * Disable handling of events.
 */
StGraphCanvasCtrl.prototype.disableEvents = function() {
  this.events = false;
};

/**
 * Enable handling of events.
 */
StGraphCanvasCtrl.prototype.enableEvents = function() {
  this.events = true;
};

StGraphCanvasCtrl.prototype.disableHover = function() {
  this.hover = false;
  this.render();
};

StGraphCanvasCtrl.prototype.enableHover = function() {
  this.hover = true;
  this.render();
};

// Calculate y-axis domain.
StGraphCanvasCtrl.prototype.calculateYDomain = function(inputDomain){
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

StGraphCanvasCtrl.prototype.updateDimensions = function(width, height) {
  this.width = Math.max(width - (this.padding.left + this.padding.right), 20);
  this.height = Math.max(height - (this.padding.top + this.padding.bottom), 20);
};

StGraphCanvasCtrl.prototype.on = function(name, cb) {
  var c = this.callbacks[name];

  if (!c) {
    c = [];
    this.callbacks[name] = c;
  }

  c.push(cb.bind(this));
};

StGraphCanvasCtrl.prototype.trigger = function(name) {
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

StGraphCanvasCtrl.prototype.checkIfEmpty = function(series) {
  for (var i = 0, l = series.length; i < l; i++) {
    var s = series[i];

    if (s.dataPoints.length > 0)
      return false;
  }

  return true;
};

StGraphCanvasCtrl.prototype.update = function(series) {
  this.series = series;

  // restore any zoomed in state.
  if (this.domains.length > 0) {
    this.xScale.domain(this.domains[0].x);
    this.yScale.domain(this.domains[0].y);
    this.domains = [];
  }

  this.yScale.domain(this.calculateYDomain());
  this.isEmpty = this.checkIfEmpty(series);
  this.render();
};

StGraphCanvasCtrl.prototype.fireRenderers = function() {
  this.renderers.forEach(function(r, i) {
    try {
      r();
    } catch(e) {
      console.error('Failed to render canvas component #' + i, e);
    }
  });
};

StGraphCanvasCtrl.prototype.render = function() {
  if (this.width === null || this.height === null) {
    return;
  }

  if (!this.plane) {
    throw new Error("Attempted render without a plane");
  }

  this.setupScaleRanges();
  this.fireRenderers();
};

// var m = angular.module('alien.graph.canvas', []);
//
// m.directive('graphCanvas', function($window, Tunits){
//   return {
//     restrict: 'AE',
//     require: ['^graph', 'graphCanvas'],
//     controller: StGraphCanvasCtrl,
//     link: function(scope, element, attrs, ctrls) {
      var wrapper = this.root;

      // var stGraph = ctrls[0];

      var ctrl = new StGraphCanvasCtrl()

      // ctrl.focusSeries = function(s) {
      //   stGraph.focusSeries(s);
      // };

      // var highlight;
      //
      // ctrl.highlightSeries = function(s) {
      //   if (s === highlight)
      //     return;
      //
      //   stGraph.highlightSeries(s);
      //   highlight = s;
      // };

      ctrl.lines = {};
      // ctrl.humanize = Tunits.humanize;
      ctrl.configure(
        d3.select(wrapper).append('svg')
      );

      var render = _.debounce(function(retry) {
        var w = wrapper.clientWidth;
        var h = wrapper.clientHeight;

        // Avoiding graph being rendered small by retrying ones.
        if (!w && retry !== 'retry') {
          render('retry');
        } else {
          ctrl.updateDimensions(w, h);
          ctrl.render();
        }
      }, 100);

      // trigger watch on this and child elements.
      // angular.element($window).on('resize', function(){
      //   render();
      // });
      ctrl.updateOptions(opts.options)

      this.on('update', () => {
        if(opts.range){
          ctrl.range = opts.range
          ctrl.updateRange()
        }
        if(opts.data && opts.data.length){
          ctrl.update(opts.data);
        }

      })


      console.log('hej')
      // stGraph.renderer = function(series) {
      //   ctrl.update(series);
      //
      //   if(scope.options.legendVisible) {
      //     render();
      //   }
      // };
      //
      // stGraph.focus = _.debounce(function(s) {
      //   if (!s.visible) {
      //     if (!!ctrl.focusing) {
      //       ctrl.focusing = false;
      //       render();
      //     }
      //
      //     return;
      //   }
      //
      //   ctrl.series.map(function(o) {
      //     o.focus = (s.hash === o.hash);
      //   });
      //
      //   ctrl.focusing = true;
      //   render();
      // }, 10);
      //
      // stGraph.unfocus = _.debounce(function(s) {
      //   ctrl.focusing = false;
      //   render();
      // }, 10);
      //
      // scope.$on('disable-events', function() {
      //   ctrl.disableEvents();
      // });
      //
      // scope.$on('enable-events', function() {
      //   ctrl.enableEvents();
      // });
      //
      // scope.$on('dashboardWidthChanged', render);
      // scope.$on('resize', render);
      // scope.$on('gridster-resized', render);
      // scope.$on('render', render);
      //
      // scope.$watch('options.unit', render);
      // scope.$watch('options', ctrl.updateOptions.bind(ctrl), true);
      // scope.$watch('options.valueScale', function(newVal) {
      //   ctrl.setupValueScale(newVal);
      //   render();
      // });
      //
      // scope.$watch('range', function(range, oldRange) {
      //   if (angular.equals(range, oldRange))
      //     return;
      //
      //   ctrl.range = range;
      //   ctrl.updateRange();
      // }, true);
      //
      // scope.$watch('threshold', function(newVal, oldVal){
      //   if (!newVal || newVal.type === 'missing' || typeof newVal.threshold !== 'number') {
      //     ctrl.removeThreshold();
      //   }
      //   else {
      //     ctrl.updateThreshold(newVal);
      //   }
      //
      //   ctrl.update(ctrl.series);
      // }, true);

      render();


  </script>
</mon-chart-canvas>

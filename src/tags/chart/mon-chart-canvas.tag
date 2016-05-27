import MonChart from './mon-chart-logic'

<mon-chart-canvas>
  <script>
    const elem = this.root;
    const chart = new MonChart()

    chart.configure(elem)
    chart.updateOptions(opts.options)

    this.on('update', () => {
      if(opts.range){
        chart.range = opts.range
        chart.updateRange()
      }
      if(opts.data && opts.data.length){
        chart.update(opts.data);
      }
    })

    function sizeChanged() {
      requestAnimationFrame(() => {
        var w = elem.clientWidth;
        var h = elem.clientHeight;

        chart.updateDimensions(w, h);
        chart.render();
      })
    }

    window.addEventListener('resize', sizeChanged)
    sizeChanged()
  </script>

  <style scoped type="less">


    /// CHART
    // Color mixin
    .graph-color(@name, @color, @fg) {
      .series.@{name} .color-text { color: @color; }
      .series.@{name} .color-border { border-color: @color; }
      .series.@{name} .color-bg { background-color: @color; }
      .line.@{name} { stroke: @color; }
      .fill.@{name} { stroke: darken(@color, 20%); stroke-width: 1; fill: @color; fill-opacity: 0.1; }
      .bg.@{name} { background-color: @color; }
      .text.@{name} { color: @color; }
      .border.@{name} { border-color: @color; }
      .area.@{name} { fill: @color; }
      circle.dot.@{name} { fill: @color; &:hover {stroke: white} }
      rect.dot.@{name} { fill: @color; &:hover {stroke: white} }
      text.dot.@{name} { fill: @fg }
    }

    // Color classes
    // DARK
    .graph-color(e('white'), #fafafa, black);
    .graph-color(e('navy'), #086BFF, white);
    .graph-color(e('blue'), #00BFF1, white);
    .graph-color(e('teal'), #00D8AD, white);
    .graph-color(e('green'), #80E400, black);
    .graph-color(e('forest'), #00B849, white);
    .graph-color(e('yellow'), #DFE000, black);
    .graph-color(e('orange'), #FF9300, black);
    .graph-color(e('red'), #FF1010, white);
    .graph-color(e('pink'), #E90066, white);
    .graph-color(e('purple'), #B934F8, white);


    :scoped {
      display: block;

      box-sizing: border-box;

      width: 100%;
      height: 100%;

      cursor: crosshair;
    }


    g, line {
      fill: none;
    }

    .line {
      fill: none;
      stroke-width: 1.5;

      &.focus {
        stroke-width: 3.0;
      }

      &.unfocus {
        stroke: #999999;
      }
    }

    .dot {
      &.focus {
      }

      &.unfocus {
        fill: #999999;
      }
    }

    .stacked .area {
      opacity: 0.65;
    }


    .axis path,
    .axis line {
      fill: none;
    }

    .y.axis path,
    .x.axis path {
      display: none;
    }

    .y.axis line,
    .x.axis line {
      shape-rendering: crispEdges;
    }

    .zoombar-drag-text {
      font-size: 0.7em;
      text-anchor: middle;
      fill: #585858;
      letter-spacing: 2px;
    }

    .brush .background {
      fill: rgba(255,255,255, 0.1);
    }

    .overlay {
      fill: none;
      pointer-events: all;
    }

    .zoom-rectangle {
      fill: rgba(255,255,255, 0.1);
    }

    .hover-inspect-focus {
      circle {
        stroke: #f0f0f0;
        stroke-width: 1px;
      }

      text {
        fill: #f0f0f0;
      }
    }
  </style>
</mon-chart-canvas>

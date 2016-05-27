import './mon-chart-canvas.tag'

<mon-chart>
  <mon-chart-canvas options={opts.options} range={opts.range} data={opts.data}></mon-chart-canvas>

  <style scoped type="less">
  :scoped {
    display: block;
    height: 100%;
    position: relative;

    border-radius: 0 0 8px 8px;
    background-color: rgba(40,40,40, .7);
  }
  .hidden {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }

  .btn-icon {
    color: white;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  .hideAxes .axis {
    display: none;
    fill: white;
  }

  .graph-header {
    overflow: hidden;
    padding: 10px;

    div.checkbox, div.form-group {
      margin: 0 10px;
    }
  }

  .graph-row {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .zoombar {
    .brush {
      .extent {
        stroke: #fff;
        fill: #fff;
        fill-opacity: .125;
        shape-rendering: crispEdges;
      }

      .resize {
        fill: #fff;
      }
    }
  }

  </style>
</mon-chart>

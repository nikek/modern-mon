<range-picker>
  <svg viewBox="0 0 600 50" preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    <clipPath id="slope-cut"><rect x="0" y="0" width="100%" height="100%" /></clipPath>
    <clipPath id="slope-cut-gray"><rect x="0" y="0" width="100%" height="100%" /></clipPath>
    <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope" clip-path="url(#slope-cut)"></path>
    <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope gray" clip-path="url(#slope-cut-gray)"></path>
  </svg>

  <input type="range">
  <output></output>
  <div class="tick-container"></div>

  <script>
    /*
    Timespan picker
    A range input field for quickly selecting a time range, timespan or duration.
    */

    // Units
    var minutes = 60;
    var hours = 3600;
    var days = 86400;

    // Dataset for timespan picker
    var timespanOptions = [
      { label: "1 year",      seconds: 365*days },
      { label: "6 months",    seconds: 180*days },
      { label: "3 months",    seconds: 90*days },
      { label: "2 months",    seconds: 60*days },
      { label: "1.5 months",  seconds: 45*days },
      { label: "1 month",     seconds: 30*days, tick: true, tickLabel: "mo" },
      { label: "3 weeks",     seconds: 21*days },
      { label: "2 weeks",     seconds: 14*days },
      { label: "10 days",     seconds: 10*days },
      { label: "7 days",      seconds: 7*days, tick: true, tickLabel: "w" },
      { label: "5 days",      seconds: 5*days },
      { label: "3 days",      seconds: 3*days },
      { label: "2 days",      seconds: 2*days },
      { label: "1.5 days",    seconds: 32*hours },
      { label: "1 day",       seconds: 24*hours, tick: true, tickLabel: "d" },
      { label: "18 hours",    seconds: 18*hours },
      { label: "12 hours",    seconds: 12*hours },
      { label: "9 hours",     seconds: 9*hours },
      { label: "6 hours",     seconds: 6*hours },
      { label: "4 hours",     seconds: 4*hours },
      { label: "3 hours",     seconds: 3*hours },
      { label: "2 hours",     seconds: 2*hours },
      { label: "1.5 hours",   seconds: 90*minutes },
      { label: "1 hour",      seconds: 60*minutes, tick: true, tickLabel: "h" },
      { label: "45 min",      seconds: 45*minutes },
      { label: "30 min",      seconds: 30*minutes },
      { label: "20 min",      seconds: 20*minutes },
      { label: "15 min",      seconds: 15*minutes },
      { label: "10 min",      seconds: 10*minutes },
      { label: "5 min",       seconds: 5*minutes },
      { label: "3 min",       seconds: 3*minutes },
      { label: "2 min",       seconds: 2*minutes },
      { label: "1 min",       seconds: 60 },
      { label: "30 sec",      seconds: 30 },
      { label: "15 sec",      seconds: 15 }
    ];

    this.on('mount', function() {

          // Grab our DOM elements
          var output = this.root.querySelector('output');
          var range = this.root.querySelector('input');
          var slopeClipPath = this.root.querySelector('#slope-cut rect');
          var slopeGrayClipPath = this.root.querySelector('#slope-cut-gray rect');
          var tickContainer = this.root.querySelector('.tick-container');


          // Setup defaults
          range.min = 0;
          range.max = timespanOptions.length-1;
          range.value = this.opts.range || timespanOptions.length-22;
          output.value = timespanOptions[range.value].label;


          // Find the ticks in dataset and plot them
          var timespanTicks = timespanOptions
            .filter(function(tso){
              return tso.tick;
            })
            .map(function(tso){
              tso.index = timespanOptions.indexOf(tso);
              return tso;
            })
            .forEach(function(tso){
              var tick = document.createElement('span');
              tick.classList.add('timespan-tick');
              tick.style.width = (tso.index/range.max*100)+"%";
              tick.innerHTML = tso.tickLabel;
              tickContainer.appendChild(tick);
            });



          // Set a new value function
          var setValue = function(value) {
            value = value || range.value;
            var clipPathWidth =  value/range.max*100;
            slopeClipPath.setAttribute('style',
              "-webkit-transform: translateX(" +clipPathWidth+"%); " +
              "transform: translateX(" +clipPathWidth+"%)"
            );
            slopeGrayClipPath.setAttribute('style',
              "-webkit-transform: translateX(" +(clipPathWidth-100)+"%); " +
              "transform: translateX(" +(clipPathWidth-100)+"%)"
            );
            output.value = timespanOptions[value].label;
          };

          // When input range changes: set new value
          range.addEventListener('input', function(e){
            setValue(e.target.valueAsNumber);
          });

          // set initial state
          setValue();
    })
  </script>

  <style scoped type="less">
    @import './src/style';

    @width: 400px;
    @height: 55px;
    @margin: 7px;
    @padding: 5px;

    :scope {
      display: block;
      position: relative;
      width: @width;
      height: @height;
      margin: 10px auto;
      font-weight: 300;
    }

    :scope svg, output, .tick-container {
      position: absolute;
      margin: @margin + @padding;
    }

    :scope {
      @dim: calc(~"100% - "@margin*2 + @padding*2);
      svg, .tick-container {
        width: @dim;
        height: @dim;
      }

      output {
        right: 0;
        font-size: 1.1em;
        text-transform: uppercase;
        color: @c-primary;
      }

      .tick-container {
        opacity: 0;
        transition: opacity 130ms;
      }
      .timespan-tick {
        box-sizing: border-box;
        display: block;
        position: absolute;
        height: 100%;
        width: 100px;
        margin: 0;
        padding: 0;
        border-right: 1px dotted fade(@c-grayLight, 50);
        color: @c-grayLighter;
        text-align: right;
        padding: 0 4px;
      }
    }

    .timeline-slope { fill: @c-primary; }
    .timeline-slope.gray { fill: @c-grayDarker; }

    input[type='range'] {
      -webkit-appearance: none !important;
      background: transparent;
      width: 100%;
      height: 100%;
      position: absolute;
      box-sizing: border-box;
      padding: @padding;
      z-index: 2;
      outline: 1px solid transparent;

      transition: all 130ms;

      &:focus, &:hover {
        ~ .tick-container {
          opacity: 1;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none !important;
      position: relative;
      z-index: 1;
      width: @margin*2;
      height: @margin*2;
      margin-top: @height - @margin*2 - @padding*2 - 3;

      border-radius: 50%;
      background: white;
      box-shadow: 0 0 2px rgba(0,0,0,0.9);
    }
  </style>
</range-picker>

import _ from 'lodash'

<range-picker>
  <!--
  Whenever Firefox can make this work use it..

  <svg viewBox="0 0 600 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    <defs>
      <clipPath id="slope-cut"><rect x="0" y="0" width="600" height="50" style="transform: translateX({ currentWidth }%)"/></clipPath>
      <clipPath id="slope-cut-gray"><rect x="0" y="0" width="600" height="50" style="transform: translateX({ currentWidth-100 }%)"/></clipPath>
    </defs>
    <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope" clip-path="url(#slope-cut)"></path>
    <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope gray" clip-path="url(#slope-cut-gray)"></path>
  </svg>
  -->

  <div class="slope-container">
    <div style="width: { currentWidth }%;">
      <svg viewBox="0 0 600 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
        <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope gray"></path>
      </svg>
    </div>
    <div style="width: { 100-currentWidth }%; right:0;">
      <svg viewBox="0 0 600 50" style="transform: translateX({ -currentWidth }%)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" >
        <path d="M600,50 L600,50 L0,50 L0,0 C30,30 50,47 600,49 Z" class="timeline-slope"></path>
      </svg>
    </div>
  </div>

  <input name="input" type="range" min="0" max="{ inputMax }" value="{ currentIndex }" oninput="{ setValue }">
  <output>{ rangeOptions[currentIndex].label }</output>
  <div class="tick-container">
    <span each="{ tick in ticks }" class="timespan-tick" style="width:{ tick.index/inputMax*100 }%">{tick.tickLabel}</span>
  </div>

  <script>
    this.rangeOptions = opts.options
    this.inputMax = this.rangeOptions.length-1

    // filter out the ticks from all the options
    this.ticks = this.rangeOptions
      .filter(opt => opt.tickLabel)
      .map(tick => {
        tick.index = this.rangeOptions.indexOf(tick)
        return tick
      })

    // Set a new value
    this.setValue = function() {
      opts.onPick(opts.options[this.input.value].content)
    }

    this.on('update', () => {
      this.currentIndex = _.findIndex(this.rangeOptions, ['content', opts.current])
      this.currentWidth = this.currentIndex/this.inputMax*100
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

    :scope .slope-container, output, .tick-container {
      position: absolute;
      margin: @margin + @padding;
    }

    :scope .slope-container div {
      position: absolute;
      overflow: hidden;
      svg {
        width: (@width - @margin*2 - @padding*2);
      }
    }

    :scope {
      @dim: calc(~"100% - "@margin*2 + @padding*2);

      .slope-container, .tick-container {
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


    .range-styles {
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

    input[type='range'] {
      -webkit-appearance: none !important;
      .range-styles();
    }
    input[type='range']::-moz-range-track {
      .range-styles();
    }



    .thumb-styles {
      position: relative;
      z-index: 1;
      width: @margin*2;
      height: @margin*2;
      margin-top: @height - @margin*2 - @padding*2 - 3;

      border-radius: 50%;
      background: white;
      box-shadow: 0 0 2px rgba(0,0,0,0.9);
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none !important;
      .thumb-styles();
    }
    input[type="range"]::-moz-range-thumb {
      .thumb-styles();
      transform: translateY((@height/2 - @margin*2));
    }
  </style>
</range-picker>

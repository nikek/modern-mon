


const colorScheme = ["red", "teal",  "blue", "green",  "yellow", "navy", "forest", "orange", "pink", "purple"]

function fillInTheBlanksOptions(opt) {
  var defaultOptions = {
    stacked: false,
    grid: false,
    axis: true,
    unit: '',
    round: true,
    legendVisible: true
  };

  return Object.assign(defaultOptions, opt);
}
/**
* Function to stack all time series according to their value.
* Note: not using d3.layout.stack because it gives unpredictable ordering in
* our case.
*/
function stackFn(series) {
  // 'stacked' values for each x value.
  var y0vals = {};

  for (var i = series.length - 1; i >= 0; i--) {
    var d = series[i].dataPoints;

    for (var j = 0, jl = d.length; j < jl; j++) {
      var p = d[j];
      var y0 = y0vals[p.x] || 0;
      y0vals[p.x] = y0 + p.y;
      p.y0 = y0;
    }
  }
}
/**
* Function to unstack all time series.
*/
function unstackFn(series) {
  for (var i = 0, l = series.length; i < l; i++) {
    var d = series[i].dataPoints;

    for (var j = 0, jl = d.length; j < jl; j++) {
      d[j].y0 = 0;
    }
  }
}
function formatSeriesToLayout(s, opt) {
  if (opt.stacked === true) {
    this.stackFn(s);
  } else {
    this.unstackFn(s);
  }
}
function fillInTheBlanksSeries(inputSeries) {
  var newSeries = [];

  inputSeries.forEach(function(series, i){
    var formatedSeries = Object.assign({
      visible: true,
      hash: series.hash || i
    }, series);

    newSeries.push(formatedSeries);
  });

  return newSeries;
}
function colorize(series) {
  series.forEach(function (s, i) {
    s.color = colorScheme[i % colorScheme.length];
  })
}
function sorter(a, b) {
  var prop = 'shortName';

  if (a[prop] < b[prop])
    return -1;

  if (a[prop] > b[prop])
    return 1;

  return 0;
}
function sortByName(series) {
  return series.sort(sorter);
}


function seriesTags(source) {
  return function(key, i) {
    var value = source[key];

    if (!value) {
      return 'no value';
    }

    if (value.length === 1) {
      return key + ":" + value;
    }

    return key + ":<" + value.length + ">";
  };
};

// Turn response series together with config into properly fomatted time series.
function formatSeries(series) {
  var dataPoints = series.values.map(function(p) {
    return {x: p[0], y: p[1], y0: 0};
  })
  var keys = Object.keys(series.tags).sort();

  return {
    dataPoints: dataPoints,
    keys: keys,
    hash: series.hash,
    type: series.type,
    tags: series.tags,
    name: keys.map(seriesTags(series.tags)).join(' '),
    countKeys: Object.keys(series.tagCounts).sort(),
    tagCounts: series.tagCounts,
    cadence: series.cadence || Infinity,
    focus: false
  };
};

export default function mergeData({state, input}) {

  var series = input.result.result.map(function(series) {
    return formatSeries(series);
  });


  series = fillInTheBlanksSeries(series, colorScheme);
  sortByName(series);
  colorize(series);


  state.set('dashboard.config.components.1.data', {series, range: input.result.range})
}

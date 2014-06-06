var data = [
  {
    "color_b":"orange",
    "key":"Elixir.Canyons.Testing.run",
    "timings":[11107,11081,11013,11081,11253,11323,10573,11266,11292,10288]
  },
  {
    "color_b":"burlywood",
    "key":"Elixir.Canyons.Testing.run_slow",
    "timings":[31107,31081,31013,31081,31253,31323,30573,31266,31292,30288]
  },
  {
    "color_b":"tomato",
    "key":"Elixir.Canyons.Testing.run_slower",
    "timings":[51107,51081,51013,51081,51253,51323,50573,51266,51292,50288]
  }
];


function chart() {

  var w = 500;
  var h = 200;

  function my() {
    // generate chart here, using `width` and `height`
  }

  my.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return my;
  };

  my.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return my;
  };

  return my;

}

var myChart = chart().width(720).height(80);
d3.select("#hello").call(myChart);


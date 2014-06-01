var data = [20, 70, 120, 170, 220]

var width = 420,
    height = 50;

var color = d3.scale.category20();

// var x = d3.scale().linear()
//     .domain([0, d3.max(data)])
//     .range([0, width]);

var redraw = function(data) {
  var svg = d3.select("#hi")
      .attr("width", width)
      .attr("height", height);

  var circle = svg.selectAll("circle")
      .data(data);

  circle.enter().append("circle")
      .attr("r", 0)
    .transition(500)
      .attr("r", 13);

  circle.exit().transition(500)
      .attr("r", 0)
      .remove();

  circle
      .style("fill", function(d,i) { return color(i); })
      .attr("cx", function(d) { return d; })
      .attr("cy", height/2)
}

setInterval(function() {
  redraw(data.slice(0, Math.floor(Math.random() * 5)));
}, 1000)

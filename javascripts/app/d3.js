
var data = [20, 70, 120, 170, 220]

var width = 420,
    height = 50;

var color = d3.scale.category20();

// var x = d3.scale().linear()
//     .domain([0, d3.max(data)])
//     .range([0, width]);

var svg = d3.select("#hi")
    .attr("width", width)
    .attr("height", height);

var circle = svg.selectAll("circle")
    .data(data);

circle.enter().append("circle")
    .attr("r", 13);

circle.exit().remove();

circle
    .style("fill", function(d,i) { return color(i); })
    .attr("cx", function(d) { return d; })
    .attr("cy", height/2)


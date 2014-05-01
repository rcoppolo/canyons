var t = 1297110663,
    v = 70,
    data = d3.range(33).map(next);

function next() {
  return {
    time: ++t,
    value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
  }
}

setInterval(function() {
  data.shift();
  data.push(next());
  redraw();
}, 1500);

var w = 20,
    h = 80;

var x = d3.scale.linear()
    .domain([0,1])
    .range([0,w])

var y = d3.scale.linear()
    .domain([0,100])
    .range([0,h])

var chart = d3.select(".chart").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1)
    .attr("height", h)

chart.selectAll("rect")
    .data(data)
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i) - .5 })
    .attr("y", function(d) { return h - y(d.value) - .5 })
    .attr("width", w)
    .attr("height", function(d) { return y(d.value) })

function redraw() {
  var rect = chart.selectAll("rect")
    .data(data, function(d) { return d.time; });
  rect.enter().insert("rect", "line")
      .attr("x", function(d, i) { return x(i + 1) - .5 })
      .attr("y", function(d) { return h - y(d.value) - .5 })
      .attr("width", w)
      .attr("height", function(d) { return y(d.value) })
    .transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5 });
  rect.transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i) - .5 });
  rect.exit().transition()
      .duration(1000)
      .attr("x", function(d, i) { return x(i - 1) - .5; })
      .remove();
}

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var width = 960,
    height = 500;

var svg = d3.select('.chart').append('svg')
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");


function update(data) {
  var text = svg.selectAll("text")
      .data(data, function(d) { return d; });

  text.attr("class", "update")
    .transition()
      .duration(750)
      .attr("x", function(d, i) { return i * 32 });

  text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("x", function(d, i) { return i * 32 })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
    .transition()
      .duration(750)
      .attr("y", 0)
      .style("fill-opacity", 1);

  text.exit()
      .attr("class", "exit")
    .transition()
      .duration(1000)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .remove();
}

update(alphabet);

setInterval(function() {
  update(shuffle(alphabet)
      .slice(0, Math.floor(Math.random() * 26))
      .sort())
}, 1500);

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
}


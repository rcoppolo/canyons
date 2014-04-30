var data = [];
for (var i = 0; i < 25; i++) {
  var newNumber = Math.random() * 30;
  data.push(newNumber);
}

d3.select(".chart")
  .selectAll("p")
  .data(data)
  .enter()
  .append("div")
  .attr("class", "bar")
  .style("height", function(d) {
        return (5*d) + "px";
  });

/** @jsx React.DOM */

var Dashboard = React.createClass({
  pushResult: function(result) {
    var new_results = this.state.results;
    new_results.push(result);
    this.setState({results: new_results});
  },
  getInitialState: function() {
    return {
      results: []
    };
  },
  componentWillMount: function() {
    var that = this;
    var connection = new WebSocket('ws://localhost:8001/talk');
    connection.onmessage = function (e) {
      that.pushResult(JSON.parse(e.data));
    };
  },
  render: function() {
    var data = this.state.results.map(function(fun) {
      return {
        key: fun.key,
        color: fun.color_b,
        timings: fun.timings
      }
    });
    return (
      <div className="dashboard">
        <FunList functions={this.state.results} />
        <Graph data={data} />
      </div>
    );
  }
});

var Graph = React.createClass({

  draw: function(data) {
    var w = 500;
    var h = 200;
    var x = d3.scale.linear()
              .range([0, w])
              .domain([0, d3.max(data, function(d) { return d.timings.length; }) ]);
    var y = d3.scale.linear()
              .range([h, 0])
              .domain([
                d3.min(data, function(d1) { return d3.min(d1.timings, function(d2) { return d2; }); }),
                d3.max(data, function(d1) { return d3.max(d1.timings, function(d2) { return d2; }); })
              ]);
    var line = d3.svg.line()
                 .x(function(d,i) { return x(i); })
                 .y(function(d) { return y(d); });
    var svg = d3.select(this.getDOMNode())
                .attr("height", h)
                .attr("width", w);
    var fun = svg.selectAll(".fun")
                 .data(data)
               .enter().append("g")
                 .attr("class", "fun");
    fun.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.timings); })
      .style("stroke", function(d) { return d.color; });
  },

  componentDidMount: function() {
    this.draw(this.props.data);
  },

  shouldComponentUpdate: function(props) {
    this.draw(props.data);
    return false;
  },

  render: function() {
    return <svg id="graph"></svg>;
  }
});

var FunList = React.createClass({
  render: function() {
    var functions = this.props.functions.map(function(fun) {
      return (
        <h3 className="code">{fun.name}</h3>
      );
    });
    return (
      <ul className="function-list">
        { functions }
      </ul>
    );
  }
});

React.renderComponent(
  <Dashboard />,
  document.getElementById('hello')
);

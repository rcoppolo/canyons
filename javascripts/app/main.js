/** @jsx React.DOM */

var Dashboard = React.createClass({
  loadFuns: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      failure: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  updateMessage: function(message) {
    this.setState({message: message});
  },
  getInitialState: function() {
    return {
      message: "Dare you to update this state via websockets.",
      data: []
    };
  },
  componentWillMount: function() {
    window.updateMessage = this.updateMessage;
    this.loadFuns();
  },
  render: function() {
    var data = this.state.data.map(function(fun) {
      return {
        key: fun.key,
        color: fun.color_b,
        timings: fun.timings
      }
    });
    return (
      <div className="dashboard">
        <h1>{this.state.message}</h1>
        <FunList functions={this.state.data} />
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
        <h3>{fun.name}</h3>
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
  <Dashboard url="/javascripts/funs.json" />,
  document.getElementById('hello')
);

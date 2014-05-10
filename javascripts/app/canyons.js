/** @jsx React.DOM */

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      activePane: "0",
      panes: [
        {name: "first"},
        {name: "second"},
        {name: "third"},
        {name: "fourth"}
      ]
    };
  },

  switchPane: function(pane) {
    this.setState({activePane: pane});
  },

  // handleClick: function() {
  //   this.setState({liked: !this.state.liked});
  // },

  render: function() {
    // var text = this.state.liked ? "unlike" : "like";
    return (
      <div>
        <PaneList switchPane={this.switchPane} activePane={this.state.activePane} panes={this.state.panes} />
      </div>
    );
  }
});

var PaneList = React.createClass({
  switchPane: function(e) {
    var pane = e.currentTarget.getAttribute("data-index");
    if (pane !== this.props.activePane) {
      this.props.switchPane(pane);
    }
  },
  render: function() {
    var that = this;
    var panes = this.props.panes.map(function(pane, i) {
      var active = false;
      if (i == that.props.activePane) {
        active = true;
      }
      return (
        <li data-index={i} onClick={that.switchPane} className={active ? "active" : ""}>{pane.name}</li>
      );
    });
    return (
      <ul>{panes}</ul>
    );
  }
});

React.renderComponent(
  <Dashboard date={new Date()} />,
  document.getElementById("hello")
);

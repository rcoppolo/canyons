/** @jsx React.DOM */

var Dashboard = React.createClass({
  render: function() {
    return (
      <div>
        This is the dashboard.
      </div>
    );
  }
});

React.renderComponent(
  <Dashboard />,
  document.getElementById("hello")
);

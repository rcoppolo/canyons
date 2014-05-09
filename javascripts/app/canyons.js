/** @jsx React.DOM */

var Dashboard = React.createClass({
  render: function() {
    return (
      <div>
        <h1>This is the dashboard.</h1>
        <p>This is just a paragraph explaining everything.</p>
      </div>
    );
  }
});

React.renderComponent(
  <Dashboard />,
  document.getElementById("hello")
);

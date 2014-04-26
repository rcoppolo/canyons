/** @jsx React.DOM */
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello there.</h1>
        <p>How are you?</p>
      </div>
    );
  }
});

React.renderComponent(
  <Main />,
  document.getElementById('hello')
);

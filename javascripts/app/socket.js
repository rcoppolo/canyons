var connection = new WebSocket('ws://localhost:8001/talk');
connection.onmessage = function (e) {
  console.log("Message from the server...");
  console.log(e.data);
};

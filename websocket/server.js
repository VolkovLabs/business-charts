const ws = require('ws');

/**
 * Server
 */
const server = new ws.WebSocketServer({ port: 8080 });

/**
 * Send Data
 */
const sendData = (socket) => {
  const json = [
    { name: 'name1', amount: Math.random() },
    { name: 'name2', amount: Math.random() },
    { name: 'name3', amount: Math.random() },
  ];

  socket.send(JSON.stringify(json));

  setTimeout(() => {
    sendData(socket);
  }, 1000);
};

/**
 * Connection
 */
server.on('connection', (socket) => {
  console.log('Connected...');

  setTimeout(() => {
    sendData(socket);
  }, 1000);
});

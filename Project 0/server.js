const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log(JSON.parse(data.toString()));
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('TCP server listening on port 4000');
  console.log('[x] To exit press CTRL+C');
  console.log('Waiting for messages...');
});

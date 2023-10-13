const net = require('net');

const PORT = 4020;
const HOST = '127.0.0.1';

const server = net.createServer();

// an array of client sockets
const clients = [];

server.on('connection', (socket) => {
  console.log('A new connection to the server!');

  // Закрытие соединения с клиентом с задержкой
  //   setTimeout(() => {
  //     socket.destroy();
  //   }, 5000);

  const clientId = clients.length + 1;

  // Broadcasting a message to everyone when someone enters the chat room
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });

  socket.write(`id-${clientId}`);

  socket.on('data', (data) => {
    const dataString = data.toString('utf-8');

    const id = dataString.substring(0, dataString.indexOf('-'));
    const message = dataString.substring(dataString.indexOf('-message-') + 9);

    // Закрытие соединения с клиентом
    if (message === 'EXIT') {
      socket.destroy();
      clientDisconnected();
      return;
    }

    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  socket.on('end', () => {
    console.log('Client disconnected');
    clientDisconnected();

  });

  socket.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      // Это может быть связано с отключением клиента через Ctrl+C
      console.log('Client disconnected via Ctrl+C');
    } else {
      // Другие ошибки
      console.error('Socket error:', err);
    }
    clientDisconnected();
  });

  clients.push({ id: clientId.toString(), socket });

  // Broadcasting a message to everyone when someone leaves the chat room
  function clientDisconnected() {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log('opened server on', server.address());
});

const net = require('net');

const client = new net.Socket();

client.connect(4000, 'localhost', () => {
  console.log('Connected to server');
  //client.write('Hello, server!');

  const message = Buffer.from('Hello, TCP Server!', 'utf-8');
  client.write(message);
});

client.on('data', (data) => {
  // const receivedData = data.toString('utf-8');
  //console.log(`Received data from server: ${receivedData}`);

  console.log('Received data from server:', data.toString('utf-8'));
  client.end();
});

client.on('error', () => {
  console.log('Connection closed');
});

client.on('close', () => {
  console.log('Connection closed');
});

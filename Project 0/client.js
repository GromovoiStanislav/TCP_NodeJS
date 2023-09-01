const net = require('net');

const client = new net.Socket();

client.connect(4000, 'localhost', () => {
  console.log('Connected to server');
  console.log('[x] To exit type "exit" or press CTRL+C');
  console.log('Type a message...');
});

client.on('error', () => {
  console.log('Connection closed');
});

client.on('close', () => {
  console.log('Connection closed');
});

process.stdin.on('data', (chunk) => {
  const str = chunk.toString().trim();
  if (str === 'exit') {
    process.exit(0);
  }

  const message = Buffer.from(
    JSON.stringify({
      message: str,
    })
  );

  client.write(message);
});

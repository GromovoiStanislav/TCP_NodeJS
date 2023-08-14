const express = require('express');
const net = require('net');

const app = express();
const port = 3000;

app.use(express.json());

// Create a persistent TCP connection to the server
const tcpClient = new net.Socket();
tcpClient.connect(4000, '127.0.0.1', () => {
  console.log('Connected to TCP Server');
});

tcpClient.on('error', (err) => {
  console.error('TCP Client Error:', err);
});

tcpClient.on('close', () => {
  console.log('TCP Client Connection Closed');
});

// Обработчик асинхронных операций с ожиданием результата
async function sendAndReceiveTCP(dataToSend) {
  return new Promise((resolve, reject) => {
    tcpClient.write(dataToSend);

    // Ожидание ответа от сервера
    tcpClient.once('data', (data) => {
      const receivedData = data.toString();
      resolve(receivedData);
    });

    tcpClient.once('error', (err) => {
      reject(err);
    });
  });
}

app.post('/send-data', async (req, res) => {
  const data = req.body;

  // // Send data to the TCP server
  // tcpClient.write(JSON.stringify({ post: "messages", payload: data }));

  // tcpClient.once('data', data => {
  // 	console.log('Received data from TCP server:', data.toString());
  // 	res.send('Data received from TCP server: ' + data);
  // });

  try {
    const response = await sendAndReceiveTCP(
      JSON.stringify({ post: 'messages', payload: data })
    );
    res.json(response);
  } catch (error) {
    res.status(500).send('Error sending data to TCP server');
  }
});

app.get('/get-data', async (req, res) => {
  // // Request data from the TCP server
  // tcpClient.write(JSON.stringify({get:"messages"}));

  // tcpClient.once('data', data => {
  // 	const receivedData = data.toString();
  // 	console.log('Received data from TCP server:', receivedData);
  // 	res.json(JSON.parse(receivedData));
  // });

  try {
    const response = await sendAndReceiveTCP(
      JSON.stringify({ get: 'messages' })
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.status(500).send('Error sending request to TCP server');
  }
});

app.get('/', async (req, res) => {
  // // Request data from the TCP server
  // tcpClient.write(JSON.stringify({ get: "root" }));

  // tcpClient.on('data', data => {
  // 	const receivedData = data.toString();
  // 	console.log(`Received data from server:`, receivedData);
  // 	res.json(receivedData);
  // });

  try {
    const response = await sendAndReceiveTCP(JSON.stringify({ get: 'root' }));
    res.json(response);
  } catch (error) {
    res.status(500).send('Error sending request to TCP server');
  }
});

app.listen(port, () => {
  console.log(`Client HTTP Server listening on port ${port}`);
});

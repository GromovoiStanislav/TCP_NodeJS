const net = require('net');

const server = net.createServer((socket) => {
	console.log('Client connected');

	socket.on('data', (data) => {
		// const receivedData = data.toString();
		// console.log(`Received data from client: ${receivedData}`);
		// socket.write('Hello from server!');

		console.log('Received data from client:', data.toString('utf-8'));
		socket.write(Buffer.from('Hello from TCP Server!', 'utf-8'));
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
});

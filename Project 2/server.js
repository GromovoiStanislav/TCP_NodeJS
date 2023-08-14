const net = require('net');


const messages = [
	{ msg:"Hello" },
	{ msg: "Alloha" },
]

const server = net.createServer((socket) => {
	console.log('Client connected');

	socket.on('data', (rawData) => {
		console.log(`Received data from client: ${rawData}`);
		
		const receivedData = rawData.toString('utf-8');
		const data = JSON.parse(receivedData)

		if (data.post === "messages") {
			messages.push(data.payload)
			socket.write('OK');
		} else if (data.get === "messages") {
			socket.write(JSON.stringify(messages));
		} else {
			socket.write('Hello from server!');
		}
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

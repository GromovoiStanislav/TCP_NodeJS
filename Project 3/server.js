const net = require("net");

const server = net.createServer((socket) => {
	socket.on("data", (data) => {
		console.log(data);

		const firstByte = data.readUInt8(0);
		const secondByte = data.readUInt8(1);

		console.log(firstByte); 
		console.log(secondByte); 
	});
});

server.listen(3099, "127.0.0.1", () => {
	console.log("opened server on", server.address());
});

const net = require('net');
const fs = require('fs');
const path = require('path');

// Порт, на котором будет работать сервер TSP
const SERVER_PORT = 12345;

const DOWNLOAD_FOLDER = 'download'; // Имя папки для сохранения файлов

const server = net.createServer((socket) => {
	console.log('Клиент подключился');

	// Обработка имени файла
	let fileName = '';

	socket.on('data', (data) => {
		if (!fileName) {
			// Если имя файла еще не получено, то это первые данные и они представляют имя файла
			fileName = data.toString();


			console.log(`Принимаем файл: ${fileName}`);
			const filePath = path.join(__dirname, DOWNLOAD_FOLDER, fileName);

			// Создаем поток для записи файла
			const fileStream = fs.createWriteStream(filePath);

			// Подключаем обработчик для записи данных в файл
			socket.pipe(fileStream);

			socket.on('end', () => {
				console.log(`Файл "${fileName}" успешно принят`);
				socket.end();
			});
		}
	});

	socket.on('error', (error) => {
		console.error('Произошла ошибка при передаче файла:', error);
		socket.end();
	});
});

server.on('listening', () => {
	console.log(`Сервер TSP запущен на порту ${SERVER_PORT}`);
});
server.on('error', (error) => {
	console.error('Произошла ошибка при запуске сервера:', error);
});

server.listen(SERVER_PORT);







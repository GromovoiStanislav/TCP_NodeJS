const net = require('net');
const fs = require('fs');

// Замените на IP-адрес и порт сервера TSP
const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 12345;

// Путь к файлу, который вы хотите отправить
//const FILE_PATH = 'cat.jpg';
const FILE_PATH = 'publicKey.pem';

const client = new net.Socket();

client.connect(SERVER_PORT, SERVER_HOST, () => {
	console.log('Соединение установлено с сервером TSP');

	// Открываем файл для чтения
	const fileStream = fs.createReadStream(FILE_PATH);

	// Отправляем имя файла на сервер
	client.write(FILE_PATH);

	// Отправляем содержимое файла на сервер
	fileStream.pipe(client);

	fileStream.on('end', () => {
		console.log('Файл успешно отправлен');
		// Закрываем соединение после завершения передачи
		client.end();
	});
});

client.on('close', () => {
	console.log('Соединение с сервером закрыто');
});

client.on('error', (error) => {
	console.error('Произошла ошибка при соединении с сервером:', error);
});

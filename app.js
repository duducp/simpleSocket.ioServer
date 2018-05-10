// Servidor: app.js
// Iniciando servidor HTTP
var app = require('http').createServer(index),
	io = require('socket.io').listen(app),
	fs = require('fs');

app.listen(3000, function () {
	console.log("Servidor rodando!");
});

function index(req, res) {
	fs.readFile(__dirname + '/index.html', function (err, data) {
		res.writeHead(200);
		res.end(data);
	});
};

var visitas = 0;

io.on('connection', function (socket) {
	visitas++;
	socket.emit('visits', visitas); // Envia o total de visitas para o novo usuário.
	socket.broadcast.emit('visits', visitas); // Envia o total de visitas para os demais usuários.

	// QRCode
	socket.on('QRCode7980g', function (msg) {
		console.log('QRCode: ', msg);
		socket.emit('QRCode7980g', {qrcode: 'QR125479'});
	});

	// Balança
	socket.on('balanca_2098', function (msg) {
		console.log('Balança: ', msg);
		socket.emit('balanca_2098', {peso: '22'});
	});

	// Evento disconnect ocorre quando sai um usuário.
	socket.on('disconnect', function () {
		visitas--;
		socket.broadcast.emit('message', visitas);
	});
});
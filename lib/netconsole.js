var printf = require('util').format
var dgram = require('dgram');

var NetConsole = function(teamNumber) {

    if (!(this instanceof NetConsole)) {
		console.log('Warning: NetConsole constructor called without "new" operator.');
		return new NetConsole(teamNumber);
	}

	var DEFAULT_NETCONSOLE_IN = 6666;
	var DEFAULT_NETCONSOLE_OUT = 6668;

	this.connect = function() {
		var ipAddress = getCrioIp(teamNumber);
		this.server = dgram.createSocket("udp4");
		this.server.bind(DEFAULT_NETCONSOLE_IN);
		this.sender = dgram.createSocket("udp4");
		this.server.on("error", handleError);
	}

	this.send = function(message) {
		var buffer = new Buffer(message + "\r\n");
		this.sender.send(buffer, 0, buffer.length, DEFAULT_NETCONSOLE_OUT, '10.3.42.2');
	}

	this.onMessage = function(messageHandler) {
		this.server.on('message', messageHandler);
	}

	this.disconnect = function() {
		this.server.close;
	}

	var handleError = function(error) {
		console.log(error);
	}
}

function getCrioIp(teamNumber) {
    var firstOctet = Math.floor(teamNumber / 100);
	var secondOctet = (teamNumber % 100);
	return printf("10.%s.%s.2", firstOctet.toString(), secondOctet.toString());
}

module.exports.NetConsole = NetConsole;

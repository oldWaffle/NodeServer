var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server, { pingInteval: 2000, pingTimeout: 5000, });

function start() {
    process.on('exit', function() {
        console.log('Server Shutting Down!');
        io.sockets.emit('ServerOff')
    });

    process.on('SIGINT', function() {
        process.exit(0)
    });
}

module.exports = {
    start,
}
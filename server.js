const address = 'localhost'
const port = 80

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server, { pingInteval: 2000, pingTimeout: 5000, });
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

const Class = require('./player.js')

// Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(port, address, function () {
    if (port === 80) console.log('Starting Server (' + address + ')')
    else console.log('Starting server(' + address + ') on port ' + port);
});

process.on('exit', function() {
    console.log('Server Shutting Down!');
    io.sockets.emit('ServerOff')
});

process.on('SIGINT', function () {
    process.exit(0)
});

var players = {};
io.on('connection', function (socket) {
    // console.log('Player Connected' + socket.id)
    socket.on('connected_player', function () {
        players[socket.id] = new Class.Player()
    });

    socket.on('disconnect', function () {
        // console.log('Player disconnected' + socket.id)
        delete players[socket.id]
    });
    socket.on('keydown', ({ key, sequenceNumber }) => {
        var player = players[socket.id] || {};
        players[socket.id].sequenceNumber = sequenceNumber
        switch (key) {
            case 'W':
                players[socket.id].input.w = true
                break;
            case 'A':
                players[socket.id].input.a = true
                break;
            case 'S':
                players[socket.id].input.s = true
                break;
            case 'D':
                players[socket.id].input.d = true
                break;
        }
    })
    socket.on('keyup', function (key) {
        switch (key) {
            case 'W':
                players[socket.id].input.w = false
                break;
            case 'A':
                players[socket.id].input.a = false
                break;
            case 'S':
                players[socket.id].input.s = false
                break;
            case 'D':
                players[socket.id].input.d = false
                break;
        }
    })
})

setInterval(function () {
    for (var id in players) {
        players[id].update()
    }
}, 0)

setInterval(function () {
    io.sockets.emit('updateplayers', players);
}, 15);
var socket = io();
let fullscreen = false
var frontEndPlayers = {}
let playerSpeed

var keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

socket.emit('connected_player');

var canvas = document.getElementById('canvas')
var c = canvas.getContext('2d')
canvas.width = 1920
canvas.height = 1080  


const playerInputs = []
let sequenceNumber = 0

setInterval(() => {
    // Client Side Prediction
    if (keys.w.pressed) {
        sequenceNumber++
        frontEndPlayers[socket.id].position.y -= frontEndPlayers[socket.id].speed;
        playerInputs.push({ sequenceNumber, dx: 0, dy: -frontEndPlayers[socket.id].speed })
        socket.emit('keydown', ({ key: 'W', sequenceNumber }))
    } else socket.emit('keyup', key = 'W')

    if (keys.a.pressed) {
        sequenceNumber++
        frontEndPlayers[socket.id].position.x -= frontEndPlayers[socket.id].speed;
        playerInputs.push({ sequenceNumber, dx: -frontEndPlayers[socket.id].speed, dy: 0 })
        socket.emit('keydown', ({ key: 'A', sequenceNumber }))
    } else socket.emit('keyup', key = 'A')

    if (keys.s.pressed) {
        sequenceNumber++
        frontEndPlayers[socket.id].position.y += frontEndPlayers[socket.id].speed;
        playerInputs.push({ sequenceNumber, dx: 0, dy: frontEndPlayers[socket.id].speed })
        socket.emit('keydown', ({ key: 'S', sequenceNumber }))
    } else socket.emit('keyup', key = 'S')

    if (keys.d.pressed) {
        sequenceNumber++
        frontEndPlayers[socket.id].position.x += frontEndPlayers[socket.id].speed;
        playerInputs.push({ sequenceNumber, dx: frontEndPlayers[socket.id].speed, dy: 0 })
        socket.emit('keydown', ({ key: 'D', sequenceNumber }))
    } else socket.emit('keyup', key = 'D')

}, 15)

socket.on('ServerOff', function() {
    location.reload()
})

socket.on('updateplayers', function (players) {
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var id in players) {
        var player = players[id]
        c.fillStyle = 'rgba(0, 0, 255)'
        if (player !== frontEndPlayers[id]) c.fillRect(player.position.x, player.position.y, 32, 32)

        if (!frontEndPlayers[id]) {
            frontEndPlayers[id] = new FrontEndPlayer({
                position: player.position,
                speed: player.speed,
            })

            mainLoop()
        } else {
            frontEndPlayers[id].position = player.position

            const lastBackendInputIndex = playerInputs.findIndex(input => {
                return player.sequenceNumber === input.sequenceNumber
            })

            if (lastBackendInputIndex > -1) playerInputs.splice(0, lastBackendInputIndex + 1)

            playerInputs.forEach(input => {
                frontEndPlayers[id].x += input.dx
                frontEndPlayers[id].y += input.dy
            })
        }
    }
});

function mainLoop() {
    window.requestAnimationFrame(mainLoop)

    if (fullscreen === true) document.body.style.zoom = window.innerWidth / canvas.width * 100 + '%';

    if (!frontEndPlayers[socket.id]) return

    for (var id in frontEndPlayers) {
        frontEndPlayers[id].update()
    }

    c.fillStyle = 'rgba(0, 0, 255)';
    c.fillRect(frontEndPlayers[socket.id].position.x, frontEndPlayers[socket.id].position.y, 32, 32)
}
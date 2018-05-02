const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const server = require('http').Server(app)
const io = require('socket.io')(server)


server.listen(4000, () => console.log('listening on 4000'))

var countdown = 1000;
var counting = true;
setInterval(function () {
    if (countdown <= 0) return;
    if (!counting) return;
    countdown--;
    io.sockets.emit('timer', { countdown: countdown })
}, 1000)

io.on('connection', function (client) {
    console.log('connected')
    client.on('settimer', function (data) {
        countdown = data.time;
    })
    // start/stop timer
    client.on('event', function (data) {
        switch (data.status) {
            case false: counting = false;
                break;
            case true: counting = true;
                break;
            default: return;
        }
    })
    client.on('disconnect', function () {
        console.log('disconnected')
    })
})

// joseph Ells @ 2pm BC unknown
// Charles Hatch @ 2:30 BC complete
// Todd Gore @ 3 BC unknown
// Jose Ortiz @ 4:30 BC unknown
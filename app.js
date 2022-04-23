const { Socket } = require('dgram');
let express = require('express');
let app = express();
app.use(express.static('public')); 
let http = require('http').Server(app);
let port = process.env.PORT || 3000;

const io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log('new connection');

    // Called when the client calls socket.emit('move')
    socket.on('move', function(msg) {
       socket.broadcast.emit('move', msg); 
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});
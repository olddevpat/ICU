// declare the needed modules and variables
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const server = app.listen(8000, () => console.log("listening on port:8000"));
const io = require('socket.io') (server);
const twilio = require('twilio');
let session = require('express-session');
const { count } = require("console");
users = ["Patrick", "Rogie", "Karen", "Lito", "Judy", "Anne", "Marlon"]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./assets")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
let counter = 0;
app.use(session({
  secret: 'pat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/classroom', function(req, res) {
    res.render('classroom');
});

app.get('/students', function(req, res) {
    res.render('students');
});
// Socket part

io.on('connection', function(socket) {
    console.log('new connection');

    // Called when the client calls socket.emit('move')
    socket.on('move', function(msg) {
       socket.broadcast.emit('move', msg); 
    });

    socket.on('voice', function (data) {
        console.log(data);
    io.emit('subtitle', data)
    })

    socket.on('voice_on', function (data) {
        io.emit('update_all', data); 
    })
    
});






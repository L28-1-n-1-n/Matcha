const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

const bodyParser = require('body-parser');
const path = require('path');

const config = require('config');
const db = config.get('mongoURI');
const app = express();
const Photo = require('./models/Photo');
const PORT = process.env.PORT || 5000;

const User = require('./models/User');

const router = express.Router();

const cors = require('cors');
// const cors = require('./cors');
// cors(app);
// Connect Database
connectDB();

// For Socket.io
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

// Run when client connects
io.on('connection', (socket) => {
  console.log('New WS Connection ...');
  socket.emit('message', 'Welcome LOLLLLL!');
  // console.log(socket);
  // Broadcast to all clients except the current one
  // Broadcast when a user connects
  socket.broadcast.emit('messsage', 'A user has joined the chat');
  // io.emit(); will emit to ALL clients

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
  // Listen for newChatMessage
  socket.on('newChatMessage', (msg) => {
    console.log(msg);
    io.emit('message', msg);
  });
});

module.exports = {
  io: io,
};
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const LOL = require('./socket')(io);
// const io = require('./socket.js').init(server);

// Init Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
// app.use(methodOverride('_method'));

// Working code using fileUpload
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/public')));
app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/photos', require('./routes/api/photos'));
app.use('/api/confirmation', require('./routes/api/confirmation'));
app.use('/api/recuperation', require('./routes/api/recuperation'));
app.use('/api/reset', require('./routes/api/reset'));

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// () => is the callback part

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

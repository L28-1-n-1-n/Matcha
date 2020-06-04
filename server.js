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
const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit('FromAPI', response);
};
// Run when client connects
let interval;
var UserList = require('./config/userlist');
userlist = UserList.userlist;
io.on('connection', (socket) => {
  console.log('New WS Connection ...');
  // console.log(socket);
  console.log(socket.id);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.emit('message', 'Welcome!');
  socket.emit('logchannel', socket.id);
  // console.log(socket);
  // Broadcast to all clients except the current one
  // Broadcast when a user connects
  socket.broadcast.emit('messsage', 'A user has joined the chat');
  // io.emit(); will emit to ALL clients
  console.log('before, userlist is ');
  console.log(userlist);
  socket.on('lol', (m) => {
    let tmp = userlist.findIndex((x) => x.user === m.user);

    if (tmp !== -1) {
      userlist[tmp].sid = m.sid;
      console.log(userlist);
    } else {
      userlist.push(m);
    }
  });
  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
    console.log('disconnected user is', socket.id);
    let tmp = userlist.findIndex((x) => x.sid === socket.id);
    if (tmp !== -1) {
      userlist.splice(tmp, 1);
      console.log(userlist);
    }
    clearInterval(interval);
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

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

console.log('we are here');

// (async () => {
//   // console.log(await publicIp.v4());
//   //=> '46.5.21.123'
//   const result = await publicIp.v4();
//   console.log(result);
//   console.log(await publicIp.v6());
//   //=> 'fe80::200:f8ff:fe21:67cf'
// })();

// const publicIp = require('public-ip');
// const ipLocation = require('iplocation');

// (async () => {
//   // console.log(await ipLocation('172.217.167.78'));
//   const result = await publicIp.v4();
//   console.log(result);
//   // console.log(await publicIp.v6());
//   console.log(await ipLocation(result));
//   // console.log(await ipLocation('::1'));
//   //=> { latitude: -33.8591, longitude: 151.2002, region: { name: "New South Wales" ... } ... }
// })();

// const requestIp = require('request-ip');
// app.use(requestIp.mw());

// app.use(function (req, res) {
//   const ip = req.clientIp;
//   console.log(ip);
//   res.end(ip);
// });
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

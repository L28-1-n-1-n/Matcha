// let io;
// module.exports = {
//     init: function(server) {
//         // start socket.io server and cache io value
//         io = require('socket.io').listen(server); io.origins('*:*');
//         return io;
//     }
//     getio: function() {
//         // return previously cached value
//         if (!io) {
//             throw new Error("must call .init(server) before you can call .getio()");
//         }
//         return io;
//     }
// }

// const serverIO = (io) => {
//   // module.exports = (io) => {
//   io.on('connection', (socket) => {
//     console.log('New WS Connection ...');
//     console.log('socket connected with id:' + socket.id);
//     socket.emit('message', 'Welcome LOLLLLL!');
//     // console.log(socket);
//     // Broadcast to all clients except the current one
//     // Broadcast when a user connects
//     // socket.broadcast.emit('messsage', 'A user has joined the chat');
//     // io.emit(); will emit to ALL clients

//     // Runs when client disconnects
//     socket.on('disconnect', () => {
//       io.emit('message', 'A user has left the chat');
//     });
//     // Listen for newChatMessage
//     socket.on('newChatMessage', (msg) => {
//       console.log(msg);
//       io.emit('message', msg);
//     });
//     socket.on('message', function (message) {
//       logger.log('info', message.value);
//       socket.emit('ditConsumer', message.value);
//       console.log('from console', message.value);
//     });
//   });
// };

// module.exports = serverIO;

// // Run when client connects
// io.on('connection', (socket) => {
//     console.log('New WS Connection ...');
//     socket.emit('message', 'Welcome LOLLLLL!');
//     // console.log(socket);
//     // Broadcast to all clients except the current one
//     // Broadcast when a user connects
//     socket.broadcast.emit('messsage', 'A user has joined the chat');
//     // io.emit(); will emit to ALL clients

//     // Runs when client disconnects
//     socket.on('disconnect', () => {
//       io.emit('message', 'A user has left the chat');
//     });
//     // Listen for newChatMessage
//     socket.on('newChatMessage', (msg) => {
//       console.log(msg);
//       io.emit('message', msg);
//     });
//   });

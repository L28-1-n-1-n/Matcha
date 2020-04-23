// import socketIOClient from 'socket.io-client';
// const ENDPOINT = 'http://127.0.0.1:5000';

// const socket = socketIOClient(ENDPOINT);
// console.log(socket);

const chatForm = document.getElementById('chat-form');
const socket = io('http://localhost:5000');
socket.on('message', (message) => {
  console.log(message);
});

// Message submit

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('evnt filred00');
  const msg = e.target.elemets.msg.value;
  console.log(msg);
});

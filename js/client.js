const socket = io('http://localhost:8000');

// Get DOM elements in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio that will be played while receiving messages.
var audio = new Audio('sound.mp4');

// Function which will append event info to the container
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position);
  messageContainer.append(messageElement);
  if(position == 'left'){
    audio.play();
  }
};

// Ask new user for their name and let the server know.
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// Naya user join vayepachi, receive the event from the server.
socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});

// sever le messange send garyo vane receive it
socket.on('receive', data => {
  append(`${data.name}: ${data.message}`, 'left');
});

// userle chat leave garchha vane, append the info to the container
socket.on('left', name => {
  append(`${name} left the chat`, 'left');
});

// Form submit vayo vane server lai message send garchha
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});


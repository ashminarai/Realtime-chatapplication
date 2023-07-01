const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const appendMessage = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position);
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);

socket.on('user-joined', name => {
  appendMessage(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
  appendMessage(`${data.name}: ${data.message}`, 'left');
});
// // const { Namespace } = require("socket.io");

// javascript file 
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')

// jati bela ni message aauchha tyo kaa rakhne ta yo container vanne div ko part ma
const messageContainer = document.querySelector(".container")

// append function
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);


socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})
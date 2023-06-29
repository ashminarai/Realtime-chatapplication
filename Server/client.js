// const { Namespace } = require("socket.io");

// // javascript file 
// const socket = io('http://localhost:8000');

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');

// // jati bela ni message aauchha tyo kaa rakhne ta yo container vanne div ko part ma
// const messageContainer = document.querySelector(".container")

// const name = prompt("enter your name to join");
// socket.emit('new-user-joined', name)

// const { Namespace } = require("socket.io");

// javascript file 
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');

// jati bela ni message aauchha tyo kaa rakhne ta yo container vanne div ko part ma
const messageContainer = document.querySelector(".container")

const name = prompt("enter your name to join");
socket.emit('new-user-joined', name)

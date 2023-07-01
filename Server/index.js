const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');


app.use(cors());

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

const port = 8000;
http.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const app = express();
// const http = require('http').Server(app);
const io = require('socket.io')(8000);
const cors = require('cors');


app.use(cors());

const users = {};

io.on('connection', socket => {

    // naya naya users chat ma join vayo vane arule thahapauchha that he/she joined the chat.
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name,);
    });

    // kasaile message send garyo vane savailai broadcast gardinchha
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    // kasaile chat leave garyo vane let others know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

// const port = 8000;
// http.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

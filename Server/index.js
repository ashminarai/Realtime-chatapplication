// this is a node server which will handle socket io connections

// port jati ko ni rakhda hunchha for instance 5000, 6000, 8000 and so on...


// yaa socket.io server run garirako ho 5000 portma
const io= require('socket.io')(8000)


// kunai pani new-user-joined vayo vane users ma append garchha ani savailai inform gardinchha that user has joined the chat.
const users = {};

// io.on and socket.on are two different things


// io.on vaneko socket.io instance ho jasle dherai socket connection lai listen gardaichha for instance ram le connect garyo, shyam le connect garyo.
io.on('connection', socket=>{

    // socket.on le chai k garchha vane kunai pani connection ko sath java kei hunchha, teslai k garnu parne ho tyo socket.on le handle garchha
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        users[socket.id] = name;

        // socket.broadcast.emit le k garchha vane jasle message ma join garyo uslai bahek savailai message jaanchha for instance Ram joined the chat.
        socket.broadcast.emit('user-joined', name);
    });

    // when someone is sending the message
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: user[socket.id]})
    });

    // socket.on
})

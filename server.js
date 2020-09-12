const io = require("socket.io")(3000);

const user = {}

io.on("connection", socket => {
    socket.on("new-user", name =>{
        user[socket.id] = name;
        socket.broadcast.emit("user-connected", name);
    })
    socket.on('send-message', message => {
        socket.broadcast.emit("chat-messages", {message: message, name: user[socket.id]});
    })
})
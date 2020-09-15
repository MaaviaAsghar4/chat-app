const io = require("socket.io")(3000);

const user = {}

io.on("connection", socket => {
    socket.on("new-user", userName =>{
        user[socket.id] = userName;
        socket.broadcast.emit("user-connected", userName);
    })
    socket.on('send-message', message => {
        socket.broadcast.emit("chat-messages", {message: message, userName: user[socket.id]});
    })
    socket.on("disconnect", () =>{
        socket.broadcast.emit("user-disconnected",user[socket.id])
        delete user[socket.id]
    })
})
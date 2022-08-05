const io = require('socket.io')(8080, {
    cors: {
        origin: ["http://localhost:3000"],
    }
});


const liveChat = () => {
    io.on('connection', socket => {
        console.log('connected to socket.io', socket.id)
        socket.on('join-room', groupId => {
            socket.join(groupId);
            console.log('from joined room in server room id:', groupId);
        })
        socket.on('send-message', (message, groupId) => {
            console.log('the socket is ', socket)
            socket.to(groupId).emit("receive-message", message)
            console.log('inside send message server', message, groupId)
        })
    })
}

module.exports = liveChat;
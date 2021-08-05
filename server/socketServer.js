let users = []

const EditData = (data, id, call) => {
    const newData = data.map(item => 
        item.id === id ? {...item, call} : item
    )
    return newData;
}

const SocketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', user => {
        users.push({id: user._id, socketId: socket.id, followers: user.followers})
    })

    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id)
        if(data){
            const clients = users.filter(user => 
                data.followers.find(item => item._id === user.id)
            )

            if(clients.length > 0){
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
                })
            }

            if(data.call){
                const callUser = users.find(user => user.id === data.call)
                if(callUser){
                    users = EditData(users, callUser.id, null)
                    socket.to(`${callUser.socketId}`).emit('callerDisconnect')
                }
            }
        }

        users = users.filter(user => user.socketId !== socket.id)
    })

    // Message
    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
    })


    // Check User Online / Offline
    socket.on('checkUserOnline', data => {
        const following = users.filter(user => 
            data.following.find(item => item._id === user.id)
        )
        socket.emit('checkUserOnlineToMe', following)

        const clients = users.filter(user => 
            data.followers.find(item => item._id === user.id)
        )

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id)
            })
        }
        
    })

}

module.exports = SocketServer
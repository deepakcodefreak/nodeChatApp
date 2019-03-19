const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const {generateMessage,generateLocationMessage} = require('./utils/message');

const port = process.env.PORT||3000;
const app = express()

app.use(express.static(path.join(__dirname,'../public')))

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user Connected')

    socket.emit('newMessage',generateMessage('Admin','Welcome To Chat Room'))

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'))

    socket.on('disconnect',()=>{
        console.log('User Disconnected')
    })

    
    socket.on('createMessage',function(message,callback){
       console.log('createMessage',message);

        // socket.broadcast.emit('newMessage',generateMessage(message.from,message.text))
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback('This is from the server');
    })

     socket.on('createLocationMessage',function(coords){
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.lat,coords.long))
    })

})


server.listen(port,()=>{
    console.log(`App is live on port ${port}`)
})
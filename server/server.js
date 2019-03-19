const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const port = process.env.PORT||3000;
const app = express()

app.use(express.static(path.join(__dirname,'../public')))

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New user Connected')

    socket.on('disconnect',()=>{
        console.log('User Disconnected')
    })

    
    socket.on('createMessage',function(message){
       console.log('createMessage',message)
    })

    socket.emit('newMessage',{
        from :'lfn',
        text:'hiiiii',
        createdAt:new Date().toDateString()
    })
})


server.listen(port,()=>{
    console.log(`App is live on port ${port}`)
})
const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const port = process.env.PORT||3000;
const app = express()

app.use(express.static(path.join(__dirname,'../public')))

var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

io.on('connection',(socket)=>{
    console.log('New user Connected')


    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id)

        if(user){
            io.to(user.room).emit('updateUsersList',users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`))
        }
    })

    
    socket.on('createMessage',function(message,callback){
       console.log('createMessage',message);

        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
            callback('This is from the server');
          }
      })

     socket.on('createLocationMessage',function(coords){
         let user = users.getUser(socket.id);

         if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.lat,coords.long))
         }
        
    })

    socket.on('join',(params,callback)=>{

        if(!isRealString(params.name) || !isRealString(params.room)){
          return callback('Name and Room Name are required')  
        } 

        socket.join(params.room);
        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room)

        io.to(params.room).emit('updateUsersList',users.getUserList(params.room))

        socket.emit('newMessage',generateMessage('Admin',`Welcome To Chat Room ${params.room}`))
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined the room`))

        callback();
    })

})


server.listen(port,()=>{
    console.log(`App is live on port ${port}`)
})
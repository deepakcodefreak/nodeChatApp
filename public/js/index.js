var socket = io();

socket.on('connect',()=>{
    console.log(`Connected to Server`)

    socket.emit('createMessage',{
        text:'hey',
        from:'deepak'
    })
    
})

socket.on('disconnect',()=>{
    console.log('Disconnected from server')
})

socket.on('newEmail',function(email){
    console.log('New Email',email)
})


socket.on('newMessage',function(res){
    console.log(res)
})


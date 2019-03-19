var socket = io();

socket.on('connect',()=>{
    console.log(`Connected to Server`)
})

socket.on('disconnect',()=>{
    console.log('Disconnected from server')
})

socket.on('newEmail',function(email){
    console.log('New Email',email)
})


socket.on('newMessage',function(message){
    console.log(message);

    let li = jQuery('<li></li>')
    li.text(`From ${message.from}: ${message.text}`)
    jQuery('#messages').append(li);
})



jQuery('#message-form').on('submit',function(e){
    e.preventDefault()

    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){

    })
})

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
    var formatted_Time = moment(message.createdAt).format('h:mm a')
    console.log(message);

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formatted_Time
    });

    jQuery('#messages').append(html)

})



jQuery('#message-form').on('submit',function(e){
    e.preventDefault()

    let messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('');
    })
})

var locationButton = jQuery('#location');

locationButton.on('click',function(e){
    e.preventDefault();

    if(!navigator.geolocation){
        return alert('Geolocation not supported by user browser')
    }

    locationButton.attr('disabled','disabled')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled')   
        var lat = position.coords.latitude;
        var long = position.coords.longitude;      
      
        socket.emit('createLocationMessage',{
            lat,
            long
        });
    },function(){
        locationButton.removeAttr('disabled')
        alert('Unable to fetch Location')
    });

      
})


socket.on('newLocationMessage',function(message){
    let formatted_Time = moment(message.createdAt).format('h:mm a')

    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formatted_Time
    });

    jQuery('#messages').append(html);

})
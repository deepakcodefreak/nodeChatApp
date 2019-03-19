
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

    let li = jQuery('<li></li>')
    li.text(`From : ${message.from}  ${formatted_Time} : ${message.text}`)
    jQuery('#messages').append(li);
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
    let li = jQuery(`<li>${message.from} : ${formatted_Time} </li>`)
    let a = jQuery('<a target="_blank">My current Location</a>')

    a.attr('href',message.url)
    li.append(a);
    jQuery('#messages').append(li);

})
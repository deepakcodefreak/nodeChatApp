


function scrollToBottom(){
    //selectors
        let messages = jQuery('#messages');
        var newMessage = messages.children('li:last-child');
    //heights

    let scrollTop = messages.prop('scrollTop')
    let scrollHeight = messages.prop('scrollHeight')
    let clientHeight = messages.prop('clientHeight')
    let newMessageHeight = newMessage.innerHeight()
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(scrollTop + clientHeight + newMessageHeight +lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


var socket = io();

socket.on('connect',()=>{
    console.log(`Connected to Server`)
    var params = jQuery.deparam(window.location.search)
    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href = "/";
        }else{
            console.log('NO Error')
        }
    })
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

    scrollToBottom();

})



jQuery('#message-form').on('submit',function(e){
    e.preventDefault()

    let messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage',{
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

    scrollToBottom();

})

socket.on('updateUsersList',function(users){
    var ol = jQuery('<ol></ol>')

    users.forEach((user)=>{
        ol.append(jQuery('<li></li>').text(user))
    })

    jQuery('#users').html(ol);
})
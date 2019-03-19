const moment = require('moment');

var generateMessage = function(from,text){
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}


var generateLocationMessage = function(from,lat,long){
    return{
        from,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}
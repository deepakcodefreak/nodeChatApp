const moment = require('moment');

let date = moment();

// date.add(1,'year')
console.log(date.format('h:m a'))

const someTimeStamp  = moment().valueOf()
console.log(someTimeStamp)
var moment=require('moment');

var date=new Date();
var validFormat=moment(date).format('hh:mm:a')

console.log(validFormat);
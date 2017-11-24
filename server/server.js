const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const {isRealString}=require('./utils/validation');
const { generateMessage,generateLocationMessage} = require('../server/utils/message');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user Connected');

   
    socket.on('join',(params,callback)=>{
         if(!isRealString(params.name)||!isRealString(params.room)){
            callback('Name and Room Required')
         }
         socket.join(params.room);
         socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
         socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
     
         callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('');
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin: ', coords.latitude,coords.longitude))
    })
    socket.on('disconnect', () => {
        console.log('user Disconnected');
    });
});


server.listen(port, () => {
    console.log(`server up an running ${port} port`);
});
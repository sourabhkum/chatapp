const path =require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user Connected');
    socket.on('disconnect',()=>{
        console.log('user Disconnected');
    });
    socket.emit('newMessage',{
        from:'sourabhcybo@gmail.com',
        text:'hi this is text',
        id:129
    });
    
    socket.on('createMessage',(newMessage)=>{
        console.log('createMessage',newMessage)
    });
});


server.listen(port,()=>{
    console.log(`server up an running ${port} port`);
});
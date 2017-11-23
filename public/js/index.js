var socket = io();
socket.on('connect', function () {
    console.log('connected to server');

});
socket.on('disconnect', function () {
    console.log('disconnected to server');
});
socket.on('newMessage', function (message) {
    console.log('newMessage', message)
    var li=$('<li></li>');
    li.text(`${message.from}:${message.text}`);
    $('#messages').append(li);
});

$('#message-from').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:$('[name=newMessage]').val()
    },function(){

    });
});

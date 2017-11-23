var socket = io();
socket.on('connect', function () {
    console.log('connected to server');

});
socket.on('disconnect', function () {
    console.log('disconnected to server');
});
socket.on('newMessage', function (message) {
    console.log('newMessage', message)
    var li = $('<li></li>');
    li.text(`${message.from}:${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    console.log('newMessage', message)
    var li=$('<li></li>');
    var a=$('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}`);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
});
$('#message-from').on('submit', function (e) {
    var texbox=$('[name=newMessage]')
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: texbox.val()
    }, function () {
        texbox.val('')
    });
});
var locationButton=$('#send-location');
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Browser not supported')
    }
    locationButton.attr('disabled','disabled').text('Sending Location..');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled','disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('unable to fetch location');
        locationButton.attr('disabled','disabled').text('Send Location');
    });
});
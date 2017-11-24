var socket = io();

function scrollBottom(){
    var messages=$('#messages');
    var newMessage=messages.children('li:last-child');
    var clientHeight=messages.prop('clientHeight');
    var scrollHeight=messages.prop('scrollHeight')
    var scrollTop=messages.prop('scrollTop');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function () {
    var parms=$.deparam(window.location.search);
    socket.emit('join',parms,function(err){
        if(err){
            alert(err);
            window.location.href='/'
        }else{
            console.log('No error')
        }
    });

});
socket.on('disconnect', function () {
    console.log('disconnected to server');
});
socket.on('updateUserList',function(users){
    var ol=$('<ol></ol>');
    users.forEach(function(user){
        ol.append($('<li></li>').text(user));
    });
    $('#user').html(ol);
});
socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    $('#messages').append(html);
    scrollBottom();
});

socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#location-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    });
    $('#messages').append(html);
    scrollBottom();
});
$('#message-from').on('submit', function (e) {
    var texbox = $('[name=newMessage]')
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: texbox.val()
    }, function () {
        texbox.val('')
    });
});
var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Browser not supported')
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location..');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled', 'disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('unable to fetch location');
        locationButton.attr('disabled', 'disabled').text('Send Location');
    });
});
var socket = io();
socket.on('connect', function () {
    console.log('connected to server');

});
socket.on('disconnect', function () {
    console.log('disconnected to server');
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
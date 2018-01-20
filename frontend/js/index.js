var socket = io();

socket.on('database-response', (msg) => {
    console.log('database-response', msg);
    $('#database-response-display').text(JSON.stringify(msg, null, 2));
});

socket.emit('database-request', '{ hello }');
/**
 * Created by lamtanphiho on 2/21/2016.
 */
try{
    var socket = io.connect('http://localhost:1888');
    socket.on('connect', function(data) {
        socket.emit('ag', 'Hello World i am admin');
    });
}catch(e){
    setTimeout(function() {
        window.location = window.location;
    }, 5000);
}


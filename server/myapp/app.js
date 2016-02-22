/**
 * Created by lamtanphiho on 2/21/2016.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/bower_components'));


app.get('/', function (req, res) {
    console.log('da ket noi');
    res.send('Hello World!');
});
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    res.send('Hello sicret!');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('agMsg', function(data) {
        console.log(data);
    });

});
server.listen(1888, function () {
    console.log('Listening on port 1888!');
});
;

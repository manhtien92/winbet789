/**
 * Created by lamtanphiho on 2/21/2016.
 */
var email = '';
var session = '';
try{
    var socket = io.connect('http://hokibet188.com:1888/member_area');
    socket.on('connect', function(data) {
        var data1 = {msgtype:'clientConnect', msg:'Hello World i am client'}
        socket.emit('message', data1);
        var data1 = {msgtype:'check_logged', email:email, session: session}
        socket.emit('message', data1);
    });
    socket.on('message', function(data) {
        console.log('datanode', data);
        switch (data.msgtype)
        {
            case 'duplicate_login':
                alert('duplicate _login');
                break;
            case 'logged_result':
                console.log(data);
                break;
        }
    });
}catch(e){
    setTimeout(function() {
        window.location = window.location;
    }, 5000);
}
$(document).ready(function () {
    //console.log(document.cookie);
})


/**
 * Created by lamtanphiho on 2/21/2016.
 */
<<<<<<< HEAD
try{
    var socket = io.connect('http://localhost:1888/member_area');
    socket.on('connect', function(data) {
        var data1 = {msgtype:'clientConnect', msg:'Hello World i am client'}
        socket.emit('message', data1);
        var data1 = {msgtype:'check_logged', email:auth.email, session: auth.session}
        socket.emit('message', data1);
    });

}catch(e){
    setTimeout(function() {
        window.location = window.location;
    }, 5000);
}
$(document).ready(function () {
    socket.on('message', function(data) {
        console.log(data)
=======
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
>>>>>>> 0efe0db24e307bc5eae7946fb62d3fc5254cf179
        switch (data.msgtype)
        {
            case 'duplicate_login':
                alert('duplicate _login');
                break;
            case 'logged_result':
<<<<<<< HEAD
                var href =$('a#logout').attr('href');
                if(data.result==false && typeof (href) != 'undefined')
                {
                    console.log(data);
                    location.href =  href;

                }

                break;
        }
    });
=======
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
>>>>>>> 0efe0db24e307bc5eae7946fb62d3fc5254cf179
})


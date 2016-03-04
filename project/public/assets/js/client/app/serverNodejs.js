/**
 * Created by lamtanphiho on 2/21/2016.
 */
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
        switch (data.msgtype)
        {
            case 'duplicate_login':
                alert('duplicate _login');
                break;
            case 'logged_result':
                var href =$('a#logout').attr('href');
                if(data.result==false && typeof (href) != 'undefined')
                {
                    console.log(data);
                    location.href =  href;

                }

                break;
        }
    });
})


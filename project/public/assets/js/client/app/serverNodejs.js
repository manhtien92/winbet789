/**
 * Created by lamtanphiho on 2/21/2016.
 */

try{
    var socket = io.connect('localhost:1888/member_area');
    socket.on('connect', function(data) {
        var data1 = {msgtype:'clientConnect', msg:'Hello World i am client'}
        socket.emit('message', data1);

    });
    socket.on('message', function(data) {
        console.log( data);
        switch (data.msgtype)
        {
            case 'clientConnect':
                console.log(data.msg +' '+ data.socketid);
                break;
            case 'duplicate_login':
            {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                Command: toastr["error"]('Your account has been logged elsewhere !');
                $('#logout').trigger('click');
            }
                break;
            case 'login_result':
                console.log('login', data);
                break;
            case 'logged_result':
                if(data.result==false )
                {
                   $('#logout').trigger('click');

                }
console.log(data);
                break;
        }
    });
}catch(e){
    setTimeout(function() {
        window.location = window.location;
    }, 5000);
}

$(document).ready(function(){



    var user = typeof (localStorage.getItem('user'))!= 'undefined' ? localStorage.getItem('user') : '';
    user = (user == null) ? user: JSON.parse(user).username;
    var data1 = {msgtype:'check_logged', user:user, session: auth.session}
    //console.log(data1);
    socket.emit('message', data1);
});



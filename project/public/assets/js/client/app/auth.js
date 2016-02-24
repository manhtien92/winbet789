var Auth = {
    el: undefined,
    init : function () {
        var self = this;
        self.el = $('#login-form');
        self.event();
    },

    event : function () {
        var self = this;
        self.el
            .on('submit', function(event) {
                event.preventDefault();
                self.auth();
            })
    },

    auth : function () {
        var self = this;

        $.ajax({
            dataType: "json",
            type    : "POST",
            url     : baseUrl + 'auth',
            data    : self.el.serialize(),
            success: function( data ){
                if ( data['result'] ) {
                    //location.reload();
                    var session = document.cookie;
                    console.log(self.el.serialize());
                    //var data = "{" +
                    //    "msgtype : 'memberlg'," +
                    //    " usr:'"+username_encode+"'," +
                    //    "pwd:'"+password_encode+"', " +
                    //    "sessId: '"+session_encode+"'}";
                    //
                    //socketio.emit("message", data);
                } else {
                    alert('login fail');
                }
            }
        });
    },
}
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

                    var data1 = data['data'];
                   data1['msgtype'] = 'memberlg';
console.log(data1);
                    socket.emit("memberMsg", data1);

                } else {
                    alert('login fail');
                }
            }
        });
    },
}
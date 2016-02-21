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
            data    : self.getCreds(),
            success: function( data ){
                if ( data['result'] ) {
                    location.reload();
                } else {
                    alert('login fail');
                }
            }
        });
    },

    getCreds : function () {
        var self = this;
        var creds = {
            email : self.el.find('#ip-email').val(),
            password : self.el.find('#ip-password').val()
        }
        console
        return creds;
    }
}
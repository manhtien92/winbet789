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
                    location.reload();
                }
            },
            statusCode: {
                403: function(xhr) { 
                    var configDialog = {
                        'title' : 'ERROR',
                        'content' : 'Fail login, Please try again!',
                    }
                    Dialog.execDialog(configDialog);
                },
            }
        });
    },
}
var Register = {
    el: undefined,
    init : function () {
        var self = this;
        self.el = $('#register');
        self.event();
    },

    event : function () {
        var self = this;
        self.el
            .on('submit', function(event) {
                event.preventDefault();
                self.register();
            })
    },

    register : function () {
        var self = this;
        if ( this.validate() ) {
            $.ajax({
                dataType: "json",
                type    : "PUT",
                url     : baseUrl + 'user',
                data    : self.el.find('#frm-register').serialize(),
                success: function( data ){
                    if ( data['result'] ) {
                        var configDialog = {
                            'title' : 'SUCCESS',
                            'content' : 'Register successful, please check your email to activate your account!',
                        }
                        Dialog.execDialog(configDialog);
                    }
                },
                statusCode: {
                    403: function(xhr) { 
                        var responseJSON = xhr['responseJSON']['data'];

                        $.each( responseJSON, function(key, val) {
                            self.el.find('.' + key).text(val);
                        })
                    },
                }
            });
        } else {
            return false;
        }
    },

    validate : function () {
        var self = this;
        if ( self.el.find('#over18').is(':checked') ) {
            return true;
        } else {
            var configDialog = {
                'title' : 'ERROR',
                'content' : 'I acknowledge I am at least 18 years old. Please Check!',
            }
            Dialog.execDialog(configDialog);
            return false;
        }
    }
}
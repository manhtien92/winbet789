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

        $.ajax({
            dataType: "json",
            type    : "PUT",
            url     : baseUrl + 'user',
            data    : self.el.find('#frm-register').serialize(),
            success: function( data ){
                if ( data['result'] ) {
                    $( "#dialog" ).dialog({
                        modal: true,
                    });
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
    },
}
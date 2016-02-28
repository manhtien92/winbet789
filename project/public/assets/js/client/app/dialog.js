var Dialog = {
    el: undefined,
    init : function () {
        var self = this;
        self.el = $('#dialog');
        self.event();
    },

    event : function () {
        var self = this;
    },

    execDialog: function(obj) {
        var self = this;

        var configObj = {
            modal: true,
            title: "Modal",
            draggable: true,
            resizable: true,
            width: 350,
            show: { effect: 'drop', direction: "up" },
            hide: { effect: 'drop', direction: "up" },
            buttons: obj
        };
        Object.keys(obj).forEach(function(key) {
            if(key == "title"){
                configObj.title = obj[key];
                delete obj.title;
            }
            if(key == "content"){
                $(".dialog-content").html(obj.content);
                delete obj.content;
            }
            if(key == "width"){
                configObj.width = obj[key];
                delete obj.width;
            }
        });
        $('#dialog').dialog(configObj);
    },
}
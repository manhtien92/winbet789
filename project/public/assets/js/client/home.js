var Home = {
    element: undefined,
    init : function () {
        var self = this;
        self.element = $('body');
        self.attachMainSlider();
        self.attachEvent();
    },

    attachEvent : function () {
        var self = this;
        self.element
            .on('click', '.nav li.dropdown', function() {
                $('.nav li.dropdown').removeClass('open');
                $('.nav li.dropdown').removeClass('active');
                $(this).addClass('active');
            })
    },

    // Attach normal slider
    attachMainSlider : function () {
        $('.slider').bxSlider({
            mode:'horizontal',
            speed: 1000,
            auto: true,
            pager: false,
            controls: true,
            adaptiveHeight: true
        });
        $('.right-slider').bxSlider({
            mode:'vertical',
            speed: 1000,
            auto: true,
            pager: false,
            controls: true,
            adaptiveHeight: true
        });
    }
}
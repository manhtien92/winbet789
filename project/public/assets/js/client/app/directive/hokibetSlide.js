(function() {

    'use strict';

    angular
        .module('hokibetSlide', [])

        .directive('hokibetslide', function($timeout) {
            return {
                restrict: 'AE',
                replace: true,
                templateUrl: baseUrl + 'assets/view/directive/hokibetSlide.html',
                link: function(scope, elm, attrs) {console.log($(elm[0]).attr('class'));
                    $timeout(function () {
                        $("ul.mainSlide").bxSlider({
                            mode:'horizontal',
                            speed: 1000,
                            auto: true,
                            pager: false,
                            controls: true,
                            adaptiveHeight: true
                        });
                        
                        $("ul.promoSlide").bxSlider({
                            mode:'vertical',
                            speed: 1000,
                            auto: true,
                            pager: false,
                            controls: true,
                            adaptiveHeight: true
                        });
                    });
                }
            };
        })

        .controller('slideController', function($scope) {
            var imgUrl = baseUrl + 'assets/img/client/slide/';

            $scope.mainSlides = [
                {src: imgUrl + '862552d17e7044309fc98a19cd0ae596.jpg'},
                {src: imgUrl + 'd789c3e86a64488399897c4214e9d42f.jpg'}
            ];

            $scope.promoTopSlides = [
                {src: imgUrl + '53cd4500d43e468184e4e2217089d7b3.jpg'},
            ];

            $scope.promoBottomSlides = [
                {src: imgUrl + '846727487ec946d8b39adfea282bb7e8.jpg'},
            ];
        });
})();
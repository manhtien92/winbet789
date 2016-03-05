(function() {

    'use strict';

    angular
        .module('betApp')
        .controller('AuthController', AuthController);


    function AuthController($auth, $state, $http, $rootScope, $scope, ngDialog) {

        $scope.login = function() {

            var credentials = {
                username: $scope.username,
                password: $scope.password
            }

            $auth.login(credentials).then(function() {

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return $http.get(baseUrl + 'api/authenticate/user');

            // Handle errors
            }, function(error) {

                $scope.error = error.data.error;
                ngDialog.open({ 

                    // Config dialog
                    template: 'assets/view/dialog/popupTmpl.html', 
                    className: 'ngdialog-theme-flat ngdialog-theme-custom',
                    scope: $scope
                });

            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here
            }).then(function(response) {

                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('home');
            });
        }

        // We would normally put the logout method in the same
        // spot as the login method, ideally extracted out into
        // a service. For this simpler example we'll leave it here
        $scope.logout = function() {

            $auth.logout().then(function() {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;
            });
        }
    }

})();
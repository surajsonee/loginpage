(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {

            $http.post('http://127.0.0.1:8000/api-token-auth/', {email: username, password: password})
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = {email: username, token: response.token};

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'JWT ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    }
                }).error(function () {
                // execute callback with false to indicate not successful login
                callback(false)
            })
        }


        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();
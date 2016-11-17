(function() {
    'use strict';

    angular
        .module('app')
        .factory('authToken', authToken);

    authToken.$inject = ['$window', '$http'];

    function authToken($window, $http) {

        var storage = $window.localStorage;
        var cachedToken;
        var userToken = 'token';

        var authToken = {
            setToken: function(token) {
                cachedToken = token;
                storage.setItem(userToken, token);
            },
            getToken: function() {
                if (!cachedToken)
                    cachedToken = storage.getItem(userToken);

                return cachedToken;
            },
            isAuthenticated: function() {
                var token = authToken.getToken();
                if (token) {
                    var params = JSON.parse($window.atob(token.split('.')[1]));
                    return Math.round(new Date().getTime() / 1000) <= params.exp;
                } else {
                    return false;
                }
            },
            removeToken: function() {
                cachedToken = null;
                storage.removeItem(userToken);
                $http.defaults.headers.common.Authorization = '';
            },
            register: function(user) {
                return $http.post('/register', user)
                    .success(function(response) {
                        authToken.setToken(response.token);
                        $http.defaults.headers.common.Authorization = 'JWT ' + response.token;
                    });
            },
            login: function(user) {
                return $http.post('/login', user)
                    .success(function(response) {
                        authToken.setToken(response.token);
                        $http.defaults.headers.common.Authorization = 'JWT ' + response.token;
                    });
            },
            profile: function() {
                return $http.get('/user')
                    .success(function(response) {
                        return response.data;
                    });
            }
        };

        return authToken;
    }
})();

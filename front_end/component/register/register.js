(function() {
    'use strict';

    angular
         //.module('homeFinder', ['ngRoute'])
        .module('homeFinder')
        .controller('RegisterController', ['$scope', '$http', '$location','authToken', function($scope, $http, $location,authToken) {

            $scope.registerUser = function() {
                $http.post('/register', $scope.user)
                    .success(function(response) {
                        $location.path('/');
                        authToken.setToken(response.token);
                        $http.defaults.headers.common.Authorization = response.token;
                    })
                    .error(function(error){
                        console.log(error.error);
                    });
            };
        }]);
})();
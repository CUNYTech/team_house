(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('LoginController', ['$scope', '$http', '$location','authToken', function($scope, $http, $location, authToken){ 
            $scope.loginUser = function() {
                //$http.post('/login', $scope.user).then(successCallBack, errorCallback);
                $http.post('/login', $scope.user)
                    .success(function(response) {
                        $location.path('/');
                        authToken.setToken(response.token);
                        $http.defaults.headers.common.Authorization = response.token;
                    })
                    .error(function(error) {
                        console.log(error.error);
                    });
            };
        }]);
})();
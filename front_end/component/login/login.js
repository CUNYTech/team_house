(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('LoginController', ['$scope', '$http', '$location','authToken', 'toastr', function($scope, $http, $location, authToken, toastr){ 
            $scope.loginUser = function() {
                //$http.post('/login', $scope.user).then(successCallBack, errorCallback);
                $http.post('/login', $scope.user)
                    .success(function(response) {
                        toastr.success('Login Success');
                        $location.path('/');
                        authToken.setToken(response.token);
                        $http.defaults.headers.common.Authorization = response.token;
                    })
                    .error(function(error) {
                        toastr.error("The username and password you entered did not match our records.");
                    });
            };
        }]);
})();
(function() {
    'use strict';

    angular
         //.module('homeFinder', ['ngRoute'])
        .module('homeFinder')
        .controller('RegisterController', ['$scope', '$http', '$location','authToken', 'toastr', function($scope, $http, $location,authToken, toastr) {

            $scope.registerUser = function() {
                $http.post('/register', $scope.user)
                    .success(function(response) {
                        toastr.success('Register Success');
                        $location.path('/');
                        authToken.setToken(response.token);
                        $http.defaults.headers.common.Authorization = response.token;
                    })
                    .error(function(error){
                        toastr.error(error.error);
                    });
            };
        }]);
})();
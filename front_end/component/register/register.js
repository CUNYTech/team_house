(function() {
    'user strict';

    angular
         //.module('homeFinder', ['ngRoute'])
        .module('homeFinder')
        .controller('RegisterController', ['$scope', '$http', 'authToken', function($scope, $http, authToken) {
            $scope.registerUser = function() {
                console.log($scope.user);
                $http.post('/register', $scope.user).
                success(function(response) {
                    //console.log($scope.user);
                    authToken.setToken(response.token);
                    $http.defaults.headers.common.Authorization = 'JWT ' + response.token;
                })
            }
        }]);
})();
(function() {
    'user strict';

    angular
        .module('homeFinder')
        .controller('LoginController', ['$scope', '$http', 'authToken', function($scope, $http, authToken){ 
            $scope.loginUser = function() {
                //$http.post('/login', $scope.user).then(successCallBack, errorCallback);
                $http.post('/login', $scope.user)
                    .success(function(response) {
                        authToken.setToken(response.token);
                        $http.defaults.headers.common.Authorization = 'JWT ' + response.token;
                    })
                    .error(function(error) {
                        console.log(error);
                    })
            }
        }]);
})();
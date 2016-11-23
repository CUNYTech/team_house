(function() {
    'user strict';

    angular
        .module('homeFinder')
        .controller('homeCtrl', ['$scope', '$http', function($scope, $http){ 
            $scope.test = function() {
                //$http.post('/login', $scope.user).then(successCallBack, errorCallback);
                $http.get('/user')
                    .success(function(response) {
                        console.log(response);
                    })
                    .error(function(error) {
                        console.log(error.error);
                    });
            };
        }]);
})();
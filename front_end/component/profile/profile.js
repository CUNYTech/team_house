(function() {
    'user strict';

    angular
        .module('homeFinder')
        .controller('ProfileCtrl', ['$scope', '$http', function($scope, $http){ 
                $http.get('/user')
                    .success(function(response) {
                        console.log(response);
                        $scope.name = response.fullname;
                    })
                    .error(function(error) {
                        console.log(error.error);
                    });
        }]);
})();
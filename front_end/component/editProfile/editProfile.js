(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('EditProfileCtrl', ['$scope', '$http', '$location', 'authToken', '$routeParams', function($scope, $http, $location, authToken, $routeParams){
            $http.get('/user')
                .success(function(response) {
                    console.log(response);
                    $scope.user = {};
                    $scope.user.fullname = response.fullname;
                    $scope.user.email = response.email;
                })
                .error(function(error) {
                    console.log(error.error);
                });

            let vm = this;

            vm.login = authToken.getToken();
            vm.haveInfo = false;

            if (vm.login){
                vm.haveInfo = true;
                $scope.editProfile = function() {
                    $http.put('/put/' + $routeParams.id, $scope.user)
                        .success(function(response) {
                            console.log("success");
                        })
                        .error(function(error){
                            console.log(error.error);
                        });
                };
            }
        }]);
})();
(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('HomeCtrl', ['$scope', '$http', '$filter', 'userPost', 'authToken', function($scope, $http, $filter, userPost,authToken){ 
            let vm = this;

            vm.login = authToken.getToken();
            vm.haveInfo = false;

            if(vm.login && localStorage.getItem("zipcode") != null && localStorage.getItem("zipcode") != 'undefined'){
                vm.getInfo = userPost.houseInfo()
                                .then(function(result){
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                    $scope.info = $filter('filter')(result, {zipcode: localStorage.getItem("zipcode")});
                                    localStorage.removeItem("zipcode");
                                });
            }

            else if (vm.login){
                vm.getInfo = userPost.houseInfo()
                                .then(function(result){
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                    localStorage.removeItem("zipcode");
                                });
            }
        }]);
})();
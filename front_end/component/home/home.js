(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('HomeCtrl', ['$scope', '$http', '$filter', 'userPost', 'authToken', function($scope, $http, $filter, userPost,authToken){ 
            let vm = this;

            vm.login = authToken.getToken();
            vm.haveInfo = false;

            if(vm.login && localStorage.getItem("zipcode") != null){
                vm.getInfo = userPost.houseInfo()
                                .then(function(result){
                                    console.log("if");
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                    $scope.info = $filter('filter')(result, {zipcode: localStorage.getItem("zipcode")});
                                });
            }

            else if (vm.login){
                vm.getInfo = userPost.houseInfo()
                                .then(function(result){
                                    console.log("else if");
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                });
            }
        }]);
})();
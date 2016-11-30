(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('HomeCtrl', ['$scope', '$http', 'userPost', 'authToken', function($scope, $http, userPost,authToken){ 
            var vm = this;

            vm.login = authToken.getToken();
            vm.haveInfo = false;

            if (vm.login){
                vm.getInfo = userPost.houseInfo()
                                .then(function(result){
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                });
            }
        }]);
})();
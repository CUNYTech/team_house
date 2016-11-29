(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('HomeCtrl', ['$scope', '$http', 'userPost',function($scope, $http, userPost){ 
            var vm = this;

            vm.haveInfo = false;

            vm.getInfo = userPost.houseInfo()
                              .then(function(result){
                                  vm.haveInfo = true;
                                  $scope.info = result;
                              });
        }]);
})();
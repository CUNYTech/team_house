(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('SearchCtrl', ['$scope', '$http', '$filter', 'userPost', 'publicPost', 'authToken', function($scope, $http, $filter, userPost, publicPost,authToken){ 
            //Changes CSS when sidebar-toggle button is clicked
             $scope.sidebarToggle = function(){
                  $('#search-wrapper').toggleClass('toggleSidebar');
             }

            let vm = this;

            //vm.login = authToken.getToken();
           // vm.haveInfo = false;

            if(localStorage.getItem("zipcode") !== null && localStorage.getItem("zipcode") !== 'undefined'){
                vm.getInfo = publicPost.houseInfo()
                                .then(function(result){
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                    $scope.info = $filter('filter')(result, {zipcode: localStorage.getItem("zipcode")});
                                    localStorage.removeItem("zipcode");
                                    $scope.currentPage = 0;
                                    $scope.pageSize = 8;
                                    $scope.numberOfPages=function(){
                                        return Math.ceil($scope.info.length/$scope.pageSize);                
                                    };
                                });
            }
            else if (vm.login){
                vm.getInfo = userPost.houseInfo()
                                .then(function(result){
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                    localStorage.removeItem("zipcode");
                                    $scope.currentPage = 0;
                                    $scope.pageSize = 8;
                                    $scope.numberOfPages=function(){
                                        return Math.ceil($scope.info.length/$scope.pageSize);                
                                    };
                                });
            }
            else {
                vm.getInfo = publicPost.houseInfo()
                                .then(function(result){
                                    vm.haveInfo = true;
                                    $scope.info = result;
                                    localStorage.removeItem("zipcode");
                                    $scope.currentPage = 0;
                                    $scope.pageSize = 8;
                                    $scope.numberOfPages=function(){
                                        return Math.ceil($scope.info.length/$scope.pageSize);                
                                    };
                                });
            }
        }])     
        .filter('startFrom', function() {
            return function(input, start) {
                if (!input || !input.length) { return; }
                start = +start; //parse to int
                return input.slice(start);
            };
        });
})();
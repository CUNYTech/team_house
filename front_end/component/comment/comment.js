(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('CommentCtrl', ['$scope', '$http', 'userPost', 'authToken', "$routeParams", function($scope, $http, userPost,authToken, $routeParams){ 
            let vm = this;

            vm.login = authToken.getToken();
            vm.haveInfo = false;

            if (vm.login){
                vm.getInfo = userPost.commentInfo($routeParams.id)
                                .then(function(result){
                                    vm.haveInfo = true;
                                    // console.log(result, "asdasda");
                                    $scope.commentInfo = result;
                                    console.log($scope.commentInfo);
                                });
            }
        }]);
})();
(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('CommentCtrl', ['$scope', '$http', 'userPost', 'authToken', "$routeParams", '$route', function($scope, $http, userPost,authToken, $routeParams, $route){ 
            let vm = this;

            vm.login = authToken.getToken();
            vm.haveInfo = false;

            vm.post = {
                content: ''
            };

            if (vm.login){
                vm.getInfo = userPost.commentInfo($routeParams.id)
                                .then(function(result){
                                    vm.haveInfo = true;
                                    $scope.commentInfo = result;
                                    // console.log($scope.commentInfo);                                  
                                });
                                // $location.path('/');
            // $route.reload();
                vm.submit = function() {
                    $http.post('/post/' + $routeParams.id, vm.post)
                        .success(function(response) {
                            $route.reload();
                        })
                        .error(function(error){
                            console.log(error.error);
                        });
                };
            }
        }]);
})();
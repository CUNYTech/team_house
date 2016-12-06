(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('EditForumCtrl', ['$scope', '$http', '$location', 'userPost', 'authToken', "$routeParams", '$route', function($scope, $http, $location, userPost, authToken, $routeParams, $route){ 
            let vm = this;

            vm.login = authToken.getToken();
            vm.haveInfo = false;

            if (vm.login){
                vm.getInfo = userPost.commentInfo($routeParams.id)
                                .then(function(result){
                                    vm.editing = true;
                                    vm.haveInfo = true;
                                    vm.post = result;                             
                                });
                vm.submit = function() {
                    $http.put('/put/post/' + $routeParams.id, vm.post)
                        .success(function(response) {
                            $location.path('/profile');
                        })
                        .error(function(error){
                            console.log(error.error);
                        });
                };
            }
        }]);
})();
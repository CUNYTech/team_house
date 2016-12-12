(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('DeleteForumCtrl', ['$scope', '$http', '$location', 'userPost', 'authToken', "$routeParams", '$route', 'toastr', function($scope, $http, $location, userPost, authToken, $routeParams, $route, toastr){ 
            let vm = this;
        
            $http.delete('/delete/post/' + $routeParams.id)
                .success(function(response) {
                    toastr.success(response.message);
                    $location.path('/profile');
                })
                .error(function(error){
                    toastr.error(error.error);
                });
        }]);
})();
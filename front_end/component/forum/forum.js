(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('forumCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){ 
            let vm = this;

            vm.post = {
                title: '',
                imageUrl: '',
                content: ''
            };

            vm.submit = function() {
                $http.post('/post', $scope.user)
                    .success(function(response) {
                        console.log(response);
                        $location.path('/');
                    })
                    .error(function(error){
                        console.log(error.error);
                    });
            };
        }]);
})();
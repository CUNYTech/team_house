(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('ForumCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){ 
            let vm = this;
            vm.editing = false;

            vm.post = {
                title: '',
                imageUrl: '',
                content: '',
                rent: '',
                sale: '',
                zipcode: '',
                address: ''
            };

            vm.submit = function() {
                $http.post('/post', vm.post)
                    .success(function(response) {
                        $location.path('/');
                    })
                    .error(function(error){
                        console.log(error.error);
                    });
            };
        }]);
})();
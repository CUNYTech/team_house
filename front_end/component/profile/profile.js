(function() {
    'user strict';

    angular
        .module('homeFinder')
        .controller('ProfileCtrl', ['$scope', '$http', '$filter', 'userPost', 'authToken', function($scope, $http, $filter, userPost,authToken){
                var user;
                $http.get('/user')
                    .success(function(response) {
                        //console.log(response);
                        user = response;
                        $scope.name = user.fullname;
                    })
                    .error(function(error) {
                        console.log(error.error);
                    });

                //Gettting the users posts to show up on profile
                let vm = this;
                vm.login = authToken.getToken();
                vm.haveInfo = false;
                if (vm.login){
                    vm.getInfo = userPost.houseInfo()
                        .then(function(result){
                            vm.haveInfo = true;
                            $scope.info = $filter('filter')(result, {createdBy:{ _id: user.id}});
                        });
                }
        }]);
})();
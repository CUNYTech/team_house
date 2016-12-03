(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('navCtrl', navCtrl);

    navCtrl.$inject = ['$scope', '$location', '$route', 'authToken'];

    function navCtrl($scope, $location, $route, authToken) {
        let vm = this;
        vm.isAuthenticated = authToken.isAuthenticated();
        vm.logout = function() {
            authToken.removeToken();
            $location.path('/');
            $route.reload();
        };
        vm.submit = function() {
            var zipcode = $scope.search;
            localStorage.setItem("zipcode", zipcode);
            $location.path('/');
            $route.reload();
        };

        vm.home = function() {
            $location.path('/');
            $route.reload();
        }
    }
})();

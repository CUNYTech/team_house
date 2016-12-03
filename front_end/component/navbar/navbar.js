(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('navCtrl', navCtrl);

    navCtrl.$inject = ['$scope', '$location', '$route', 'authToken'];

    function navCtrl($scope, $location, $route, authToken) {
        $scope.isAuthenticated = authToken.isAuthenticated();
        $scope.logout = function() {
            authToken.removeToken();
            $location.path('/');
            $route.reload();
        };
        $scope.submit = function() {
            var zipcode = $scope.search;
            localStorage.setItem("zipcode", zipcode);
            $location.path('/');
            $route.reload();
        };
    }
})();
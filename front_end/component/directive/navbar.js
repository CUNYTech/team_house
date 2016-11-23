(function () {
    'use strict';

    angular
        .module('homeFinder')
        .directive('navbar', navbar);

        function navbar () {
            return {
                restrict: 'EA',
                templateUrl: '/component/navbar/navbar.html',
            };
        }
})();

(function() {
    'user strict';

    angular
        .module('app', ['ngRoute'])
        .config(config)
        .run(run);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/index.html'
            });
        $locationProvider.html5Mode(true);
    }

    function run($http, $window) {
        if ($window.localStorage['token']) {
             $http.defaults.headers.common['Authorization'] = 'JWT ' + $window.localStorage['token'];
        }
    }
})();

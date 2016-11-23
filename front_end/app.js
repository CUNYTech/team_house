
(function() {
    'user strict';

    angular
        .module('homeFinder', ['ngRoute'])
        .config(config)
        .run(run);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'component/home/home.html'
            })
            .when('/register', {
                templateUrl: 'component/register/register.html'
            })
            .when('/profile', {
                templateUrl: 'profile/profile.html'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }

    function run($http, $window) {
        if ($window.localStorage['token']) {
             $http.defaults.headers.common['Authorization'] = 'JWT ' + $window.localStorage['token'];
        }
    }
})();

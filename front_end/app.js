
(function() {
    'use strict';

    angular
        .module('homeFinder', ['ngRoute'])
        .config(config)
        .run(run);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'component/home/home.html'
            })
            .when('/login', {
                templateUrl: 'component/login/login.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'component/register/register.html',
                controller: 'RegisterController'
            })
            .when('/profile', {
                templateUrl: 'profile/profile.html'
            })
            .when('/forum', {
                templateUrl: 'component/forum/forum.html',
                controller: 'ForumCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }

    function run($http, $window) {
        if ($window.localStorage['token']) {
             $http.defaults.headers.common['Authorization'] = $window.localStorage['token'];
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('homeFinder', ['ngRoute'])
        .config(config)
        .run(run);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'component/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
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
                templateUrl: 'component/profile/profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/forum', {
                templateUrl: 'component/forum/forum.html',
                controller: 'ForumCtrl',
                controllerAs: 'vm'
            })
            .when('/post/:id', {
                templateUrl: 'component/comment/comment.html',
                controller: 'CommentCtrl',
                controllerAs: 'vm'
            })
            .when('/put/:id', {
                templateUrl: 'component/register/register.html',
                controller: 'EditProfileCtrl',
                controllerAs: 'vm'
            })
            .when('/put/post/:id', {
                templateUrl: 'component/forum/forum.html',
                controller: 'EditForumCtrl',
                controllerAs: 'vm'
            })
            .when('/search', {
                templateUrl: 'component/search/search.html',
                controller: 'SearchCtrl',
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

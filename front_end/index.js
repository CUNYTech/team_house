//AngularJS for the index.html
var app = angular.module('homeFinder', ["ngRoute"]);

app.controller('mainBody', function($scope){
    $scope.what = "Home Finder";
});

app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "index.html"
    })
    .when("/hello", {
        templateUrl : "hello.htm"
    });
});

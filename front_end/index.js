//AngularJS for the index.html
var app = angular.module('homeFinder', []);

app.controller("mainBody", [$scope, function($scope){
    $scope.what = "Home Finder";
}]);

app.config("homeFinder", ["ngRoute", function($ngRoute){
    $ngRoute
    .when("/", {
        templateUrl : "index.html"
    })
    .when("/hello", {
        templateUrl : "hello.html"
    });
}]);


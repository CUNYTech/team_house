//AngularJS for the index.html
var app = angular.module('homeFinder', ["ngRoute"]);

app.controller('mainBody', function($scope){
    $scope.what = "Home Finder";
});

app.controller('registerModal', function($scope){
    $scope.signup = "Sign Up";
    $scope.firstname = "Daniel";
    console.log($scope.firstname);
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

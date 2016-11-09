//AngularJS for the index.html
var app = angular.module('homeFinder', ["ngRoute"]);

app.controller('mainBody', function($scope){
    $scope.what = "Home Finder";
});

app.controller('registerModal', function($scope){
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.username = '';
    $scope.emailAddress = '';
    $scope.password = '';
    $scope.confPassword = '';
    
    // $scope.$watch('firstname', function(firstname){
    //     console.log(firstname)
    // });
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

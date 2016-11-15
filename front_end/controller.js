//AngularJS for the index.html
//var app = angular.module('homeFinder', ["ngRoute", $scope, $http]);
var app = angular.module('homeFinder', ["ngRoute"]);

app.controller('mainBody', ['$scope', '$http', function($scope, $http){
    //$scope.what = "Home Finder";
$scope.registerUser = function () {
    console.log($scope.user);
     $http.post('/register', $scope.user)   
};

}]);

// app.controller('registerModal', function($scope){
//     $scope.firstname = '';
//     $scope.lastname = '';
//     $scope.username = '';
//     $scope.emailAddress = '';
//     $scope.password = '';
//     $scope.confPassword = '';
    
//     // $scope.$watch('firstname', function(firstname){
//     //     console.log(firstname)
//     // });
// });

// app.config(function($routeProvider){
//     $routeProvider
//     .when("/", {
//         templateUrl : "index.html"
//     })
//     .when("/hello", {
//         templateUrl : "hello.htm"
//     });
// });

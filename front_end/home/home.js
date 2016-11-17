//AngularJS for the index.html
//var app = angular.module('homeFinder', ["ngRoute", $scope, $http]);
var app = angular.module('homeFinder', ["ngRoute"]);

app.controller('signIn', ['$scope', '$http', function($scope, $http){
    $scope.logInUser = function () {
        //console.log($scope.user);
        //$http.post('/login', $scope.user).then(successCallBack, errorCallback);   
        $http.post('/login', $scope.user)
            .success(function(response){
                console.log("hello");
                $scope.loggedIn = true;
                $scope.fullName = "Allan Scrumaster";
            })
            .error(function(error){
                console.log(error);
            });
    };

    $http.get('/user').then(function(response){
        $scope.userInfo = response.data;
        console.log(response.data);
    });


}]);

app.controller('signUp', ['$scope', '$http', function($scope, $http){
    $scope.registerUser = function () {
        console.log($scope.user);
        $http.post('/register', $scope.user);   
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

//AngularJS for the index.html
//var app = angular.module('homeFinder', ["ngRoute", $scope, $http]);
var app = angular.module('homeFinder', ["ngRoute"])
    .run(run);

app.controller('signIn', ['$scope', '$http', 'authToken', function($scope, $http, authToken) {
    $scope.logInUser = function() {
        //console.log($scope.user);
        //$http.post('/login', $scope.user).then(successCallBack, errorCallback);
        $http.post('/login', $scope.user)
            .success(function(response) {
                authToken.setToken(response.token);
                $http.defaults.headers.common.Authorization = 'JWT ' + response.token;
            })
            .error(function(error) {
                console.log(error);
            });
    };
    $scope.test = function () {
        $http.get('/user').then(function(response) {
            $scope.userInfo = response.data;
        });
    };

}]);

app.controller('signUp', ['$scope', '$http', 'authToken', function($scope, $http, authToken) {
    $scope.registerUser = function() {
        $http.post('/register', $scope.user).
        success(function(response) {
            authToken.setToken(response.token);
            $http.defaults.headers.common.Authorization = 'JWT ' + response.token;
        });
    };
}]);

function run($http, $window) {
    if ($window.localStorage['token']) {
        $http.defaults.headers.common['Authorization'] = 'JWT ' + $window.localStorage['token'];
    }
}

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

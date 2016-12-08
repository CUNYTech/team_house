(function() {
    'use strict';
    
    angular
        .module('homeFinder')
        .controller('HouseDetail', ['$scope', '$http', '$location','authToken', function($scope, $http, $location, authToken){ 
            let vm = this;

            vm.getHouse = function() {
                $http.get('/house/2114%20Bigelow%20Ave/Seattle,WA')
                    .success(function(response) {
                        console.log(response['SearchResults:searchresults'].response.results.result);
                    })
                    .error(function(error) {
                        console.log(error.error);
                    });
            };
        }]);
    
})();
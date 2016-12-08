(function() {
    'use strict';
    
    angular
        .module('homeFinder')
        .controller('HouseDetail', ['$scope', '$http', '$location','authToken', function($scope, $http, $location, authToken){ 
            let vm = this;

            vm.haveInfo = false;
            vm.house = {
                address: '',
                citystate: ''
            };
            
            vm.getHouse = function() {
                $http.get('/house/' + vm.house.address + '/' + vm.house.citystate)
                    .success(function(response) {
                        if (response['SearchResults:searchresults'].message.code !== '0'){
                            throw Error(response['SearchResults:searchresults'].message.text);
                        }
                        console.log(response);
                        vm.houseInfo = response['SearchResults:searchresults'].response.results.result;
                        console.log(vm.houseInfo);
                        vm.haveInfo = true;
                    });
            };
        }]);
    
})();
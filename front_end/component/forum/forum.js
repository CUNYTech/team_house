(function() {
    'use strict';

    angular
        .module('homeFinder')
        .controller('ForumCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){ 
            let vm = this;
            vm.editing = false;

            vm.post = {
                title: '',
                imageUrl: '',
                content: '',
                rent: '',
                sale: '',
                zipcode: '',
                address: '',
                zillow: [{      
                    lastSoldDate : '',
                    lastSoldPrice : '',
                    lastSoldCurrency : '', 
                    finishedSqFt : '',
                    lotSizeSqFt : '',
                    useCode : '',
                    yearBuilt : '',
                    bathrooms : '',
                    bedrooms : ''
                }]
            };


            vm.getHouse = function() {
                $http.get('/house/' + vm.post.address + '/' + vm.post.citystate)
                    .success(function(response) {
                        if (response['SearchResults:searchresults'].message.code === '0'){
                            vm.post.zillow = response['SearchResults:searchresults'].response.results.result;
                            if (response['SearchResults:searchresults'].response.results.result.lastSoldPrice){
                                vm.post.zillow.lastSoldCurrency = response['SearchResults:searchresults'].response.results.result.lastSoldPrice['$'].currency;
                                vm.post.zillow.lastSoldPrice = response['SearchResults:searchresults'].response.results.result.lastSoldPrice._;
                            }
                            if (response['SearchResults:searchresults'].response.results.result.address)
                                vm.post.zipcode = response['SearchResults:searchresults'].response.results.result.address.zipcode;
                            // console.log(response['SearchResults:searchresults'].response.results.result);
                        }
                        $http.post('/post', vm.post)
                            .success(function(response) {
                                $location.path('/');
                            })
                            .error(function(error){
                                console.log(error.error);
                            });
                    });
            };
        }]);
})();
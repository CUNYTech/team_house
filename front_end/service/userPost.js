(function() {
    'use strict';

    angular
        .module('homeFinder')
        .factory('userPost', userPost);

    userPost.$inject = ['$http'];

    function userPost($http) {

        let userPost = {

            houseInfo: function(){
                return $http.get('/post')
                            .then(function(response) {
                                return response.data;
                            });
            },
        };
        return userPost;
    }
})();

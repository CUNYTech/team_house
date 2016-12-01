(function() {
    'use strict';

    angular
        .module('homeFinder')
        .factory('userPost', userPost);

    userPost.$inject = ['$http'];

    function userPost($http) {

        let userPost = {

            houseInfo: function(){
                return $http.get('/api/post')
                            .then(function(response) {
                                return response.data;
                            });
            },
            commentInfo: function(passID){
                // console.log(passID);
                let id = '/api/post/' + passID;
                // console.log(id);
                return $http.get(id)
                            .then(function(response) {
                                return response.data;
                            });
            },
        };
        return userPost;
    }
})();

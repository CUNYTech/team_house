(function() {
    'use strict';

    angular
        .module('homeFinder')
        .factory('publicPost', publicPost);

    publicPost.$inject = ['$http'];

    function publicPost($http) {

        let publicPost = {

            houseInfo: function(){
                return $http.get('/public/post')
                            .then(function(response) {
                                return response.data;
                            });
            },
            commentInfo: function(passID){
                // console.log(passID);
                let id = '/public/post/' + passID;
                // console.log(id);
                return $http.get(id)
                            .then(function(response) {
                                return response.data;
                            });
            },
        };
        return publicPost;
    }
})();

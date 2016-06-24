(function () {
    'use strict';

    angular
        .module('app')
        .factory('OrdersService', OrdersService);

    function OrdersService($http) {
        return {
            get: function (user) {
                return $http.get('http://localhost:8000/orders/list/?user_login=' + user)
                    .then(function (resp) {
                        return resp.data;
                    });
            }
        }
    }

})();

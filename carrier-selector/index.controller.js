(function () {
    'use strict';

    angular
        .module('app')
        .controller('CarrierSelector.IndexController', Controller);

    function Controller($scope, $rootScope, $location) {
        $rootScope.order.carrier = {
            carrier: '',
            carrier_service: '',
            price: '',
            surcharge: '',
            surcharge_flat: '',
            tax: '',
            total: '',
            delivery_time: '',
            api_key: ''
        };

        $scope.back = function () {
            $location.path('/order')
        };

        $scope.select = function (price) {
            $rootScope.order.carrier.carrier = price.carrier;
            $rootScope.order.carrier.carrier_service = price.carrier_service;
            $rootScope.order.carrier.price = price.price;
            $rootScope.order.carrier.surcharge = price.surcharge;
            $rootScope.order.carrier.surcharge_flat = price.surcharge_flat;
            $rootScope.order.carrier.tax = price.tax;
            $rootScope.order.carrier.total = price.total;
            $rootScope.order.carrier.delivery_time = price.delivery_time;
            $rootScope.order.carrier.user_login = price.user_login;
            $rootScope.order.carrier.api_key = price.api_key;
            $rootScope.order.carrier.account_number = price.account_number;
            $rootScope.order.carrier.service_code = price.service_code;

            if (price.carrier === 'COURIERS PLEASE') {
                $location.path('/cp-specify')
            }
            else {
                alert("On construction! Only Couriers please ready!")
            }
        }
    }


})();
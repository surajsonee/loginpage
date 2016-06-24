(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrderList.IndexController', Controller);

    function Controller($scope, $rootScope, $location, $localStorage, OrdersService) {
        $scope.orders = [];

        $rootScope.orderview = {};

        OrdersService.get($localStorage.currentUser.username).then(function (data) {
            $scope.orders = data.results;
        });

        $scope.select = function (order) {
            $rootScope.orderview.created_date = order.created_date;
            $rootScope.orderview.carrier = order.carrier;
            $rootScope.orderview.carrier_service = order.carrier_service;
            $rootScope.orderview.total_items = order.total_items;
            $rootScope.orderview.total_weight = order.total_weight;
            $rootScope.orderview.total_volume = order.total_volume;
            $rootScope.orderview.price = order.price;
            $rootScope.orderview.surcharge = order.surcharge;
            $rootScope.orderview.tax = order.tax;
            $rootScope.orderview.delivery_instructions = order.delivery_instructions;
            $rootScope.orderview.sender_addr1 = order.sender_addr1;
            $rootScope.orderview.sender_addr2 = order.sender_addr2;
            $rootScope.orderview.sender_addr3 = order.sender_addr3;
            $rootScope.orderview.sender_postcode = order.sender_postcode;
            $rootScope.orderview.sender_suburb = order.sender_suburb;
            $rootScope.orderview.sender_contact = order.sender_contact;
            $rootScope.orderview.sender_email = order.sender_email;
            $rootScope.orderview.sender_phone = order.sender_phone;
            $rootScope.orderview.receiver_addr1 = order.receiver_addr1;
            $rootScope.orderview.receiver_addr2 = order.receiver_addr2;
            $rootScope.orderview.receiver_addr3 = order.receiver_addr3;
            $rootScope.orderview.receiver_postcode = order.receiver_postcode;
            $rootScope.orderview.receiver_suburb = order.receiver_suburb;
            $rootScope.orderview.receiver_contact = order.receiver_contact;
            $rootScope.orderview.receiver_email = order.receiver_email;
            $rootScope.orderview.receiver_phone = order.receiver_phone;
            $rootScope.orderview.atl = order.atl;
            $rootScope.orderview.consignment_status = order.consignment_status;
            $rootScope.orderview.consignment_connote = order.consignment_connote;
            $rootScope.orderview.manifest = order.manifest;
            $rootScope.orderview.pickup_datetime = order.pickup_datetime;

            $location.path('/order-view')

        };

        $scope.back = function () {
            $location.path('/')
        }
    }

})();

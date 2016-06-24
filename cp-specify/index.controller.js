(function () {
    'use strict';

    angular
        .module('app')
        .controller('CPSpecify.IndexController', Controller);

    function Controller($scope, $rootScope, $http, ZoneCarrierService, OrderSaveService) {
        $scope.orders = {
                user_login: '',
                service_code: '',
                api_key: '',
                account_number: '',
                carrier: '',
                carrier_service: '',
                total_items: '',
                total_weight: '',
                total_volume: '',
                price: '',
                surcharge: '',
                tax: '',
                delivery_instructions: '',
                sender_addr1: '',
                sender_addr2: '',
                sender_addr3: '',
                sender_postcode: '',
                sender_suburb: '',
                sender_contact: '',
                sender_email: '',
                sender_phone: '',
                receiver_addr1: '',
                receiver_addr2: '',
                receiver_addr3: '',
                receiver_postcode: '',
                receiver_suburb: '',
                receiver_contact: '',
                receiver_email: '',
                receiver_phone: '',
                atl: '',
                consignment_status: 'consignment',
                consignment_connote: 'consignment',
                manifest: '',
                pickup_datetime: null
            };

        $rootScope.order.delivery = {pickup: {}, drop: {}};
        $rootScope.order.from_data = {"id": "",
            "locality_index":"",
            "country":"",
            "suburb":"",
            "postcode":"",
            "state":"",
            "carrier":"",
            "zone":""};
        $rootScope.order.to_data = {"id": "",
            "locality_index":"",
            "country":"",
            "suburb":"",
            "postcode":"",
            "state":"",
            "carrier":"",
            "zone":""};

        ZoneCarrierService.get($rootScope.order.from,
            $rootScope.order.carrier.carrier,
            $rootScope.order.carrier.carrier_service)
            .then(function (data) {
                $rootScope.order.from_data = data.results[0];
            });

        ZoneCarrierService.get($rootScope.order.to, $rootScope.order.carrier.carrier,
            $rootScope.order.carrier.carrier_service)
            .then(function (data) {
                $rootScope.order.to_data = data.results[0];
            });

        $scope.save = function() {

            delete $http.defaults.headers.common['X-Requested-With'];

            // Be carefull with pricecode
            $rootScope.order.carrier.labels = true;
            $rootScope.order.carrier.alt = $scope.order.atl = $scope.alt;
            $rootScope.order.carrier.reference = $scope.reference;
            $rootScope.order.delivery.pickup.addr0 = $scope.form.paddr0;
            $rootScope.order.delivery.pickup.addr1 = $scope.form.paddr1;
            $rootScope.order.delivery.pickup.addr2 = $scope.form.paddr2;
            $rootScope.order.delivery.pickup.addr3 = $scope.form.paddr3;
            $rootScope.order.delivery.pickup.contact =$scope.form.pcontact;
            $rootScope.order.delivery.pickup.email = $scope.form.pemail;
            $rootScope.order.delivery.pickup.phone = $scope.form.pphone;
            $rootScope.order.delivery.drop.addr0 = $scope.form.daddr0;
            $rootScope.order.delivery.drop.addr1 = $scope.form.daddr1;
            $rootScope.order.delivery.drop.addr2 = $scope.form.daddr2;
            $rootScope.order.delivery.drop.addr3 = $scope.form.daddr3;
            $rootScope.order.delivery.drop.contact = $scope.form.dcontact;
            $rootScope.order.delivery.drop.email = $scope.form.demail;
            $rootScope.order.delivery.drop.phone = $scope.form.dphone;

            $http({
                url: 'http://edi.couriersplease.com.au/api/consignment/',
                method: 'POST',
                data: '<cpl key="' + $rootScope.order.carrier.api_key + '" ' + 'output="json">' +
                '<consignment items="' + $rootScope.order.total_items + '" ' +
                'weight="' + $rootScope.order.total_weight + '" ' +
                'volume="' + $rootScope.order.total_cubes + '" ' +
                'pricecode="' + $rootScope.order.carrier.service_code + '" ' +
                'labels="' + $rootScope.order.carrier.labels + '" ' +
                'atl="' + $rootScope.order.carrier.alt + '" >' +
                '<reference reference="' + $rootScope.order.carrier.reference + '"/>' +
                '<pickup addr0="' + $rootScope.order.delivery.pickup.addr0 + '" ' +
                'addr1="' + $rootScope.order.delivery.pickup.addr1 + '" ' +
                'addr2="' + $rootScope.order.delivery.pickup.addr2 + '" ' +
                'addr3="' + $rootScope.order.delivery.pickup.addr3 + '" ' +
                'suburb="' + $rootScope.order.from_data.suburb + '" ' +
                'postcode="' + $rootScope.order.from_data.postcode + '" ' +
                'contact="' + $rootScope.order.delivery.pickup.contact + '" ' +
                'email="' + $rootScope.order.delivery.pickup.email + '" ' +
                'phone="' + $rootScope.order.delivery.pickup.phone + '"/>' +
                '<delivery addr0="' + $rootScope.order.delivery.drop.addr0 + '" ' +
                'addr1="' + $rootScope.order.delivery.drop.addr1 + '" ' +
                'addr2="' + $rootScope.order.delivery.drop.addr2 + '" ' +
                'addr3="' + $rootScope.order.delivery.drop.addr3 + '" ' +
                'suburb="' + $rootScope.order.to_data.suburb + '" ' +
                'postcode="' + $rootScope.order.to_data.postcode + '" ' +
                'contact="' + $rootScope.order.delivery.drop.contact + '" ' +
                'email="' + $rootScope.order.delivery.drop.email + '" ' +
                'phone="' + $rootScope.order.delivery.drop.phone + '"/>' +
                '</consignment>' +
                '</cpl>'
            }).success(function (response) {
                $scope.response = response;
                $rootScope.order.manifest = response.cpl.consignment.pdf["#text"];

                $scope.orders.user_login = $rootScope.order.carrier.user_login;
                $scope.orders.api_key = $rootScope.order.carrier.api_key;
                $scope.orders.delivery_instructions = $rootScope.order.carrier.reference;
                $scope.orders.account_number = $rootScope.order.carrier.account_number;
                $scope.orders.service_code = $rootScope.order.carrier.service_code;
                $scope.orders.consignment_status = response.cpl.consignment.status;
                $scope.orders.consignment_connote = response.cpl.consignment.connote;
                $scope.orders.carrier = $rootScope.order.carrier.carrier;
                $scope.orders.carrier_service = $rootScope.order.carrier.carrier_service;
                $scope.orders.total_items = $rootScope.order.total_items;
                $scope.orders.total_weight = $rootScope.order.total_weight;
                $scope.orders.total_volume = $rootScope.order.total_cubes;
                $scope.orders.price = $rootScope.order.carrier.price;
                $scope.orders.surcharge = $rootScope.order.carrier.surcharge;
                $scope.orders.tax = $rootScope.order.carrier.tax;
                $scope.orders.sender_addr1 = $rootScope.order.delivery.pickup.addr1;
                $scope.orders.sender_addr2 = $rootScope.order.delivery.pickup.addr2;
                $scope.orders.sender_addr3 = $rootScope.order.delivery.pickup.addr3;
                $scope.orders.sender_postcode = $rootScope.order.from_data.postcode;
                $scope.orders.sender_suburb = $rootScope.order.from_data.suburb;
                $scope.orders.sender_contact = $rootScope.order.delivery.pickup.contact;
                $scope.orders.sender_email = $rootScope.order.delivery.pickup.email;
                $scope.orders.sender_phone = $rootScope.order.delivery.pickup.phone;
                $scope.orders.receiver_addr1 = $rootScope.order.delivery.drop.addr1;
                $scope.orders.receiver_addr2 = $rootScope.order.delivery.drop.addr2;
                $scope.orders.receiver_addr3 = $rootScope.order.delivery.drop.addr3;
                $scope.orders.receiver_postcode = $rootScope.order.to_data.postcode;
                $scope.orders.receiver_suburb = $rootScope.order.to_data.suburb;
                $scope.orders.receiver_contact = $rootScope.order.delivery.drop.contact;
                $scope.orders.receiver_email = $rootScope.order.delivery.drop.email;
                $scope.orders.receiver_phone = $rootScope.order.delivery.drop.phone;
                $scope.orders.atl = $rootScope.order.carrier.alt;
                $scope.orders.manifest = $rootScope.order.manifest;

                OrderSaveService.post($scope.orders).then(function (data) {
                    console.log(data + ' with data: ' + $rootScope.order)
                });

                alert('Order saved');

            }).error(function (error) {
                $scope.error = error;
                alert(error)
            });
        };

        $scope.getPDF = function(){
            var pdf = $rootScope.order.manifest;
            var winlogicalname = "pdf";
            var winparams = 'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,'+
                'resizable,screenX=50,screenY=50,width=850,height=1050';

            var htmlText = '<embed width=100% height=100%'
                + ' type="application/pdf"'
                + ' src="data:application/pdf;base64,'
                + escape(pdf)
                + '"></embed>';

            // Open PDF in new browser window
            var detailWindow = window.open ("", winlogicalname, winparams);
            detailWindow.document.write (htmlText);
            detailWindow.document.close ();
        }

    }
})();
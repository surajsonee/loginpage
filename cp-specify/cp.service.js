(function () {
    'use strict';

    angular
        .module('app')
        .factory('ZoneCarrierService', ZoneCarrierService)
        .factory('OrderSaveService', OrderSaveService);

    function ZoneCarrierService($http) {
        return {
            get: function (locality, carrier, service) {
                return $http.get('http://localhost:8000/rates/zones/?locality_index=' + locality +
                    '&carrier=' + capitalize(carrier) + '&carrier_service=' + capitalize(service))
                    .then(function (resp) {
                        return resp.data;
                    });
            }
        }
    }

    function OrderSaveService($http) {
        return {
            post: function (data) {
                return $http.post('http://localhost:8000/orders/list/', data)
                    // '?user_login=' + user_login +
                    // '&service_code=' + service_code +
                    // '&api_key=' + api_key +
                    // '&account_number=' + account_number +
                    // '&carrier=' + carrier +
                    // '&carrier_service=' + carrier_service +
                    // '&total_items=' + total_items +
                    // '&total_weight=' + total_weight +
                    // '&total_volume=' + total_volume +
                    // '&price=' + price +
                    // '&surcharge=' + surcharge +
                    // '&text=' + text +
                    // '&delivery_instructions=' + delivery_instructions +
                    // '&sender_addr1=' + sender_addr1 +
                    // '&sender_addr2=' + sender_addr2 +
                    // '&sender_addr3=' + sender_addr3 +
                    // '&sender_postcode=' + sender_postcode +
                    // '&sender_suburb=' + sender_suburb +
                    // '&sender_contact=' + sender_contact +
                    // '&sender_email=' + sender_email +
                    // '&sender_phone=' + sender_phone +
                    // '&receiver_addr1=' + receiver_addr1 +
                    // '&receiver_addr2=' + receiver_addr2 +
                    // '&receiver_addr3=' + receiver_addr3 +
                    // '&receiver_postcode=' + receiver_postcode +
                    // '&receiver_suburb=' + receiver_suburb +
                    // '&receiver_contact=' + receiver_contact +
                    // '&receiver_email=' + receiver_email +
                    // '&receiver_phone=' + receiver_phone +
                    // '&atl=' + atl +
                    // '&consignment=' + consignment +
                    // '&manifest=' + manifest
                .then(function (resp) {
                    return resp.data;
                });
            }
        }
    }

    function capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }

})();
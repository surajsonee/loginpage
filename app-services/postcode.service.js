(function () {
    'use strict';

    angular
        .module('app')
        .factory('PostcodeService', PostcodeService)
        .factory('PriceService', PriceService)
        .factory('ZoneService', ZoneService);

    function PostcodeService($http) {
        return {
            get: function (url) {
                return $http.get(url).then(function (resp) {
                    return resp.data;
                });
            }
        }
    }
    
    function PriceService($http) {
        return {
            get: function (zone_from, zone_to, length, width, height, weight) {
                return $http.get('http://localhost:8000/rates/calc/?zone_from=' + zone_from 
                    + '&zone_to=' + zone_to 
                    + '&length=' + length
                    + '&width=' + width
                    + '&height=' + height
                    + '&weight=' + weight)
                    .then(function (resp) {
                        return resp.data;
                    });
            }
        }
    }

    function ZoneService($http) {
        return {
            get: function (locality) {
                return $http.get('http://localhost:8000/rates/zones/?locality_index=' + locality)
                    .then(function (resp) {
                        return resp.data;
                    });
            }
        }
    }

})();

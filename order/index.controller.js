(function () {
    'use strict';

    angular
        .module('app')
        .controller('Order.IndexController', Controller);

    function Controller($scope, $rootScope, $location, PostcodeService, PriceService, ZoneService) {
        var api = 'http://localhost:8000',
            rates_api = api + '/rates/list/',
            zones_api = api + '/rates/zones/';

        $rootScope.prices = [];

        $rootScope.order = {
            packages: [],
            from: '',
            to: '',
            total_cubes: '',
            total_items: '',
            total_length: '',
            total_width: '',
            total_height: '',
            total_weight: '',
            average_item_weight: ''
        };
        $scope.order.packages = [{id: 1, items: 0, length: '', width: '', height: '', weight: ''}];

        $scope.addNewPackage = function () {
            var newItemNo = $rootScope.order.packages.length + 1;
            $rootScope.order.packages.push({
                id: '' + newItemNo,
                items: 0,
                length: '',
                width: '',
                height: '',
                weight: ''
            });
        };

        $scope.removeNewPackage = function () {
            var newItemNo = $rootScope.order.packages.length - 1;
            if (newItemNo !== 0) {
                $rootScope.order.packages.pop();
            }
        };


        PostcodeService.get('app-content/localities.json').then(function (data) {
            $scope.zones = data;
        });

        $scope.selected_from = undefined;
        $scope.selected_to = undefined;

        $scope.ngModelOptionsSelectedFrom = function (value) {
            if (arguments.length) {
                $scope.selected_from = value;
            } else {
                return $scope.selected_from;
            }
        };

        $scope.ngModelOptionsSelectedTo = function (value) {
            if (arguments.length) {
                $scope.selected_to = value;
            } else {
                return $scope.selected_to;
            }
        };

        $scope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };

        $scope.getPrice = function () {

            ZoneService.get($scope.selected_from).then(function (data) {
                $scope.zone_from_data = data.results;
                ZoneService.get($scope.selected_to).then(function (data) {
                    $scope.zone_to_data = data.results;
                    for (var i = 0; i < $scope.zone_from_data.length; i++) {
                        for (var j = 0; j < $scope.zone_to_data.length; j++) {
                            if ($scope.zone_from_data[i].carrier === $scope.zone_to_data[j].carrier) {
                                PriceService.get($scope.zone_from_data[i].zone,
                                    $scope.zone_to_data[j].zone,
                                    $rootScope.order.total_length, $rootScope.order.total_width, $rootScope.order.total_height,
                                    $rootScope.order.total_weight, $rootScope.order.total_cubes).then(function (data) {
                                    for (var x = 0; x < data.length; x++) {
                                        if (data[x] == 'There is no rates for you!') {
                                            $rootScope.prices[0] = 'There is no rates for you!'
                                        }
                                        else {
                                            $rootScope.prices.push(data[x]);
                                        }
                                    }

                                })
                            }
                        }
                    }
                })
            });
            $location.path('/carrier-selector');
        };

        $scope.$watch('order', function () {
            $rootScope.order.from = $scope.ngModelOptionsSelectedFrom();
            $rootScope.order.to = $scope.ngModelOptionsSelectedTo();
            $rootScope.order.total_cubes = 0.0;
            $rootScope.order.total_items = 0;
            $rootScope.order.total_length = 0.0;
            $rootScope.order.total_width = 0.0;
            $rootScope.order.total_height = 0.0;
            $rootScope.order.total_weight = 0.0;
            $scope.all_weights = [];
            for (var i = 0; i < $rootScope.order.packages.length; i++) {
                $rootScope.order.total_cubes = Math.round(parseFloat($rootScope.order.total_cubes +
                    ($rootScope.order.packages[i].items * (($rootScope.order.packages[i].length / 100) *
                    ($rootScope.order.packages[i].width / 100) *
                    ($rootScope.order.packages[i].height / 100)))).toFixed(6)*1000000) / 1000000;
                $rootScope.order.total_items = parseInt($rootScope.order.total_items) +
                    parseInt($rootScope.order.packages[i].items);
                $rootScope.order.total_length = Math.round(parseFloat($rootScope.order.total_length +
                    ($rootScope.order.packages[i].items * $rootScope.order.packages[i].length / 100)).toFixed(6)*1000000) / 1000000;
                $rootScope.order.total_width = Math.round(parseFloat($rootScope.order.total_width +
                    ($rootScope.order.packages[i].items * $rootScope.order.packages[i].width / 100)).toFixed(6)*1000000) / 1000000;
                $rootScope.order.total_height = Math.round(parseFloat($rootScope.order.total_height +
                    ($rootScope.order.packages[i].items * $rootScope.order.packages[i].height / 100)).toFixed(6)*1000000) / 1000000;
                $rootScope.order.total_weight = Math.round(parseFloat($rootScope.order.total_weight +
                    ($rootScope.order.packages[i].items * $rootScope.order.packages[i].weight)).toFixed(6)*1000000) / 1000000;

                for (var j = 0; j < $rootScope.order.packages[i].items; j++) {
                    $scope.all_weights.push($rootScope.order.packages[i].weight);
                }
            }
            $rootScope.order.average_item_weight = Math.round(parseFloat(Math.max.apply(Math, $scope.all_weights))*10000) / 10000;

        }, true);


    }

})();
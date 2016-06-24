(function () {
    'use strict';

    angular
        .module('app')
        .controller('Postcode.IndexController', Controller);

    function Controller($scope, $http, PostcodeService, PriceService, ZoneService) {
        var api = 'http://localhost:8000',
            rates_api = api + '/rates/list/',
            zones_api = api + '/rates/zones/';

        PostcodeService.get('app-content/localities.json').then(function (data) {
            $scope.zones = data;
        });

        $scope.triger = false;
        $scope.prices = [];

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

        $scope.save = function () {

            $scope.prices = [];

            var cubes = $scope.form.length * $scope.form.width * $scope.form.height / 100,
                cubic_weight = cubes * $scope.form.weight;

            alert('Zone From: ' + $scope.selected_from +
                ' Zone To: ' + $scope.selected_to +
                ' Cubes ' + cubes +
                ' Cubic Weight' + cubic_weight);

            ZoneService.get($scope.selected_from).then(function (data) {
                $scope.zone_from_data = data.results;
                ZoneService.get($scope.selected_to).then(function (data) {
                    $scope.zone_to_data = data.results;
                    for (var i = 0; i < $scope.zone_from_data.length; i++) {
                        for (var j = 0; j < $scope.zone_to_data.length; j++) {
                            if ($scope.zone_from_data[i].carrier === $scope.zone_to_data[j].carrier) {
                                PriceService.get($scope.zone_from_data[i].zone,
                                    $scope.zone_to_data[j].zone,
                                    $scope.form.length, $scope.form.width, $scope.form.height,
                                    $scope.form.weight).then(function (data) {
                                    for (var x=0; x < data.length; x++) {
                                        if (data[x] == 'There is no rates for you!') {
                                            $scope.prices[0] = 'There is no rates for you!'
                                        }
                                        else {
                                            console.log(data[x]);
                                            $scope.prices.push(data[x]);
                                            console.log($scope.prices)
                                        }
                                    }
                                    $scope.triger = !$scope.triger;
                                })
                            }
                        }
                    }
                })
            });
        };
    }
})();
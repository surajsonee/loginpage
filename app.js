(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ui.bootstrap'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.timeout = 5000;
        

        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
            .state('order', {
                url: "/order",
                templateUrl: 'order/index.view.html',
                controller: 'Order.IndexController',
                controllerAs: 'vm'
            })
            .state('order-list', {
                url: "/order-list",
                templateUrl: 'order-list/index.view.html',
                controller: 'OrderList.IndexController',
                controllerAs: 'vm'
            })
            .state('order-view', {
                url: "/order-view",
                templateUrl: 'order-view/index.view.html',
                controller: 'OrderVIew.IndexController',
                controllerAs: 'vm'
            })
            .state('carrier-selector', {
                url: "/carrier-selector",
                templateUrl: 'carrier-selector/index.view.html',
                controller: 'CarrierSelector.IndexController',
                controllerAs: 'vm'
            })
            .state('cp-specify', {
                url: "/cp-specify",
                templateUrl: 'cp-specify/index.view.html',
                controller: 'CPSpecify.IndexController',
                controllerAs: 'vm'
            });
    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'JWT ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();
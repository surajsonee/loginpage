(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrderVIew.IndexController', Controller);

    function Controller($scope, $rootScope, $location) {
        $scope.view = $rootScope.orderview;
        
        $scope.back = function () {
            $location.path('/order-list')
        };
        
        $scope.getPDF = function(){
            var pdf = $scope.view.manifest;
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

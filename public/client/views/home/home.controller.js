(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("HomeController", HomeController);

    function HomeController($scope, SaleService) {
        getSales();

        function getSales() {
            SaleService.findAllSales().then(
                function(res) {
                    $scope.sales = res.data || [];
                },
                function(error) {
                    console.log(error);
                }
            );
        }
    }
})();
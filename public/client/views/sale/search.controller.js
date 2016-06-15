(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("SaleSearchController", SaleSearchController);

    function SaleSearchController($scope, SaleService) {
        $scope.searchQuery = $scope.$location.url().replace("/search/", "").toLowerCase().replace(/ /g, "");
        getSales();

        function getSales() {
            SaleService.findAllSales().then(
                function(res) {
                    $scope.sales = [];

                    for(var i in res.data) {
                        if(res.data[i].title.toLowerCase().replace(/ /g, "").indexOf($scope.searchQuery) > -1) {
                            $scope.sales.push(res.data[i]);
                        }
                    }
                },
                function(error) {
                    console.log(error);
                }
            );
        }
    }
})();
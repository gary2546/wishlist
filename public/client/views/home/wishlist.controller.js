(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("WishlistController", WishlistController);

    function WishlistController($scope, $rootScope, SaleService) {
        $scope.sales = [];
        getSales();

        function getSales() {
            for(var i in $rootScope.user.wishlistedSales) {
                SaleService.findSale($rootScope.user.wishlistedSales[i]).then(
                    function(res) {
                        $scope.sales.push(res.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        }
    }
})();
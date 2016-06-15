(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("CategorySaleController", CategorySaleController);

    function CategorySaleController($scope, SaleService, CategoryService) {
        var categoryId = $scope.$location.url().replace("/category/", "");
        getSales();
        getCategory();

        function getSales() {
            SaleService.findSalesByCategory(categoryId).then(
                function(res) {
                    $scope.sales = res.data || [];
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        function getCategory() {
            CategoryService.findCategory(categoryId).then(
                function(res) {
                    $scope.category = res.data;
                },
                function(error) {
                    console.log(error);
                }
            )
        }
    }
})();
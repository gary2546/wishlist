(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("HomeController", HomeController);

    function HomeController($scope, SaleService, UserService, CategoryService) {

        function getUsername(sale) {
            UserService.findUserById(sale.postedBy).then(
                function(res) {
                    sale.postedByName = res.data ? res.data.username : "unknown";
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        function getCategoryName(sale) {
            CategoryService.findCategory(sale.category).then(
                function(res) {
                    sale.categoryName = res.data ? res.data.title : "unknown";
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        function getSales() {
            SaleService.findAllSales().then(
                function(res) {
                    $scope.sales = res.data || [];

                    for(var i = 0; i < $scope.sales.length; i++) {
                        $scope.sales[i].createdDate = new Date($scope.sales[i].created).toDateString();
                        getUsername($scope.sales[i]);
                        getCategoryName($scope.sales[i]);
                    }
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        getSales();
    }
})();
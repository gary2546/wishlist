(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("WishlistController", WishlistController);

    function WishlistController($scope, $rootScope, SaleService, UserService, CategoryService) {

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
            for(var i in $rootScope.user.wishlistedSales) {
                SaleService.findSale($rootScope.user.wishlistedSales[i]).then(
                    function(res) {
                        if(res.data) {
                            res.data.createdDate = new Date(res.data.created).toDateString();
                            getUsername(res.data);
                            getCategoryName(res.data);
                            $scope.sales.push(res.data);
                        }

                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        }

        $scope.sales = [];
        getSales();
    }
})();
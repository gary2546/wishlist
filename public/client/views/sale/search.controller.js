(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("SaleSearchController", SaleSearchController);

    function SaleSearchController($scope, SaleService, UserService, CategoryService) {

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
                    for(var i in res.data) {
                        if(res.data[i].title.toLowerCase().replace(/ /g, "").indexOf($scope.searchQuery) > -1) {
                            res.data[i].createdDate = new Date(res.data[i].created).toDateString();
                            getUsername(res.data[i]);
                            getCategoryName(res.data[i]);
                            $scope.sales.push(res.data[i]);
                        }
                    }
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        $scope.sales = [];
        $scope.searchQuery = $scope.$location.url().replace("/search/", "").toLowerCase().replace(/ /g, "");
        getSales();
    }
})();
/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .controller("SaleController", SaleController);

    function SaleController($scope, $rootScope, SaleService) {
        $scope.currentSelection = null;

        if(!$rootScope.user || !$rootScope.user.isAdmin) {
            $scope.logout();
            $scope.$location.url("/login");
        }

        getSales();

        function getSales() {
            SaleService.findAllSales().then(
                function(res) {
                    $scope.sales = res.data || [];
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        $scope.addSale = function() {
            if($scope.link && $scope.title && $scope.categoryId) {
                var sale = {
                    title: $scope.title,
                    link: $scope.link,
                    description: $scope.description,
                    categoryId: $scope.categoryId,
                    imageLink: $scope.imageLink
                };

                SaleService.createSale($scope.categoryId, sale).then(
                    function(res) {
                        $scope.sales.push(res.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };

        $scope.updateSale = function() {
            if ($scope.currentSelection !== null){
                var saleId = $scope.sales[$scope.currentSelection]._id;
                var sale = {
                    _id: saleId,
                    title: $scope.title,
                    link: $scope.link,
                    description: $scope.description,
                    categoryId: $scope.categoryId,
                    imageLink: $scope.imageLink
                };

                SaleService.updateSale(saleId, sale).then(
                    function(res) {
                        $scope.sales[$scope.currentSelection] = sale;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };

        $scope.deleteSale = function(index) {
            if(index === $scope.currentSelection) {
                $scope.currentSelection = null;
            }

            SaleService.deleteSale($scope.sales[index]._id).then(
                function(res) {
                    $scope.sales.splice(index, 1);
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.selectSale = function(index) {
            $scope.currentSelection = index;
            $scope.title = $scope.sales[index].title;
            $scope.link = $scope.sales[index].link;
            $scope.description = $scope.sales[index].description;
            $scope.categoryId = $scope.sales[index].categoryId;
            $scope.imageLink = $scope.sales[index].imageLink;
        };

    }
})();
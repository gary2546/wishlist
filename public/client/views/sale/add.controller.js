(function() {
    "use strict";

    angular
        .module("Wishlist")
        .controller("AddSaleController", AddSaleController);

    function AddSaleController($scope, $rootScope, SaleService, CategoryService) {
        getCategories();

        function getCategories() {
            CategoryService.findAllCategories().then(
                function(res) {
                    $scope.categories = res.data || [];
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        $scope.submit = function() {
            if(!$scope.link || !$scope.title || !$scope.imageLink || !$rootScope.user || !$scope.categoryIndex || !$scope.description) {
                $scope.error = "Please enter every field.";
            }
            else {
                var category = $scope.categories[$scope.categoryIndex];
                var sale = {
                    title: $scope.title,
                    category: category,
                    link: $scope.link,
                    description: $scope.description,
                    postedBy: $rootScope.user,
                    imageLink: $scope.imageLink
                };

                SaleService.createSale(category._id, sale).then(
                    function(res) {
                        $scope.$location.path("/home");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };
    }
})();
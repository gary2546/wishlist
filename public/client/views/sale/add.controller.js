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
            if(!$scope.link || !$scope.title || !$scope.imageLink || !$rootScope.user || !$scope.categoryId || !$scope.description) {
                $scope.error = "Please enter every field.";
            }
            else {
                var sale = {
                    title: $scope.title,
                    link: $scope.link,
                    description: $scope.description,
                    postedBy: $rootScope.user._id,
                    imageLink: $scope.imageLink
                };

                SaleService.createSale($scope.categoryId, sale).then(
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
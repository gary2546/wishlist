(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("CategoryController", CategoryController);

    function CategoryController($scope, CategoryService) {
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
    }
})();
(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("AddCategoryController", AddCategoryController);

    function AddCategoryController($scope, CategoryService) {

        $scope.submit = function() {
            if(!$scope.title) {
                $scope.error = "Please enter every field.";
            } else {
                var category = { title: $scope.title };

                CategoryService.createCategory(category).then(
                    function(response) {
                        $scope.$location.path("/category");
                    },
                    function(reason) {
                        console.log(reason);
                    }
                );
            }
        }
    }
})();
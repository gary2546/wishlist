(function() {
    "use strict";

    angular
        .module("Wishlist")
        .factory("CategoryService", CategoryService);

    function CategoryService($http) {

        var service = {};

        service.createCategory = function(category) {
            return $http.post("/api/project/category", category);
        };

        service.deleteCategory = function(categoryId) {
            return $http.delete("/api/project/category/" + categoryId);
        };

        service.updateCategory = function(categoryId, category) {
            return $http.put("/api/project/category/" + categoryId, category);
        };

        service.findCategory = function(categoryId) {
            return $http.get("/api/project/category/" + categoryId);
        };

        service.findAllCategories = function() {
            return $http.get("/api/project/category");
        };

        return service;
    }
})();
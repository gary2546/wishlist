/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .factory("SaleService", SaleService);

    function SaleService($http) {
        var service = {};

        service.createSale = function(categoryId, sale) {
            return $http.post("/api/project/category/" + categoryId + "/sale", sale);
        };

        service.deleteSale = function(saleId) {
            return $http.delete("/api/project/sale/" + saleId);
        };

        service.updateSale = function(saleId, sale) {
            return $http.put("/api/project/sale/" + saleId, sale);
        };

        service.findSale = function(saleId) {
            return $http.get("/api/project/sale/" + saleId);
        };

        service.findAllSales = function() {
            return $http.get("/api/project/sale");
        };

        service.findSalesByCategory = function(categoryId) {
            return $http.get("/api/project/category/" + categoryId + "/sale");
        };

        service.findWishlistedByUser = function(userId) {
            return $http.get("/api/project/user/" + userId + "/wishlisted/sale");
        };

        service.findBoughtByUser = function(userId) {
            return $http.get("/api/project/user/" + userId + "/bought/sale");
        };

        service.findReportedByUser = function(userId) {
            return $http.get("/api/project/user/" + userId + "/reported/sale");
        };

        return service;
    }
})();
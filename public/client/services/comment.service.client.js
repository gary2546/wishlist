/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .factory("CommentService", CommentService);

    function CommentService($http) {
        var service = {};

        service.createComment = function(saleId, comment) {
            return $http.post("/api/project/sale/" + saleId + "/comment", comment);
        };

        service.deleteComment = function(commentId) {
            return $http.delete("/api/project/comment/" + commentId);
        };

        service.updateComment = function(commentId, comment) {
            return $http.put("/api/project/comment/" + commentId, comment);
        };

        service.findComment = function(commentId) {
            return $http.get("/api/project/comment/" + commentId);
        };

        service.findAllComments = function() {
            return $http.get("/api/project/comment");
        };

        service.findCommentsBySale = function(saleId) {
            return $http.get("/api/project/sale/" + saleId + "/comment");
        };

        service.findHelpfulByUser = function(userId) {
            return $http.get("/api/project/user/" + userId + "/helpful/comment");
        };

        service.findReportedByUser = function(userId) {
            return $http.get("/api/project/user/" + userId + "/reported/comment");
        };

        return service;
    }
})();
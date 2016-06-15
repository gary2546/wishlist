(function() {
    "use strict";

    angular
        .module("Wishlist")
        .factory("UserService", UserService);

    function UserService($http) {

        var service = {};

        service.findUserByUsernameAndPassword = function(username, password) {
            return $http.post("/api/project/login", {username: username, password: password});
        };

        service.logout = function() {
            return $http.post("/api/project/logout");
        }

        service.findUserByUsername = function(username) {
            return $http.get("/api/project/user?username=" + username);
        };

        service.findAllUsers = function() {
            return $http.get("/api/project/user");
        };

        service.createUser = function(user) {
            return $http.post("/api/project/user", user);
        };

        service.deleteUser = function(userId) {
            return $http.delete("/api/project/user/" + userId);
        };

        service.updateUser = function(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        };

        return service;
    }
})();
/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .controller("MainController", MainController);

    function MainController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.loggedIn = false;

        $rootScope.isAdmin = function() {
            return $rootScope.user.isAdmin;
        };
    }
})();
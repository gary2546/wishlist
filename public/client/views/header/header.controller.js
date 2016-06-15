/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, UserService) {
        $scope.getClass = function(path) {
            if ($scope.$location.url() === path) {
                return 'active';
            } else if ($scope.$location.url() === "/" && path === "/home") {
                return 'active';
            }
            return '';
        };

        $scope.getAdminClass = function() {
            if(["/users", "/sales", "/comments"].indexOf($scope.$location.url()) > -1) {
                return "active";
            }
            return "";
        };

        $scope.logout = function() {
            UserService.logout().then(
                function() {
                    $rootScope.loggedIn = false;
                    $rootScope.user = null;
                    $scope.$location.path("/home");
                }
            );

        };

        $scope.searchSale = function(searchSaleText) {
            $scope.$location.url("/search/" + searchSaleText);
        }
    }
})();
(function() {
    "use strict";

    angular
        .module('Wishlist')
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {

        $scope.login = function() {
            if(!$scope.username || !$scope.password) {
                $scope.error = "Please enter every field.";
                return;
            }

            UserService.findUserByUsernameAndPassword($scope.username, $scope.password).then(
                function(result) {
                    $rootScope.loggedIn = true;
                    $rootScope.user = result.data;
                    $scope.$location.path("/home");
                },
                function(reason) {
                    $scope.error = "Wrong username and password.";
                }
            );

        };

    }
})();
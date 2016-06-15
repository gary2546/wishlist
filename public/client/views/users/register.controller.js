(function() {
    "use strict";
    angular
        .module('Wishlist')
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        $scope.register = function() {
            if(!$scope.username || !$scope.password || !$scope.verifyPassword || !$scope.email) {
                $scope.error = "Please enter every field.";
            } else if($scope.password !== $scope.verifyPassword) {
                $scope.error = "Passwords does not match.";
            } else {
                var user = {};
                user.username = $scope.username;
                user.password = $scope.password;
                user.email = $scope.email;

                // Check for existing user + email, if none exists we create a new one
                UserService.findUserByUsername(user.username).then(
                    function(response) {

                        var foundUser = response.data;
                        if (foundUser === null) {
                            UserService.createUser(user).then(
                                function(response) {
                                    UserService.findUserByUsernameAndPassword(user.username, user.password).then(
                                        function(result) {
                                            $rootScope.loggedIn = true;
                                            $rootScope.user = result.data;
                                            $scope.$location.path("/home");
                                        },
                                        function(reason) {
                                            $scope.error = "Wrong username and password.";
                                        }
                                    );
                                },
                                function(reason) {
                                    console.log(reason);
                                }
                            );
                        } else {
                            $scope.error = "Username already exists!";
                        }
                    },
                    function(reason) {
                        console.log(reason);
                    }
                );
            }
        }
    }
})();
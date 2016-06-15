/**
 * Created by gary on 3/22/16.
 */
(function() {
    "use strict";

    angular
        .module("Wishlist")
        .controller("UserController", UserController);

    function UserController($scope, $rootScope, UserService) {
        $scope.currentSelection = null;

        if(!$rootScope.user || !$rootScope.user.isAdmin) {
            $scope.logout();
            $scope.$location.url("/login");
        }

        getUsers();

        function getUsers() {
            UserService.findAllUsers().then(
                function(res) {
                    $scope.users = res.data || [];
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        $scope.addUser = function() {
            if($scope.username && $scope.password) {
                var user = {
                    username: $scope.username,
                    password: $scope.password,
                    isAdmin: $scope.isAdmin
                };

                UserService.createUser(user).then(
                    function(res) {
                        $scope.users.push(res.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                )
            }
        };

        $scope.updateUser = function() {
            if ($scope.currentSelection !== null){
                var userId = $scope.users[$scope.currentSelection]._id;
                var user = {
                    _id: userId,
                    username: $scope.username,
                    password: $scope.password,
                    isAdmin: $scope.isAdmin
                };

                UserService.updateUser(userId, user).then(
                    function(res) {
                        $scope.users[$scope.currentSelection] = res.data;
                    },
                    function(error) {
                        console.log(error);
                    }
                )
            }
        };

        $scope.deleteUser = function(index) {
            if(index === $scope.currentSelection) {
                $scope.currentSelection = null;
            }

            UserService.deleteUser($scope.users[index]._id).then(
                function(res) {
                    $scope.users.splice(index, 1);
                },
                function(error) {
                    console.log(error);
                }
            )
        };

        $scope.selectUser = function(index) {
            $scope.currentSelection = index;
            $scope.username = $scope.users[index].username;
            $scope.password = $scope.users[index].password;
            $scope.isAdmin = $scope.users[index].isAdmin;
        };

    }
})();